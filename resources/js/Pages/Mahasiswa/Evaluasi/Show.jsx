import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EvaluasiShow({ evaluation }) {
    const initialResponses = evaluation?.questions?.map(q => ({ question_id: q.id, answer: '', comment: '' })) || [];
    const { data, setData, post, processing } = useForm({ responses: initialResponses });
    const updateResponse = (idx, field, val) => { const r = [...data.responses]; r[idx] = { ...r[idx], [field]: val }; setData('responses', r); };
    const handleSubmit = (e) => { e.preventDefault(); post(`/mahasiswa/evaluasi/${evaluation.id}`); };
    const scaleOptions = [1, 2, 3, 4, 5];

    return (
        <AuthenticatedLayout title="Isi Evaluasi">
            <Head title="Isi Evaluasi" />
            <div className="max-w-3xl space-y-6">
                <div><span className="label-meta">EVALUASI ANONIM</span><h2 className="heading-display text-2xl mt-2">{evaluation?.title}</h2>
                    <p className="text-sm mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>{evaluation?.description}</p></div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-info-container)', color: 'var(--color-info)' }}>
                    <p className="text-sm font-medium">Jawaban Anda bersifat anonim dan tidak dapat dilacak kembali.</p></div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {evaluation?.questions?.map((q, idx) => (
                        <div key={q.id} className="card-elevated p-5 space-y-3">
                            <p className="font-medium text-sm">{idx + 1}. {q.question}</p>
                            {q.type === 'scale' ? (
                                <div className="flex gap-3">{scaleOptions.map(n => (
                                    <button key={n} type="button" onClick={() => updateResponse(idx, 'answer', String(n))}
                                        className="w-10 h-10 rounded-lg font-bold text-sm transition-all"
                                        style={{ backgroundColor: data.responses[idx]?.answer === String(n) ? 'var(--color-primary)' : 'var(--color-surface-container)', color: data.responses[idx]?.answer === String(n) ? 'white' : 'var(--color-on-surface)' }}>
                                        {n}
                                    </button>
                                ))}</div>
                            ) : (
                                <textarea value={data.responses[idx]?.answer || ''} onChange={(e) => updateResponse(idx, 'answer', e.target.value)} rows={3} className="input-ghost w-full px-3 py-2 text-sm" placeholder="Tuliskan jawaban..." />
                            )}
                            <input value={data.responses[idx]?.comment || ''} onChange={(e) => updateResponse(idx, 'comment', e.target.value)} className="input-ghost w-full px-3 py-2 text-sm" placeholder="Komentar tambahan (opsional)" />
                        </div>
                    ))}
                    <div className="flex gap-3"><a href="/mahasiswa/evaluasi" className="btn-ghost text-sm">Batal</a>
                        <button type="submit" disabled={processing} className="btn-primary">{processing ? 'Mengirim...' : 'Kirim Evaluasi'}</button></div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
