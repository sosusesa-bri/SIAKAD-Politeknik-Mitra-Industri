import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TefaIndex({ projects }) {
    const statusClr = { draft: 'var(--color-outline)', active: 'var(--color-success)', completed: 'var(--color-info)', cancelled: 'var(--color-error)' };
    return (
        <AuthenticatedLayout title="Teaching Factory">
            <Head title="TeFa" />
            <div className="space-y-8">
                <div><span className="label-meta">TEACHING FACTORY</span><h2 className="heading-display text-2xl lg:text-3xl mt-2">Proyek Saya</h2></div>
                {projects?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-5">{projects.map(p => (
                        <div key={p.id} className="card-elevated p-5 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-sm">{p.title}</h3>
                                <span className="badge" style={{ backgroundColor: (statusClr[p.status] || 'var(--color-outline)') + '18', color: statusClr[p.status] }}>{p.status}</span>
                            </div>
                            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{p.description?.substring(0, 120)}...</p>
                            <div className="flex gap-4 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                <span>{p.members?.length || 0} anggota</span>
                                <span>{p.logbooks?.length || 0} logbook</span>
                                <span>{p.reports?.length || 0} laporan</span>
                            </div>
                            {p.progress !== undefined && (
                                <div><div className="flex justify-between text-xs mb-1"><span>Progres</span><span className="font-semibold">{p.progress}%</span></div>
                                    <div className="progress-track"><div className="progress-indicator" style={{ width: `${p.progress}%` }} /></div></div>
                            )}
                        </div>
                    ))}</div>
                ) : <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Belum ada proyek TeFa.</div>}
            </div>
        </AuthenticatedLayout>
    );
}
