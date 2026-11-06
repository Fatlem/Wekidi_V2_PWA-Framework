# Wekidiくん 🍔

Website restoran fast food fiksi **Wekidiくん** ("restoran paling enak di Isekai"), dibuat ulang dengan **React + TypeScript** dan dilengkapi **PWA**.

> 🌱 **Proyek pribadi — remake.**
> Ini adalah versi baru dari website native (HTML, CSS, dan JavaScript biasa) yang dulu saya buat sendiri saat kuliah **semester 1 dan 2**. Tampilan dan isinya dipertahankan, sedangkan kodenya ditulis ulang dengan teknologi yang lebih modern.

---

## ✨ Fitur

- **4 halaman:** Home, Menu, About, dan Login/Register.
- **PWA:** bisa di-install ke layar utama HP maupun desktop, dan tetap bisa dibuka offline setelah dikunjungi sekali.
- **Login & Register:**
  - validasi email dan password
  - konfirmasi password
  - tombol lihat/sembunyikan password
  - sesi login tersimpan
  - navbar berubah setelah login (nama pengguna + Logout)
- **Responsive:** nyaman di desktop, tablet, dan HP.
- **Bottom navigation bar** khusus HP (Home, Menu, About, Register/Logout).
- **Zoom dimatikan di HP** (pinch-zoom dan double-tap) supaya terasa seperti aplikasi.

## 🔄 Sebelum vs sesudah

| | Versi lama (semester 1–2) | Versi remake |
|---|---|---|
| Teknologi | HTML, CSS, JavaScript | React, TypeScript, Vite |
| Halaman | 4 file HTML terpisah (header/footer disalin tiap file) | Komponen dipakai ulang (`Navbar`, `Footer`, `Hero`, `FoodCard`) |
| Data menu | Tertulis langsung di HTML | Satu file data: `src/data/menu.ts` |
| Login/Register | Tampilan saja, form belum berfungsi | Validasi dan sesi login berfungsi |
| Mobile | Kartu menyempit, belum rapi | Layout responsive + bottom navigation |
| Offline / install | Tidak bisa | PWA (manifest + service worker) |
| Ikon login | Boxicons dari CDN | SVG di dalam kode (tetap jalan offline) |

## 🛠️ Teknologi

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- CSS biasa (tanpa framework UI)
- Service worker buatan sendiri (tanpa library tambahan)

## 🚀 Menjalankan di komputer

Pastikan [Node.js](https://nodejs.org/) sudah terpasang, lalu:

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya `http://localhost:5173`).

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Mode pengembangan (service worker **tidak** aktif) |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run preview` | Menjalankan hasil build, untuk menguji PWA di `http://localhost:4173` |
| `npm run typecheck` | Mengecek tipe TypeScript |

## 📱 Mencoba PWA

1. Jalankan `npm run build`, lalu `npm run preview`.
2. Buka di Chrome → DevTools → **Application** → pastikan service worker berstatus *activated*.
3. Centang **Offline** lalu muat ulang halaman. Situs harus tetap terbuka.
4. Klik ikon **Install** di address bar (desktop), atau pilih **Add to Home screen** (HP).

> PWA membutuhkan **HTTPS** saat dipublikasikan (di `localhost` boleh tanpa HTTPS).

## 📁 Struktur folder

```
public/
  manifest.webmanifest   Identitas aplikasi PWA
  sw.js                  Service worker (cache & offline)
  icons/                 Ikon aplikasi
src/
  assets/                Gambar lokal
  components/            Navbar, BottomNav, Footer, Hero, FoodCard, Layout, Icons
  context/               AuthContext (status login)
  data/menu.ts           Data menu, galeri, dan link sosial media
  lib/                   auth, disableZoom, pwa, sha256
  pages/                 Home, Menu, About, Auth
  styles/                global.css, auth.css
```

## 🌐 Deploy

Hasil build (`dist/`) adalah situs statis, jadi bisa dipasang di Netlify, Vercel, Cloudflare Pages, atau GitHub Pages.

- **Di sub-folder** (misalnya GitHub Pages `https://username.github.io/nama-repo/`): ubah `base` di `vite.config.ts` menjadi `"/nama-repo/"`. Router, manifest, dan service worker ikut menyesuaikan.
- **GitHub Pages:** salin `dist/index.html` menjadi `dist/404.html` supaya alamat seperti `/menu` tidak error saat dimuat ulang.

## 🔐 Catatan tentang Login/Register

Proyek ini belum punya backend. Akun disimpan di **localStorage browser**, dan password di-hash (PBKDF2 + salt) sebelum disimpan. Artinya:

- cocok untuk demo dan belajar,
- akun hanya ada di browser tempat mendaftar,
- **bukan** pengganti sistem autentikasi sungguhan.

Kalau nanti ada backend, cukup ganti isi `src/lib/auth.ts` dengan panggilan API. Komponen tampilannya tidak perlu diubah.

Tombol **Login with Facebook/Google** dan **Forgot password** belum berfungsi dan hanya menampilkan pemberitahuan.

## 🗺️ Rencana ke depan

- [ ] Backend untuk login yang sebenarnya
- [ ] Login dengan Google/Facebook
- [ ] Keranjang pesanan
- [ ] Pencarian dan filter menu
- [ ] Mode gelap

## 🙏 Kredit

- Foto makanan dan minuman: [Unsplash](https://unsplash.com/)
- Ikon sosial media: [Flaticon](https://www.flaticon.com/)
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts)
- Karakter dan ilustrasi Wekidiくん: milik pembuat proyek ini

---

Dibuat sebagai proyek pribadi untuk belajar dan memperbarui karya lama. ✌️