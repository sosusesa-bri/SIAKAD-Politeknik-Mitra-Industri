Gunakan agents.md sebagai sumber aturan utama dan pedoman kerja.

Role:
Senior Expert Full Stack Developer

Task:
Rancang dan bangun sistem SIAKAD Polmind secara menyeluruh untuk tiga role utama: mahasiswa, dosen, dan admin. Sistem harus dibuat dengan pendekatan full stack yang matang, modular, scalable, aman, dan siap digunakan secara nyata.

Fokus utama pekerjaan ini adalah:
1. Menganalisis kebutuhan sistem berdasarkan role dan fitur yang telah ditentukan.
2. Menyusun arsitektur aplikasi yang rapi, terstruktur, dan mudah dikembangkan.
3. Merancang database, relasi antar entitas, flow sistem, dan role-based access control.
4. Mengimplementasikan frontend dan backend dengan kualitas produksi.
5. Memastikan seluruh fitur berfungsi dengan baik, stabil, dan konsisten.
6. Menghasilkan antarmuka yang premium, editorial, modern, dan sesuai dengan direction design pada DESIGN.md.

Context:
Website ini adalah Sistem Informasi Akademik untuk Politeknik Mitra Industri (SIAKAD Polmind), dibangun menggunakan Laravel 13 dan database MySQL/MariaDB yang berjalan melalui XAMPP.

Sistem harus mendukung tiga role utama:
- Mahasiswa
- Dosen
- Admin

Selain role utama, sistem juga harus memiliki fitur umum untuk semua pengguna, autentikasi, notifikasi, pengelolaan profil, helpdesk, pengunduhan dokumen, dashboard, logout, dan audit log/history.

Fitur yang harus dipertimbangkan dalam perancangan sistem:

1. Login
- Login untuk mahasiswa, dosen, admin
- Masukkan NIM/NIP (wajib)
- Masukkan password (wajib)

2. Pengguna Akses Umum
- Kelola profil
- Lihat pengumuman
- Unduh dokumen akademik
- Notifikasi sistem
- Helpdesk / bantuan
- Login sistem
- Logout sistem
- Lihat dashboard
- Lihat log / history aktivitas (setiap role mempunyai history aktivitasnya masing-masing)

3. Mahasiswa
Modul Layanan Akademik:
- Ajukan surat akademik
- Lacak status layanan
- Ajukan beasiswa / layanan
- Riwayat pengajuan
- Tracking status pengajuan
- Upload dokumen pendukung
- Ajukan cuti akademik

Modul Akademik:
- Cetak bukti registrasi
- Registrasi ulang semester
- Lihat status akademik
- Lihat IPK/IPS (WAJIB)
- Lihat transkrip nilai sementara (WAJIB)
- Lihat KHS dan cetak KHS (WAJIB)
- Lihat KRS, isi KRS, validasi KRS, ajukan perubahan KRS, cetak KRS (WAJIB) (KRS dimulai pada semester 5 dan seterusnya, sedangkan semester 1-4 itu sistemnya paket)
- Cek prasyarat mata kuliah
- Cek beban SKS maksimal
- Lihat kalender akademik
- Lihat jadwal ujian
- Lihat jadwal kuliah
- Bimbingan khusus: paper, skripsi, lomba, teaching factory

Modul Perkuliahan:
- Presensi kuliah
- Lihat rekap kehadiran
- Download modul/file kelas
- Notifikasi perkuliahan
- Lihat detail mata kuliah
- Lihat nilai tugas
- Upload tugas
- Download materi kuliah

Modul Administrasi:
- Download kartu KRS
- Download kartu ujian
- Cetak kwitansi
- Riwayat pembayaran
- Cek status pembayaran
- Cek tunggakan
- Tagihan / invoice akademik
- Status registrasi semester

Modul Evaluasi (WAJIB Anonymous untuk pengisi form EDOM):
- Isi EDOM
- Lihat evaluasi dosen
- Riwayat evaluasi
- Lihat hasil evaluasi
- Isi survey akademik
- Pengguna pengisi harus ditampilkan secara anonymous

Modul TeFa:
- Riwayat proyek
- Monitoring progress proyek
- Laporan kegiatan TeFa
- Upload laporan TeFa
- Isi logbook proyek
- Upload proposal TeFa

4. Dosen
Modul Penilaian:
- Rekap nilai (WAJIB)
- Verifikasi nilai (WAJIB)
- Input nilai (WAJIB)
- Cetak / ekspor nilai (WAJIB)
- Input nilai UTS/UAS (WAJIB)
- Input nilai akhir (WAJIB)

