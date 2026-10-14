import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { rupiahFormatter } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { enUS, id } from 'date-fns/locale';
import { AlertTriangle, Calendar, Check, Package, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Bundle {
    id: string;
    title: string;
    slug: string;
    price: number;
    thumbnail?: string | null;
    registration_deadline?: string | null;
    registration_url: string;
    batch?: string | null;
    bundle_items_count: number;
}

interface OwnedItem {
    id: string;
    title: string;
    type: string;
}

interface RegisterSectionProps {
    bundle: Bundle;
    totalOriginalPrice: number;
    discountAmount: number;
    discountPercentage: number;
    hasOwnedItems: boolean;
    ownedItems: OwnedItem[];
}

export default function RegisterSection({
    bundle,
    totalOriginalPrice,
    discountAmount,
    discountPercentage,
    hasOwnedItems,
    ownedItems,
}: RegisterSectionProps) {
    const { t, i18n } = useTranslation('user');
    const dateLocale = i18n.language === 'en' ? enUS : id;
    const { auth } = usePage<SharedData>().props;

    const deadline = bundle.registration_deadline ? new Date(bundle.registration_deadline) : null;

    const isLoggedIn = !!auth.user;
    const isProfileComplete = isLoggedIn && auth.user?.phone_number;

    let registrationUrl: string;
    let buttonText: string;
    let warningMessage: string | null = null;
    let isDisabled = false;

    registrationUrl = bundle.registration_url;
    buttonText = t('bundling.detail.register.btnRegisterNow');
    warningMessage = null;

    return (
        <section className="mx-auto w-full space-y-4 md:p-4">
            <div className="rounded-2xl bg-neutral-100 p-6">
                <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl dark:text-white">
                    {t('bundling.detail.registerTitle', { title: bundle.title })}
                </h2>

                {/* ✅ Warning if user already owns items */}
                {hasOwnedItems && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            <p className="mb-2 font-semibold">{t('bundling.detail.register.ownedWarningTitle')}</p>
                            <ul className="ml-4 list-disc space-y-1">
                                {ownedItems.map((item) => (
                                    <li key={item.id}>
                                        <span className="font-medium">{item.type}:</span> {item.title}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 text-sm">{t('bundling.detail.register.ownedWarningDesc')}</p>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Left Column - Image & Benefits */}
                    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <img
                            src={bundle.thumbnail ? `/storage/${bundle.thumbnail}` : '/assets/images/placeholder.png'}
                            alt={bundle.title}
                            className="rounded-lg border border-gray-200 shadow-md"
                        />

                        <div className="space-y-3">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                <Sparkles className="text-primary h-5 w-5" />
                                {t('bundling.detail.register.benefitsHeading')}
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-2 text-sm">
                                    <Check size="16" className="mt-0.5 flex-shrink-0 text-green-600" />
                                    <p>{t('bundling.detail.register.benefitSave', { percent: discountPercentage })}</p>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check size="16" className="mt-0.5 flex-shrink-0 text-green-600" />
                                    <p>{t('bundling.detail.register.benefitAccess', { count: bundle.bundle_items_count })}</p>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Check size="16" className="mt-0.5 flex-shrink-0 text-green-600" />
                                    <p>{t('bundling.detail.register.benefitCertificate')}</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Price & Registration */}
                    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            {t('bundling.detail.register.priceDetailHeading')}
                        </h3>

                        {/* Price Comparison */}
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('bundling.detail.register.normalPrice')}
                                </span>
                                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                                    {rupiahFormatter.format(totalOriginalPrice)}
                                </span>
                            </div>

                            {discountAmount > 0 && (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {t('bundling.detail.register.saveAmount')}
                                    </span>
                                    <Badge className="bg-green-500 text-white">
                                        - {rupiahFormatter.format(discountAmount)} ({discountPercentage}%)
                                    </Badge>
                                </div>
                            )}
                        </div>

                        <Separator className="my-4" />

                        {/* Final Price */}
                        <div className="mb-6">
                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                {t('bundling.detail.register.bundlePriceLabel')}
                            </p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-primary text-4xl font-semibold">{rupiahFormatter.format(bundle.price)}</span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Bundle Info */}
                        <ul className="mb-6 space-y-3">
                            {bundle.batch && (
                                <li className="flex items-center gap-2 text-sm">
                                    <Calendar size="16" className="text-primary dark:text-secondary flex-shrink-0" />
                                    <p>
                                        {t('bundling.detail.register.batchLabel', {
                                            batch: bundle.batch.toLowerCase().includes('batch') ? bundle.batch : `Batch ${bundle.batch}`,
                                        })}
                                    </p>
                                </li>
                            )}

                            <li className="flex items-center gap-2 text-sm">
                                <Package size="16" className="text-primary dark:text-secondary flex-shrink-0" />
                                <p>
                                    {t('bundling.detail.register.totalPrograms', { count: bundle.bundle_items_count })}
                                </p>
                            </li>

                            {deadline && (
                                <li className="flex items-start gap-2 text-sm">
                                    <Calendar size="16" className="text-primary dark:text-secondary mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">{t('bundling.detail.register.deadlineLabel')}</p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {format(deadline, "EEEE, dd MMMM yyyy 'pukul' HH:mm", { locale: dateLocale })} WIB
                                        </p>
                                    </div>
                                </li>
                            )}
                        </ul>

                        <div className="mt-auto">
                            {warningMessage && (
                                <p className={`mb-2 text-center text-sm ${hasOwnedItems ? 'font-semibold text-red-600' : 'text-red-500'}`}>
                                    {warningMessage}
                                </p>
                            )}
                            <Button className="w-full" asChild={!isDisabled} disabled={isDisabled}>
                                {isDisabled ? <span>{buttonText}</span> : <Link href={registrationUrl}>{buttonText}</Link>}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
