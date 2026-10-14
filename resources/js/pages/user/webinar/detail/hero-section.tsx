import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface Webinar {
    title: string;
    thumbnail?: string | null;
    description?: string | null;
    start_time: string;
    end_time: string;
    category?: { name: string };
    batch?: string | null;
}

interface HeroSectionProps {
    webinar: Webinar;
    onRegisterClick: () => void;
}

export default function HeroSection({ webinar, onRegisterClick }: HeroSectionProps) {
    const { t, i18n } = useTranslation('user');
    const dateLocale = i18n.language === 'en' ? 'en-US' : 'id-ID';

    return (
        <section className="relative py-12 text-gray-900">
            <div className="relative mx-auto max-w-7xl px-4">
                <div className="col-span-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">{t('breadcrumb.home', { defaultValue: 'Beranda' })}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/webinar">{t('webinar.title')}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{webinar.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="mt-8 mb-4">
                        <span className="mt-8 mb-4 text-gray-600 dark:text-gray-400">
                            {new Date(webinar.start_time).toLocaleDateString(dateLocale, {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                            {' | '}
                            {new Date(webinar.start_time).toLocaleTimeString(dateLocale, {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Asia/Jakarta',
                            })}{' '}
                            -{' '}
                            {new Date(webinar.end_time).toLocaleTimeString(dateLocale, {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Asia/Jakarta',
                            })}{' '}
                            WIB
                        </span>
                    </div>

                    <h1 className="mb-4 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">{webinar.title}</h1>

                    {webinar.category && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {t('webinar.detail.category')}
                            </span>
                            <span className="border-primary-foreground bg-secondary text-primary-foreground rounded-full border px-3 py-1 text-sm font-medium">
                                {webinar.category.name}
                            </span>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button onClick={onRegisterClick}>{t('webinar.detail.btnRegisterNow')}</Button>
                        <Button variant="outline" asChild>
                            <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                                {t('webinar.detail.btnContactUs')}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
