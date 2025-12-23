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
    ExternalLink,
    Eye,
    GraduationCap,
    Lightbulb,
    LinkIcon,
    ListOrdered,
    MessageSquare,
    Presentation,
    Upload,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: string;
    name: string;
}

interface BootcampSchedule {
    id: string;
    schedule_date: string;
    day: string;
    start_time: string;
    end_time: string;
    recording_url: string | null;
}

interface BootcampAttendance {
    id: string;
    enrollment_bootcamp_id: string;
    bootcamp_schedule_id: string;
    attendance_proof: string;
    verified: boolean;
    notes?: string;
    bootcamp_schedule: BootcampSchedule;
}

interface Bootcamp {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    category_id: string;
    start_date: string;
    end_date: string;
    category: Category;
    bootcamp_url: string;
    registration_url: string;
    benefits: string;
    curriculum: string;
    description: string | null;
    short_description: string | null;
    group_url: string | null;
    status: string;
    schedules: BootcampSchedule[];
    user_id: string;
    has_submission_link: boolean;
    created_at: string;
    updated_at: string;
}

interface EnrollmentBootcampItem {
    id: string;
    invoice_id: string;
    bootcamp_id: string;
    bootcamp: Bootcamp;
    progress: number;
    completed_at: string | null;
    attendances: BootcampAttendance[];
    submission?: string | null;
    submission_verified: boolean;
    rating?: number | null;
    review?: string | null;
    reviewed_at?: string | null;
    created_at: string;
    updated_at: string;
}

