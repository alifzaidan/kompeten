import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import UserLayout from '@/layouts/user-layout';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    Award,
    BadgeCheck,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    Eye,
    Lightbulb,
    MonitorPlay,
    Upload,
    Users,
    Wrench,
    X,
    Youtube,
} from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: string;
    name: string;
}

interface Tool {
    name: string;
    description?: string | null;
    icon: string | null;
}

interface User {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
}

interface Webinar {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    category_id: string;
    category: Category;
    tools?: Tool[];
    start_time: string;
    end_time: string;
    webinar_url: string;
    registration_url: string;
    recording_url: string | null;
    benefits: string;
    description: string | null;
    short_description: string | null;
    group_url: string | null;
    status: string;
    user?: User;
    user_id: string;
    created_at: string;
    updated_at: string;
}

interface EnrollmentWebinarItem {
    id: string;
    invoice_id: string;
    webinar_id: string;
    webinar: Webinar;
    progress: number;
    completed_at: string | null;
    attendance_proof?: string | null;
    attendance_verified: boolean;
    review?: string | null;
    rating?: number | null;
    created_at: string;
    updated_at: string;
}

interface WebinarProps {
    id: string;
    invoice_code: string;
    invoice_url: string;
    amount: number;
    status: string;
    paid_at: string | null;
    user_id: string;
    webinar_items: EnrollmentWebinarItem[];
    created_at: string;
    updated_at: string;
}

interface Certificate {
    id: string;
    title: string;
    certificate_number: string;
    description?: string;
}

interface CertificateParticipant {
    id: string;
    certificate_code: string;
    certificate_number: number;
}

interface DetailWebinarProps {
    webinar: WebinarProps;
    certificate?: Certificate | null;
    certificateParticipant?: CertificateParticipant | null;
}

function parseList(items?: string | null): string[] {
    if (!items) return [];
    const matches = items.match(/<li>(.*?)<\/li>/g);
    if (!matches) return [];
    return matches.map((li) => li.replace(/<\/?li>/g, '').trim());
}

