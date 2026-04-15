<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\Dosen;
use App\Models\Semester;
use App\Models\Billing;
use App\Models\HelpdeskTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $activeSemester = Semester::active();

        return Inertia::render('Admin/Dashboard', [
            'activeSemester' => $activeSemester,
            'stats' => [
                'totalMahasiswa' => Mahasiswa::where('academic_status', 'aktif')->count(),
                'totalDosen' => Dosen::where('is_active', true)->count(),
                'activeSemester' => $activeSemester?->name ?? '-',
                'openTickets' => HelpdeskTicket::whereIn('status', ['open', 'in_progress'])->count(),
                'unpaidBillings' => Billing::whereIn('status', ['unpaid', 'overdue'])->count(),
            ],
        ]);
    }
}