interface BootcampProps {
    id: string;
    invoice_code: string;
    invoice_url: string;
    amount: number;
    status: string;
    paid_at: string | null;
    user_id: string;
    bootcamp_items: EnrollmentBootcampItem[];
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

interface DetailBootcampProps {
    bootcamp: BootcampProps;
    certificate?: Certificate | null;
    certificateParticipant?: CertificateParticipant | null;
}

function parseList(items?: string | null): string[] {
    if (!items) return [];
    const matches = items.match(/<li>(.*?)<\/li>/g);
    if (!matches) return [];
    return matches.map((li) => li.replace(/<\/?li>/g, '').trim());
}

function getYoutubeId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
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

export default function DetailMyBootcamp({ bootcamp, certificate, certificateParticipant }: DetailBootcampProps) {
    const bootcampItem = bootcamp.bootcamp_items?.[0];
    const bootcampData = bootcampItem?.bootcamp;
    const bootcampInvoiceStatus = bootcamp.status;
    const benefitList = parseList(bootcampData?.benefits);
    const curriculumList = parseList(bootcampData?.curriculum);
    const [isLoading, setIsLoading] = useState(true);

    const [showUploadForms, setShowUploadForms] = useState<{ [key: string]: boolean }>({});
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});
    const [notes, setNotes] = useState<{ [key: string]: string }>({});
    const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});

    const [showSubmissionForm, setShowSubmissionForm] = useState(false);
    const [submissionUrl, setSubmissionUrl] = useState(bootcampItem?.submission || '');
    const [submittingSubmission, setSubmittingSubmission] = useState(false);

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState(bootcampItem?.review || '');
    const [rating, setRating] = useState(bootcampItem?.rating || 0);
    const [submittingReview, setSubmittingReview] = useState(false);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleFileSelect = (scheduleId: string, e: React.ChangeEvent<HTMLInputElement>) => {
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

            setSelectedFiles((prev) => ({ ...prev, [scheduleId]: file }));
        }
    };

    const handleUploadAttendance = (scheduleId: string) => {
        const file = selectedFiles[scheduleId];
        if (!file || !bootcampItem) return;

        setUploading((prev) => ({ ...prev, [scheduleId]: true }));

        const formData = new FormData();
        formData.append('attendance_proof', file);
        formData.append('enrollment_id', bootcampItem.id);
        formData.append('schedule_id', scheduleId);
        formData.append('notes', notes[scheduleId] || '');

        router.post(route('profile.bootcamp.attendance.upload'), formData, {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                setShowUploadForms((prev) => ({ ...prev, [scheduleId]: false }));
                setSelectedFiles((prev) => ({ ...prev, [scheduleId]: null }));
                setNotes((prev) => ({ ...prev, [scheduleId]: '' }));
            },
            onError: (errors) => {
                console.error('Upload errors:', errors);
                alert('Gagal mengupload bukti kehadiran');
            },
            onFinish: () => {
                setUploading((prev) => ({ ...prev, [scheduleId]: false }));
            },
        });
    };

    const getAttendanceForSchedule = (scheduleId: string) => {
        return bootcampItem?.attendances?.find((att) => att.bootcamp_schedule_id === scheduleId);
    };

    const handleSubmitSubmission = () => {
        if (!submissionUrl.trim() || !bootcampItem) {
            alert('Mohon isi link submission');
            return;
        }

        setSubmittingSubmission(true);

        router.post(
            route('profile.bootcamp.submission.submit'),
            {
                submission: submissionUrl,
                enrollment_id: bootcampItem.id,
            },
            {
                preserveState: false,
                preserveScroll: true,
                onSuccess: () => {
                    setShowSubmissionForm(false);
                },
                onError: (errors) => {
                    console.error('Submit errors:', errors);
                    alert('Gagal mengirim submission');
                },
                onFinish: () => {
                    setSubmittingSubmission(false);
                },
            },
        );
    };

    const handleSubmitReview = () => {
        if (!reviewText.trim() || rating === 0 || !bootcampItem) {
            alert('Mohon lengkapi rating dan review');
            return;
        }

        setSubmittingReview(true);

        router.post(
            route('profile.bootcamp.review.submit'),
            {
                rating: rating,
                review: reviewText,
                enrollment_id: bootcampItem.id,
            },
            {
                preserveState: false,
                preserveScroll: true,
                onSuccess: () => {
                    setShowReviewForm(false);
                },
                onError: (errors) => {
                    console.error('Submit errors:', errors);
                    alert('Gagal mengirim review');
                },
                onFinish: () => {
                    setSubmittingReview(false);
                },
            },
        );
    };

    if (!bootcampData || !bootcampItem) {
        return (
            <UserLayout>
                <Head title="Bootcamp Tidak Ditemukan" />
                <div className="flex h-screen items-center justify-center">
                    <p>Detail bootcamp tidak dapat ditemukan.</p>
                </div>
            </UserLayout>
        );
    }

    const bootcampEndDate = new Date(bootcampData.end_date);
    bootcampEndDate.setHours(23, 59, 59, 999);
    const lastSchedule = bootcampData.schedules?.[bootcampData.schedules.length - 1];
    const isCompleted = lastSchedule ? new Date(`${lastSchedule.schedule_date}T${lastSchedule.end_time}`) < new Date() : bootcampEndDate < new Date();

    const totalSchedules = bootcampData.schedules?.length || 0;
    const verifiedAttendances = bootcampItem.attendances?.filter((att) => att.verified).length || 0;
    const allAttendanceVerified = totalSchedules > 0 && verifiedAttendances === totalSchedules;

    const needsSubmission = bootcampData.has_submission_link;
    const hasSubmission = bootcampItem.submission && bootcampItem.submission_verified;
    const hasReview = bootcampItem.rating && bootcampItem.review;

    const hasCertificate =
        certificate && isCompleted && bootcampInvoiceStatus === 'paid' && allAttendanceVerified && (!needsSubmission || hasSubmission) && hasReview;

    return (
        <div>
            <Head title={bootcampData.title} />
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
                                    <Link href="/profile/my-bootcamps">Bootcamp Saya</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{bootcampData.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Hero Section */}
                    <div className="mb-8 overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Left: Image */}
                            <div className="relative aspect-video lg:aspect-auto">
                                <img
                                    src={bootcampData.thumbnail ? `/storage/${bootcampData.thumbnail}` : '/assets/images/placeholder.png'}
                                    alt={bootcampData.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Right: Info */}
                            <div className="flex flex-col justify-center p-6 lg:p-8">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        📌 Terdaftar{' '}
                                        {new Date(bootcampItem.created_at).toLocaleDateString('id-ID', {
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    {hasCertificate ? (
                                        <span className="flex items-center gap-1 rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            <Award size={14} />
                                            Sertifikat Tersedia
                                        </span>
                                    ) : null}
                                    {allAttendanceVerified ? (
                                        <span className="flex items-center gap-1 rounded-full border border-purple-300 bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                            <CheckCircle size={14} />
                                            Kehadiran Lengkap
                                        </span>
                                    ) : null}
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">{bootcampData.title}</h1>

                                <p className="mb-6 text-gray-600 dark:text-gray-400">{bootcampData.short_description}</p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                            <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {format(new Date(bootcampData.start_date), 'dd MMMM', { locale: id })} -{' '}
                                                {format(new Date(bootcampData.end_date), 'dd MMMM yyyy', { locale: id })}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Periode Bootcamp</p>
                                        </div>
                                    </div>

                                    {bootcampData.category ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                                                <Presentation size={18} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{bootcampData.category.name}</p>
                                            </div>
                                        </div>
                                    ) : null}

                                    {totalSchedules > 0 ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
                                                <GraduationCap size={18} className="text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Progress Kehadiran</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {verifiedAttendances}/{totalSchedules} Pertemuan (
                                                    {Math.round((verifiedAttendances / totalSchedules) * 100)}%)
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                {bootcampInvoiceStatus !== 'paid' ? (
                                    <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
                                        <p className="font-semibold text-red-700 dark:text-red-300">
                                            ⚠️ Selesaikan pembayaran untuk mengakses bootcamp!
                                        </p>
                                    </div>
                                ) : null}

                                {!isCompleted && bootcampInvoiceStatus === 'paid' ? (
                                    <div className="mt-6">
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={() => window.open(bootcampData.group_url ?? undefined, '_blank')}
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
                            {/* Success Message (After Bootcamp) */}
                            {isCompleted && hasCertificate ? (
                                <div className="overflow-hidden rounded-2xl border border-green-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-green-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-green-500 to-emerald-600 p-6 dark:border-gray-700">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="rounded-full bg-white p-2.5">
                                                <Award className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold">Selamat! Anda Telah Menyelesaikan Bootcamp!</h2>
                                                <p className="text-sm text-green-50">
                                                    Terima kasih atas dedikasi dan konsistensi Anda dalam mengikuti seluruh sesi pembelajaran
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                            <CheckCircle size={16} />
                                            <span>Selesai pada: {format(bootcampEndDate, 'dd MMMM yyyy', { locale: id })}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* Attendance Section */}
                            {bootcampInvoiceStatus === 'paid' && bootcampData.schedules && bootcampData.schedules.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-purple-500 to-pink-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <Upload className="h-5 w-5" />
                                            <h2 className="font-semibold">Bukti Kehadiran & Rekaman</h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        {bootcampData.schedules.map((schedule, idx) => {
                                            const attendance = getAttendanceForSchedule(schedule.id);
                                            const showForm = showUploadForms[schedule.id];
                                            const isUploading = uploading[schedule.id];
                                            const scheduleDate = new Date(schedule.schedule_date);
                                            const isPast = scheduleDate < new Date();
                                            const videoId = schedule.recording_url ? getYoutubeId(schedule.recording_url) : '';
                                            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

                                            return (
                                                <div
                                                    key={schedule.id}
                                                    className={`rounded-lg border p-4 ${
                                                        attendance?.verified
                                                            ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                                                            : attendance
                                                              ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                                                              : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                                                    {idx + 1}
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900 dark:text-white">Pertemuan {idx + 1}</p>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                        <Calendar size={14} />
                                                                        <span>
                                                                            {format(scheduleDate, 'dd MMM yyyy', { locale: id })} |{' '}
                                                                            {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)} WIB
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {attendance ? (
                                                                <div className="mt-2 flex items-center gap-2">
                                                                    {attendance.verified ? (
                                                                        <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                                                                            <CheckCircle size={14} />
                                                                            Terverifikasi
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                                                                            <Clock size={14} />
                                                                            Menunggu Verifikasi
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            {attendance?.verified ? (
                                                                <Button size="sm" variant="outline" disabled>
                                                                    <CheckCircle size={14} className="mr-1" />
                                                                    Verified
                                                                </Button>
                                                            ) : attendance ? (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        setShowUploadForms((prev) => ({
                                                                            ...prev,
                                                                            [schedule.id]: !showForm,
                                                                        }))
                                                                    }
                                                                >
                                                                    <Upload size={14} className="mr-1" />
                                                                    Edit
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    disabled={!isPast}
                                                                    onClick={() =>
                                                                        setShowUploadForms((prev) => ({
                                                                            ...prev,
                                                                            [schedule.id]: !showForm,
                                                                        }))
                                                                    }
                                                                >
                                                                    <Upload size={14} className="mr-1" />
                                                                    {isPast ? 'Upload' : 'Belum Dimulai'}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Recording Video */}
                                                    {schedule.recording_url && embedUrl ? (
                                                        <div className="mt-4 space-y-2">
                                                            <div className="flex items-center gap-2 text-sm font-medium text-blue-800 dark:text-blue-200">
                                                                <ExternalLink size={14} />
                                                                <span>Rekaman Pertemuan</span>
                                                            </div>
                                                            <div className="w-full">
                                                                <iframe
                                                                    className="aspect-video w-full rounded-lg border"
                                                                    src={embedUrl}
                                                                    title={`Recording Pertemuan ${idx + 1}`}
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : null}

                                                    {/* Upload Form */}
                                                    {showForm ? (
                                                        <div className="mt-4 space-y-3 rounded border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                                                            <div className="flex items-center justify-between">
                                                                <h5 className="text-sm font-medium">Upload Bukti Kehadiran</h5>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        setShowUploadForms((prev) => ({
                                                                            ...prev,
                                                                            [schedule.id]: false,
                                                                        }))
                                                                    }
                                                                >
                                                                    <X size={16} />
                                                                </Button>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor={`file_${schedule.id}`}>
                                                                    Screenshot/Foto <span className="text-red-500">*</span>
                                                                </Label>
                                                                <Input
                                                                    id={`file_${schedule.id}`}
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileSelect(schedule.id, e)}
                                                                />
                                                                <p className="text-xs text-gray-500">Format: JPG, PNG, WEBP. Max 5MB.</p>
                                                            </div>

                                                            {selectedFiles[schedule.id] && (
                                                                <div className="text-center">
                                                                    <img
                                                                        src={URL.createObjectURL(selectedFiles[schedule.id]!)}
                                                                        alt="Preview"
                                                                        className="mx-auto max-h-32 rounded-lg border"
                                                                    />
                                                                    <p className="mt-2 text-sm text-gray-600">{selectedFiles[schedule.id]?.name}</p>
                                                                </div>
                                                            )}

                                                            <div className="space-y-2">
                                                                <Label htmlFor={`notes_${schedule.id}`}>Catatan (Opsional)</Label>
                                                                <textarea
                                                                    id={`notes_${schedule.id}`}
                                                                    value={notes[schedule.id] || ''}
                                                                    onChange={(e) => setNotes((prev) => ({ ...prev, [schedule.id]: e.target.value }))}
                                                                    placeholder="Tambahkan catatan..."
                                                                    className="w-full rounded-lg border p-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                                                    rows={2}
                                                                    maxLength={500}
                                                                />
                                                                <p className="text-xs text-gray-500">{(notes[schedule.id] || '').length}/500</p>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        setShowUploadForms((prev) => ({
                                                                            ...prev,
                                                                            [schedule.id]: false,
                                                                        }))
                                                                    }
                                                                    className="flex-1"
                                                                >
                                                                    Batal
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleUploadAttendance(schedule.id)}
                                                                    disabled={!selectedFiles[schedule.id] || isUploading}
                                                                    className="flex-1"
                                                                >
                                                                    {isUploading ? 'Mengupload...' : 'Upload'}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : null}

                                                    {/* Show existing attendance proof */}
                                                    {attendance && !showForm ? (
                                                        <div className="mt-3">
                                                            <img
                                                                src={`/storage/${attendance.attendance_proof}`}
                                                                alt="Bukti"
                                                                className="mx-auto max-h-24 rounded border"
                                                            />
                                                            {attendance.notes && (
                                                                <p className="mt-2 text-sm text-gray-600">Catatan: {attendance.notes}</p>
                                                            )}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            );
                                        })}

                                        {totalSchedules > 0 ? (
                                            <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-800/50">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                                        Progress: {verifiedAttendances}/{totalSchedules}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-32 rounded-full bg-purple-200 dark:bg-purple-700">
                                                            <div
                                                                className="h-2 rounded-full bg-purple-600 transition-all"
                                                                style={{ width: `${(verifiedAttendances / totalSchedules) * 100}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                                                            {Math.round((verifiedAttendances / totalSchedules) * 100)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}

                            {/* About Section */}
                            {bootcampData.description ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <Presentation className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Tentang Bootcamp</h3>
                                        </div>
                                    </div>
                                    <div className="prose dark:prose-invert max-w-none p-6">
                                        <div dangerouslySetInnerHTML={{ __html: bootcampData.description }} />
                                    </div>
                                </div>
                            ) : null}

                            {/* Benefits */}
                            {benefitList.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Fasilitas yang Tersedia</h3>
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

                            {/* Curriculum */}
                            {curriculumList.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <ListOrdered className="h-5 w-5 text-purple-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Kurikulum Pembelajaran</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-6">
                                        {curriculumList.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
                                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600 dark:bg-purple-800 dark:text-purple-300">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Sidebar - 1 Column */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Submission Section */}
                            {bootcampInvoiceStatus === 'paid' && needsSubmission && allAttendanceVerified && isCompleted ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-blue-500 to-cyan-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <LinkIcon className="h-5 w-5" />
                                            <h2 className="font-semibold">Submission Project</h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        {hasSubmission ? (
                                            <div className="space-y-3">
                                                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <CheckCircle size={16} className="text-green-600" />
                                                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Terverifikasi</span>
                                                    </div>
                                                    <a
                                                        href={bootcampItem.submission!}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm break-all text-blue-600 hover:underline"
                                                    >
                                                        {bootcampItem.submission}
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Upload link project akhir Bootcamp untuk melanjutkan
                                                </p>
                                                {!showSubmissionForm ? (
                                                    <Button onClick={() => setShowSubmissionForm(true)} className="w-full">
                                                        <Upload size={16} className="mr-2" />
                                                        Upload Link Project
                                                    </Button>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-medium">Formulir Submission</h4>
                                                            <Button variant="ghost" size="sm" onClick={() => setShowSubmissionForm(false)}>
                                                                <X size={16} />
                                                            </Button>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="submission_url">
                                                                Link Project <span className="text-red-500">*</span>
                                                            </Label>
                                                            <Input
                                                                id="submission_url"
                                                                type="url"
                                                                value={submissionUrl}
                                                                onChange={(e) => setSubmissionUrl(e.target.value)}
                                                                placeholder="https://link-project-anda"
                                                            />
                                                            <p className="text-xs text-gray-500">Pastikan link dapat diakses publik</p>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Button variant="outline" onClick={() => setShowSubmissionForm(false)} className="flex-1">
                                                                Batal
                                                            </Button>
                                                            <Button
                                                                onClick={handleSubmitSubmission}
                                                                disabled={!submissionUrl.trim() || submittingSubmission}
                                                                className="flex-1"
                                                            >
                                                                {submittingSubmission ? 'Mengirim...' : 'Kirim'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {/* Review Section */}
                            {bootcampInvoiceStatus === 'paid' && allAttendanceVerified && (!needsSubmission || hasSubmission) && isCompleted ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-amber-500 to-orange-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <MessageSquare className="h-5 w-5" />
                                            <h2 className="font-semibold">Rating & Review</h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        {hasReview ? (
                                            <div className="space-y-3">
                                                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <CheckCircle size={16} className="text-green-600" />
                                                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                                            Review Terkirim
                                                        </span>
                                                    </div>
                                                    <StarRating rating={bootcampItem.rating || 0} readonly />
                                                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">"{bootcampItem.review}"</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Berikan rating dan review untuk mendapatkan sertifikat
                                                </p>
                                                {!showReviewForm ? (
                                                    <Button onClick={() => setShowReviewForm(true)} className="w-full">
                                                        <MessageSquare size={16} className="mr-2" />
                                                        Beri Rating & Review
                                                    </Button>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-medium">Formulir Review</h4>
                                                            <Button variant="ghost" size="sm" onClick={() => setShowReviewForm(false)}>
                                                                <X size={16} />
                                                            </Button>
                                                        </div>

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
                                                                className="w-full rounded-lg border p-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
                                                                rows={3}
                                                                maxLength={500}
                                                            />
                                                            <p className="text-xs text-gray-500">{reviewText.length}/500</p>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Button variant="outline" onClick={() => setShowReviewForm(false)} className="flex-1">
                                                                Batal
                                                            </Button>
                                                            <Button
                                                                onClick={handleSubmitReview}
                                                                disabled={!reviewText.trim() || rating === 0 || submittingReview}
                                                                className="flex-1"
                                                            >
                                                                {submittingReview ? 'Mengirim...' : 'Kirim'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {/* Certificate Section */}
                            <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-yellow-500" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Sertifikat Kelulusan</h3>
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
                                                src={`${route('profile.bootcamp.certificate.preview', { bootcamp: bootcampData.slug })}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                                className="h-[238px] w-full rounded-lg border"
                                                title="Preview"
                                                onLoad={handleIframeLoad}
                                            />
                                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                                Unduh sertifikat sebagai bukti kelulusan
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
                                                    <a href={route('profile.bootcamp.certificate', { bootcamp: bootcampData.slug })} target="_blank">
                                                        <Download size={16} className="mr-2" />
                                                        Unduh Sertifikat
                                                    </a>
                                                </Button>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <a
                                                        href={route('profile.bootcamp.certificate.preview', { bootcamp: bootcampData.slug })}
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
                                                    : bootcampInvoiceStatus !== 'paid'
                                                      ? 'Selesaikan pembayaran'
                                                      : !allAttendanceVerified
                                                        ? `Lengkapi kehadiran (${verifiedAttendances}/${totalSchedules})`
                                                        : needsSubmission && !hasSubmission
                                                          ? 'Upload submission'
                                                          : !hasReview
                                                            ? 'Berikan review'
                                                            : 'Menunggu bootcamp selesai'}
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
