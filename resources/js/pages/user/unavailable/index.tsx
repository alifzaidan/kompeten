import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UnavailableItem {
    title?: string;
    slug?: string;
    status?: string;
}

export default function UnavailablePage({
    title,
    item,
    message,
    adminWhatsappUrl,
    backUrl,
    backLabel,
}: {
    title?: string;
    item?: UnavailableItem;
    message?: string;
    adminWhatsappUrl: string;
    backUrl?: string;
    backLabel?: string;
}) {
    const { t } = useTranslation('user');
    const pageTitle = title || t('unavailable.title');
    const itemTitle = item?.title ? `"${item.title}"` : t('unavailable.thisPage');

    return (
        <div>
            <Head title={pageTitle} />

            <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
                <section className="relative py-12 text-gray-900">
                    <div className="relative mx-auto w-full max-w-7xl px-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">{t('common:nav.home', 'Beranda')}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="mt-16 flex flex-col items-center text-center">
                            <h1 className="mb-2 max-w-2xl text-3xl leading-tight font-semibold sm:text-4xl">{pageTitle}</h1>
                            <p className="max-w-xl text-sm text-gray-600 sm:text-base">
                                {itemTitle} {t('unavailable.currentlyNotAccessible')}
                            </p>
                        </div>

                        <div className="mt-10 flex justify-center">
                            <div className="flex w-full max-w-lg flex-col items-center justify-center space-y-4 rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-lg">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
                                    <AlertTriangle size={40} className="text-yellow-500" />
                                </div>
                                <h2 className="text-lg font-semibold sm:text-xl">
                                    {message || t('unavailable.defaultMessage')}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {t('unavailable.errorHint')}
                                </p>

                                <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
                                    <Button asChild variant="outline" className="flex-1">
                                        {backUrl ? (
                                            <Link href={backUrl}>{backLabel || t('unavailable.back')}</Link>
                                        ) : (
                                            <Link href="/">{backLabel || t('unavailable.back')}</Link>
                                        )}
                                    </Button>
                                    <Button asChild className="flex-1">
                                        <a href={adminWhatsappUrl} target="_blank" rel="noopener noreferrer">
                                            {t('unavailable.contactAdmin')}
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
