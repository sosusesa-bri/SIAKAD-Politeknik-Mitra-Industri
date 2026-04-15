import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function StatCard({ label, value, color }) {
    return (
        <div className="card-elevated p-6">
            <span className="label-meta">{label}</span>
            <div className="heading-display text-3xl mt-2" style={{ color: color || 'var(--color-on-surface)' }}>
                {value}
            </div>
        </div>
    );
}

export default function DosenDashboard({ dosen, activeSemester, teachingClasses, stats }) {
    return (
        <AuthenticatedLayout title="Dashboard Dosen">
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome */}
                <div style={{ maxWidth: '640px' }}>
                    <span className="label-meta">SELAMAT DATANG</span>
                    <h2 className="heading-display text-3xl lg:text-4xl mt-2">
                        {dosen?.name || 'Dosen'}
                    </h2>
                    <p className="text-base mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                        {dosen?.department?.name || '-'} &middot; {dosen?.position || '-'}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    <StatCard label="KELAS SEMESTER INI" value={stats.totalClasses} color="var(--color-primary)" />
                    <StatCard label="MAHASISWA BIMBINGAN" value={stats.guidanceStudents} />
                    <StatCard label="KRS MENUNGGU PERSETUJUAN" value={stats.pendingKrs} color={stats.pendingKrs > 0 ? 'var(--color-warning)' : 'var(--color-success)'} />
                </div>

                {/* Teaching Classes */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="heading-editorial text-lg">Jadwal Mengajar Semester Ini</h3>
                        <span className="chip">{activeSemester?.name || '-'}</span>
                    </div>

                    {teachingClasses && teachingClasses.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {teachingClasses.map((kelas) => (
                                <div key={kelas.id} className="card-elevated p-5 space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>
                                            {kelas.course?.name}
                                        </h4>
                                        <p className="text-xs mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {kelas.course?.code} &middot; {kelas.name}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {kelas.course?.sks_teori + kelas.course?.sks_praktik} SKS
                                        </span>
                                        <span className="chip text-xs">
                                            {kelas.current_enrolled}/{kelas.capacity} mhs
                                        </span>
                                    </div>
                                    {kelas.schedules && kelas.schedules.length > 0 && (
                                        <div
                                            className="pt-3"
                                            style={{ borderTop: '1px solid rgba(198,197,212,0.15)' }}
                                        >
                                            {kelas.schedules.map((s) => (
                                                <p key={s.id} className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                                    {s.day}, {s.start_time?.substring(0,5)} - {s.end_time?.substring(0,5)}
                                                    {s.classroom && ` · ${s.classroom.name}`}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                            <p>Belum ada kelas yang terdaftar untuk semester ini.</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <h3 className="heading-editorial text-lg">Akses Cepat</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { title: 'Input Nilai', desc: 'UTS, UAS, dan nilai akhir', href: '/dosen/penilaian' },
                            { title: 'Kelola Presensi', desc: 'Absensi mahasiswa', href: '/dosen/pengajaran/presensi' },
                            { title: 'Persetujuan KRS', desc: 'Verifikasi KRS mahasiswa', href: '/dosen/bimbingan/krs' },
                            { title: 'Materi Kuliah', desc: 'Upload dan kelola materi', href: '/dosen/pengajaran/materi' },
                        ].map((action) => (
                            <a
                                key={action.href}
                                href={action.href}
                                className="card-elevated p-5 block hover:shadow-ambient transition-all"
                            >
                                <h4 className="text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>
                                    {action.title}
                                </h4>
                                <p className="text-xs mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                                    {action.desc}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