Modul Bimbingan:
- Persetujuan KRS mahasiswa
- Lihat daftar bimbingan
- Jadwal bimbingan
- Review proposal TeFa
- Bimbingan khusus: paper, skripsi, lomba, teaching factory

Modul Evaluasi (WAJIB Anonymous untuk pengisi form EDOM):
- Lihat evaluasi mahasiswa
- Lihat survey akademik
- Lihat hasil EDOM
- Pengguna pengisi harus ditampilkan secara anonymous

Modul TeFa:
- Lihat laporan TeFa
- Validasi logbook proyek
- Lihat logbook proyek
- Monitoring progress proyek

Modul Aktivitas Kelas:
- Kelola jadwal ujian
- Kelola forum kelas
- Kelola kehadiran kelas

Modul Pengajaran:
- Lihat kalender akademik
- Lihat riwayat mengajar
- Unggah berita acara perkuliahan
- Buat tugas
- Kelola materi / pengumuman kelas
- Kelola presensi mahasiswa
- Lihat daftar mahasiswa
- Lihat jadwal mengajar

5. Admin
Modul Pelaporan & Konfigurasi:
- Statistik akademik
- Laporan akademik
- Import / export data
- Monitoring sistem
- Konfigurasi sistem

Modul Master Data:
- Kelola ruang kelas
- Kelola semester
- Kelola tahun akademik
- Kelola kurikulum
- Kelola mata kuliah
- Kelola fakultas / jurusan
- Kelola program studi
- Kelola data dosen
- Kelola data mahasiswa
- Kelola kalender akademik
- Kelola kelas

Modul Operasional Akademik:
- Verifikasi berkas akademik
- Kelola seminar
- Kelola cuti / aktif kuliah
- Kelola wisuda / yudisium
- Kelola presensi
- Kelola nilai, KHS, transkrip
- Kelola registrasi & KRS
- Kelola jadwal ujian
- Kelola jadwal kuliah

Modul Keuangan:
- Kelola tagihan
- Validasi pembayaran
- Kelola biaya kuliah
- Kelola tunggakan
- Kelola beasiswa
- Laporan keuangan
- Kelola kwitansi

Modul Layanan & Konten:
- Kelola dokumen akademik
- Kelola pengumuman
- Kelola helpdesk / tiket
- Verifikasi surat / cuti / aktif kuliah
- Moderasi pengajuan layanan
- Kelola notifikasi sistem

Modul User & Keamanan:
- Kelola user & role
- Backup / restore sistem
- Audit log
- Reset password user
- Kelola hak akses
- Login ke akun mahasiswa & dosen untuk keperluan bantuan atau verifikasi

Constraints:
Gunakan prinsip desain dan pengalaman yang konsisten dengan DESIGN.md. Sistem harus terasa seperti platform akademik editorial premium, bukan dashboard CRUD biasa. Gunakan prinsip visual dan UX berikut:

1. Creative North Star: The Digital Curator
- UI harus terasa tenang, terkurasi, dan berwibawa
- Hindari kesan data-entry yang kaku
- Gunakan editorial asymmetry dan ruang kosong yang cukup
- Komposisi layar harus terasa seperti jurnal akademik premium, bukan software administratif generik

2. Colors: Tonal Depth & Soul
- Gunakan hirarki surface secara konsisten
- Gunakan background shift untuk membedakan area, bukan border tegas
- Primary CTA dan hero section boleh memakai gradient halus
- Gunakan textural warmth secara sangat halus bila relevan
- Dilarang memakai 1px solid border untuk sectioning

3. Typography: The Authority of Sans
- Gunakan tipografi yang kuat, jelas, dan modern
- Headline harus terasa editorial dan berwibawa
- Body text harus sangat mudah dibaca untuk penggunaan harian
- Label dan metadata harus ringkas, rapi, dan konsisten

4. Elevation & Depth: Tonal Layering
- Gunakan depth yang lembut dan atmosferik
- Hindari shadow tebal dan hard outline
- Gunakan glassmorphism hanya bila benar-benar mendukung konteks navigasi atau header
- Fokus pada hierarki tonal, bukan efek visual berlebihan

5. Components: Refined Primitives
- Tombol utama harus jelas, elegan, dan tidak berlebihan
- Card harus terasa elevated melalui tonal contrast, bukan divider
- Input field harus bersih, fungsional, dan tidak ramai
- Chips, badges, progress bar, tabel, dan navigasi harus konsisten secara visual
- Hindari elemen UI yang terlihat generik atau template-like

