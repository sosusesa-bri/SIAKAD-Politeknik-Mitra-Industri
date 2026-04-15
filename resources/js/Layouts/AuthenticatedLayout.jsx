import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const NAV_ITEMS = {
    mahasiswa: [
        { label: 'Dashboard', href: '/mahasiswa/dashboard', icon: 'dashboard' },
        { label: 'KRS', href: '/mahasiswa/akademik/krs', icon: 'krs' },
        { label: 'KHS & Transkrip', href: '/mahasiswa/akademik/khs', icon: 'grade' },
        { label: 'Jadwal Kuliah', href: '/mahasiswa/akademik/jadwal', icon: 'schedule' },
        { label: 'Presensi', href: '/mahasiswa/perkuliahan/presensi', icon: 'attendance' },
        { label: 'Tugas', href: '/mahasiswa/perkuliahan/tugas', icon: 'assignment' },
        { label: 'Pembayaran', href: '/mahasiswa/administrasi/pembayaran', icon: 'payment' },
        { label: 'Layanan Akademik', href: '/mahasiswa/layanan', icon: 'service' },
        { label: 'Evaluasi Dosen', href: '/mahasiswa/evaluasi/edom', icon: 'evaluation' },
        { label: 'TeFa', href: '/mahasiswa/tefa', icon: 'tefa' },
    ],
    dosen: [
        { label: 'Dashboard', href: '/dosen/dashboard', icon: 'dashboard' },
        { label: 'Input Nilai', href: '/dosen/penilaian', icon: 'grade' },
        { label: 'Jadwal Mengajar', href: '/dosen/pengajaran/jadwal', icon: 'schedule' },
        { label: 'Kelola Presensi', href: '/dosen/pengajaran/presensi', icon: 'attendance' },
        { label: 'Materi & Tugas', href: '/dosen/pengajaran/materi', icon: 'assignment' },
        { label: 'Bimbingan', href: '/dosen/bimbingan', icon: 'guidance' },
        { label: 'Persetujuan KRS', href: '/dosen/bimbingan/krs', icon: 'krs' },
        { label: 'Evaluasi', href: '/dosen/evaluasi', icon: 'evaluation' },
        { label: 'TeFa', href: '/dosen/tefa', icon: 'tefa' },
    ],
    admin: [
        { label: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
        { label: 'Data Mahasiswa', href: '/admin/master-data/mahasiswa', icon: 'students' },
        { label: 'Data Dosen', href: '/admin/master-data/dosen', icon: 'lecturers' },
        { label: 'Mata Kuliah', href: '/admin/master-data/matakuliah', icon: 'course' },
        { label: 'Jadwal', href: '/admin/akademik/jadwal', icon: 'schedule' },
        { label: 'Keuangan', href: '/admin/keuangan', icon: 'payment' },
        { label: 'Pengumuman', href: '/admin/layanan/pengumuman', icon: 'announcement' },
        { label: 'Helpdesk', href: '/admin/layanan/helpdesk', icon: 'service' },
        { label: 'User & Keamanan', href: '/admin/keamanan/users', icon: 'security' },
        { label: 'Laporan', href: '/admin/laporan', icon: 'report' },
    ],
};

const ICONS = {
    dashboard: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    krs: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
    ),
    grade: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
        </svg>
    ),
    schedule: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    attendance: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
        </svg>
    ),
    assignment: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    ),
    payment: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    ),
    service: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    evaluation: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    tefa: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>
    ),
    guidance: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    students: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    lecturers: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
    ),
    course: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
    ),
    announcement: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    ),
    security: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    report: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    ),
};

export default function AuthenticatedLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [flashVisible, setFlashVisible] = useState(true);

    const navItems = NAV_ITEMS[user.role] || [];
    const currentPath = window.location.pathname;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const roleColor = {
        mahasiswa: 'var(--color-primary)',
        dosen: 'var(--color-tertiary)',
        admin: 'var(--color-success)',
    };

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-surface)' }}>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="p-6 pb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm gradient-primary"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                SP
                            </div>
                            <div>
                                <div className="heading-editorial text-sm" style={{ color: 'var(--color-on-surface)' }}>
                                    SIAKAD
                                </div>
                                <div className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                    Polmind
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = currentPath === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-tonal"
                                    style={{
                                        backgroundColor: isActive ? 'var(--color-primary-fixed)' : 'transparent',
                                        color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                                    }}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span style={{ opacity: isActive ? 1 : 0.6 }}>
                                        {ICONS[item.icon] || ICONS.dashboard}
                                    </span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Card */}
                    <div className="p-4">
                        <div
                            className="p-3 rounded-xl"
                            style={{ backgroundColor: 'var(--color-surface-container)' }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                                    style={{
                                        background: `linear-gradient(135deg, ${roleColor[user.role]}, var(--color-primary-container))`,
                                    }}
                                >
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate" style={{ color: 'var(--color-on-surface)' }}>
                                        {user.name}
                                    </p>
                                    <p className="text-xs truncate" style={{ color: 'var(--color-on-surface-variant)' }}>
                                        {user.role_label}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full mt-3 text-xs font-medium py-2 rounded-lg transition-tonal"
                                style={{
                                    backgroundColor: 'var(--color-surface-container-low)',
                                    color: 'var(--color-on-surface-variant)',
                                }}
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar */}
                <header
                    className="glass-nav sticky top-0 z-10 px-6 lg:px-8 py-4 flex items-center justify-between"
                >
                    {/* Mobile menu toggle */}
                    <button
                        className="lg:hidden p-2 rounded-lg"
                        style={{ color: 'var(--color-on-surface-variant)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>

                    {/* Page Title */}
                    <h1
                        className="heading-editorial text-lg lg:text-xl"
                        style={{ color: 'var(--color-on-surface)' }}
                    >
                        {title || 'Dashboard'}
                    </h1>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            className="p-2 rounded-lg transition-tonal relative"
                            style={{ color: 'var(--color-on-surface-variant)' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                            <span
                                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: 'var(--color-error)' }}
                            />
                        </button>
                    </div>
                </header>

                {/* Flash Messages */}
                {flashVisible && (flash.success || flash.error || flash.warning || flash.info) && (
                    <div className="px-6 lg:px-8 pt-4">
                        {flash.success && (
                            <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: 'var(--color-success-container)', color: 'var(--color-success)' }}>
                                <span className="text-sm font-medium">{flash.success}</span>
                                <button onClick={() => setFlashVisible(false)} className="text-current opacity-60">&times;</button>
                            </div>
                        )}
                        {flash.error && (
                            <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: 'var(--color-error-container)', color: 'var(--color-error)' }}>
                                <span className="text-sm font-medium">{flash.error}</span>
                                <button onClick={() => setFlashVisible(false)} className="text-current opacity-60">&times;</button>
                            </div>
                        )}
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 px-6 lg:px-8 py-6 lg:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
