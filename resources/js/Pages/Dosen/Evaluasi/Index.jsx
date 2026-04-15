import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EvaluasiDosenIndex({ evaluations, activeSemester }) {
    return (
        <AuthenticatedLayout title="Hasil Evaluasi">
            <Head title="Evaluasi" />
            <div className="space-y-8">
                <div><span className="label-meta">HASIL EVALUASI (EDOM)</span><h2 className="heading-display text-2xl lg:text-3xl mt-2">{activeSemester?.name || '-'}</h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>Data evaluasi ditampilkan secara anonim.</p></div>
                {evaluations?.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-5">{evaluations.map(e => (
                        <div key={e.id} className="card-elevated p-5 space-y-3">
                            <h3 className="font-semibold text-sm">{e.title}</h3>
                            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>{e.description}</p>
                            <div className="flex gap-4 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                <span>{e.responses_count || 0} respons</span>
                                <span>{e.questions?.length || 0} pertanyaan</span>
                            </div>
                        </div>
                    ))}</div>
                ) : <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Tidak ada evaluasi tersedia.</div>}
            </div>
        </AuthenticatedLayout>
    );
}