Anti-Template UI/UX Requirement:
- UI harus terlihat seperti produk akademik yang dirancang khusus, bukan hasil template generik atau layout AI yang repetitif.
- Hindari komposisi halaman yang terlalu simetris, terlalu datar, atau terlalu “boxed-in”.
- Gunakan editorial asymmetry, whitespace yang terukur, dan hirarki visual yang jelas agar setiap layar terasa kurasi, bukan otomatisasi.
- Setiap halaman harus memiliki karakter visual yang konsisten dengan DESIGN.md: tenang, premium, berwibawa, dan terasa seperti jurnal akademik modern.
- Jangan gunakan pola layout yang terlalu umum dan mudah dikenali sebagai template dashboard standar.
- Komponen harus terasa dipilih dan disusun secara sadar, bukan sekadar ditumpuk.
- Prioritaskan detail kecil seperti spacing, tipografi, tonal surfaces, dan ritme visual agar hasil akhir memiliki identitas desain yang kuat.
- Pastikan tampilan akhir tidak terlihat seperti output AI generik, melainkan seperti desain yang dibuat dengan arahan art direction yang matang.

6. Do’s and Don’ts
Do:
- Do prioritaskan pengalaman pengguna yang jelas, tenang, dan efisien untuk masing-masing role.
- Do gunakan hierarki visual yang kuat agar informasi penting langsung terbaca dalam sekali lihat.
- Do bangun antarmuka dengan pendekatan editorial dan premium, bukan dashboard generik.
- Do gunakan spacing yang lapang dan konsisten untuk menjaga kenyamanan baca.
- Do tampilkan status, progres, dan notifikasi secara eksplisit agar alur kerja mudah dipahami.
- Do pastikan seluruh fitur berbasis role memiliki akses yang tepat, aman, dan terkontrol.
- Do gunakan komponen yang reusable agar pengembangan sistem lebih konsisten dan mudah dirawat.
- Do utamakan validasi data, keamanan autentikasi, dan integritas relasi database.
- Do buat setiap halaman memiliki tujuan yang spesifik dan tindakan utama yang jelas.
- Do gunakan empty state, loading state, success state, dan error state yang informatif.
- Do pastikan desain responsif dan tetap rapi pada berbagai ukuran layar.
- Do jaga konsistensi bahasa, istilah, warna, radius, dan gaya komponen di seluruh sistem.
- Do dokumentasikan struktur modul, relasi data, dan alur kerja agar sistem mudah dikembangkan.
- Do rancang sistem agar siap dipakai pada kondisi nyata, bukan hanya tampak bagus secara visual.

Don’t:
- Don’t gunakan tampilan yang terasa seperti template admin biasa atau aplikasi CRUD yang kaku.
- Don’t padatkan layout dengan terlalu banyak elemen dalam satu layar.
- Don’t gunakan border tegas, divider berlebihan, atau garis pemisah yang mengganggu kesan editorial.
- Don’t gunakan warna, shadow, atau efek visual secara berlebihan hingga merusak kesan premium.
- Don’t membuat semua komponen terlihat sama penting; tetap jaga prioritas visual yang jelas.
- Don’t menampilkan data tanpa konteks, label, atau penjelasan yang memadai.
- Don’t gunakan istilah yang ambigu, terlalu teknis, atau tidak konsisten antar halaman.
- Don’t mengabaikan perbedaan kebutuhan antara mahasiswa, dosen, dan admin.
- Don’t membuat alur kerja yang memaksa pengguna berpindah halaman terlalu sering tanpa alasan.
- Don’t menyimpan logika bisnis penting hanya di frontend; validasi inti harus tetap aman di backend.
- Don’t mengandalkan placeholder sebagai pengganti label yang jelas.
- Don’t membiarkan fitur kosong tanpa state, bantuan, atau arah tindakan berikutnya.
- Don’t mengorbankan performa demi visual saja.
- Don’t membuat UX terasa eksperimental; sistem ini harus stabil, matang, dan siap operasional.

7. Functional Quality Requirement
- Output harus berfungsi dengan baik
- Semua fitur harus dirancang agar bisa diimplementasikan secara nyata
- Prioritaskan validasi data, keamanan, kestabilan, dan maintainability
- Gunakan pendekatan modular
- Pastikan alur user jelas dan tidak membingungkan
- Setiap role harus memiliki akses, halaman, dan tindakan yang sesuai
- Sistem harus siap dikembangkan menjadi aplikasi produksi

