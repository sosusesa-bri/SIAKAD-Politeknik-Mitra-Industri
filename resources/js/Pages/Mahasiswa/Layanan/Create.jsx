import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function LayananCreate() {
    const { data, setData, post, processing, errors } = useForm({ type: '', title: '', description: '', documents: [] });
    const types = [{ value: 'surat_keterangan', label: 'Surat Keterangan' }, { value: 'beasiswa', label: 'Beasiswa' }, { value: 'cuti_akademik', label: 'Cuti Akademik' }, { value: 'lainnya', label: 'Lainnya' }];
    const handleSubmit = (e) => { e.preventDefault(); post('/mahasiswa/layanan', { forceFormData: true }); };
    return (
        <AuthenticatedLayout title="Ajukan Layanan">
            <Head title="Ajukan Layanan" />
            <div className="max-w-2xl space-y-6">
                <div><span className="label-meta">PENGAJUAN BARU</span><h2 className="heading-display text-2xl mt-2">Ajukan Layanan Akademik</h2></div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="label-meta block mb-2">JENIS LAYANAN</label>
                        <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="input-ghost w-full px-4 py-3" style={{ color: 'var(--color-on-surface)' }}>
                            <option value="">Pilih jenis...</option>
                            {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        {errors.type && <p className="mt-1 text-sm" style={{ color: 'var(--color-error)' }}>{errors.type}</p>}
                    </div>
                    <div>
                        <label className="label-meta block mb-2">JUDUL</label>
                        <input value={data.title} onChange={(e) => setData('title', e.target.value)} className="input-ghost w-full px-4 py-3" style={{ color: 'var(--color-on-surface)' }} placeholder="Judul pengajuan" />
                        {errors.title && <p className="mt-1 text-sm" style={{ color: 'var(--color-error)' }}>{errors.title}</p>}
                    </div>
                    <div>
                        <label className="label-meta block mb-2">DESKRIPSI</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} className="input-ghost w-full px-4 py-3" style={{ color: 'var(--color-on-surface)' }} placeholder="Jelaskan keperluan Anda..." />
                        {errors.description && <p className="mt-1 text-sm" style={{ color: 'var(--color-error)' }}>{errors.description}</p>}
                    </div>
                    <div>
                        <label className="label-meta block mb-2">DOKUMEN PENDUKUNG (opsional)</label>
                        <input type="file" multiple onChange={(e) => setData('documents', Array.from(e.target.files))} className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }} />
                    </div>
                    <div className="flex gap-3">
                        <a href="/mahasiswa/layanan" className="btn-ghost text-sm">Batal</a>
                        <button type="submit" disabled={processing} className="btn-primary">{processing ? 'Mengirim...' : 'Kirim Pengajuan'}</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
