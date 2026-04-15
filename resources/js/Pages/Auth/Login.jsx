import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        identifier: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-surface)' }}>
                {/* Left Panel — Editorial Branding */}
                <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden gradient-primary items-center justify-center">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
                            <circle cx="200" cy="300" r="250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <circle cx="600" cy="200" r="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                            <circle cx="400" cy="500" r="300" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-lg px-16">
                        <div className="mb-8">
                            <span className="label-meta" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>
                                POLITEKNIK MITRA INDUSTRI
                            </span>
                        </div>
                        <h1 className="heading-display text-white text-5xl leading-tight mb-6">
                            Sistem Informasi<br />
                            <span style={{ color: 'var(--color-tertiary-fixed)' }}>Akademik</span>
                        </h1>
                        <p className="text-white/60 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                            Platform akademik terpadu untuk mengelola seluruh aktivitas perkuliahan, penilaian, dan administrasi kampus secara efisien.
                        </p>
                        <div className="mt-12 flex gap-8">
                            <div>
                                <div className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>3</div>
                                <div className="text-white/40 text-sm mt-1">Program Studi</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>D4</div>
                                <div className="text-white/40 text-sm mt-1">Jenjang</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>2025</div>
                                <div className="text-white/40 text-sm mt-1">Tahun Aktif</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel — Login Form */}
                <div className="w-full lg:w-[45%] flex items-center justify-center px-8 lg:px-16">
                    <div className="w-full max-w-md">
                        {/* Mobile branding */}
                        <div className="lg:hidden mb-10 text-center">
                            <span className="label-meta" style={{ color: 'var(--color-on-surface-variant)' }}>
                                POLITEKNIK MITRA INDUSTRI
                            </span>
                            <h1 className="heading-display text-2xl mt-3 gradient-primary-text">
                                SIAKAD Polmind
                            </h1>
                        </div>

                        <div className="mb-10">
                            <h2
                                className="heading-editorial text-3xl mb-3"
                                style={{ color: 'var(--color-on-surface)' }}
                            >
                                Masuk ke Akun
                            </h2>
                            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem' }}>
                                Gunakan NIM atau NIP untuk mengakses sistem akademik.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Identifier Field */}
                            <div>
                                <label
                                    htmlFor="identifier"
                                    className="label-meta block mb-2"
                                >
                                    NIM / NIP
                                </label>
                                <input
                                    id="identifier"
                                    type="text"
                                    value={data.identifier}
                                    onChange={(e) => setData('identifier', e.target.value)}
                                    className="input-ghost w-full px-4 py-3 text-base"
                                    style={{
                                        color: 'var(--color-on-surface)',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                    placeholder="Masukkan NIM atau NIP"
                                    autoComplete="username"
                                    autoFocus
                                />
                                {errors.identifier && (
                                    <p className="mt-2 text-sm" style={{ color: 'var(--color-error)' }}>
                                        {errors.identifier}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="label-meta block mb-2"
                                >
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="input-ghost w-full px-4 py-3 pr-12 text-base"
                                        style={{
                                            color: 'var(--color-on-surface)',
                                            fontFamily: 'var(--font-body)',
                                        }}
                                        placeholder="Masukkan password"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                                        style={{ color: 'var(--color-on-surface-variant)' }}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm" style={{ color: 'var(--color-error)' }}>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember & Submit */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded"
                                        style={{ accentColor: 'var(--color-primary)' }}
                                    />
                                    <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                                        Ingat saya
                                    </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary w-full py-3.5 text-base"
                                style={{ opacity: processing ? 0.7 : 1 }}
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Memproses...
                                    </span>
                                ) : 'Masuk'}
                            </button>
                        </form>

                        {/* Demo credentials */}
                        <div
                            className="mt-10 p-5 rounded-xl"
                            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
                        >
                            <p className="label-meta mb-3">AKUN DEMO</p>
                            <div className="space-y-2 text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                                <div className="flex justify-between">
                                    <span>Mahasiswa</span>
                                    <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--color-secondary-container)' }}>2024101001</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Dosen</span>
                                    <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--color-secondary-container)' }}>198501012010011001</code>
                                </div>
                                <div className="flex justify-between">
                                    <span>Admin</span>
                                    <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--color-secondary-container)' }}>admin</code>
                                </div>
                                <p className="mt-2 pt-2 text-xs" style={{ borderTop: '1px solid rgba(198,197,212,0.2)' }}>
                                    Password: <code className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-secondary-container)' }}>password</code>
                                </p>
                            </div>
                        </div>

                        <p className="text-center mt-8 text-xs" style={{ color: 'var(--color-outline)' }}>
                            SIAKAD Polmind &copy; {new Date().getFullYear()} Politeknik Mitra Industri
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
