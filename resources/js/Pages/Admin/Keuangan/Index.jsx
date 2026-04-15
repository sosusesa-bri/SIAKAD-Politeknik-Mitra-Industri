import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function KeuanganIndex({ billings, stats, filters }) {
    const statusConfig = { unpaid: { label: 'Belum Bayar', clr: 'var(--color-warning)' }, paid: { label: 'Lunas', clr: 'var(--color-success)' }, overdue: { label: 'Jatuh Tempo', clr: 'var(--color-error)' }, partial: { label: 'Sebagian', clr: 'var(--color-info)' } };
    return (
        <AuthenticatedLayout title="Keuangan">
            <Head title="Keuangan" />
            <div className="space-y-6">
                <div><span className="label-meta">KEUANGAN</span><h2 className="heading-display text-2xl mt-2">Kelola Tagihan</h2></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="card-elevated p-5"><span className="label-meta">TOTAL TAGIHAN</span><div className="heading-display text-xl mt-1" style={{ color: 'var(--color-error)' }}>Rp {Number(stats?.totalTagihan || 0).toLocaleString('id-ID')}</div></div>
                    <div className="card-elevated p-5"><span className="label-meta">TOTAL LUNAS</span><div className="heading-display text-xl mt-1" style={{ color: 'var(--color-success)' }}>Rp {Number(stats?.totalLunas || 0).toLocaleString('id-ID')}</div></div>
                    <div className="card-elevated p-5"><span className="label-meta">JATUH TEMPO</span><div className="heading-display text-xl mt-1" style={{ color: 'var(--color-warning)' }}>{stats?.totalOverdue || 0}</div></div>
                </div>
                <div className="card-elevated overflow-hidden"><table className="w-full text-sm"><thead>
                    <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                        <th className="text-left px-4 py-3 label-meta">INVOICE</th><th className="text-left px-4 py-3 label-meta">MAHASISWA</th><th className="text-left px-4 py-3 label-meta">PRODI</th><th className="text-right px-4 py-3 label-meta">JUMLAH</th><th className="text-center px-4 py-3 label-meta">STATUS</th>
                    </tr></thead><tbody>
                    {billings?.data?.map((b, i) => (
                        <tr key={b.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                            <td className="px-4 py-3 font-mono text-xs">{b.invoice_number}</td>
                            <td className="px-4 py-3 text-xs">{b.mahasiswa?.name}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{b.mahasiswa?.program_study?.name}</td>
                            <td className="px-4 py-3 text-right font-medium">Rp {Number(b.amount).toLocaleString('id-ID')}</td>
                            <td className="px-4 py-3 text-center"><span className="badge" style={{ backgroundColor: (statusConfig[b.status]?.clr || 'var(--color-outline)') + '18', color: statusConfig[b.status]?.clr }}>{statusConfig[b.status]?.label || b.status}</span></td>
                        </tr>
                    ))}
                    </tbody></table></div>
            </div>
        </AuthenticatedLayout>
    );
}