function getYoutubeEmbedUrl(url: string): string | null {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

const StarRating = ({
    rating,
    onRatingChange,
    readonly = false,
}: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => !readonly && onRatingChange?.(star)}
                    className={`text-2xl transition-colors ${
                        star <= rating ? 'text-yellow-400' : readonly ? 'text-gray-300' : 'text-gray-300 hover:text-yellow-300'
                    } ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

export default function DetailMyWebinar({ webinar, certificate, certificateParticipant }: DetailWebinarProps) {
    const webinarItem = webinar.webinar_items?.[0];
    const webinarData = webinarItem?.webinar;
    const webinarInvoiceStatus = webinar.status;
    const benefitList = parseList(webinarData?.benefits);
    const toolsList = webinarData?.tools || [];
    const [isLoading, setIsLoading] = useState(true);

    const [submittingForm, setSubmittingForm] = useState(false);
    const [showCombinedForm, setShowCombinedForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Format file harus berupa gambar (JPG, PNG, WEBP)');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file maksimal 5MB');
                return;
            }

            setSelectedFile(file);
        }
    };

    const handleSubmitForm = async () => {
        if (!selectedFile || !reviewText.trim() || rating === 0 || !webinarItem) {
            alert('Mohon lengkapi semua field: upload bukti kehadiran, review, dan rating');
            return;
        }

        setSubmittingForm(true);

        const formData = new FormData();
        formData.append('attendance_proof', selectedFile);
        formData.append('review', reviewText);
        formData.append('rating', rating.toString());
        formData.append('enrollment_id', webinarItem.id);

        router.post(route('profile.webinar.attendance-review.submit'), formData, {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                setShowCombinedForm(false);
                resetForm();
            },
            onError: (errors) => {
                console.error('Submit errors:', errors);
                alert('Gagal mengirim data');
            },
            onFinish: () => {
                setSubmittingForm(false);
            },
        });
    };

    const resetForm = () => {
        setSelectedFile(null);
        setReviewText('');
        setRating(0);
    };

    if (!webinarData || !webinarItem) {
        return (
            <UserLayout>
                <Head title="Webinar Tidak Ditemukan" />
                <div className="flex h-screen items-center justify-center">
                    <p>Detail webinar tidak dapat ditemukan.</p>
                </div>
            </UserLayout>
        );
    }

    const webinarEndDate = new Date(webinarData.end_time);
    const isWebinarFinished = new Date() > webinarEndDate;
    const isCompleted = isWebinarFinished;
    const hasRecording = webinarData.recording_url && getYoutubeEmbedUrl(webinarData.recording_url);
    const isAttendanceVerified = webinarItem.attendance_verified;
    const hasReview = webinarItem.review && webinarItem.rating;

    const hasCertificate = certificate && isCompleted && webinarInvoiceStatus === 'paid' && isAttendanceVerified && hasReview;

    return (
        <div>
            <Head title={webinarData.title} />
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
                                    <Link href="/profile/my-webinars">Webinar Saya</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{webinarData.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Hero Section */}
                    <div className="mb-8 overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Left: Image */}
                            <div className="relative aspect-video lg:aspect-auto">
                                <img
                                    src={webinarData.thumbnail ? `/storage/${webinarData.thumbnail}` : '/assets/images/placeholder.png'}
                                    alt={webinarData.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Right: Info */}
                            <div className="flex flex-col justify-center p-6 lg:p-8">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        📌 Terdaftar{' '}
                                        {new Date(webinarItem.created_at).toLocaleDateString('id-ID', {
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    {hasCertificate && (
                                        <span className="flex items-center gap-1 rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            <Award size={14} />
                                            Sertifikat Tersedia
                                        </span>
                                    )}
                                    {hasRecording && (
                                        <span className="flex items-center gap-1 rounded-full border border-red-300 bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                                            <Youtube size={14} />
                                            Recording Tersedia
                                        </span>
                                    )}
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">{webinarData.title}</h1>

                                <p className="mb-6 text-gray-600 dark:text-gray-400">{webinarData.short_description}</p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                            <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {format(new Date(webinarData.start_time), 'EEEE, dd MMMM yyyy', { locale: id })}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {format(new Date(webinarData.start_time), 'HH:mm', { locale: id })} -{' '}
                                                {format(new Date(webinarData.end_time), 'HH:mm', { locale: id })} WIB
                                            </p>
                                        </div>
                                    </div>

                                    {webinarData.category ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                                                <MonitorPlay size={18} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{webinarData.category.name}</p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                {webinarInvoiceStatus !== 'paid' ? (
                                    <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
                                        <p className="font-semibold text-red-700 dark:text-red-300">
                                            ⚠️ Selesaikan pembayaran untuk mengakses webinar!
                                        </p>
                                    </div>
                                ) : null}

                                {!isWebinarFinished && webinarInvoiceStatus === 'paid' ? (
                                    <div className="mt-6">
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={() => window.open(webinarData.group_url ?? undefined, '_blank')}
                                        >
                                            <Users size={18} className="mr-2" />
                                            Gabung Grup WhatsApp
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content - 2 Columns */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Success Message (After Webinar) */}
                            {isWebinarFinished && (
                                <div className="overflow-hidden rounded-2xl border border-green-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-green-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-green-500 to-emerald-600 p-6 dark:border-gray-700">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="rounded-full bg-white p-2.5">
                                                <Award className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold">Terima Kasih Telah Berpartisipasi!</h2>
                                                <p className="text-sm text-green-50">
                                                    Semoga ilmu yang didapat bermanfaat untuk pengembangan karir Anda
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                            <CheckCircle size={16} />
                                            <span>Selesai pada: {format(new Date(webinarData.end_time), 'dd MMMM yyyy', { locale: id })}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recording Section */}
                            {hasRecording ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-red-500 to-pink-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <Youtube className="h-5 w-5" />
                                            <h2 className="font-semibold">Recording Webinar</h2>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg">
                                            <iframe
                                                className="h-full w-full"
                                                src={getYoutubeEmbedUrl(webinarData.recording_url!)!}
                                                title="Rekaman Webinar"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">✨ Akses selamanya untuk materi webinar ini</p>
                                    </div>
                                </div>
                            ) : isWebinarFinished ? (
                                <div className="overflow-hidden rounded-2xl border border-yellow-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-yellow-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-yellow-500 to-orange-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="h-5 w-5" />
                                            <h2 className="font-semibold">Recording Sedang Diproses</h2>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-center text-yellow-800 dark:text-yellow-200">📹 Recording akan tersedia dalam 1-2 hari</p>
                                    </div>
                                </div>
                            ) : null}

                            {/* About Section */}
                            {webinarData.description ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <MonitorPlay className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Tentang Webinar</h3>
                                        </div>
                                    </div>
                                    <div className="prose dark:prose-invert max-w-none p-6">
                                        <div dangerouslySetInnerHTML={{ __html: webinarData.description }} />
                                    </div>
                                </div>
                            ) : null}

                            {/* Benefits */}
                            {benefitList.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Benefit yang Didapatkan</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-6">
                                        {benefitList.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                                                <BadgeCheck size={18} className="mt-0.5 min-w-6 text-green-600" />
                                                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {/* Tools */}
                            {toolsList.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <Wrench className="h-5 w-5 text-orange-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Tools yang Digunakan</h3>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 p-6 sm:grid-cols-2">
                                        {toolsList.map((tool, idx) => (
                                            <div key={idx} className="rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                                <div className="flex items-center gap-3">
                                                    {tool.icon ? (
                                                        <img src={tool.icon} alt={tool.name} className="h-8 w-8 object-contain" />
                                                    ) : (
                                                        <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-100 dark:bg-orange-900/30">
                                                            <Wrench size={16} className="text-orange-600" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{tool.name}</p>
                                                        {tool.description && (
                                                            <p className="text-xs text-gray-600 dark:text-gray-400">{tool.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {/* Mentor Section */}
                            {webinarData.user ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-purple-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Mentor</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={
                                                    webinarData.user.avatar
                                                        ? `/storage/${webinarData.user.avatar}`
                                                        : '/assets/images/default-avatar.png'
                                                }
                                                alt={webinarData.user.name}
                                                className="h-16 w-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white">{webinarData.user.name}</h4>
                                                {webinarData.user.bio && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{webinarData.user.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Sidebar - 1 Column */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Form Upload & Review */}
                            {isCompleted && webinarInvoiceStatus === 'paid' && !hasReview && (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-purple-500 to-pink-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <Upload className="h-5 w-5" />
                                            <h2 className="font-semibold">Lengkapi Data Sertifikat</h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Upload bukti kehadiran dan berikan review untuk mendapatkan sertifikat
                                        </p>

                                        {!showCombinedForm ? (
                                            <Button onClick={() => setShowCombinedForm(true)} className="w-full">
                                                <Upload size={16} className="mr-2" />
                                                Lengkapi Data
                                            </Button>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-medium">Formulir</h4>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setShowCombinedForm(false);
                                                            resetForm();
                                                        }}
                                                    >
                                                        <X size={16} />
                                                    </Button>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="attendance_proof">
                                                        Screenshot Kehadiran <span className="text-red-500">*</span>
                                                    </Label>
                                                    <Input id="attendance_proof" type="file" accept="image/*" onChange={handleFileSelect} />
                                                    <p className="text-xs text-gray-500">Format: JPG, PNG, WEBP. Max 5MB.</p>
                                                </div>

                                                {selectedFile && (
                                                    <div className="text-center">
                                                        <img
                                                            src={URL.createObjectURL(selectedFile)}
                                                            alt="Preview"
                                                            className="mx-auto max-h-32 rounded-lg border"
                                                        />
                                                        <p className="mt-2 text-sm text-gray-600">{selectedFile.name}</p>
                                                    </div>
                                                )}

                                                <div className="space-y-2">
                                                    <Label>
                                                        Rating <span className="text-red-500">*</span>
                                                    </Label>
                                                    <StarRating rating={rating} onRatingChange={setRating} />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="review">
                                                        Review <span className="text-red-500">*</span>
                                                    </Label>
                                                    <textarea
                                                        id="review"
                                                        value={reviewText}
                                                        onChange={(e) => setReviewText(e.target.value)}
                                                        placeholder="Bagikan pengalaman Anda..."
                                                        className="w-full rounded-lg border p-3 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                                        rows={4}
                                                        maxLength={500}
                                                    />
                                                    <p className="text-xs text-gray-500">{reviewText.length}/500</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setShowCombinedForm(false);
                                                            resetForm();
                                                        }}
                                                        className="flex-1"
                                                    >
                                                        Batal
                                                    </Button>
                                                    <Button
                                                        onClick={handleSubmitForm}
                                                        disabled={!selectedFile || !reviewText.trim() || rating === 0 || submittingForm}
                                                        className="flex-1"
                                                    >
                                                        {submittingForm ? 'Mengirim...' : 'Kirim'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Review Display */}
                            {hasReview ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-green-500 to-emerald-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <CheckCircle className="h-5 w-5" />
                                            <h2 className="font-semibold">Data Lengkap</h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        <div>
                                            <StarRating rating={webinarItem.rating || 0} readonly />
                                            <p className="mt-2 text-gray-700 dark:text-gray-300">"{webinarItem.review}"</p>
                                        </div>

                                        {webinarItem.attendance_proof && (
                                            <img
                                                src={`/storage/${webinarItem.attendance_proof}`}
                                                alt="Bukti"
                                                className="mx-auto max-h-32 rounded-lg border"
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {/* Certificate Section */}
                            <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-yellow-500" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Sertifikat</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {isLoading && hasCertificate ? (
                                        <div className="space-y-3">
                                            <Skeleton className="h-[250px] w-full rounded-lg" />
                                            <Skeleton className="h-8 w-full" />
                                        </div>
                                    ) : null}

                                    {hasCertificate ? (
                                        <div className={isLoading ? 'hidden' : 'space-y-4'}>
                                            <iframe
                                                src={`${route('profile.webinar.certificate.preview', { webinar: webinarData.slug })}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                                className="h-[238px] w-full rounded-lg border"
                                                title="Preview"
                                                onLoad={handleIframeLoad}
                                            />
                                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                                Unduh sertifikat sebagai bukti keikutsertaan
                                            </p>
                                            {certificateParticipant && (
                                                <div className="text-center">
                                                    <p className="text-xs text-blue-600">
                                                        No: {String(certificateParticipant.certificate_number).padStart(4, '0')}/
                                                        {certificate.certificate_number}
                                                    </p>
                                                    <Link
                                                        href={route('certificate.participant.detail', {
                                                            code: certificateParticipant.certificate_code,
                                                        })}
                                                        className="text-xs text-green-600 underline"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <Button className="w-full" asChild>
                                                    <a href={route('profile.webinar.certificate', { webinar: webinarData.slug })} target="_blank">
                                                        <Download size={16} className="mr-2" />
                                                        Unduh Sertifikat
                                                    </a>
                                                </Button>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <a
                                                        href={route('profile.webinar.certificate.preview', { webinar: webinarData.slug })}
                                                        target="_blank"
                                                    >
                                                        <Eye size={16} className="mr-2" />
                                                        Lihat Preview
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <img src="/assets/images/placeholder.png" alt="Sertifikat" className="w-full rounded-lg" />
                                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                                {!certificate
                                                    ? 'Sertifikat belum dibuat'
                                                    : webinarInvoiceStatus !== 'paid'
                                                      ? 'Selesaikan pembayaran'
                                                      : !hasReview
                                                        ? 'Lengkapi data diperlukan'
                                                        : 'Menunggu webinar selesai'}
                                            </p>
                                            <Button variant="outline" className="w-full" disabled>
                                                <Download size={16} className="mr-2" />
                                                Sertifikat Belum Tersedia
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
