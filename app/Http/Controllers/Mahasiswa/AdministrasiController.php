<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdministrasiController extends Controller
{
    /**
     * Pembayaran — Tagihan & Riwayat.
     */
    public function pembayaran(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;

        $billings = $mahasiswa->billings()
            ->with(['semester', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get();

        $totalTagihan = $billings->whereIn('status', ['unpaid', 'overdue'])->sum('amount');
        $totalTerbayar = $billings->where('status', 'paid')->sum('amount');

        return Inertia::render('Mahasiswa/Administrasi/Pembayaran', [
            'billings' => $billings,
            'totalTagihan' => $totalTagihan,
            'totalTerbayar' => $totalTerbayar,
        ]);
    }
}
