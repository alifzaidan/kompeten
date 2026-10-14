import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BadgeCheck, InfinityIcon, Presentation, Smartphone, TvMinimalPlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Course {
    title: string;
    thumbnail?: string | null;
    strikethrough_price: number;
    price: number;
    registration_url: string;
    modules?: {
        title: string;
        description?: string | null;
        lessons?: {
            title: string;
            description?: string | null;
            type: 'text' | 'video' | 'file' | 'quiz';
            video_url?: string | null;
        }[];
    }[];
}

export default function RegisterSection({ course }: { course: Course }) {
    const { t } = useTranslation('user');
    const { auth } = usePage<SharedData>().props;
    const totalLessons = course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;

    const isLoggedIn = !!auth.user;
    const isProfileComplete = isLoggedIn && auth.user?.phone_number;

    let registrationUrl: string;
    let buttonText: string;
    let warningMessage: string | null = null;

    if (!isLoggedIn) {
        registrationUrl = course.registration_url;
        buttonText = t('course.detail.loginToRegister', 'Login untuk Mendaftar');
        warningMessage = t('course.detail.loginFirstWarning', 'Anda harus login terlebih dahulu!');
    } else if (!isProfileComplete) {
        registrationUrl = route('profile.edit', { redirect: window.location.href });
        buttonText = t('course.detail.completeProfileToRegister', 'Lengkapi Profil untuk Mendaftar');
        warningMessage = t('course.detail.incompleteProfileWarning', 'Profil Anda belum lengkap!');
    } else {
        registrationUrl = course.registration_url;
        buttonText = t('course.detail.joinNow', 'Gabung Sekarang');
        warningMessage = null;
    }

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                    {t('course.detail.registerCourseTitle', { title: course.title, defaultValue: `Daftar Kelas "${course.title}" Sekarang!` })}
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <img
                            src={course.thumbnail ? `/storage/${course.thumbnail}` : '/assets/images/placeholder.png'}
                            alt={course.title}
                            className="rounded-lg border border-gray-200 shadow-md"
                        />
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <BadgeCheck size="16" className="text-green-600" />
                                <p>{t('course.detail.lifetimeAccess', 'Akses Selamanya')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <BadgeCheck size="16" className="text-green-600" />
                                <p>{t('course.detail.updatedMaterial', 'Materi Update')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <BadgeCheck size="16" className="text-green-600" />
                                <p>{t('course.detail.flexibleTime', 'Waktu Belajar Fleksibel')}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <h5 className="mb-4 text-sm">{t('course.detail.premiumPitch')}</h5>

                        {course.strikethrough_price > 0 && (
                            <span className="text-right text-sm text-red-500 line-through">
                                Rp {course.strikethrough_price.toLocaleString('id-ID')}
                            </span>
                        )}
                        {course.price > 0 ? (
                            <span className="text-right text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                Rp {course.price.toLocaleString('id-ID')}
                            </span>
                        ) : (
                            <span className="text-left text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                {t('course.detail.freeBadge', 'GRATIS')}
                            </span>
                        )}

                        <Separator className="my-4" />
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <TvMinimalPlay size="16" className="text-primary dark:text-secondary" />
                                <p>{t('course.detail.lessonsCount', { count: totalLessons, defaultValue: `${totalLessons} Materi` })}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Presentation size="16" className="text-primary dark:text-secondary" />
                                <p>{t('course.detail.freeConsultation', 'Free Konsultasi')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <InfinityIcon size="16" className="text-primary dark:text-secondary" />
                                <p>{t('course.detail.lifetimeAccess', 'Akses Selamanya')}</p>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <Smartphone size="16" className="text-primary dark:text-secondary" />
                                <p>{t('course.detail.onDemandMaterial', 'Materi On Demand')}</p>
                            </li>
                        </ul>
                        <div className="mt-auto">
                            {warningMessage && <p className="mb-2 text-center text-sm text-red-500">{warningMessage}</p>}
                            <Button className="w-full" asChild>
                                <Link href={registrationUrl}>{buttonText}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
