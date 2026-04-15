# SIAKAD Polmind

Sistem Informasi Akademik Politeknik Mitra Industri

---

## Tentang Proyek

SIAKAD Polmind adalah platform akademik terpadu yang dirancang khusus untuk Politeknik Mitra Industri. Sistem ini mengelola seluruh aktivitas perkuliahan, penilaian, administrasi keuangan, dan layanan akademik untuk tiga peran utama: Mahasiswa, Dosen, dan Administrator.

Dibangun dengan pendekatan editorial premium, sistem ini tidak tampak seperti dashboard administratif biasa — melainkan seperti platform akademik modern yang terkurasi, tenang, dan berwibawa.

---

## Teknologi

| Komponen | Teknologi |
|:---------|:----------|
| Backend | Laravel 13 |
| Frontend | React.js dengan Inertia.js |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 dengan Custom Design System |
| Database | MySQL / MariaDB (XAMPP) |
| Routing | Ziggy (Laravel routes di JavaScript) |
| Auth | Laravel Session dengan NIM/NIP identifier |

---

## Persyaratan Sistem

- PHP 8.2 atau lebih baru
- Composer 2.x
- Node.js 18+ dan npm
- MySQL 8.0 / MariaDB 10.4+
- XAMPP (opsional, untuk lingkungan lokal)

---

## Instalasi

1. **Clone repositori**

```bash
git clone https://github.com/polmind/siakad-polmind.git
cd siakad-polmind
```

2. **Install dependensi PHP**

```bash
composer install
```

3. **Install dependensi frontend**

```bash
npm install
```

4. **Konfigurasi environment**

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env` dan sesuaikan konfigurasi database:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siakad_polmind
DB_USERNAME=root
DB_PASSWORD=
```

5. **Buat database**

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS siakad_polmind CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

6. **Jalankan migrasi dan seeder**

```bash
php artisan migrate:fresh --seed
```

---

## Menjalankan Aplikasi

```bash
# Terminal 1 — Laravel server
php artisan serve

# Terminal 2 — Vite development server
npm run dev
```

Akses aplikasi di `http://localhost:8000`

### Akun Demo

| Peran | NIM / NIP | Password |
|:------|:----------|:---------|
| Administrator | `admin` | `password` |
| Dosen | `198501012010011001` | `password` |
| Mahasiswa | `2024101001` | `password` |

---

## Program Studi

| Kode | Program Studi | Jenjang |
|:-----|:-------------|:--------|
| TRPL | Teknologi Rekayasa Perangkat Lunak | D4 |
| TRM | Teknologi Rekayasa Manufaktur | D4 |
| BISDIG | Bisnis Digital | D4 |

---

## Struktur Modul

### Mahasiswa
- Dashboard dengan statistik akademik dan akses cepat
- KRS (Kartu Rencana Studi) dengan SKS progress tracking
- KHS (Kartu Hasil Studi) dan Transkrip Nilai
- Jadwal Kuliah dan Jadwal Ujian
- Presensi dengan rekap kehadiran per mata kuliah
- Pembayaran dan riwayat tagihan
- Layanan Akademik (surat, beasiswa, cuti)
- Evaluasi Dosen (EDOM) — respons anonim
- Teaching Factory (TeFa)
- Kalender Akademik dan Status Akademik

### Dosen
- Dashboard dengan statistik mengajar
- Input Nilai (UTS, UAS, Tugas, Praktik) dengan auto-kalkulasi
- Verifikasi Nilai
- Jadwal Mengajar
- Daftar Mahasiswa per Kelas
- Bimbingan Akademik dan Persetujuan KRS
- Hasil Evaluasi (anonim)

### Administrator
- Dashboard sistem dengan ringkasan data
- Master Data: Mahasiswa, Dosen, Mata Kuliah, Program Studi
- Kelola Keuangan: Tagihan, Pembayaran, Tunggakan
- Pengumuman dan Helpdesk
- User Management dan Reset Password
- Audit Log

---

## Struktur Proyek

```
siakad-polmind/
├── app/
│   ├── Enums/                   # UserRole enum
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/           # Admin controllers
│   │   │   ├── Auth/            # Login/Logout
│   │   │   ├── Dosen/           # Dosen controllers
│   │   │   └── Mahasiswa/       # Mahasiswa controllers
│   │   └── Middleware/          # Role, Audit, Inertia middleware
│   └── Models/                  # 30+ Eloquent models
├── database/
│   ├── migrations/              # 11 migration groups
│   └── seeders/                 # Database seeder
├── resources/
│   ├── css/app.css              # Design system (DESIGN.md)
│   ├── js/
│   │   ├── app.jsx              # React entry point
│   │   ├── Layouts/             # AuthenticatedLayout
│   │   └── Pages/               # Page components per role
│   └── views/app.blade.php      # Root template
├── routes/web.php               # 50+ routes
└── vite.config.js               # Vite + React config
```

---

## Keamanan

- Role-Based Access Control (RBAC) dengan middleware ketat
- Rate limiting pada login untuk mencegah brute force
- Session authentication dengan CSRF protection
- Audit log untuk setiap aksi penting (login, logout, perubahan data)
- Evaluasi dan survey bersifat anonim secara arsitektural
- Password hashing dengan bcrypt

---

## Design Direction

Antarmuka mengikuti prinsip "The Digital Curator":
- Tonal depth melalui surface hierarchy, bukan border
- Typography editorial yang berwibawa (Manrope + Inter)
- Ambient shadows dan glassmorphism yang halus
- Komposisi editorial asymmetric
- Komponen yang refined dan tidak terlihat generik

---

## Lisensi

Proyek ini dilisensikan di bawah GNU General Public License v3.0.
