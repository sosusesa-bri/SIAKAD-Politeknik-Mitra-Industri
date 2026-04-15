import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Khs({ mahasiswa, grades, ips, ipk, selectedSemesterId, availableSemesters, activeSemester }) {
    return (
        <AuthenticatedLayout title="Kartu Hasil Studi">
            <Head title="KHS" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <span className="label-meta">KARTU HASIL STUDI</span>
                        <h2 className="heading-display text-2xl lg:text-3xl mt-2">{mahasiswa?.name}</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                            NIM: {mahasiswa?.nim} &middot; {mahasiswa?.programStudy?.name}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="card-elevated px-5 py-3 text-center">
                            <span className="label-meta">IPS</span>
                            <div className="heading-display text-2xl mt-1" style={{ color: 'var(--color-primary)' }}>
                                {Number(ips).toFixed(2)}
                            </div>
                        </div>
                        <div className="card-elevated px-5 py-3 text-center">
                            <span className="label-meta">IPK</span>
                            <div className="heading-display text-2xl mt-1" style={{ color: 'var(--color-primary)' }}>
                                {Number(ipk).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Semester Selector */}
                {availableSemesters && availableSemesters.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {availableSemesters.map((sem) => (
                            <a
                                key={sem.id}
                                href={`/mahasiswa/akademik/khs?semester_id=${sem.id}`}
                                className="chip cursor-pointer"
                                style={{
                                    backgroundColor: sem.id === selectedSemesterId
                                        ? 'var(--color-primary)'
                                        : 'var(--color-secondary-container)',
                                    color: sem.id === selectedSemesterId
                                        ? 'var(--color-on-primary)'
                                        : 'var(--color-on-secondary-container)',
                                }}
                            >
                                {sem.name}
                            </a>
                        ))}
                    </div>
                )}

                {/* Grades Table */}
                <div className="card-elevated overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                                    <th className="text-left px-5 py-3 label-meta">NO</th>
                                    <th className="text-left px-5 py-3 label-meta">KODE</th>
                                    <th className="text-left px-5 py-3 label-meta">MATA KULIAH</th>
                                    <th className="text-center px-5 py-3 label-meta">SKS</th>
                                    <th className="text-center px-5 py-3 label-meta">NILAI</th>
                                    <th className="text-center px-5 py-3 label-meta">BOBOT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades && grades.length > 0 ? grades.map((grade, i) => (
                                    <tr
                                        key={grade.id}
                                        style={{
                                            backgroundColor: i % 2 === 0
                                                ? 'var(--color-surface-container-lowest)'
                                                : 'var(--color-surface-container-low)',
                                        }}
                                    >
                                        <td className="px-5 py-3" style={{ color: 'var(--color-on-surface-variant)' }}>{i + 1}</td>
                                        <td className="px-5 py-3 font-mono text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {grade.course?.code}
                                        </td>
                                        <td className="px-5 py-3 font-medium" style={{ color: 'var(--color-on-surface)' }}>
                                            {grade.course?.name}
                                        </td>
                                        <td className="px-5 py-3 text-center" style={{ color: 'var(--color-on-surface)' }}>
                                            {grade.course ? grade.course.sks_teori + grade.course.sks_praktik : '-'}
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <span
                                                className="inline-block px-2.5 py-0.5 rounded-md font-bold text-sm"
                                                style={{
                                                    backgroundColor:
                                                        grade.grade_letter === 'A' || grade.grade_letter === 'AB' ? 'var(--color-success-container)' :
                                                        grade.grade_letter === 'D' || grade.grade_letter === 'E' ? 'var(--color-error-container)' :
                                                        'var(--color-secondary-container)',
                                                    color:
                                                        grade.grade_letter === 'A' || grade.grade_letter === 'AB' ? 'var(--color-success)' :
                                                        grade.grade_letter === 'D' || grade.grade_letter === 'E' ? 'var(--color-error)' :
                                                        'var(--color-on-secondary-container)',
                                                }}
                                            >
                                                {grade.grade_letter || '-'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-center" style={{ color: 'var(--color-on-surface)' }}>
                                            {grade.grade_point != null ? Number(grade.grade_point).toFixed(2) : '-'}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            Belum ada data nilai untuk semester ini.
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
