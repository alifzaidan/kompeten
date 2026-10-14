import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Crown, FileText, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CourseItem {
    course: { title: string; slug: string; thumbnail: string };
}
interface BootcampItem {
    bootcamp: { title: string; slug: string; thumbnail: string };
}
interface WebinarItem {
    webinar: { title: string; slug: string; thumbnail: string };
}
interface CertificationProgramItem {
    certification_program: { title: string; slug: string; thumbnail: string; group_url?: string | null };
}

interface Invoice {
    id: string;
    amount: number;
    course_items?: CourseItem[];
    bootcamp_items?: BootcampItem[];
    webinar_items?: WebinarItem[];
    certification_program_items?: CertificationProgramItem[];
}

interface InvoiceProps {
    invoice: Invoice;
}

export default function CheckoutSuccess({ invoice }: InvoiceProps) {
    const { t } = useTranslation('user');
    const courseItems = invoice.course_items ?? [];
    const bootcampItems = invoice.bootcamp_items ?? [];
    const webinarItems = invoice.webinar_items ?? [];
    const certificationProgramItems = invoice.certification_program_items ?? [];

    let title = '';
    let link = '';
    let label = '';
    let badgeText = '';

    if (courseItems.length > 0) {
        title = courseItems[0].course.title;
        link = `/profile/my-courses/${courseItems[0].course.slug}`;
        label = t('checkoutSuccess.accessCourse', 'Akses Kelas');
        badgeText = t('checkoutSuccess.onlineCourse', 'Kelas Online');
    } else if (bootcampItems.length > 0) {
        title = bootcampItems[0].bootcamp.title;
        link = `/profile/my-bootcamps/${bootcampItems[0].bootcamp.slug}`;
        label = t('checkoutSuccess.accessBootcamp', 'Akses Bootcamp');
        badgeText = t('checkoutSuccess.bootcamp', 'Bootcamp');
    } else if (webinarItems.length > 0) {
        title = webinarItems[0].webinar.title;
        link = `/profile/my-webinars/${webinarItems[0].webinar.slug}`;
        label = t('checkoutSuccess.accessWebinar', 'Akses Webinar');
        badgeText = t('checkoutSuccess.webinar', 'Webinar');
    } else if (certificationProgramItems.length > 0) {
        title = t('checkoutSuccess.certificationTitle', {
            title: certificationProgramItems[0].certification_program.title,
            defaultValue: `Checkout Sertifikasi Program "${certificationProgramItems[0].certification_program.title}" Berhasil!`,
        });
        link = `/profile/my-certification-programs/${certificationProgramItems[0].certification_program.slug}`;
        label = t('checkoutSuccess.accessCertification', 'Akses Sertifikasi');
        badgeText = t('common:services.certification', 'Sertifikasi');
    } else {
        title = t('checkoutSuccess.purchaseSuccessful', 'Pembelian Anda');
        link = '/profile';
        label = t('checkoutSuccess.viewProfile', 'Lihat Dashboard');
        badgeText = t('common:products', 'Produk');
    }

    return (
        <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
            <Head title={t('checkoutSuccess.paymentSuccess', 'Pembayaran Berhasil')} />

            <section className="flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl">
                    <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                        {/* Header */}
                        <div className="border-b bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                <CheckCircle2 size={48} className="text-green-600" />
                            </div>
                            <h1 className="mb-2 text-3xl font-bold text-white">{t('checkoutSuccess.paymentSuccess', 'Pembayaran Berhasil!')}</h1>
                            <p className="text-green-50">{t('checkoutSuccess.transactionProcessed', 'Transaksi Anda telah berhasil diproses')}</p>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="mb-6 rounded-lg border bg-gray-50 p-6 dark:bg-gray-900/50">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            {badgeText}
                                        </span>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                                    </div>
                                </div>

                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">{t('checkoutSuccess.totalPayment', 'Total Pembayaran')}</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            Rp {invoice.amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">{t('checkoutSuccess.status', 'Status')}</span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            <CheckCircle2 size={14} />
                                            {t('common:status.success', 'Berhasil')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button asChild className="w-full" size="lg">
                                    <Link href={link}>
                                        <Crown className="mr-2 h-5 w-5" />
                                        {label}
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" className="w-full" size="lg">
                                    <a href={route('invoice.pdf', { id: invoice.id })} target="_blank" rel="noopener noreferrer">
                                        <FileText className="mr-2 h-5 w-5" />
                                        {t('checkoutSuccess.downloadInvoice', 'Unduh Invoice (PDF)')}
                                    </a>
                                </Button>

                                <Button asChild variant="ghost" className="w-full" size="lg">
                                    <Link href="/">
                                        <Home className="mr-2 h-5 w-5" />
                                        {t('common:nav.home', 'Kembali ke Beranda')}
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t bg-gray-50 p-6 text-center dark:bg-gray-900/50">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t('common:needHelp', 'Butuh bantuan?')}{' '}
                                <a
                                    href="https://wa.me/+6289528514480"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-orange-600 hover:underline"
                                >
                                    {t('common:contactAdmin', 'Hubungi Customer Service')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
