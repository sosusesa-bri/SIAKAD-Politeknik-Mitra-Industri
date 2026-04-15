<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Krs;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BimbinganController extends Controller
{
    public function index(Request $request)
    {
        $dosen = $request->user()->dosen;
        $students = $dosen->mahasiswaBimbingan()
            ->with('programStudy')
            ->orderBy('nim')
            ->get();

        return Inertia::render('Dosen/Bimbingan/Index', ['students' => $students]);
    }

    public function krsApproval(Request $request)
    {
        $dosen = $request->user()->dosen;
        $activeSemester = Semester::active();

        $pendingKrs = Krs::where('status', 'submitted')
            ->whereHas('mahasiswa', fn ($q) => $q->where('dosen_wali_id', $dosen->id))
            ->with(['mahasiswa.programStudy', 'semester', 'details.course'])
            ->get();

        $approvedKrs = Krs::where('status', 'approved')
            ->where('approved_by', $dosen->id)
            ->where('semester_id', $activeSemester?->id)
            ->with(['mahasiswa', 'semester'])
            ->get();

        return Inertia::render('Dosen/Bimbingan/KrsApproval', [
            'pendingKrs' => $pendingKrs,
            'approvedKrs' => $approvedKrs,
            'activeSemester' => $activeSemester,
        ]);
    }

    public function approveKrs(Request $request, Krs $kr)
    {
        $dosen = $request->user()->dosen;
        if ($kr->mahasiswa->dosen_wali_id !== $dosen->id) {
            abort(403);
        }

        $kr->update([
            'status' => 'approved',
            'approved_by' => $dosen->id,
            'approved_at' => now(),
        ]);

        return redirect()->back()->with('success', 'KRS mahasiswa ' . $kr->mahasiswa->name . ' telah disetujui.');
    }

    public function rejectKrs(Request $request, Krs $kr)
    {
        $dosen = $request->user()->dosen;
        if ($kr->mahasiswa->dosen_wali_id !== $dosen->id) {
            abort(403);
        }

        $request->validate(['notes' => ['required', 'string']]);

        $kr->update([
            'status' => 'revision',
            'notes' => $request->notes,
        ]);

        return redirect()->back()->with('success', 'KRS dikembalikan untuk revisi.');
    }
}
