<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengajaranController extends Controller
{
    /**
     * Jadwal mengajar.
     */
    public function jadwal(Request $request)
    {
        $dosen = $request->user()->dosen;
        $activeSemester = Semester::active();

        $kelasList = $dosen->kelas()
            ->where('semester_id', $activeSemester?->id)
            ->with(['course', 'schedules.classroom'])
            ->get();

        return Inertia::render('Dosen/Pengajaran/Jadwal', [
            'kelasList' => $kelasList,
            'activeSemester' => $activeSemester,
        ]);
    }

    /**
     * Daftar mahasiswa per kelas.
     */
    public function daftarMahasiswa(Request $request, \App\Models\Kelas $kela)
    {
        $dosen = $request->user()->dosen;
        if ($kela->dosen_id !== $dosen->id) {
            abort(403);
        }

        $kela->load(['course', 'semester']);

        $students = $kela->krsDetails()
            ->where('status', 'active')
            ->with('krs.mahasiswa.programStudy')
            ->get()
            ->map(fn ($d) => $d->krs->mahasiswa)
            ->sortBy('nim')
            ->values();

        return Inertia::render('Dosen/Pengajaran/DaftarMahasiswa', [
            'kelas' => $kela,
            'students' => $students,
        ]);
    }
}
