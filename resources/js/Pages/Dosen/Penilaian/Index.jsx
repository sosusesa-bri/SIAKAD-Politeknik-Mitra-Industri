import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PenilaianIndex({ kelasList, activeSemester }) {
    return (
        <AuthenticatedLayout title="Input Nilai">
            <Head title="Penilaian" />

            <div className="space-y-8">
                <div>
                    <span className="label-meta">PENILAIAN</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">
                        Daftar Kelas — {activeSemester?.name || '-'}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                        Pilih kelas untuk input atau verifikasi nilai mahasiswa.
                    </p>
                </div>

                {kelasList && kelasList.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {kelasList.map((kelas) => (
                            <Link
                                key={kelas.id}
                                href={`/dosen/penilaian/${kelas.id}`}
                                className="card-elevated p-6 block group"
                                style={{ transition: 'transform 0.15s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>
                                            {kelas.course?.name}
                                        </h3>
                                        <p className="text-xs mt-1 font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {kelas.course?.code}
                                        </p>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface-variant)" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="chip text-xs">{kelas.name}</span>
                                    <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                        {kelas.course?.sks_teori + kelas.course?.sks_praktik} SKS
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                        <p>Belum ada kelas yang terdaftar untuk semester ini.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
