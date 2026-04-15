import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function StatCard({ label, value, sublabel, color, accent }) {
    return (
        <div
            className="card-elevated p-6 relative overflow-hidden"
        >
            {accent && (
                <div
                    className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-10"
                    style={{ backgroundColor: accent }}
                />
            )}
            <span className="label-meta">{label}</span>
            <div className="heading-display text-3xl mt-2" style={{ color: color || 'var(--color-on-surface)' }}>
                {value}
            </div>
            {sublabel && (
                <span className="text-sm mt-1 block" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {sublabel}
                </span>
            )}
        </div>
    );
}

export default function AdminDashboard({ activeSemester, stats }) {
    return (
        <AuthenticatedLayout title="Dashboard Admin">
            <Head title="Dashboard Admin" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div style={{ maxWidth: '600px' }}>
                        <span className="label-meta">PUSAT KONTROL</span>
                        <h2 className="heading-display text-3xl lg:text-4xl mt-2">
                            Ringkasan Sistem
                        </h2>
                        <p className="text-base mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                            Periode: {stats.activeSemester}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
                    <StatCard
                        label="MAHASISWA AKTIF"
                        value={stats.totalMahasiswa}
                        color="var(--color-primary)"
                        accent="var(--color-primary)"
                    />
                    <StatCard
                        label="DOSEN AKTIF"
                        value={stats.totalDosen}
                        accent="var(--color-tertiary)"
                    />
                    <StatCard
                        label="SEMESTER"
                        value={stats.activeSemester}
                        sublabel="Periode aktif"
                    />
                    <StatCard
                        label="TIKET TERBUKA"
                        value={stats.openTickets}
                        color={stats.openTickets > 0 ? 'var(--color-warning)' : 'var(--color-success)'}
                    />
                    <StatCard
                        label="TAGIHAN BELUM LUNAS"
                        value={stats.unpaidBillings}
                        color={stats.unpaidBillings > 0 ? 'var(--color-error)' : 'var(--color-success)'}
                    />
                </div>

                {/* Admin Quick Actions */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Master Data */}
                    <div className="space-y-4">
                        <h3 className="heading-editorial text-lg">Master Data</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Kelola Mahasiswa', href: '/admin/master-data/mahasiswa' },
                                { label: 'Kelola Dosen', href: '/admin/master-data/dosen' },
                                { label: 'Kelola Mata Kuliah', href: '/admin/master-data/matakuliah' },
                                { label: 'Kelola Kelas', href: '/admin/master-data/kelas' },
                                { label: 'Kelola Program Studi', href: '/admin/master-data/prodi' },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg transition-tonal"
                                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-lowest)'}
                                >
                                    <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>
                                        {item.label}
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface-variant)" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Operasional Akademik */}
                    <div className="space-y-4">
                        <h3 className="heading-editorial text-lg">Operasional</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Registrasi & KRS', href: '/admin/akademik/registrasi' },
                                { label: 'Jadwal Kuliah & Ujian', href: '/admin/akademik/jadwal' },
                                { label: 'Kelola Nilai & KHS', href: '/admin/akademik/nilai' },
                                { label: 'Kelola Presensi', href: '/admin/akademik/presensi' },
                                { label: 'Wisuda & Yudisium', href: '/admin/akademik/wisuda' },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg transition-tonal"
                                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-lowest)'}
                                >
                                    <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>
                                        {item.label}
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface-variant)" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Keuangan & Keamanan */}
                    <div className="space-y-4">
                        <h3 className="heading-editorial text-lg">Keuangan & Sistem</h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Kelola Tagihan', href: '/admin/keuangan/tagihan' },
                                { label: 'Validasi Pembayaran', href: '/admin/keuangan/pembayaran' },
                                { label: 'User & Hak Akses', href: '/admin/keamanan/users' },
                                { label: 'Audit Log', href: '/admin/keamanan/audit-log' },
                                { label: 'Laporan Akademik', href: '/admin/laporan' },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center justify-between px-4 py-3 rounded-lg transition-tonal"
                                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-lowest)'}
                                >
                                    <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>
                                        {item.label}
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface-variant)" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
