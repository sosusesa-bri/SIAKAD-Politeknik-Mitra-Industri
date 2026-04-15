import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BimbinganIndex({ students }) {
    const statusClr = { aktif: 'var(--color-success)', cuti: 'var(--color-warning)', lulus: 'var(--color-info)', drop_out: 'var(--color-error)' };
    return (
        <AuthenticatedLayout title="Mahasiswa Bimbingan">
            <Head title="Bimbingan" />
            <div className="space-y-8">
                <div><span className="label-meta">BIMBINGAN AKADEMIK</span><h2 className="heading-display text-2xl lg:text-3xl mt-2">Mahasiswa Perwalian</h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Total: {students?.length || 0} mahasiswa</p></div>
                <div className="card-elevated overflow-hidden"><table className="w-full text-sm"><thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                        <th className="text-left px-5 py-3 label-meta">NIM</th><th className="text-left px-5 py-3 label-meta">NAMA</th><th className="text-left px-5 py-3 label-meta">PRODI</th><th className="text-center px-5 py-3 label-meta">SMT</th><th className="text-center px-5 py-3 label-meta">STATUS</th>
                    </tr></thead><tbody>
                    {students?.length > 0 ? students.map((s, i) => (
                        <tr key={s.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                            <td className="px-5 py-3 font-mono text-xs">{s.nim}</td><td className="px-5 py-3 font-medium">{s.name}</td>
                            <td className="px-5 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{s.programStudy?.name}</td>
                            <td className="px-5 py-3 text-center">{s.semester_active}</td>
                            <td className="px-5 py-3 text-center"><span className="badge" style={{ backgroundColor: (statusClr[s.academic_status] || 'var(--color-outline)') + '18', color: statusClr[s.academic_status] }}>{s.academic_status}</span></td>
                        </tr>
                    )) : <tr><td colSpan={5} className="p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Tidak ada mahasiswa bimbingan.</td></tr>}
                    </tbody></table></div>
            </div>
        </AuthenticatedLayout>
    );
}