Additional Technical Expectations:
- Gunakan Laravel 13 sebagai backend framework
- Gunakan database XAMPP dengan MySQL/MariaDB
- Struktur kode harus rapi, scalable, dan mudah dirawat
- Gunakan autentikasi yang aman
- Terapkan role-based access control secara tegas
- Gunakan migration, seeder, controller, model, service, request validation, policy, dan route grouping secara benar
- Buat database schema yang logis dan efisien
- Gunakan pola arsitektur yang mudah diperluas
- Pertimbangkan audit log dan riwayat aktivitas sebagai bagian penting sistem

Security Requirements:
- Gunakan authentication yang aman dan sesuai kebutuhan aplikasi web akademik.
- Terapkan CSRF protection untuk seluruh form dan aksi sensitif.
- Simpan password dengan hashing yang aman seperti bcrypt atau Argon2.
- Terapkan rate limiting / login throttling untuk mencegah brute force attack.
- Terapkan role-based access control (RBAC) secara ketat untuk mahasiswa, dosen, dan admin.
- Gunakan Policy dan Gate Laravel untuk otorisasi resource yang sensitif.
- Validasi seluruh input di backend; jangan pernah mempercayai validasi frontend sebagai satu-satunya lapisan proteksi.
- Lindungi endpoint sensitif seperti nilai, keuangan, hak akses, dan data personal.
- Terapkan audit log untuk aktivitas penting seperti login, perubahan data, persetujuan, validasi, dan penghapusan.
- Pastikan setiap proses upload, download, dan export data memiliki kontrol keamanan yang jelas.

Architecture Pattern:
- Gunakan layered architecture yang rapi dan konsisten.
- Pisahkan alur kerja menjadi Controller → Service / Action → Model.
- Gunakan Repository hanya bila memang diperlukan oleh kompleksitas query atau kebutuhan pemisahan domain.
- Gunakan Form Request untuk validasi input.
- Gunakan Policy / Gate untuk authorization.
- Gunakan Resource / DTO untuk response yang terstruktur dan konsisten.
- Hindari business logic kompleks di controller.
- Pastikan setiap modul akademik memiliki batas tanggung jawab yang jelas dan tidak saling bercampur.

Database Design Constraints:
- Gunakan foreign key untuk menjaga integritas relasi data.
- Gunakan indexing pada kolom yang sering dipakai untuk pencarian, relasi, dan filtering.
- Gunakan normalisasi data untuk mengurangi redundansi.
- Gunakan soft delete hanya pada data yang memang perlu dipulihkan.
- Gunakan timestamp tracking secara konsisten.
- Gunakan tabel histori / audit untuk perubahan data penting.
- Gunakan constraint unik untuk data seperti NIM, NIP, kode mata kuliah, dan kode transaksi.
- Rancang schema agar mendukung pertumbuhan data akademik jangka panjang.

API Readiness:
- Strukturkan logic aplikasi agar tetap siap diekstrak menjadi API bila dibutuhkan di masa depan.
- Gunakan naming convention yang konsisten pada controller, service, route, dan response.
- Pisahkan data presentation dari business logic.
- Pastikan format response tetap stabil dan mudah diintegrasikan ke kanal lain jika suatu saat sistem perlu mobile app atau integrasi eksternal.

Frontend Stack & UI Implementation Requirements:
- Gunakan React.js sebagai frontend layer utama.
- Integrasikan React.js dengan Inertia.js pada Laravel 13 agar frontend terasa interaktif, reaktif, dan tetap memanfaatkan server-side routing serta controller Laravel. Laravel sendiri menyediakan starter kit resmi untuk React yang sudah menyertakan Inertia, Tailwind, dan Vite sebagai fondasi awal yang rapi.
- Gunakan pendekatan page-based architecture Inertia, di mana setiap halaman memiliki controller dan komponen JavaScript yang jelas, sehingga data yang dikirim hanya yang dibutuhkan untuk halaman tersebut.
- Prioritaskan penggunaan reusable components, state yang ringan, dan pemisahan logic yang bersih agar UI tetap responsif dan mudah dirawat.
- Gunakan optimasi performa sejak awal: lazy loading untuk komponen berat, pemecahan bundle yang baik, dan pengurangan payload data yang tidak diperlukan.
- Manfaatkan partial reloads dan pengelolaan props secara efisien agar navigasi terasa cepat dan tidak membebani browser.
- Jika SSR diperlukan untuk peningkatan initial render dan pengalaman akses awal, siapkan server-side rendering secara selektif. Inertia mendukung SSR, namun fitur ini membutuhkan Node.js di server.
- Gunakan Vite sebagai bundler utama untuk mendukung build yang cepat dan workflow frontend yang efisien di Laravel 13.

