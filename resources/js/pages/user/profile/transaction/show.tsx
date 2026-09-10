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
import axios from 'axios';
import { AlertTriangle, Calendar, CheckCircle2, Clock, CreditCard, ExternalLink, FileText, Home, XCircle } from 'lucide-react';
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

interface CertificationProgramItem {
    id: string;
    certificationProgram: {
        id: string;
        title: string;
        slug: string;
        thumbnail: string;
    };
}

interface BundleItem {
    id: string;
    bundle: {
        id: string;
        title: string;
        slug: string;
        thumbnail?: string;
    };
}

interface InstallmentTerm {
    id: string;
    invoice_id: string;
    child_invoice_id: string | null;
    term_number: number;
    amount: number;
    due_date: string;
    status: 'pending' | 'paid' | 'overdue';
    paid_at: string | null;
    invoice?: {
        id: string;
        invoice_code: string;
        invoice_url: string | null;
        status: string;
    };
}

interface Invoice {
    id: string;
    invoice_code: string;
    invoice_url: string;
    amount: number;
    nett_amount: number;
    discount_amount: number;
    status: 'paid' | 'pending' | 'failed' | 'installment_pending';
    paid_at: string | null;
    expires_at: string | null;
    payment_method: string | null;
    payment_channel: string | null;
    is_installment?: boolean;
    access_suspended_at?: string | null;
    parent_invoice_id?: string | null;
    parent_invoice?: Invoice | null;
    parentInvoice?: Invoice | null;
    installment_terms?: InstallmentTerm[];
    installmentTerms?: InstallmentTerm[];
    course_items?: CourseItem[];
    courseItems?: CourseItem[];
    bootcamp_items?: BootcampItem[];
    bootcampItems?: BootcampItem[];
    webinar_items?: WebinarItem[];
    webinarItems?: WebinarItem[];
    certificationProgramItems?: CertificationProgramItem[];
    certification_program_items?: CertificationProgramItem[];
    bundle_enrollments?: BundleItem[];
    bundleEnrollments?: BundleItem[];
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

    // Installment detection & helpers
    const isInstallment = Boolean(
        invoice.is_installment ||
        (invoice.installment_terms && invoice.installment_terms.length > 0) ||
        (invoice.installmentTerms && invoice.installmentTerms.length > 0) ||
        invoice.parent_invoice?.is_installment ||
        invoice.parentInvoice?.is_installment
    );

    const terms: InstallmentTerm[] =
        invoice.installment_terms ||
        invoice.installmentTerms ||
        invoice.parent_invoice?.installment_terms ||
        invoice.parentInvoice?.installmentTerms ||
        [];

    const paidTerms = terms.filter((t) => t.status === 'paid');
    const isFullyPaid = (terms.length > 0 && paidTerms.length === terms.length) || invoice.status === 'paid';
    const isSuspended = Boolean(
        invoice.access_suspended_at ||
        invoice.parent_invoice?.access_suspended_at ||
        invoice.parentInvoice?.access_suspended_at
    );
    const isTerm1Paid = paidTerms.some((t) => t.term_number === 1);

    const getProductInfo = () => {
        const target = invoice.parent_invoice || invoice.parentInvoice || invoice;
        const courseItems = target.course_items || target.courseItems;
        const bootcampItems = target.bootcamp_items || target.bootcampItems;
        const webinarItems = target.webinar_items || target.webinarItems;
        const certItems = target.certificationProgramItems || target.certification_program_items;
        const bundleItems = target.bundle_enrollments || target.bundleEnrollments;

        if (courseItems && courseItems.length > 0) {
            const course = courseItems[0].course;
            return {
                type: 'course',
                routeParam: 'course',
                name: course.title,
                slug: course.slug,
                thumbnail: course.thumbnail,
                profileRoute: 'profile.course.detail',
                publicRoute: 'course.detail',
                badge: 'Kelas Online',
            };
        } else if (bootcampItems && bootcampItems.length > 0) {
            const bootcamp = bootcampItems[0].bootcamp;
            return {
                type: 'bootcamp',
                routeParam: 'bootcamp',
                name: bootcamp.title,
                slug: bootcamp.slug,
                thumbnail: bootcamp.thumbnail,
                profileRoute: 'profile.bootcamp.detail',
                publicRoute: 'bootcamp.detail',
                badge: 'Bootcamp',
            };
        } else if (webinarItems && webinarItems.length > 0) {
            const webinar = webinarItems[0].webinar;
            return {
                type: 'webinar',
                routeParam: 'webinar',
                name: webinar.title,
                slug: webinar.slug,
                thumbnail: webinar.thumbnail,
                profileRoute: 'profile.webinar.detail',
                publicRoute: 'webinar.detail',
                badge: 'Webinar',
            };
        } else if (certItems && certItems.length > 0) {
            const certificationProgram = certItems[0].certificationProgram;
            return {
                type: 'certification-program',
                routeParam: 'program',
                name: certificationProgram.title,
                slug: certificationProgram.slug,
                thumbnail: certificationProgram.thumbnail,
                profileRoute: 'profile.certification-program.detail',
                publicRoute: 'certification-programs.detail',
                badge: 'Sertifikasi Program',
            };
        } else if (bundleItems && bundleItems.length > 0) {
            const bundleItem = bundleItems[0];
            return {
                type: 'bundle',
                routeParam: 'bundle',
                name: bundleItem.bundle?.title || 'Paket Bundling',
                slug: bundleItem.bundle?.slug || '',
                thumbnail: bundleItem.bundle?.thumbnail || '',
                profileRoute: 'profile.index',
                publicRoute: 'bundle.detail',
                badge: 'Paket Bundling',
            };
        }
        return null;
    };

