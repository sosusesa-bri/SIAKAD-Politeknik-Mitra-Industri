import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Presensi({ attendances, activeSemester }) {
    return (
        <AuthenticatedLayout title="Presensi Kuliah">
            <Head title="Presensi" />

            <div className="space-y-8">
                <div>
                    <span className="label-meta">REKAP KEHADIRAN</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">
                        Presensi {activeSemester?.name || ''}
                    </h2>
                </div>

                {attendances && attendances.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {attendances.map((item, idx) => (
                            <div key={idx} className="card-elevated p-5 space-y-4">
                                <div>
                                    <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>
                                        {item.course?.name}
                                    </h3>
                                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>
                                        {item.course?.code} &middot; {item.total} pertemuan
                                    </p>
                                </div>

                                {/* Attendance Progress */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span style={{ color: 'var(--color-on-surface-variant)' }}>Kehadiran</span>
                                        <span className="font-semibold" style={{
                                            color: item.percentage >= 75 ? 'var(--color-success)' : 'var(--color-error)'
                                        }}>
                                            {item.percentage}%
                                        </span>
                                    </div>
                                    <div className="progress-track">
                                        <div
                                            className="progress-indicator"
                                            style={{
                                                width: `${item.percentage}%`,
                                                backgroundColor: item.percentage >= 75 ? 'var(--color-success)' : 'var(--color-error)',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { label: 'Hadir', val: item.hadir, color: 'var(--color-success)' },
                                        { label: 'Izin', val: item.izin, color: 'var(--color-info)' },
                                        { label: 'Sakit', val: item.sakit, color: 'var(--color-warning)' },
                                        { label: 'Alpha', val: item.alpha, color: 'var(--color-error)' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="text-center p-2 rounded-lg" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
                                            <div className="text-lg font-bold" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
                                                {stat.val}
                                            </div>
                                            <div className="text-[10px] uppercase mt-0.5" style={{ color: 'var(--color-on-surface-variant)', letterSpacing: '0.05em' }}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                        <p>Belum ada data presensi untuk semester ini.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
