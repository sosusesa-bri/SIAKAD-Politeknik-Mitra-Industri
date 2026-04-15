import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AuditLogPage({ logs }) {
    return (
        <AuthenticatedLayout title="Audit Log">
            <Head title="Audit Log" />
            <div className="space-y-6">
                <div><span className="label-meta">KEAMANAN</span><h2 className="heading-display text-2xl mt-2">Audit Log</h2></div>
                <div className="card-elevated overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                        <th className="text-left px-4 py-3 label-meta">WAKTU</th><th className="text-left px-4 py-3 label-meta">USER</th><th className="text-left px-4 py-3 label-meta">AKSI</th><th className="text-left px-4 py-3 label-meta">DESKRIPSI</th><th className="text-left px-4 py-3 label-meta">IP</th>
                    </tr></thead><tbody>
                    {logs?.data?.map((log, i) => (
                        <tr key={log.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                            <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{new Date(log.created_at).toLocaleString('id-ID')}</td>
                            <td className="px-4 py-3 text-xs">{log.user?.name || '-'}</td>
                            <td className="px-4 py-3"><span className="badge text-xs">{log.action}</span></td>
                            <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{log.description}</td>
                            <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--color-outline)' }}>{log.ip_address}</td>
                        </tr>
                    ))}
                    </tbody></table></div></div>
                {logs?.links && <div className="flex gap-1 flex-wrap">{logs.links.map((l, i) => <a key={i} href={l.url} className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: l.active ? 'var(--color-primary)' : 'var(--color-surface-container)', color: l.active ? 'white' : 'var(--color-on-surface-variant)' }} dangerouslySetInnerHTML={{ __html: l.label }} />)}</div>}
            </div>
        </AuthenticatedLayout>
    );
}
