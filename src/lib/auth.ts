import { sha256Hex } from "./sha256";

/**
 * Autentikasi sisi-klien (tanpa server): akun disimpan di localStorage browser.
 * Cocok untuk demo/prototipe. Untuk produksi sungguhan, ganti fungsi di file ini
 * dengan panggilan ke backend (API) — komponen UI tidak perlu diubah.
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

type Algo = "pbkdf2" | "sha256";

interface StoredUser extends User {
  salt: string;
  hash: string;
  algo: Algo;
  createdAt: number;
}

export type FieldName = "email" | "password" | "confirm";

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string; field?: FieldName };

const USERS_KEY = "wekidi.users";
const SESSION_KEY = "wekidi.session";

/* ---------- storage aman (mode privat / storage penuh tidak bikin crash) ---------- */

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function loadUsers(): StoredUser[] {
  const data = readJSON<unknown>(USERS_KEY, []);
  return Array.isArray(data) ? (data as StoredUser[]) : [];
}

/* ---------- validasi ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string): string | null {
  const e = normalizeEmail(email);
  if (!e) return "Email wajib diisi.";
  if (!EMAIL_RE.test(e)) return "Format email tidak valid.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password wajib diisi.";
  if (password.length < 8) return "Password minimal 8 karakter.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Password harus mengandung huruf dan angka.";
  }
  return null;
}

/* ---------- hashing ---------- */

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function randomSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string, algo: Algo): Promise<string> {
  if (algo === "pbkdf2") {
    const subtle = globalThis.crypto?.subtle;
    if (!subtle) throw new Error("PBKDF2 tidak tersedia");
    const key = await subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
      "deriveBits",
    ]);
    const bits = await subtle.deriveBits(
      { name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 120_000, hash: "SHA-256" },
      key,
      256,
    );
    return toHex(bits);
  }
  return sha256Hex(`${salt}:${password}`);
}

function preferredAlgo(): Algo {
  return globalThis.crypto?.subtle ? "pbkdf2" : "sha256";
}

function toPublicUser(u: StoredUser): User {
  return { id: u.id, name: u.name, email: u.email };
}

function newId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `u_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

/* ---------- API publik ---------- */

export async function registerUser(
  emailInput: string,
  password: string,
  confirm: string,
): Promise<AuthResult> {
  const emailErr = validateEmail(emailInput);
  if (emailErr) return { ok: false, error: emailErr, field: "email" };
  const pwErr = validatePassword(password);
  if (pwErr) return { ok: false, error: pwErr, field: "password" };
  if (password !== confirm) {
    return { ok: false, error: "Konfirmasi password tidak sama.", field: "confirm" };
  }

  const email = normalizeEmail(emailInput);
  const users = loadUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "Email sudah terdaftar. Silakan login.", field: "email" };
  }

  const algo = preferredAlgo();
  const salt = randomSalt();
  const hash = await hashPassword(password, salt, algo);
  const user: StoredUser = {
    id: newId(),
    name: email.split("@")[0],
    email,
    salt,
    hash,
    algo,
    createdAt: Date.now(),
  };

  if (!writeJSON(USERS_KEY, [...users, user])) {
    return { ok: false, error: "Gagal menyimpan akun (penyimpanan browser tidak tersedia)." };
  }
  writeJSON(SESSION_KEY, user.id);
  return { ok: true, user: toPublicUser(user) };
}

export async function loginUser(emailInput: string, password: string): Promise<AuthResult> {
  const emailErr = validateEmail(emailInput);
  if (emailErr) return { ok: false, error: emailErr, field: "email" };
  if (!password) return { ok: false, error: "Password wajib diisi.", field: "password" };

  const email = normalizeEmail(emailInput);
  const stored = loadUsers().find((u) => u.email === email);
  const genericError = "Email atau password salah.";
  if (!stored) return { ok: false, error: genericError };

  let hash: string;
  try {
    hash = await hashPassword(password, stored.salt, stored.algo);
  } catch {
    return { ok: false, error: "Browser ini tidak bisa memverifikasi akun tersebut. Buka lewat HTTPS." };
  }
  if (hash !== stored.hash) return { ok: false, error: genericError };

  writeJSON(SESSION_KEY, stored.id);
  return { ok: true, user: toPublicUser(stored) };
}

export function getSessionUser(): User | null {
  const id = readJSON<string | null>(SESSION_KEY, null);
  if (!id) return null;
  const stored = loadUsers().find((u) => u.id === id);
  return stored ? toPublicUser(stored) : null;
}

export function logoutUser(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* abaikan */
  }
}