Frontend State Management:
- Gunakan state lokal untuk kebutuhan UI kecil dan interaksi sederhana.
- Gunakan props dari Inertia sebagai sumber data utama untuk halaman.
- Gunakan global state hanya jika benar-benar diperlukan.
- Hindari state management yang berlebihan dan tidak memberikan nilai nyata.
- Jangan duplikasi data yang sudah tersedia dari server ke client tanpa alasan.
- Gunakan komponen reusable agar state dan tampilan tetap konsisten.
- Pastikan form state, filter, pagination, dan modal state tetap ringan.
- Optimalkan render ulang agar UI tetap responsif dan tidak terasa berat.

Backend Performance:
- Gunakan eager loading untuk mengurangi potensi N+1 query.
- Gunakan pagination untuk seluruh data berukuran besar.
- Gunakan caching untuk data yang sering dibaca dan jarang berubah.
- Gunakan queue untuk proses berat seperti notifikasi, export laporan, pengiriman email, atau pembuatan dokumen.
- Hindari query yang tidak perlu dan pastikan setiap query punya tujuan yang jelas.
- Gunakan chunking atau batching untuk proses data besar seperti rekap, sinkronisasi, dan export massal.
- Pastikan filter, search, dan sorting di backend efisien serta dapat diskalakan.
- Jangan memuat seluruh data ke frontend jika hanya sebagian kecil yang dibutuhkan oleh layar aktif.

Performance Constraints:
- Jangan membuat UI berat akibat komponen yang terlalu besar atau render yang berulang-ulang.
- Jangan memuat data berlebihan dalam satu response jika data bisa dipisah per halaman atau per section.
- Jangan memakai animasi yang terlalu banyak, terlalu kompleks, atau tidak punya fungsi.
- Jangan membuat navigasi terasa seperti full refresh; gunakan pola Inertia agar transisi tetap halus.
- Jangan menumpuk state management yang tidak perlu; gunakan state secukupnya dan hanya di tempat yang relevan.
- Jangan mengorbankan smoothness demi visual saja; target utama adalah antarmuka yang stabil, responsif, dan bebas lag.

Frontend Quality Target:
- UI harus interaktif, reaktif, dan terasa modern.
- Navigasi harus cepat dan mulus.
- Komponen harus terasa ringan saat dipakai berulang.
- Layout harus tetap rapi saat data bertambah banyak.
- Semua halaman harus tetap nyaman digunakan tanpa patah-patah, frame drop, atau kesan berat.

Deployment, Queue, and Observability:
- Pisahkan environment local, staging, dan production.
- Gunakan .env untuk seluruh konfigurasi lingkungan.
- Gunakan logging yang rapi dan konsisten untuk debugging serta audit operasional.
- Siapkan backup dan restore database secara berkala.
- Gunakan scheduler untuk pekerjaan terjadwal jika ada proses rutin.
- Jika queue menggunakan Redis, pertimbangkan monitoring queue yang sesuai.
- Gunakan Laravel Telescope pada local environment untuk observasi request, exception, query, job, notification, cache, dan aktivitas debugging.
- Pastikan hasil build frontend dan backend siap dijalankan stabil di lingkungan produksi.
- Dokumentasikan konfigurasi deploy agar proyek dapat dipindahkan tanpa kehilangan konsistensi.

Logging Level (Advanced):
- Gunakan struktur logging yang jelas dan konsisten untuk memisahkan aktivitas sistem, audit aktivitas pengguna, error aplikasi, dan event keamanan.
- Gunakan log level secara disiplin: info, warning, error, dan critical sesuai konteks.
- Catat aktivitas penting seperti login, logout, perubahan data akademik, persetujuan KRS, validasi nilai, perubahan hak akses, dan tindakan administratif.
- Pastikan log membantu proses debugging, audit, dan investigasi masalah tanpa membanjiri sistem dengan data yang tidak relevan.
- Hindari logging berlebihan pada proses yang sangat sering berjalan agar performa tetap stabil.
- Pastikan log sensitif tidak menampilkan data pribadi secara berlebihan.

