import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Transkrip({ mahasiswa, transcript, ipk, totalSks }) {
    return (
        <AuthenticatedLayout title="Transkrip Nilai">
            <Head title="Transkrip" />
            <div className="space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <span className="label-meta">TRANSKRIP NILAI SEMENTARA</span>
                        <h2 className="heading-display text-2xl lg:text-3xl mt-2">{mahasiswa?.name}</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                            NIM: {mahasiswa?.nim} &middot; {mahasiswa?.programStudy?.name} &middot; {mahasiswa?.curriculum?.name}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="card-elevated px-5 py-3 text-center">
                            <span className="label-meta">IPK</span>
                            <div className="heading-display text-2xl mt-1" style={{ color: 'var(--color-primary)' }}>{Number(ipk).toFixed(2)}</div>
                        </div>
                        <div className="card-elevated px-5 py-3 text-center">
                            <span className="label-meta">TOTAL SKS</span>
                            <div className="heading-display text-2xl mt-1">{totalSks}</div>
                        </div>
                    </div>
                </div>

                {transcript && transcript.length > 0 ? transcript.map((sem, semIdx) => (
                    <div key={semIdx} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="heading-editorial text-base">{sem.semester?.name}</h3>
                            <div className="flex gap-4 text-sm">
                                <span style={{ color: 'var(--color-on-surface-variant)' }}>IPS: <strong style={{ color: 'var(--color-primary)' }}>{Number(sem.ips).toFixed(2)}</strong></span>
                                <span style={{ color: 'var(--color-on-surface-variant)' }}>SKS: <strong>{sem.totalSks}</strong></span>
                            </div>
                        </div>
                        <div className="card-elevated overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                                        <th className="text-left px-4 py-2.5 label-meta">KODE</th>
                                        <th className="text-left px-4 py-2.5 label-meta">MATA KULIAH</th>
                                        <th className="text-center px-4 py-2.5 label-meta">SKS</th>
                                        <th className="text-center px-4 py-2.5 label-meta">NILAI</th>
                                        <th className="text-center px-4 py-2.5 label-meta">BOBOT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sem.grades?.map((g, i) => (
                                        <tr key={g.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                                            <td className="px-4 py-2.5 font-mono text-xs">{g.course?.code}</td>
                                            <td className="px-4 py-2.5 font-medium">{g.course?.name}</td>
                                            <td className="px-4 py-2.5 text-center">{g.course ? g.course.sks_teori + g.course.sks_praktik : '-'}</td>
                                            <td className="px-4 py-2.5 text-center"><span className="font-bold" style={{ color: g.grade_letter === 'A' || g.grade_letter === 'AB' ? 'var(--color-success)' : g.grade_letter === 'D' || g.grade_letter === 'E' ? 'var(--color-error)' : 'var(--color-on-surface)' }}>{g.grade_letter || '-'}</span></td>
                                            <td className="px-4 py-2.5 text-center">{g.grade_point != null ? Number(g.grade_point).toFixed(2) : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )) : (
                    <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Belum ada data transkrip.</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
