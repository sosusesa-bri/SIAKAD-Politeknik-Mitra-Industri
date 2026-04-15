<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\AcademicService;
use App\Models\AcademicServiceDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LayananController extends Controller
{
    public function index(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;
        $services = AcademicService::where('mahasiswa_id', $mahasiswa->id)
            ->with('documents')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Mahasiswa/Layanan/Index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Mahasiswa/Layanan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => ['required', 'string', 'in:surat_keterangan,beasiswa,cuti_akademik,lainnya'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'documents.*' => ['nullable', 'file', 'max:5120'],
        ]);

        $mahasiswa = $request->user()->mahasiswa;

        $service = AcademicService::create([
            'mahasiswa_id' => $mahasiswa->id,
            'type' => $request->type,
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'submitted',
            'tracking_code' => 'SRV-' . strtoupper(Str::random(8)),
            'submitted_at' => now(),
        ]);

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $path = $file->store('academic-services/' . $service->id, 'public');
                AcademicServiceDocument::create([
                    'academic_service_id' => $service->id,
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                    'file_size' => $file->getSize(),
                    'uploaded_at' => now(),
                ]);
            }
        }

        return redirect()->route('mahasiswa.layanan.index')
            ->with('success', 'Pengajuan layanan berhasil dikirim. Kode tracking: ' . $service->tracking_code);
    }
}
