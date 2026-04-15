import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UsersPage({ users, filters }) {
    const roleClr = { mahasiswa: 'var(--color-primary)', dosen: 'var(--color-tertiary)', admin: 'var(--color-success)' };
    return (
        <AuthenticatedLayout title="User & Keamanan">
            <Head title="Kelola User" />
            <div className="space-y-6">
                <div><span className="label-meta">USER & KEAMANAN</span><h2 className="heading-display text-2xl mt-2">Kelola User</h2></div>
                <form className="flex gap-2 flex-wrap" method="get">
                    <input name="search" defaultValue={filters?.search} placeholder="Cari nama/NIM/NIP..." className="input-ghost px-3 py-2 text-sm" style={{ width: '260px' }} />
                    <select name="role" defaultValue={filters?.role} className="input-ghost px-3 py-2 text-sm">
                        <option value="">Semua Role</option><option value="mahasiswa">Mahasiswa</option><option value="dosen">Dosen</option><option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="btn-primary text-sm px-4">Filter</button>
                </form>
                <div className="card-elevated overflow-hidden"><table className="w-full text-sm"><thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                        <th className="text-left px-4 py-3 label-meta">ID</th><th className="text-left px-4 py-3 label-meta">NAMA</th><th className="text-left px-4 py-3 label-meta">EMAIL</th><th className="text-center px-4 py-3 label-meta">ROLE</th><th className="text-center px-4 py-3 label-meta">STATUS</th><th className="text-center px-4 py-3 label-meta">AKSI</th>
                    </tr></thead><tbody>
                    {users?.data?.map((u, i) => (
                        <tr key={u.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                            <td className="px-4 py-3 font-mono text-xs">{u.identifier}</td><td className="px-4 py-3 font-medium">{u.name}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{u.email}</td>
                            <td className="px-4 py-3 text-center"><span className="badge" style={{ backgroundColor: (roleClr[u.role] || 'var(--color-outline)') + '18', color: roleClr[u.role] }}>{u.role}</span></td>
                            <td className="px-4 py-3 text-center"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: u.is_active ? 'var(--color-success)' : 'var(--color-error)' }} /></td>
                            <td className="px-4 py-3 text-center"><button onClick={() => { if(confirm('Reset password?')) window.location.href = `/admin/keamanan/users/${u.id}/reset-password` }} className="text-xs font-medium" style={{ color: 'var(--color-warning)' }}>Reset Password</button></td>
                        </tr>
                    ))}
                    </tbody></table></div>
                {users?.links && <div className="flex gap-1 flex-wrap">{users.links.map((l, i) => <a key={i} href={l.url} className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: l.active ? 'var(--color-primary)' : 'var(--color-surface-container)', color: l.active ? 'white' : 'var(--color-on-surface-variant)' }} dangerouslySetInnerHTML={{ __html: l.label }} />)}</div>}
            </div>
        </AuthenticatedLayout>
    );
}
