<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\MahasiswaController as AdminMahasiswaController;
use App\Http\Controllers\Admin\OperasionalController;
use App\Http\Controllers\Dosen\DashboardController as DosenDashboardController;
use App\Http\Controllers\Dosen\PenilaianController;
use App\Http\Controllers\Dosen\PengajaranController;
use App\Http\Controllers\Dosen\BimbinganController;
use App\Http\Controllers\Dosen\EvaluasiDosenController;
use App\Http\Controllers\Mahasiswa\DashboardController as MahasiswaDashboardController;
use App\Http\Controllers\Mahasiswa\AkademikController;
use App\Http\Controllers\Mahasiswa\PerkuliahanController;
use App\Http\Controllers\Mahasiswa\AdministrasiController;
use App\Http\Controllers\Mahasiswa\LayananController;
use App\Http\Controllers\Mahasiswa\EvaluasiController;
use App\Http\Controllers\Mahasiswa\TefaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/', fn () => redirect()->route('login'));
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/dashboard', function () {
        return redirect()->route(auth()->user()->role->dashboardRoute());
    })->name('dashboard');

    /*
    |----------------------------------------------------------------------
    | Mahasiswa Routes
    |----------------------------------------------------------------------
    */
    Route::prefix('mahasiswa')->middleware('role:mahasiswa')->name('mahasiswa.')->group(function () {
        Route::get('/dashboard', [MahasiswaDashboardController::class, 'index'])->name('dashboard');

        // Akademik
        Route::prefix('akademik')->name('akademik.')->group(function () {
            Route::get('/krs', [AkademikController::class, 'krs'])->name('krs');
            Route::get('/khs', [AkademikController::class, 'khs'])->name('khs');
            Route::get('/transkrip', [AkademikController::class, 'transkrip'])->name('transkrip');
            Route::get('/jadwal', [AkademikController::class, 'jadwalKuliah'])->name('jadwal');
            Route::get('/jadwal-ujian', [AkademikController::class, 'jadwalUjian'])->name('jadwal-ujian');
            Route::get('/status', [AkademikController::class, 'statusAkademik'])->name('status');
            Route::get('/kalender', [AkademikController::class, 'kalenderAkademik'])->name('kalender');
        });

        // Perkuliahan
        Route::prefix('perkuliahan')->name('perkuliahan.')->group(function () {
            Route::get('/presensi', [PerkuliahanController::class, 'presensi'])->name('presensi');
        });

        // Administrasi
        Route::prefix('administrasi')->name('administrasi.')->group(function () {
            Route::get('/pembayaran', [AdministrasiController::class, 'pembayaran'])->name('pembayaran');
        });

        // Layanan Akademik
        Route::prefix('layanan')->name('layanan.')->group(function () {
            Route::get('/', [LayananController::class, 'index'])->name('index');
            Route::get('/create', [LayananController::class, 'create'])->name('create');
            Route::post('/', [LayananController::class, 'store'])->name('store');
        });

        // Evaluasi (EDOM) — Anonymous
        Route::prefix('evaluasi')->name('evaluasi.')->group(function () {
            Route::get('/', [EvaluasiController::class, 'index'])->name('index');
            Route::get('/{evaluation}', [EvaluasiController::class, 'show'])->name('show');
            Route::post('/{evaluation}', [EvaluasiController::class, 'store'])->name('store');
        });

        // TeFa
        Route::get('/tefa', [TefaController::class, 'index'])->name('tefa.index');
    });

    /*
    |----------------------------------------------------------------------
    | Dosen Routes
    |----------------------------------------------------------------------
    */
    Route::prefix('dosen')->middleware('role:dosen')->name('dosen.')->group(function () {
        Route::get('/dashboard', [DosenDashboardController::class, 'index'])->name('dashboard');

        // Penilaian
        Route::prefix('penilaian')->name('penilaian.')->group(function () {
            Route::get('/', [PenilaianController::class, 'index'])->name('index');
            Route::get('/{kela}', [PenilaianController::class, 'show'])->name('show');
            Route::post('/{kela}', [PenilaianController::class, 'store'])->name('store');
            Route::post('/{kela}/verify', [PenilaianController::class, 'verify'])->name('verify');
        });

        // Pengajaran
        Route::prefix('pengajaran')->name('pengajaran.')->group(function () {
            Route::get('/jadwal', [PengajaranController::class, 'jadwal'])->name('jadwal');
            Route::get('/kelas/{kela}/mahasiswa', [PengajaranController::class, 'daftarMahasiswa'])->name('daftar-mahasiswa');
        });

        // Bimbingan
        Route::prefix('bimbingan')->name('bimbingan.')->group(function () {
            Route::get('/', [BimbinganController::class, 'index'])->name('index');
            Route::get('/krs', [BimbinganController::class, 'krsApproval'])->name('krs');
            Route::post('/krs/{kr}/approve', [BimbinganController::class, 'approveKrs'])->name('krs.approve');
            Route::post('/krs/{kr}/reject', [BimbinganController::class, 'rejectKrs'])->name('krs.reject');
        });

        // Evaluasi
        Route::get('/evaluasi', [EvaluasiDosenController::class, 'index'])->name('evaluasi.index');
    });

    /*
    |----------------------------------------------------------------------
    | Admin Routes
    |----------------------------------------------------------------------
    */
    Route::prefix('admin')->middleware('role:admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Master Data
        Route::prefix('master-data')->name('master-data.')->group(function () {
            Route::get('/mahasiswa', [AdminMahasiswaController::class, 'index'])->name('mahasiswa.index');
            Route::get('/mahasiswa/create', [AdminMahasiswaController::class, 'create'])->name('mahasiswa.create');
            Route::post('/mahasiswa', [AdminMahasiswaController::class, 'store'])->name('mahasiswa.store');
            Route::get('/mahasiswa/{mahasiswa}/edit', [AdminMahasiswaController::class, 'edit'])->name('mahasiswa.edit');
            Route::put('/mahasiswa/{mahasiswa}', [AdminMahasiswaController::class, 'update'])->name('mahasiswa.update');
        });

        // Keuangan
        Route::get('/keuangan', [OperasionalController::class, 'keuangan'])->name('keuangan.index');

        // Layanan & Konten
        Route::prefix('layanan')->name('layanan.')->group(function () {
            Route::get('/pengumuman', [OperasionalController::class, 'pengumuman'])->name('pengumuman');
            Route::post('/pengumuman', [OperasionalController::class, 'createPengumuman'])->name('pengumuman.store');
            Route::get('/helpdesk', [OperasionalController::class, 'helpdesk'])->name('helpdesk');
        });

        // User & Keamanan
        Route::prefix('keamanan')->name('keamanan.')->group(function () {
            Route::get('/users', [OperasionalController::class, 'users'])->name('users');
            Route::post('/users/{user}/reset-password', [OperasionalController::class, 'resetPassword'])->name('reset-password');
            Route::get('/audit-log', [OperasionalController::class, 'auditLog'])->name('audit-log');
        });
    });
});
