import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function StatusAkademik({ mahasiswa }) {
    const statusColors = { aktif: 'var(--color-success)', cuti: 'var(--color-warning)', lulus: 'var(--color-info)', drop_out: 'var(--color-error)', non_aktif: 'var(--color-outline)' };
    return (
        <AuthenticatedLayout title="Status Akademik">
            <Head title="Status Akademik" />
            <div className="space-y-8">
                <div>
                    <span className="label-meta">STATUS AKADEMIK</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">{mahasiswa?.name}</h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="card-elevated p-6 space-y-4">
                        <h3 className="heading-editorial text-base">Informasi Mahasiswa</h3>
                        {[
                            ['NIM', mahasiswa?.nim],
                            ['Program Studi', mahasiswa?.programStudy?.name],
                            ['Kurikulum', mahasiswa?.curriculum?.name],
                            ['Angkatan', mahasiswa?.class_year],
                            ['Semester Aktif', mahasiswa?.semester_active],
                            ['Dosen Wali', mahasiswa?.dosenWali?.name || '-'],
                            ['Jenis Kelamin', mahasiswa?.gender === 'L' ? 'Laki-laki' : 'Perempuan'],
                            ['Tanggal Masuk', mahasiswa?.entry_date ? new Date(mahasiswa.entry_date).toLocaleDateString('id-ID') : '-'],
                        ].map(([label, value]) => (
                            <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(198,197,212,0.1)' }}>
                                <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{label}</span>
                                <span className="text-sm font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-5">
                        <div className="card-elevated p-6">
                            <span className="label-meta">STATUS</span>
                            <div className="mt-3 flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[mahasiswa?.academic_status] }} />
                                <span className="heading-editorial text-xl capitalize">{mahasiswa?.academic_status?.replace('_', ' ')}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="card-elevated p-5 text-center">
                                <span className="label-meta">IPK</span>
                                <div className="heading-display text-2xl mt-1" style={{ color: 'var(--color-primary)' }}>{Number(mahasiswa?.ipk || 0).toFixed(2)}</div>
                            </div>
                            <div className="card-elevated p-5 text-center">
                                <span className="label-meta">SKS LULUS</span>
                                <div className="heading-display text-2xl mt-1">{mahasiswa?.total_sks_passed || 0}</div>
                            </div>
                            <div className="card-elevated p-5 text-center">
                                <span className="label-meta">MAKS SKS</span>
                                <div className="heading-display text-2xl mt-1">{mahasiswa?.max_sks || 24}</div>
                            </div>
                            <div className="card-elevated p-5 text-center">
                                <span className="label-meta">SEMESTER</span>
                                <div className="heading-display text-2xl mt-1">{mahasiswa?.semester_active}</div>
                            </div>
                        </div>
                        {/* Registrations History */}
                        {mahasiswa?.registrations?.length > 0 && (
                            <div className="card-elevated p-6">
                                <h3 className="heading-editorial text-base mb-3">Riwayat Registrasi</h3>
                                {mahasiswa.registrations.map((r) => (
                                    <div key={r.id} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(198,197,212,0.1)' }}>
                                        <span className="text-sm">{r.semester?.name}</span>
                                        <span className="badge" style={{ backgroundColor: r.status === 'active' ? 'var(--color-success-container)' : 'var(--color-secondary-container)', color: r.status === 'active' ? 'var(--color-success)' : 'var(--color-on-secondary-container)' }}>{r.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
