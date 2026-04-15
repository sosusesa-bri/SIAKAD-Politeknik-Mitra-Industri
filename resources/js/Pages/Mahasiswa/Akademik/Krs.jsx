import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Krs({ mahasiswa, krs, activeSemester, krsOpen, maxSks }) {
    const details = krs?.details?.filter(d => d.status === 'active') || [];
    const totalSks = details.reduce((sum, d) => sum + (d.sks || 0), 0);

    const statusColors = {
        draft: { bg: 'var(--color-secondary-container)', text: 'var(--color-on-secondary-container)' },
        submitted: { bg: 'var(--color-info-container)', text: 'var(--color-info)' },
        approved: { bg: 'var(--color-success-container)', text: 'var(--color-success)' },
        revision: { bg: 'var(--color-warning-container)', text: 'var(--color-warning)' },
        locked: { bg: 'var(--color-error-container)', text: 'var(--color-error)' },
    };

    return (
        <AuthenticatedLayout title="Kartu Rencana Studi">
            <Head title="KRS" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <span className="label-meta">KARTU RENCANA STUDI</span>
                        <h2 className="heading-display text-2xl lg:text-3xl mt-2">
                            {activeSemester?.name || 'Semester Tidak Aktif'}
                        </h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                            {mahasiswa?.name} &middot; NIM: {mahasiswa?.nim}
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {krs && (
                            <span
                                className="badge"
                                style={{
                                    backgroundColor: statusColors[krs.status]?.bg,
                                    color: statusColors[krs.status]?.text,
                                }}
                            >
                                {krs.status?.toUpperCase()}
                            </span>
                        )}
                        <div className="card-elevated px-4 py-2 text-center">
                            <span className="label-meta">TOTAL SKS</span>
                            <div className="heading-display text-xl mt-0.5">
                                <span style={{ color: totalSks > maxSks ? 'var(--color-error)' : 'var(--color-primary)' }}>
                                    {totalSks}
                                </span>
                                <span className="text-base font-normal" style={{ color: 'var(--color-on-surface-variant)' }}>
                                    /{maxSks}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KRS Period Notice */}
                {!krsOpen && (
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-warning-container)', color: 'var(--color-warning)' }}>
                        <p className="text-sm font-medium">
                            Periode pengisian KRS belum buka.
                            {activeSemester?.krs_start && (
                                <> Jadwal: {new Date(activeSemester.krs_start).toLocaleDateString('id-ID')} - {new Date(activeSemester.krs_end).toLocaleDateString('id-ID')}</>
                            )}
                        </p>
                    </div>
                )}

                {/* SKS Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span style={{ color: 'var(--color-on-surface-variant)' }}>Beban SKS</span>
                        <span className="font-medium">{totalSks} / {maxSks} SKS</span>
                    </div>
                    <div className="progress-track">
                        <div
                            className="progress-indicator"
                            style={{ width: `${Math.min((totalSks / maxSks) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Course List */}
                <div className="card-elevated overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                                    <th className="text-left px-5 py-3 label-meta">NO</th>
                                    <th className="text-left px-5 py-3 label-meta">KODE</th>
                                    <th className="text-left px-5 py-3 label-meta">MATA KULIAH</th>
                                    <th className="text-center px-5 py-3 label-meta">SKS</th>
                                    <th className="text-left px-5 py-3 label-meta">KELAS</th>
                                    <th className="text-left px-5 py-3 label-meta">DOSEN</th>
                                    <th className="text-left px-5 py-3 label-meta">JADWAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.length > 0 ? details.map((d, i) => (
                                    <tr
                                        key={d.id}
                                        style={{
                                            backgroundColor: i % 2 === 0
                                                ? 'var(--color-surface-container-lowest)'
                                                : 'var(--color-surface-container-low)',
                                        }}
                                    >
                                        <td className="px-5 py-3" style={{ color: 'var(--color-on-surface-variant)' }}>{i + 1}</td>
                                        <td className="px-5 py-3 font-mono text-xs">{d.course?.code}</td>
                                        <td className="px-5 py-3 font-medium">{d.course?.name}</td>
                                        <td className="px-5 py-3 text-center">{d.sks}</td>
                                        <td className="px-5 py-3">{d.kelas?.name}</td>
                                        <td className="px-5 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {d.kelas?.dosen?.name || '-'}
                                        </td>
                                        <td className="px-5 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {d.kelas?.schedules?.map(s => (
                                                <div key={s.id}>{s.day}, {s.start_time?.substring(0,5)}-{s.end_time?.substring(0,5)}</div>
                                            ))}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="px-5 py-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {krs ? 'Belum ada mata kuliah yang dipilih.' : 'KRS belum dibuat untuk semester ini.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
