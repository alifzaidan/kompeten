import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface PartnershipProduct {
    schedule_days: string[];
    duration_days: number;
}

export default function ScheduleInfoSection({ partnershipProduct }: { partnershipProduct: PartnershipProduct }) {
    if (!partnershipProduct.schedule_days || partnershipProduct.schedule_days.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto w-full space-y-6">
            <div className="space-y-6">
                {/* Schedule Days Section */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Jadwal Pelaksanaan</h3>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-2">
                        {partnershipProduct.schedule_days.map((day: string) => (
                            <Badge
                                key={day}
                                variant="secondary"
                                className="bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                            >
                                {day}
                            </Badge>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">Program ini dilaksanakan pada hari-hari yang telah ditentukan</p>
                </div>

                {/* Duration Section */}
                {partnershipProduct.duration_days > 0 && (
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-lg bg-green-100 p-2">
                                <Clock className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Durasi Program</h3>
                        </div>
                        <div className="mb-3 flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-green-600">{partnershipProduct.duration_days}</span>
                            <span className="text-lg font-medium text-gray-600">hari</span>
                        </div>
                        <p className="text-sm text-gray-500">Total durasi pembelajaran dari awal hingga akhir program</p>
                    </div>
                )}
            </div>
        </section>
    );
}
