import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MahasiswaIndex({ mahasiswa, filters, prodiList }) {
    return (
        <AuthenticatedLayout title="Data Mahasiswa">
            <Head title="Data Mahasiswa" />
            <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <div><span className="label-meta">MASTER DATA</span><h2 className="heading-display text-2xl mt-2">Data Mahasiswa</h2></div>
                    <a href="/admin/master-data/mahasiswa/create" className="btn-primary text-sm">+ Tambah Mahasiswa</a>
                </div>
                <div className="flex flex-wrap gap-3">
                    <form className="flex gap-2 flex-wrap" method="get">
                        <input name="search" defaultValue={filters?.search} placeholder="Cari NIM/nama..." className="input-ghost px-3 py-2 text-sm" style={{ width: '240px' }} />
                        <select name="prodi" defaultValue={filters?.prodi} className="input-ghost px-3 py-2 text-sm">
                            <option value="">Semua Prodi</option>
                            {prodiList?.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <select name="status" defaultValue={filters?.status} className="input-ghost px-3 py-2 text-sm">
                            <option value="">Semua Status</option>
                            {['aktif','cuti','lulus','drop_out','non_aktif'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button type="submit" className="btn-primary text-sm px-4">Filter</button>
                    </form>
                </div>
                <div className="card-elevated overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                        <th className="text-left px-4 py-3 label-meta">NIM</th><th className="text-left px-4 py-3 label-meta">NAMA</th><th className="text-left px-4 py-3 label-meta">PRODI</th><th className="text-center px-4 py-3 label-meta">ANGKATAN</th><th className="text-center px-4 py-3 label-meta">SMT</th><th className="text-center px-4 py-3 label-meta">STATUS</th><th className="text-center px-4 py-3 label-meta">AKSI</th>
                    </tr></thead><tbody>
                    {mahasiswa?.data?.map((m, i) => (
                        <tr key={m.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                            <td className="px-4 py-3 font-mono text-xs">{m.nim}</td><td className="px-4 py-3 font-medium">{m.name}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{m.program_study?.name}</td>
                            <td className="px-4 py-3 text-center">{m.class_year}</td><td className="px-4 py-3 text-center">{m.semester_active}</td>
                            <td className="px-4 py-3 text-center"><span className="badge text-xs capitalize" style={{ backgroundColor: m.academic_status === 'aktif' ? 'var(--color-success-container)' : 'var(--color-warning-container)', color: m.academic_status === 'aktif' ? 'var(--color-success)' : 'var(--color-warning)' }}>{m.academic_status}</span></td>
                            <td className="px-4 py-3 text-center"><a href={`/admin/master-data/mahasiswa/${m.id}/edit`} className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>Edit</a></td>
                        </tr>
                    ))}
                    </tbody></table></div></div>
                {mahasiswa?.links && <div className="flex gap-1 flex-wrap">{mahasiswa.links.map((link, i) => (
                    <a key={i} href={link.url} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: link.active ? 'var(--color-primary)' : 'var(--color-surface-container)', color: link.active ? 'white' : 'var(--color-on-surface-variant)' }} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}</div>}
            </div>
        </AuthenticatedLayout>
    );
}
