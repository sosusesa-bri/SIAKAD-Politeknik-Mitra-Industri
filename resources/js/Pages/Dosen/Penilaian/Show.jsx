import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PenilaianShow({ kelas, students }) {
    const initialGrades = students?.map(s => ({
        mahasiswa_id: s.mahasiswa.id,
        tugas: s.grade?.tugas ?? '',
        uts: s.grade?.uts ?? '',
        uas: s.grade?.uas ?? '',
        praktik: s.grade?.praktik ?? '',
    })) || [];

    const { data, setData, post, processing } = useForm({ grades: initialGrades });

    const updateGrade = (index, field, value) => {
        const updated = [...data.grades];
        updated[index] = { ...updated[index], [field]: value };
        setData('grades', updated);
    };

    const calcFinal = (g) => {
        const t = parseFloat(g.tugas) || 0;
        const u = parseFloat(g.uts) || 0;
        const a = parseFloat(g.uas) || 0;
        const p = parseFloat(g.praktik) || 0;
        return (t * 0.20 + u * 0.30 + a * 0.40 + p * 0.10).toFixed(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/dosen/penilaian/${kelas.id}`);
    };

    return (
        <AuthenticatedLayout title="Input Nilai">
            <Head title={`Nilai — ${kelas?.course?.name}`} />

            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <span className="label-meta">INPUT NILAI</span>
                        <h2 className="heading-display text-2xl mt-2">{kelas?.course?.name}</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                            {kelas?.course?.code} &middot; {kelas?.name} &middot; {kelas?.semester?.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <a href="/dosen/penilaian" className="btn-ghost text-sm">← Kembali</a>
                    </div>
                </div>

                {/* Formula Info */}
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-info-container)', color: 'var(--color-info)' }}>
                    <p className="text-sm font-medium">
                        Formula: Tugas (20%) + UTS (30%) + UAS (40%) + Praktik (10%)
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="card-elevated overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                                        <th className="text-left px-4 py-3 label-meta">NO</th>
                                        <th className="text-left px-4 py-3 label-meta">NIM</th>
                                        <th className="text-left px-4 py-3 label-meta">NAMA</th>
                                        <th className="text-center px-4 py-3 label-meta">TUGAS (20%)</th>
                                        <th className="text-center px-4 py-3 label-meta">UTS (30%)</th>
                                        <th className="text-center px-4 py-3 label-meta">UAS (40%)</th>
                                        <th className="text-center px-4 py-3 label-meta">PRAKTIK (10%)</th>
                                        <th className="text-center px-4 py-3 label-meta">AKHIR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students?.map((s, i) => (
                                        <tr
                                            key={s.mahasiswa.id}
                                            style={{
                                                backgroundColor: i % 2 === 0
                                                    ? 'var(--color-surface-container-lowest)'
                                                    : 'var(--color-surface-container-low)',
                                            }}
                                        >
                                            <td className="px-4 py-2" style={{ color: 'var(--color-on-surface-variant)' }}>{i + 1}</td>
                                            <td className="px-4 py-2 font-mono text-xs">{s.mahasiswa.nim}</td>
                                            <td className="px-4 py-2 font-medium">{s.mahasiswa.name}</td>
                                            {['tugas', 'uts', 'uas', 'praktik'].map((field) => (
                                                <td key={field} className="px-2 py-2 text-center">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        step="0.1"
                                                        value={data.grades[i]?.[field] ?? ''}
                                                        onChange={(e) => updateGrade(i, field, e.target.value)}
                                                        className="input-ghost w-20 px-2 py-1.5 text-center text-sm"
                                                        style={{ backgroundColor: 'transparent' }}
                                                    />
                                                </td>
                                            ))}
                                            <td className="px-4 py-2 text-center">
                                                <span className="heading-editorial text-base" style={{ color: 'var(--color-primary)' }}>
                                                    {data.grades[i] ? calcFinal(data.grades[i]) : '-'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="submit" disabled={processing} className="btn-primary">
                            {processing ? 'Menyimpan...' : 'Simpan Nilai'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
