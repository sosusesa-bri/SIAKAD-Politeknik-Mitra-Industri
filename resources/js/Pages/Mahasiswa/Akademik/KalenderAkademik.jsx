import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function KalenderAkademik({ events, activeSemester }) {
    const typeColors = { registrasi: 'var(--color-info)', perkuliahan: 'var(--color-success)', ujian: 'var(--color-warning)', libur: 'var(--color-tertiary)' };
    return (
        <AuthenticatedLayout title="Kalender Akademik">
            <Head title="Kalender Akademik" />
            <div className="space-y-8">
                <div>
                    <span className="label-meta">KALENDER AKADEMIK</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">{activeSemester?.name || '-'}</h2>
                </div>
                {events && events.length > 0 ? (
                    <div className="space-y-3">
                        {events.map((event) => (
                            <div key={event.id} className="card-elevated p-5 flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: typeColors[event.type] || 'var(--color-secondary-container)', color: 'white' }}>
                                    <span className="text-xs font-medium uppercase">{new Date(event.start_date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                                    <span className="text-lg font-bold leading-none">{new Date(event.start_date).getDate()}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm" style={{ color: 'var(--color-on-surface)' }}>{event.title}</h3>
                                    <p className="text-xs mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                                        {new Date(event.start_date).toLocaleDateString('id-ID')} — {new Date(event.end_date).toLocaleDateString('id-ID')}
                                    </p>
                                    {event.description && <p className="text-sm mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>{event.description}</p>}
                                </div>
                                <span className="chip text-xs capitalize">{event.type}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card-elevated p-10 text-center" style={{ color: 'var(--color-on-surface-variant)' }}>Belum ada event kalender akademik.</div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