Future Scalability Note:
- Rancang sistem agar mudah diperluas tanpa perlu merombak struktur inti.
- Pastikan modul dapat dipisahkan berdasarkan domain bisnis seperti akademik, keuangan, layanan, user management, dan reporting.
- Gunakan struktur kode yang memungkinkan pengembangan fitur baru secara bertahap.
- Siapkan fondasi agar sistem dapat diintegrasikan dengan API eksternal, aplikasi mobile, atau layanan pihak ketiga di masa depan.
- Hindari desain arsitektur yang terlalu monolitik secara internal jika dapat menghambat pertumbuhan jangka panjang.
- Prioritaskan maintainability, extensibility, dan domain separation sejak awal.

Testing Requirements:
- Wajib buat feature test untuk alur utama seperti login, logout, dashboard, KRS, nilai, pembayaran, dan helpdesk.
- Wajib buat unit test untuk business logic penting.
- Wajib test authorization untuk memastikan role tidak bisa mengakses resource yang bukan haknya.
- Wajib test validasi input, error handling, dan edge case.
- Wajib test response Inertia untuk halaman-halaman utama.
- Wajib test alur partial reload bila digunakan pada halaman yang dinamis.
- Pastikan test mencakup skenario sukses, gagal, dan akses terlarang.
- Jangan merilis fitur utama tanpa minimal coverage pada jalur kritis.

UX Flow Constraints:
- Setiap fitur harus memiliki alur yang jelas: mulai → proses → hasil.
- Hindari halaman yang buntu tanpa tindakan lanjutan.
- Pastikan user selalu tahu langkah berikutnya.
- Gunakan feedback visual yang jelas untuk loading, sukses, gagal, dan status proses.
- Untuk aksi create, update, dan delete, gunakan redirect yang benar agar alur Inertia tetap natural dan mulus.
- Jangan memaksa pengguna melakukan terlalu banyak perpindahan halaman tanpa alasan yang kuat.
- Pastikan semua flow role-based tetap singkat, jelas, dan efisien.

Definition of Done:
- Semua fitur utama dapat digunakan tanpa error.
- Semua role memiliki hak akses yang tepat.
- Tidak ada broken navigation.
- Tidak ada UI yang terasa berat, lag, atau patah-patah.
- Tidak ada data penting yang lolos tanpa validasi.
- Semua alur kritis memiliki audit log dan histori yang jelas.
- Semua halaman utama responsif dan konsisten.
- Seluruh komponen penting dapat digunakan secara stabil pada kondisi nyata.
- Hasil akhir siap dikembangkan, diuji, dan di-deploy sebagai sistem produksi.

Output:
Berikan hasil dalam format yang sangat terstruktur dan profesional, minimal mencakup:

1. Analisis kebutuhan sistem
2. Arsitektur aplikasi yang disarankan
3. Pembagian modul per role
4. Daftar entitas database utama
5. Relasi antar tabel
6. Flow login dan otorisasi
7. Rekomendasi struktur folder Laravel
8. Rencana implementasi tahap demi tahap
9. Strategi UI/UX berdasarkan DESIGN.md
10. Rekomendasi komponen penting yang perlu dibuat
11. Checklist fitur yang harus selesai
12. Catatan risiko dan solusi teknis
13. Rekomendasi agar sistem benar-benar berfungsi dengan baik dan siap dipakai
14. README.md untuk Repositori GitHub

Buatlah berkas README.md yang sangat profesional, dengan tampilan yang rapi, terstruktur dengan baik, dan sesuai untuk repositori GitHub publik.

README.md harus mencakup bagian-bagian berikut:
- Judul Proyek
- Deskripsi Proyek
- Petunjuk Instalasi
- Menjalankan Aplikasi
- Struktur Proyek
- Demonstrasi

Persyaratan untuk README.md:
- Gunakan kata-kata yang jelas, profesional, dan ringkas.
- Buat dokumen ini menarik secara visual dan mudah dibaca di GitHub.
- Susun konten dengan judul yang rapi dan spasi yang logis.
- Pastikan nada penulisan sesuai dengan sistem akademik yang serius, berkualitas tinggi, dan siap produksi.
- Hindari penggunaan emoji dan kalimat yang santai.
- Pastikan README selaras dengan identitas SIAKAD Polmind dan arahan visual DESIGN.md.
- README harus terasa seperti dokumentasi untuk produk nyata, bukan templat umum.

## License

This project is licensed under the GNU GPL v3 License.

Jika perlu menghasilkan kode, berikan kode yang siap pakai, konsisten, dan mudah diintegrasikan ke Laravel 13. Jangan menghasilkan jawaban yang generik. Berikan solusi yang konkret, detail, dan layak untuk proyek nyata.