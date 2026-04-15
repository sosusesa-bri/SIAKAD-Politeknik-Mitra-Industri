import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function JadwalKuliah({ enrolledKelas, activeSemester }) {
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    // Group schedules by day
    const byDay = days.reduce((acc, day) => {
        acc[day] = [];
        enrolledKelas?.forEach((item) => {
            item.schedules?.forEach((schedule) => {
                if (schedule.day === day) {
                    acc[day].push({
                        ...schedule,
                        course: item.course,
                        kelas: item.kelas,
                        dosen: item.dosen,
                    });
                }
            });
        });
        acc[day].sort((a, b) => a.start_time?.localeCompare(b.start_time));
        return acc;
    }, {});

    const dayColors = [
        'var(--color-primary)', 'var(--color-tertiary)', 'var(--color-success)',
        'var(--color-info)', 'var(--color-warning)', 'var(--color-error)',
    ];

    return (
        <AuthenticatedLayout title="Jadwal Kuliah">
            <Head title="Jadwal Kuliah" />

            <div className="space-y-8">
                <div>
                    <span className="label-meta">JADWAL PERKULIAHAN</span>
                    <h2 className="heading-display text-2xl lg:text-3xl mt-2">
                        {activeSemester?.name || 'Semester Tidak Aktif'}
                    </h2>
                </div>

                <div className="space-y-4">
                    {days.map((day, dayIdx) => (
                        <div key={day}>
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: dayColors[dayIdx] }}
                                />
                                <h3 className="heading-editorial text-base">{day}</h3>
                            </div>

                            {byDay[day].length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 ml-6">
                                    {byDay[day].map((s, i) => (
                                        <div key={i} className="card-elevated p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>
                                                    {s.course?.name}
                                                </h4>
                                                <span className="chip text-xs ml-2 flex-shrink-0">
                                                    {s.start_time?.substring(0,5)} - {s.end_time?.substring(0,5)}
                                                </span>
                                            </div>
                                            <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                                                {s.course?.code} &middot; {s.kelas?.name}
                                            </p>
                                            <p className="text-xs mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                                                {s.dosen?.name || '-'} &middot; {s.classroom?.name || '-'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="ml-6 text-sm" style={{ color: 'var(--color-outline)' }}>
                                    Tidak ada jadwal
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
