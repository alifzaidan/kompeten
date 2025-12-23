import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Clock, ExternalLink, FileText, Home, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CourseItem {
    id: string;
    course: {
        id: string;
        title: string;
        slug: string;
        thumbnail: string;
    };
}

interface BootcampItem {
    id: string;
    bootcamp: {
        id: string;
        title: string;
        slug: string;
        thumbnail: string;
    };
}

interface WebinarItem {
    id: string;
    webinar: {
        id: string;
        title: string;
        slug: string;
        thumbnail: string;
    };
}

interface Invoice {
    id: string;
    invoice_code: string;
    invoice_url: string;
    amount: number;
    nett_amount: number;
    discount_amount: number;
    status: 'paid' | 'pending' | 'failed';
    paid_at: string | null;
    expires_at: string | null;
    payment_method: string | null;
    payment_channel: string | null;
    course_items?: CourseItem[];
    bootcamp_items?: BootcampItem[];
    webinar_items?: WebinarItem[];
}

interface Props {
    invoice: Invoice;
}

export default function TransactionShow({ invoice }: Props) {
    const [cancelLoading, setCancelLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const isExpired = invoice.expires_at && new Date() > new Date(invoice.expires_at);
    const timeLeft = invoice.expires_at ? new Date(invoice.expires_at).getTime() - new Date().getTime() : 0;
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    const getProductInfo = () => {
        if (invoice.course_items && invoice.course_items.length > 0) {
            const course = invoice.course_items[0].course;
            return {
                type: 'course',
                name: course.title,
                slug: course.slug,
                thumbnail: course.thumbnail,
                profileRoute: 'profile.course.detail',
                publicRoute: 'course.detail',
                badge: 'Kelas Online',
            };
        } else if (invoice.bootcamp_items && invoice.bootcamp_items.length > 0) {
            const bootcamp = invoice.bootcamp_items[0].bootcamp;
            return {
                type: 'bootcamp',
                name: bootcamp.title,
                slug: bootcamp.slug,
                thumbnail: bootcamp.thumbnail,
                profileRoute: 'profile.bootcamp.detail',
                publicRoute: 'bootcamp.detail',
                badge: 'Bootcamp',
            };
        } else if (invoice.webinar_items && invoice.webinar_items.length > 0) {
            const webinar = invoice.webinar_items[0].webinar;
            return {
                type: 'webinar',
                name: webinar.title,
                slug: webinar.slug,
                thumbnail: webinar.thumbnail,
                profileRoute: 'profile.webinar.detail',
                publicRoute: 'webinar.detail',
                badge: 'Webinar',
            };
        }
        return null;
    };

    const productInfo = getProductInfo();

    const handleCancelConfirm = async () => {
        setCancelLoading(true);
        setDialogOpen(false);

        try {
            const res = await fetch(route('invoice.cancel', { id: invoice.id }), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });

            const data = await res.json();

            if (data.success) {
                toast.success('Pesanan berhasil dibatalkan dan invoice telah dinonaktifkan.');
                window.location.reload();
            } else {
                toast.error(data.message || 'Gagal membatalkan pesanan.');
            }
        } catch {
            toast.error('Terjadi kesalahan saat membatalkan pesanan.');
        } finally {
            setCancelLoading(false);
        }
    };

    const getStatusConfig = () => {
        if (invoice.status === 'paid') {
            return {
                icon: <CheckCircle2 size={48} className="text-green-600" />,
                title: 'Pembayaran Berhasil!',
                subtitle: 'Transaksi Anda telah berhasil diproses',
                gradient: 'from-green-500 to-emerald-600',
                statusBadge: (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        <CheckCircle2 size={14} />
                        Berhasil
                    </span>
                ),
            };
        } else if (invoice.status === 'pending' && !isExpired) {
            return {
                icon: <Clock size={48} className="text-yellow-600" />,
                title: 'Menunggu Pembayaran',
                subtitle: `Selesaikan pembayaran dalam ${hoursLeft} jam ${minutesLeft} menit`,
                gradient: 'from-yellow-500 to-orange-600',
                statusBadge: (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                        <Clock size={14} />
                        Pending
                    </span>
                ),
            };
        } else if (invoice.status === 'pending' && isExpired) {
            return {
                icon: <XCircle size={48} className="text-red-600" />,
                title: 'Pembayaran Kedaluwarsa',
                subtitle: 'Waktu pembayaran telah habis',
                gradient: 'from-red-500 to-rose-600',
                statusBadge: (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        <XCircle size={14} />
                        Kedaluwarsa
                    </span>
                ),
            };
        } else {
            return {
                icon: <XCircle size={48} className="text-red-600" />,
                title: 'Pembayaran Dibatalkan',
                subtitle: 'Transaksi telah dibatalkan',
                gradient: 'from-red-500 to-rose-600',
                statusBadge: (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        <XCircle size={14} />
                        Dibatalkan
                    </span>
                ),
            };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <div>
            <Head title={`Invoice ${invoice.invoice_code}`} />

            <div className="min-h-screen bg-[url('/assets/images/bg-product.png')] bg-cover bg-center bg-no-repeat">
                <div className="mx-auto w-full max-w-7xl px-4 py-12">
                    {/* Breadcrumb */}
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Beranda</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/profile/transactions">Transaksi Saya</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Invoice #{invoice.invoice_code}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Main Card */}
                    <div className="mx-auto w-full max-w-3xl">
                        <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                            {/* Header */}
                            <div className={`border-b bg-gradient-to-r ${statusConfig.gradient} p-8 text-center dark:border-gray-700`}>
                                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                    {statusConfig.icon}
                                </div>
                                <h1 className="mb-2 text-3xl font-bold text-white">{statusConfig.title}</h1>
                                <p className="text-white/90">{statusConfig.subtitle}</p>
                                <p className="mt-2 text-sm text-white/80">Invoice #{invoice.invoice_code}</p>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Product Info */}
                                {productInfo && (
                                    <div className="mb-6 rounded-lg border bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="mb-4 flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                    {productInfo.badge}
                                                </span>
                                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{productInfo.name}</h2>
                                            </div>
                                            <img
                                                src={productInfo.thumbnail ? `/storage/${productInfo.thumbnail}` : '/assets/images/placeholder.png'}
                                                alt={productInfo.name}
                                                className="h-16 w-16 rounded-lg object-cover"
                                            />
                                        </div>

                                        <div className="space-y-2 border-t pt-4 dark:border-gray-700">
                                            {invoice.discount_amount > 0 && (
                                                <>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Harga Asli</span>
                                                        <span className="text-gray-500 line-through">
                                                            Rp {(invoice.discount_amount + invoice.nett_amount).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Diskon</span>
                                                        <span className="font-medium text-green-600">
                                                            - Rp {invoice.discount_amount.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    Rp {invoice.nett_amount.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Biaya Transaksi</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    Rp {(invoice.amount - invoice.nett_amount).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between border-t pt-2 dark:border-gray-700">
                                                <span className="font-semibold text-gray-900 dark:text-white">Total Pembayaran</span>
                                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                    Rp {invoice.amount.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Status</span>
                                                {statusConfig.statusBadge}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Payment Details */}
                                <div className="mb-6 rounded-lg border bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Informasi Pembayaran</h3>
                                    <div className="space-y-2 text-sm">
                                        {invoice.payment_method && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Metode Pembayaran</span>
                                                <span className="font-medium text-gray-900 dark:text-white">{invoice.payment_method}</span>
                                            </div>
                                        )}
                                        {invoice.paid_at && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Dibayar pada</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(invoice.paid_at).toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {invoice.expires_at && invoice.status === 'pending' && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Kedaluwarsa</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(invoice.expires_at).toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Alert Messages */}
                                {invoice.status === 'pending' && !isExpired && (
                                    <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 text-yellow-600" />
                                            <div>
                                                <p className="font-medium text-yellow-800 dark:text-yellow-200">Segera selesaikan pembayaran!</p>
                                                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                                    Pembayaran akan kedaluwarsa dalam {hoursLeft} jam {minutesLeft} menit. Setelah kedaluwarsa,
                                                    invoice tidak dapat digunakan.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {invoice.status === 'pending' && isExpired && (
                                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
                                        <div className="flex items-start gap-3">
                                            <XCircle className="mt-0.5 h-5 w-5 text-red-600" />
                                            <div>
                                                <p className="font-medium text-red-800 dark:text-red-200">Invoice Kedaluwarsa</p>
                                                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                                    Invoice ini sudah kedaluwarsa dan tidak dapat dibayar lagi. Silakan buat pesanan baru jika masih
                                                    ingin membeli.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {invoice.status === 'failed' && (
                                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                                            <div>
                                                <p className="font-medium text-red-800 dark:text-red-200">Pembayaran Dibatalkan</p>
                                                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                                    Invoice ini telah dibatalkan dan tidak dapat dibayar lagi. Silakan buat pesanan baru jika masih
                                                    ingin membeli.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    {invoice.status === 'pending' && !isExpired && invoice.invoice_url && (
                                        <>
                                            <Button asChild className="w-full" size="lg">
                                                <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer">
                                                    Lanjutkan Pembayaran
                                                </a>
                                            </Button>

                                            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="lg" className="w-full" disabled={cancelLoading}>
                                                        {cancelLoading ? 'Membatalkan...' : 'Batalkan Pesanan'}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Batalkan Pesanan?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Apakah Anda yakin ingin membatalkan pesanan ini? Invoice akan dinonaktifkan dan tidak
                                                            dapat dibayar lagi. Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Tidak, Pertahankan</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleCancelConfirm} className="bg-red-600 hover:bg-red-700">
                                                            Ya, Batalkan Pesanan
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </>
                                    )}

                                    {invoice.status === 'paid' && productInfo && (
                                        <>
                                            <Button asChild className="w-full" size="lg">
                                                <Link href={route(productInfo.profileRoute, { [productInfo.type]: productInfo.slug })}>
                                                    <ExternalLink className="mr-2 h-5 w-5" />
                                                    Akses {productInfo.badge}
                                                </Link>
                                            </Button>

                                            <Button asChild variant="outline" className="w-full" size="lg">
                                                <a href={route('invoice.pdf', { id: invoice.id })} target="_blank" rel="noopener noreferrer">
                                                    <FileText className="mr-2 h-5 w-5" />
                                                    Unduh Invoice (PDF)
                                                </a>
                                            </Button>
                                        </>
                                    )}

                                    {(invoice.status === 'failed' || isExpired) && (
                                        <>
                                            <Button asChild className="w-full" size="lg">
                                                <Link href="/">
                                                    <Home className="mr-2 h-5 w-5" />
                                                    Kembali ke Beranda
                                                </Link>
                                            </Button>

                                            {productInfo && (
                                                <Button asChild variant="outline" className="w-full" size="lg">
                                                    <Link href={route(productInfo.publicRoute, { [productInfo.type]: productInfo.slug })}>
                                                        <ExternalLink className="mr-2 h-5 w-5" />
                                                        Lihat Detail Produk
                                                    </Link>
                                                </Button>
                                            )}
                                        </>
                                    )}

                                    <Button asChild variant="ghost" className="w-full" size="lg">
                                        <Link href="/profile/transactions">Lihat Semua Transaksi</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900/50">
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
                </div>
            </div>
        </div>
    );
}
