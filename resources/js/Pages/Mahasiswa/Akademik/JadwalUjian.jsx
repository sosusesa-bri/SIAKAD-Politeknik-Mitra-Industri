import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function JadwalUjian({ examSchedules, activeSemester }) {
    const typeLabels = { uts: 'UTS', uas: 'UAS', quiz: 'Quiz', remedial: 'Remedial' };
    const typeColors = { uts: 'var(--color-warning)', uas: 'var(--color-error)', quiz: 'var(--color-info)', remedial: 'var(--color-tertiary)' };
    return (
        <AuthenticatedLayout title="Jadwal Ujian">
            <Head title="Jadwal Ujian" />
            <div className="space-y-8">
                <div>
                    <span className="label-meta">JADWAL UJIAN</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">{activeSemester?.name || '-'}</h2>
                </div>
                {examSchedules && examSchedules.length > 0 ? (
                    <div className="card-elevated overflow-hidden">
                        <table className="w-full text-sm">
                            <thead><tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                                <th className="text-left px-5 py-3 label-meta">TANGGAL</th>
                                <th className="text-left px-5 py-3 label-meta">MATA KULIAH</th>
                                <th className="text-center px-5 py-3 label-meta">JENIS</th>
                                <th className="text-center px-5 py-3 label-meta">WAKTU</th>
                                <th className="text-left px-5 py-3 label-meta">RUANG</th>
                            </tr></thead>
                            <tbody>{examSchedules.map((es, i) => (
                                <tr key={es.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                                    <td className="px-5 py-3">{es.date ? new Date(es.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</td>
                                    <td className="px-5 py-3 font-medium">{es.kelas?.course?.name}</td>
                                    <td className="px-5 py-3 text-center"><span className="badge" style={{ backgroundColor: typeColors[es.type] ? typeColors[es.type] + '20' : 'var(--color-secondary-container)', color: typeColors[es.type] || 'var(--color-on-secondary-container)' }}>{typeLabels[es.type] || es.type}</span></td>
                                    <td className="px-5 py-3 text-center">{es.start_time?.substring(0,5)} - {es.end_time?.substring(0,5)}</td>
                                    <td className="px-5 py-3">{es.classroom?.name || '-'}</td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                ) : (
                    <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Belum ada jadwal ujian.</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
