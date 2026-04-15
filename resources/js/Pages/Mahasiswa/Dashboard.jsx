import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function StatCard({ label, value, sublabel, color }) {
    return (
        <div className="card-elevated p-6">
            <span className="label-meta">{label}</span>
            <div
                className="heading-display text-3xl mt-2"
                style={{ color: color || 'var(--color-on-surface)' }}
            >
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

function QuickActionCard({ title, description, href, accent }) {
    return (
        <a
            href={href}
            className="card-elevated p-5 block group cursor-pointer"
            style={{ transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="heading-editorial text-base" style={{ color: 'var(--color-on-surface)' }}>
                        {title}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                        {description}
                    </p>
                </div>
                <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: accent || 'var(--color-primary-fixed)' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent ? 'white' : 'var(--color-primary)'} strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </a>
    );
}

export default function MahasiswaDashboard({ mahasiswa, stats, activeSemester, recentGrades, unpaidBillings }) {
    return (
        <AuthenticatedLayout title="Dashboard Mahasiswa">
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Section — Editorial Asymmetry */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                    <div style={{ maxWidth: '600px' }}>
                        <span className="label-meta">SELAMAT DATANG</span>
                        <h2 className="heading-display text-3xl lg:text-4xl mt-2">
                            {mahasiswa?.name || 'Mahasiswa'}
                        </h2>
                        <p className="text-base mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                            {mahasiswa?.programStudy?.name || '-'} &middot; Semester {stats.semesterActive}
                        </p>
                    </div>
                    <div className="chip">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: stats.academicStatus === 'aktif'
                                    ? 'var(--color-success)'
                                    : 'var(--color-warning)',
                            }}
                        />
                        Status: {stats.academicStatus?.charAt(0).toUpperCase() + stats.academicStatus?.slice(1)}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    <StatCard
                        label="IPK"
                        value={Number(stats.ipk).toFixed(2)}
                        sublabel="Indeks Prestasi Kumulatif"
                        color="var(--color-primary)"
                    />
                    <StatCard
                        label="TOTAL SKS"
                        value={stats.totalSks}
                        sublabel="SKS yang sudah lulus"
                    />
                    <StatCard
                        label="SEMESTER"
                        value={stats.semesterActive}
                        sublabel={activeSemester?.name || '-'}
                    />
                    <StatCard
                        label="TUNGGAKAN"
                        value={
                            Number(unpaidBillings) > 0
                                ? `Rp ${Number(unpaidBillings).toLocaleString('id-ID')}`
                                : 'Lunas'
                        }
                        sublabel={Number(unpaidBillings) > 0 ? 'Total tagihan belum dibayar' : 'Tidak ada tunggakan'}
                        color={Number(unpaidBillings) > 0 ? 'var(--color-error)' : 'var(--color-success)'}
                    />
                </div>

                {/* Two-Column Content */}
                <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Quick Actions — Takes 3 columns */}
                    <div className="lg:col-span-3 space-y-4">
                        <h3 className="heading-editorial text-lg">Akses Cepat</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <QuickActionCard
                                title="Kartu Rencana Studi"
                                description="Lihat dan kelola KRS semester ini"
                                href="/mahasiswa/akademik/krs"
                            />
                            <QuickActionCard
                                title="Kartu Hasil Studi"
                                description="Lihat nilai dan transkrip"
                                href="/mahasiswa/akademik/khs"
                            />
                            <QuickActionCard
                                title="Presensi Kuliah"
                                description="Cek rekap kehadiran"
                                href="/mahasiswa/perkuliahan/presensi"
                            />
                            <QuickActionCard
                                title="Pembayaran"
                                description="Cek tagihan dan riwayat bayar"
                                href="/mahasiswa/administrasi/pembayaran"
                            />
                        </div>
                    </div>

                    {/* Recent Grades — Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="heading-editorial text-lg">Nilai Terbaru</h3>
                        <div className="card-elevated divide-y-0">
                            {recentGrades && recentGrades.length > 0 ? (
                                recentGrades.map((grade, i) => (
                                    <div
                                        key={grade.id}
                                        className="px-5 py-4 flex items-center justify-between"
                                        style={{
                                            backgroundColor: i % 2 === 0
                                                ? 'var(--color-surface-container-lowest)'
                                                : 'var(--color-surface-container-low)',
                                            borderRadius: i === 0 ? 'var(--radius-lg) var(--radius-lg) 0 0' :
                                                i === recentGrades.length - 1 ? '0 0 var(--radius-lg) var(--radius-lg)' : '0',
                                        }}
                                    >
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>
                                                {grade.course?.name || '-'}
                                            </p>
                                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>
                                                {grade.course?.code}
                                            </p>
                                        </div>
                                        <span
                                            className="heading-display text-lg"
                                            style={{
                                                color: grade.grade_letter === 'A' || grade.grade_letter === 'AB'
                                                    ? 'var(--color-success)'
                                                    : grade.grade_letter === 'D' || grade.grade_letter === 'E'
                                                        ? 'var(--color-error)'
                                                        : 'var(--color-on-surface)',
                                            }}
                                        >
                                            {grade.grade_letter || '-'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                                    <p className="text-sm">Belum ada data nilai</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
