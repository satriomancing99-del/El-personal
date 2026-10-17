# Website Personal — Dewa Bagus Alif Rosyadi (El)

Website personal satu halaman yang dibangun dengan **React, TypeScript, dan Vite**, menggunakan CSS ringan berbasis *system fonts*, ramah aksesibilitas (*mobile-first*), dan mematuhi privasi (konfigurasi `noindex, nofollow`).

---

## 1. Menjalankan Proyek Secara Lokal

Pastikan Node.js sudah terpasang di komputer Anda.

```bash
# 1. Masuk ke direktori proyek
cd el-personal-web

# 2. Pasang dependensi (jika belum)
npm install

# 3. Jalankan server pengembangan lokal
npm run dev
```

Buka peramban di `http://localhost:5173/`.

Untuk menguji build produksi secara lokal:
```bash
npm run build
npm run preview
```

---

## 2. Mengubah Konten Profil

Semua teks, riwayat pendidikan, minat, nilai hubungan, dan kontak tersimpan terpusat di satu file:
📁 **`src/data/profile.ts`**

Anda cukup membuka file tersebut dan menyunting nilai propertinya. Perubahan akan langsung diperbarui secara otomatis.

---

## 3. Memasang atau Mengganti Foto Profil

Secara bawaan, website menggunakan **monogram inisial "EL"** yang rapi jika belum ada foto yang dimasukkan.

Jika Anda ingin memasang foto asli:
1. Salin file foto Anda (misalnya `foto-el.jpg`) ke dalam folder **`public/`**.
2. Buka **`src/data/profile.ts`**.
3. Tambahkan atau ubah properti `photoUrl`:
   ```ts
   photoUrl: '/foto-el.jpg',
   ```
4. Jika ingin kembali menggunakan inisial monogram tanpa foto, cukup kosongkan atau hapus baris tersebut (`photoUrl: undefined`).

---

## 4. Panduan Deployment (Vercel)

Proyek ini telah dikonfigurasi sebagai situs statis Vite standar dan siap dideploy langsung ke Vercel tanpa memerlukan file `vercel.json` tambahan.

### Langkah Deployment ke Vercel:
1. Unggah (*push*) folder proyek ini ke repositori Git Anda (GitHub / GitLab / Bitbucket).
2. Buka dashboard [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Impor repositori Git proyek ini.
4. Vercel akan otomatis mengenali preset **Vite**:
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build` *(atau `tsc -b && vite build`)*
   * **Output Directory:** `dist`
5. Klik **Deploy**.

> **Catatan Privasi:** Website ini sudah dilengkapi tag `<meta name="robots" content="noindex, nofollow" />`. Halaman tidak akan diindeks oleh mesin pencari publik (seperti Google atau Bing), namun siapa pun yang menerima tautan langsung tetap dapat membukanya dengan normal.
