import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Crown, FileText, Home } from 'lucide-react';

interface CourseItem {
    course: { title: string; slug: string; thumbnail: string };
}
interface BootcampItem {
    bootcamp: { title: string; slug: string; thumbnail: string };
}
interface WebinarItem {
    webinar: { title: string; slug: string; thumbnail: string };
}

interface Invoice {
    id: string;
    amount: number;
    course_items?: CourseItem[];
    bootcamp_items?: BootcampItem[];
    webinar_items?: WebinarItem[];
}

interface InvoiceProps {
    invoice: Invoice;
}

export default function CheckoutSuccess({ invoice }: InvoiceProps) {
    const courseItems = invoice.course_items ?? [];
    const bootcampItems = invoice.bootcamp_items ?? [];
    const webinarItems = invoice.webinar_items ?? [];

    let title = '';
    let link = '';
    let label = '';
    let badgeText = '';

    if (courseItems.length > 0) {
        title = courseItems[0].course.title;
        link = `/profile/my-courses/${courseItems[0].course.slug}`;
        label = 'Akses Kelas';
        badgeText = 'Kelas Online';
    } else if (bootcampItems.length > 0) {
        title = bootcampItems[0].bootcamp.title;
        link = `/profile/my-bootcamps/${bootcampItems[0].bootcamp.slug}`;
        label = 'Akses Bootcamp';
        badgeText = 'Bootcamp';
    } else if (webinarItems.length > 0) {
        title = webinarItems[0].webinar.title;
        link = `/profile/my-webinars/${webinarItems[0].webinar.slug}`;
        label = 'Akses Webinar';
        badgeText = 'Webinar';
    } else {
        title = 'Pembelian Anda';
        link = '/profile';
        label = 'Lihat Dashboard';
        badgeText = 'Produk';
    }

    return (
        <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
            <Head title="Pembayaran Berhasil" />

            <section className="flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl">
                    <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                        {/* Header */}
                        <div className="border-b bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                <CheckCircle2 size={48} className="text-green-600" />
                            </div>
                            <h1 className="mb-2 text-3xl font-bold text-white">Pembayaran Berhasil!</h1>
                            <p className="text-green-50">Transaksi Anda telah berhasil diproses</p>
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
                                        <span className="text-gray-600 dark:text-gray-400">Total Pembayaran</span>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            Rp {invoice.amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Status</span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            <CheckCircle2 size={14} />
                                            Berhasil
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    ✅ Invoice pembayaran telah dikirimkan ke nomor WhatsApp Anda
                                </p>
                                <p className="mt-1 text-xs text-blue-600 dark:text-blue-300">
                                    Anda dapat mengakses materi pembelajaran sekarang juga!
                                </p>
                            </div> */}

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
                                        Unduh Invoice (PDF)
                                    </a>
                                </Button>

                                <Button asChild variant="ghost" className="w-full" size="lg">
                                    <Link href="/">
                                        <Home className="mr-2 h-5 w-5" />
                                        Kembali ke Beranda
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t bg-gray-50 p-6 text-center dark:bg-gray-900/50">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Butuh bantuan?{' '}
                                <a
                                    href="https://wa.me/+6289528514480"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-orange-600 hover:underline"
                                >
                                    Hubungi Customer Service
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
