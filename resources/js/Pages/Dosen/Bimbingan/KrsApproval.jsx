import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function KrsApproval({ pendingKrs, approvedKrs, activeSemester }) {
    const [rejectId, setRejectId] = useState(null);
    const [rejectNotes, setRejectNotes] = useState('');
    const approve = (id) => router.post(`/dosen/bimbingan/krs/${id}/approve`);
    const reject = () => { router.post(`/dosen/bimbingan/krs/${rejectId}/reject`, { notes: rejectNotes }); setRejectId(null); setRejectNotes(''); };

    return (
        <AuthenticatedLayout title="Persetujuan KRS">
            <Head title="Persetujuan KRS" />
            <div className="space-y-8">
                <div><span className="label-meta">PERSETUJUAN KRS</span><h2 className="heading-display text-2xl lg:text-3xl mt-2">{activeSemester?.name || '-'}</h2></div>

                <div><h3 className="heading-editorial text-lg mb-4">Menunggu Persetujuan ({pendingKrs?.length || 0})</h3>
                {pendingKrs?.length > 0 ? pendingKrs.map(krs => (
                    <div key={krs.id} className="card-elevated p-5 mb-3">
                        <div className="flex justify-between items-center mb-3">
                            <div><h4 className="font-semibold text-sm">{krs.mahasiswa?.name}</h4>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>NIM: {krs.mahasiswa?.nim} &middot; {krs.mahasiswa?.programStudy?.name} &middot; {krs.details?.length || 0} MK / {krs.total_sks} SKS</p></div>
                            <div className="flex gap-2">
                                <button onClick={() => approve(krs.id)} className="btn-primary text-xs px-3 py-1.5">Setujui</button>
                                <button onClick={() => setRejectId(krs.id)} className="btn-ghost text-xs px-3 py-1.5" style={{ color: 'var(--color-error)' }}>Revisi</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">{krs.details?.map(d => (
                            <span key={d.id} className="chip">{d.course?.code} - {d.course?.name}</span>
                        ))}</div>
                    </div>
                )) : <div className="card-elevated p-8 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Tidak ada KRS yang menunggu.</div>}
                </div>

                {approvedKrs?.length > 0 && (
                    <div><h3 className="heading-editorial text-lg mb-4">Sudah Disetujui ({approvedKrs.length})</h3>
                    <div className="card-elevated overflow-hidden"><table className="w-full text-sm"><tbody>
                        {approvedKrs.map((krs, i) => (
                            <tr key={krs.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--color-surface-container-lowest)' : 'var(--color-surface-container-low)' }}>
                                <td className="px-5 py-3 font-mono text-xs">{krs.mahasiswa?.nim}</td>
                                <td className="px-5 py-3">{krs.mahasiswa?.name}</td>
                                <td className="px-5 py-3 text-center"><span className="badge" style={{ backgroundColor: 'var(--color-success-container)', color: 'var(--color-success)' }}>Disetujui</span></td>
                            </tr>
                        ))}
                    </tbody></table></div></div>
                )}

                {rejectId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}><div className="card-elevated p-6 w-full max-w-md space-y-4" style={{ backgroundColor: 'var(--color-surface)' }}>
                        <h3 className="heading-editorial text-lg">Catatan Revisi</h3>
                        <textarea value={rejectNotes} onChange={e => setRejectNotes(e.target.value)} rows={3} className="input-ghost w-full px-3 py-2" placeholder="Alasan revisi..." />
                        <div className="flex justify-end gap-2"><button onClick={() => setRejectId(null)} className="btn-ghost text-sm">Batal</button><button onClick={reject} className="btn-primary text-sm">Kirim</button></div>
                    </div></div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
