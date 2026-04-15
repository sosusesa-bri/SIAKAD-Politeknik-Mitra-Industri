import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EvaluasiIndex({ evaluations, activeSemester }) {
    return (
        <AuthenticatedLayout title="Evaluasi Dosen (EDOM)">
            <Head title="Evaluasi Dosen" />
            <div className="space-y-8">
                <div><span className="label-meta">EVALUASI DOSEN (EDOM)</span><h2 className="heading-display text-2xl lg:text-3xl mt-2">{activeSemester?.name || '-'}</h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Respons Anda bersifat anonim dan tidak dapat dilacak.</p></div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-info-container)', color: 'var(--color-info)' }}>
                    <p className="text-sm font-medium">Evaluasi ini bersifat anonim. Identitas pengisi tidak disimpan bersama jawaban.</p>
                </div>
                {evaluations?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">{evaluations.map((item) => (
                        <div key={item.evaluation.id} className="card-elevated p-5 space-y-3">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>{item.evaluation.title}</h3>
                                {item.completed && <span className="badge" style={{ backgroundColor: 'var(--color-success-container)', color: 'var(--color-success)' }}>Selesai</span>}
                            </div>
                            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{item.evaluation.description}</p>
                            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{item.evaluation.questions?.length || 0} pertanyaan</p>
                            {!item.completed ? <a href={`/mahasiswa/evaluasi/${item.evaluation.id}`} className="btn-primary text-xs inline-block">Isi Evaluasi</a> :
                                <span className="text-xs" style={{ color: 'var(--color-success)' }}>Terima kasih sudah mengisi</span>}
                        </div>
                    ))}</div>
                ) : <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Tidak ada evaluasi yang tersedia.</div>}
            </div>
        </AuthenticatedLayout>
    );
}
