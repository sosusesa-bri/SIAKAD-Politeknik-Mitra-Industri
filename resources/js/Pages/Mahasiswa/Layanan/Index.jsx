import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function LayananIndex({ services }) {
    const statusConfig = { submitted: { label: 'Diajukan', clr: 'var(--color-info)' }, in_review: { label: 'Ditinjau', clr: 'var(--color-warning)' }, approved: { label: 'Disetujui', clr: 'var(--color-success)' }, rejected: { label: 'Ditolak', clr: 'var(--color-error)' }, completed: { label: 'Selesai', clr: 'var(--color-success)' } };
    return (
        <AuthenticatedLayout title="Layanan Akademik">
            <Head title="Layanan Akademik" />
            <div className="space-y-8">
                <div className="flex items-end justify-between">
                    <div><span className="label-meta">LAYANAN AKADEMIK</span><h2 className="heading-display text-2xl lg:text-3xl mt-2">Pengajuan Layanan</h2></div>
                    <a href="/mahasiswa/layanan/create" className="btn-primary text-sm">+ Ajukan Baru</a>
                </div>
                <div className="space-y-3">
                    {services?.data?.length > 0 ? services.data.map((srv) => (
                        <div key={srv.id} className="card-elevated p-5 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>{srv.title}</h3>
                                <p className="text-xs mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Kode: {srv.tracking_code} &middot; {srv.type?.replace('_', ' ')} &middot; {new Date(srv.submitted_at).toLocaleDateString('id-ID')}</p>
                                {srv.notes && <p className="text-sm mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>{srv.notes}</p>}
                            </div>
                            <span className="badge flex-shrink-0" style={{ backgroundColor: (statusConfig[srv.status]?.clr || 'var(--color-outline)') + '18', color: statusConfig[srv.status]?.clr }}>{statusConfig[srv.status]?.label || srv.status}</span>
                        </div>
                    )) : <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Belum ada pengajuan layanan.</div>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
