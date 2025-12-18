import { Calendar, Clock } from 'lucide-react';

interface Bootcamp {
    schedules?: { schedule_date: string; day: string; start_time: string; end_time: string }[];
}

export default function TimelineSection({ bootcamp }: { bootcamp: Bootcamp }) {
    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">Jadwal Bootcamp</h2>

                <div className="space-y-4">
                    {bootcamp.schedules && bootcamp.schedules.length > 0 ? (
                        bootcamp.schedules.map((schedule, index) => (
                            <div key={index} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Calendar className="h-4 w-4" />
                                        <span className="font-medium capitalize">{schedule.day}</span>
                                        <span className="text-sm text-gray-500">{new Date(schedule.schedule_date).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Belum ada jadwal tersedia</p>
                    )}
                </div>
            </div>
        </section>
    );
}
