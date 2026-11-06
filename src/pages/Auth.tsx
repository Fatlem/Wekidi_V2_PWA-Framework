import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { FieldName } from "../lib/auth";
import { EyeIcon, EyeOffIcon, FacebookIcon } from "../components/Icons";
import googleLogo from "../assets/google.png";
import wekidiLogo from "../assets/hero-home.png";
import "../styles/auth.css";

type Mode = "login" | "register";
type Errors = Partial<Record<FieldName | "form", string>>;

interface PasswordFieldProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  error?: string;
}

function PasswordField({ id, placeholder, value, onChange, autoComplete, error }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="field-wrap">
      <div className={`field input-field${error ? " has-error" : ""}`}>
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="eye-icon"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
          aria-pressed={visible}
        >
          {visible ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function AuthForm({ mode }: { mode: Mode }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setErrors({});
    setNotice("");
    setLoading(true);
    try {
      const result = isRegister
        ? await register(email, password, confirm)
        : await login(email, password);
      if (result.ok) {
        navigate("/", { replace: true });
      } else {
        setErrors({ [result.field ?? "form"]: result.error });
      }
    } catch {
      setErrors({ form: "Terjadi kesalahan. Coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  const comingSoon = (what: string) => () => setNotice(`${what} belum tersedia saat ini.`);

  return (
    <div className="form">
      <div className="form-content">
        <h2 className="auth-title">{isRegister ? "Signup" : "Login"}</h2>

        <form onSubmit={onSubmit} noValidate>
          <div className="field-wrap">
            <div className={`field input-field${errors.email ? " has-error" : ""}`}>
              <input
                id="email"
                type="email"
                inputMode="email"
                placeholder="Email"
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="field-error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <PasswordField
            id="password"
            placeholder={isRegister ? "Create password" : "Password"}
            value={password}
            onChange={setPassword}
            autoComplete={isRegister ? "new-password" : "current-password"}
            error={errors.password}
          />

          {isRegister && (
            <PasswordField
              id="confirm"
              placeholder="Confirm password"
              value={confirm}
              onChange={setConfirm}
              autoComplete="new-password"
              error={errors.confirm}
            />
          )}

          {isRegister && (
            <p className="hint">Minimal 8 karakter, kombinasi huruf dan angka.</p>
          )}

          {!isRegister && (
            <div className="form-link">
              <button type="button" className="link-btn" onClick={comingSoon("Reset password")}>
                Forgot password?
              </button>
            </div>
          )}

          {errors.form && (
            <p className="banner error" role="alert">
              {errors.form}
            </p>
          )}
          {notice && (
            <p className="banner info" role="status">
              {notice}
            </p>
          )}

          <div className="field button-field">
            <button type="submit" disabled={loading}>
              {loading ? "Memproses…" : isRegister ? "Signup" : "Login"}
            </button>
          </div>
        </form>

        <div className="form-link">
          {isRegister ? (
            <span>
              Already have an account? <Link to="/login" className="link">Login</Link>
            </span>
          ) : (
            <span>
              Don&apos;t have an account? <Link to="/register" className="link">Signup</Link>
            </span>
          )}
        </div>
      </div>

      <div className="line" />

      <div className="media-options">
        <button type="button" className="field social facebook" onClick={comingSoon("Login dengan Facebook")}>
          <span className="social-icon facebook-icon">
            <FacebookIcon size={18} />
          </span>
          <span>Login with Facebook</span>
        </button>
      </div>
      <div className="media-options">
        <button type="button" className="field social google" onClick={comingSoon("Login dengan Google")}>
          <img src={googleLogo} alt="" className="social-img" />
          <span>Login with Google</span>
        </button>
      </div>
      <div className="media-options">
        <Link to="/" className="field social Wekidi">
          <img src={wekidiLogo} alt="" className="social-img" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function Auth({ mode }: { mode: Mode }) {
  const { user } = useAuth();
  // Sudah login → tidak perlu melihat halaman login/register lagi
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="auth-page">
      {/* key = form di-reset (input & error kosong) saat pindah Login <-> Signup */}
      <AuthForm key={mode} mode={mode} />
    </div>
  );
}