    const productInfo = getProductInfo();

    const handleCancelConfirm = async () => {
        setCancelLoading(true);
        setDialogOpen(false);

        try {
            const res = await axios.post(route('invoice.cancel', { id: invoice.id }));
            if (res.data?.success) {
                toast.success('Pesanan berhasil dibatalkan dan invoice telah dinonaktifkan.');
                window.location.reload();
            } else {
                toast.error(res.data?.message || 'Gagal membatalkan pesanan.');
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || 'Terjadi kesalahan saat membatalkan pesanan.');
            } else {
                toast.error('Terjadi kesalahan saat membatalkan pesanan.');
            }
        } finally {
            setCancelLoading(false);
        }
    };

    const getStatusConfig = () => {
        if (isInstallment) {
            if (isFullyPaid) {
                return {
                    icon: <CheckCircle2 size={48} className="text-green-600" />,
                    title: 'Cicilan Lunas!',
                    subtitle: 'Seluruh termin cicilan telah berhasil diselesaikan',
                    gradient: 'from-green-500 to-emerald-600',
                    statusBadge: (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            <CheckCircle2 size={14} />
                            Cicilan Lunas
                        </span>
                    ),
                };
            } else if (isSuspended) {
                return {
                    icon: <AlertTriangle size={48} className="text-red-600" />,
                    title: 'Akses Dibekukan',
                    subtitle: 'Termin cicilan telah melewati batas jatuh tempo. Bayar untuk membuka kembali akses.',
                    gradient: 'from-red-500 to-rose-600',
                    statusBadge: (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            <AlertTriangle size={14} />
                            Akses Dibekukan
                        </span>
                    ),
                };
            } else if (isTerm1Paid) {
                return {
                    icon: <Clock size={48} className="text-indigo-600" />,
                    title: `Cicilan Aktif (${paidTerms.length}/${terms.length || 2} Termin)`,
                    subtitle: 'Pembayaran DP telah berhasil. Akses program Anda aktif.',
                    gradient: 'from-indigo-600 to-blue-600',
                    statusBadge: (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                            <Clock size={14} />
                            Cicilan Aktif ({paidTerms.length}/{terms.length || 2})
                        </span>
                    ),
                };
            } else {
                return {
                    icon: <Clock size={48} className="text-yellow-600" />,
                    title: 'Menunggu Pembayaran DP (Termin 1)',
                    subtitle: 'Selesaikan pembayaran DP untuk mengaktifkan akses program dan jadwal cicilan',
                    gradient: 'from-yellow-500 to-orange-600',
                    statusBadge: (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                            <Clock size={14} />
                            Menunggu DP
                        </span>
                    ),
                };
            }
        }

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
    const canAccessProduct = invoice.status === 'paid' || (isInstallment && isTerm1Paid && !isSuspended);

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

                                {/* Installment Terms Breakdown */}
                                {isInstallment && terms.length > 0 && (
                                    <div className="mb-6 rounded-lg border bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-indigo-600" />
                                                Jadwal & Status Cicilan
                                            </h3>
                                            <Link
                                                href={route('profile.installments')}
                                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                                            >
                                                Halaman Cicilan &rarr;
                                            </Link>
                                        </div>
                                        <div className="space-y-3">
                                            {terms.map((term) => {
                                                const isPaid = term.status === 'paid';
                                                const isOverdue = term.status === 'overdue';
                                                const dueDateFormatted = new Date(term.due_date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                });
                                                const paidDateFormatted = term.paid_at
                                                    ? new Date(term.paid_at).toLocaleDateString('id-ID', {
                                                          day: 'numeric',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      })
                                                    : null;

                                                return (
                                                    <div
                                                        key={term.id}
                                                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border transition ${
                                                            isPaid
                                                                ? 'border-green-200 bg-green-50/50 dark:border-green-800/40 dark:bg-green-950/20'
                                                                : isOverdue
                                                                ? 'border-red-200 bg-red-50/50 dark:border-red-800/40 dark:bg-red-950/20'
                                                                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/60'
                                                        }`}
                                                    >
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                                    Termin {term.term_number} {term.term_number === 1 ? '(DP)' : ''}
                                                                </span>
                                                                {isPaid ? (
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                                                        <CheckCircle2 size={12} />
                                                                        Lunas
                                                                    </span>
                                                                ) : isOverdue ? (
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                                                        <AlertTriangle size={12} />
                                                                        Jatuh Tempo
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                                                                        <Clock size={12} />
                                                                        Belum Lunas
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {isPaid && paidDateFormatted
                                                                    ? `Dibayar pada ${paidDateFormatted}`
                                                                    : `Jatuh tempo: ${dueDateFormatted}`}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-gray-900 dark:text-white">
                                                                Rp {Number(term.amount).toLocaleString('id-ID')}
                                                            </span>
                                                            {!isPaid && (
                                                                <Button asChild size="sm" variant={isOverdue ? 'destructive' : 'default'}>
                                                                    {term.invoice?.invoice_url ? (
                                                                        <a href={term.invoice.invoice_url} target="_blank" rel="noopener noreferrer">
                                                                            Bayar
                                                                        </a>
                                                                    ) : (
                                                                        <Link href={route('profile.installments')}>
                                                                            Bayar
                                                                        </Link>
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
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
                                {isInstallment && isSuspended && (
                                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                                            <div>
                                                <p className="font-medium text-red-800 dark:text-red-200">Akses Belajar Sedang Dibekukan</p>
                                                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                                    Termin cicilan Anda telah melewati tanggal jatuh tempo. Silakan segera lunasi termin yang tertagih untuk membuka dan memulihkan kembali akses belajar Anda.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isInstallment && !isFullyPaid && isTerm1Paid && !isSuspended && (
                                    <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-700 dark:bg-indigo-900/20">
                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 text-indigo-600" />
                                            <div>
                                                <p className="font-medium text-indigo-800 dark:text-indigo-200">Skema Cicilan Aktif</p>
                                                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                                                    Akses program Anda telah aktif. Pastikan untuk melunasi termin berikutnya sebelum tanggal jatuh tempo agar proses belajar tidak terganggu.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isInstallment && !isTerm1Paid && invoice.status !== 'failed' && (
                                    <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
                                        <div className="flex items-start gap-3">
                                            <Clock className="mt-0.5 h-5 w-5 text-yellow-600" />
                                            <div>
                                                <p className="font-medium text-yellow-800 dark:text-yellow-200">Segera Selesaikan Pembayaran DP (Termin 1)!</p>
                                                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                                                    Setelah pembayaran Termin 1 berhasil, akses materi dan jadwal pembayaran termin cicilan berikutnya akan langsung aktif secara otomatis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isInstallment && invoice.status === 'pending' && !isExpired && (
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

                                {!isInstallment && invoice.status === 'pending' && isExpired && (
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
                                    {/* Primary Access Button when DP or Full Paid */}
                                    {canAccessProduct && productInfo && (
                                        <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" size="lg">
                                            <Link
                                                href={
                                                    productInfo.type === 'bundle'
                                                        ? '/profile'
                                                        : productInfo.profileRoute
                                                        ? route(productInfo.profileRoute, {
                                                              [productInfo.routeParam || productInfo.type]: productInfo.slug,
                                                          })
                                                        : route(productInfo.publicRoute, {
                                                              [productInfo.routeParam || productInfo.type]: productInfo.slug,
                                                          })
                                                }
                                            >
                                                <ExternalLink className="mr-2 h-5 w-5" />
                                                Akses {productInfo.badge}
                                            </Link>
                                        </Button>
                                    )}

                                    {/* Installments Management Link */}
                                    {isInstallment && (
                                        <Button asChild variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/30" size="lg">
                                            <Link href={route('profile.installments')}>
                                                <CreditCard className="mr-2 h-5 w-5" />
                                                Kelola & Jadwal Cicilan
                                            </Link>
                                        </Button>
                                    )}

                                    {/* Download Invoice PDF */}
                                    {(invoice.status === 'paid' || isTerm1Paid) && (
                                        <Button asChild variant="outline" className="w-full" size="lg">
                                            <a href={route('invoice.pdf', { id: invoice.id })} target="_blank" rel="noopener noreferrer">
                                                <FileText className="mr-2 h-5 w-5" />
                                                Unduh Invoice (PDF)
                                            </a>
                                        </Button>
                                    )}

                                    {/* Pending Payment Action */}
                                    {invoice.status === 'pending' && !isExpired && invoice.invoice_url && (
                                        <>
                                            <Button asChild className="w-full" size="lg">
                                                <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer">
                                                    {isInstallment ? 'Bayar Termin 1 (DP)' : 'Lanjutkan Pembayaran'}
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

                                    {(invoice.status === 'failed' || (!isInstallment && isExpired)) && (
                                        <>
                                            <Button asChild className="w-full" size="lg">
                                                <Link href="/">
                                                    <Home className="mr-2 h-5 w-5" />
                                                    Kembali ke Beranda
                                                </Link>
                                            </Button>

                                            {productInfo && (
                                                <Button asChild variant="outline" className="w-full" size="lg">
                                                    <Link
                                                        href={
                                                            productInfo.type === 'bundle'
                                                                ? `/bundle/${productInfo.slug}`
                                                                : route(productInfo.publicRoute, {
                                                                      [productInfo.routeParam || productInfo.type]: productInfo.slug,
                                                                  })
                                                        }
                                                    >
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
