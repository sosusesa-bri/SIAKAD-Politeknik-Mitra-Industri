import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Pembayaran({ billings, totalTagihan, totalTerbayar }) {
    const statusConfig = {
        unpaid: { label: 'Belum Bayar', bg: 'var(--color-warning-container)', text: 'var(--color-warning)' },
        partial: { label: 'Sebagian', bg: 'var(--color-info-container)', text: 'var(--color-info)' },
        paid: { label: 'Lunas', bg: 'var(--color-success-container)', text: 'var(--color-success)' },
        overdue: { label: 'Jatuh Tempo', bg: 'var(--color-error-container)', text: 'var(--color-error)' },
    };

    return (
        <AuthenticatedLayout title="Pembayaran">
            <Head title="Pembayaran" />

            <div className="space-y-8">
                <div>
                    <span className="label-meta">KEUANGAN</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">Tagihan & Pembayaran</h2>
                </div>

                {/* Finance Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="card-elevated p-6">
                        <span className="label-meta">TOTAL TAGIHAN</span>
                        <div className="heading-display text-2xl mt-2" style={{
                            color: Number(totalTagihan) > 0 ? 'var(--color-error)' : 'var(--color-success)'
                        }}>
                            Rp {Number(totalTagihan).toLocaleString('id-ID')}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>Belum terbayar</span>
                    </div>
                    <div className="card-elevated p-6">
                        <span className="label-meta">TOTAL TERBAYAR</span>
                        <div className="heading-display text-2xl mt-2" style={{ color: 'var(--color-success)' }}>
                            Rp {Number(totalTerbayar).toLocaleString('id-ID')}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>Sudah lunas</span>
                    </div>
                </div>

                {/* Billing List */}
                <div className="card-elevated overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--color-surface-container)' }}>
                                    <th className="text-left px-5 py-3 label-meta">INVOICE</th>
                                    <th className="text-left px-5 py-3 label-meta">SEMESTER</th>
                                    <th className="text-left px-5 py-3 label-meta">JENIS</th>
                                    <th className="text-right px-5 py-3 label-meta">JUMLAH</th>
                                    <th className="text-center px-5 py-3 label-meta">TENGGAT</th>
                                    <th className="text-center px-5 py-3 label-meta">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billings && billings.length > 0 ? billings.map((b, i) => (
                                    <tr
                                        key={b.id}
                                        style={{
                                            backgroundColor: i % 2 === 0
                                                ? 'var(--color-surface-container-lowest)'
                                                : 'var(--color-surface-container-low)',
                                        }}
                                    >
                                        <td className="px-5 py-3 font-mono text-xs">{b.invoice_number}</td>
                                        <td className="px-5 py-3 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {b.semester?.name}
                                        </td>
                                        <td className="px-5 py-3 capitalize">{b.type?.replace('_', ' ')}</td>
                                        <td className="px-5 py-3 text-right font-medium">
                                            Rp {Number(b.amount).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-5 py-3 text-center text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            {b.due_date ? new Date(b.due_date).toLocaleDateString('id-ID') : '-'}
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <span
                                                className="badge"
                                                style={{
                                                    backgroundColor: statusConfig[b.status]?.bg,
                                                    color: statusConfig[b.status]?.text,
                                                }}
                                            >
                                                {statusConfig[b.status]?.label || b.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>
                                            Tidak ada data tagihan.
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
