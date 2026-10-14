import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BadgeCheck, CalendarDays, ChartArea, Clock, Hourglass, MapPin, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Bootcamp {
    title: string;
    batch?: string | null;
    strikethrough_price: number;
    price: number;
    quota: number;
    start_date: string;
    end_date: string;
    schedules?: { schedule_date: string; day: string; start_time: string; end_time: string }[];
    registration_deadline: string;
    registration_url: string;
    thumbnail?: string | null;
}

export default function RegisterSection({ bootcamp }: { bootcamp: Bootcamp }) {
    const { t, i18n } = useTranslation('user');
    const { auth } = usePage<SharedData>().props;
    const dateLocale = i18n.language === 'en' ? 'en-US' : 'id-ID';

    const start = new Date(bootcamp.start_date);
    const end = new Date(bootcamp.end_date);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffMs / (24 * 60 * 60 * 1000)) + 1;
    const totalWeeks = Math.ceil(diffDays / 7);

    const isLoggedIn = !!auth.user;
    const isProfileComplete = isLoggedIn && auth.user?.phone_number;

    let registrationUrl: string;
    let buttonText: string;
    let warningMessage: string | null = null;

    registrationUrl = bootcamp.registration_url;
    buttonText = t('bootcamp.detail.btnRegisterNow', 'Daftar Sekarang');
    warningMessage = null;

    const deadline = new Date(bootcamp.registration_deadline);
    const isRegistrationOpen = new Date() < deadline;

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                    {t('bootcamp.detail.startJourneyTitle', { title: bootcamp.title, defaultValue: `Daftar Bootcamp "${bootcamp.title}" Sekarang!` })}
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <img
                            src={bootcamp.thumbnail ? `/storage/${bootcamp.thumbnail}` : '/assets/images/placeholder.png'}
                            alt={bootcamp.title}
                            className="rounded-lg border border-gray-200 shadow-md"
                        />
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <BadgeCheck size="16" className="text-green-600" />
                                <p>{t('bootcamp.detail.guidedByExpert', 'Dibimbing mentor expert')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <BadgeCheck size="16" className="text-green-600" />
                                <p>{t('bootcamp.detail.practicalMaterial', 'Materi Praktis')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <BadgeCheck size="16" className="text-green-600" />
                                <p>{t('bootcamp.detail.moduleAvailable', 'Tersedia Modul Pembelajaran')}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <h5 className="mb-4 text-sm">{t('bootcamp.detail.pitchBuildProject', 'Daftar Bootcamp Kompeten dan mulai bangun projek real')}</h5>

                        {bootcamp.strikethrough_price > 0 && (
                            <span className="text-right text-sm text-red-500 line-through">
                                Rp {bootcamp.strikethrough_price.toLocaleString('id-ID')}
                            </span>
                        )}
                        {bootcamp.price > 0 ? (
                            <span className="text-right text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                Rp {bootcamp.price.toLocaleString('id-ID')}
                            </span>
                        ) : (
                            <span className="text-left text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                {t('bootcamp.detail.free', 'GRATIS')}
                            </span>
                        )}

                        <Separator className="my-4" />
                        <ul className="mb-4 space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <MapPin size="16" className="text-primary dark:text-secondary" />
                                <p>{t('bootcamp.detail.online', 'Online')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Hourglass size="16" className="text-primary dark:text-secondary" />
                                <p>{t('bootcamp.detail.batch', { batch: bootcamp.batch, defaultValue: `Batch ${bootcamp.batch}` })}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Users size="16" className="text-primary dark:text-secondary" />
                                <p>
                                    {bootcamp.quota
                                        ? t('bootcamp.detail.quotaParticipants', { quota: bootcamp.quota, defaultValue: `Kuota ${bootcamp.quota} Peserta` })
                                        : t('bootcamp.detail.unlimitedQuota', 'Kuota Tidak Terbatas')}
                                </p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <ChartArea size="16" className="text-primary dark:text-secondary" />
                                <p>
                                    {diffDays < 7
                                        ? t('bootcamp.detail.daysCount', { count: diffDays, defaultValue: `${diffDays} Hari` })
                                        : t('bootcamp.detail.weeksCount', { count: totalWeeks, defaultValue: `${totalWeeks} Minggu` })}
                                </p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CalendarDays size="16" className="text-primary dark:text-secondary" />
                                <p>
                                    {new Date(bootcamp.start_date).toLocaleDateString(dateLocale, {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}{' '}
                                    -{' '}
                                    {new Date(bootcamp.end_date).toLocaleDateString(dateLocale, {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </li>
                            {bootcamp.schedules && bootcamp.schedules.length > 0 ? (
                                bootcamp.schedules.map((schedule, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                        <Clock size="16" className="text-primary dark:text-secondary" />
                                        <p className="capitalize">
                                            {schedule.day},{' '}
                                            {new Date(schedule.schedule_date).toLocaleDateString(dateLocale, {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}{' '}
                                            | {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)} WIB
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <li className="flex items-center gap-2 text-sm">
                                    <Clock size="16" className="text-primary dark:text-secondary" />
                                    <p>{t('bootcamp.detail.scheduleNotAvailable', 'Jadwal belum tersedia')}</p>
                                </li>
                            )}
                        </ul>
                        <div className="mt-auto space-y-1">
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {t('bootcamp.detail.lastRegistration', {
                                    date: new Date(bootcamp.registration_deadline).toLocaleDateString(dateLocale, {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    }),
                                    defaultValue: `Terakhir pendaftaran: ${new Date(bootcamp.registration_deadline).toLocaleDateString(dateLocale, {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}`,
                                })}
                            </p>
                            {isRegistrationOpen ? (
                                <>
                                    <div className="mt-auto">
                                        {warningMessage && <p className="mb-2 text-sm text-red-500">{warningMessage}</p>}
                                        <Button className="w-full" asChild>
                                            <Link href={registrationUrl}>{buttonText}</Link>
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button className="w-full" disabled>
                                    {t('bootcamp.detail.registrationClosed', 'Pendaftaran Ditutup')}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
