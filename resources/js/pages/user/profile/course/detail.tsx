import RatingDialog from '@/components/rating-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserLayout from '@/layouts/user-layout';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Award, BadgeCheck, BookOpen, CheckCircle, Clock, Download, Eye, GraduationCap, Lightbulb, Play, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: string;
    name: string;
}

interface Course {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    level: string;
    category_id: string;
    category: Category;
    course_url: string;
    registration_url: string;
    key_points: string;
    description: string | null;
    short_description: string | null;
    status: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

interface EnrollmentCourseItem {
    id: string;
    invoice_id: string;
    course_id: string;
    course: Course;
    progress: number;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

interface CourseProps {
    id: string;
    invoice_code: string;
    invoice_url: string;
    amount: number;
    status: string;
    paid_at: string | null;
    user_id: string;
    course_items: EnrollmentCourseItem[];
    created_at: string;
    updated_at: string;
}

interface CourseRating {
    id: string;
    user_id: string;
    course_id: string;
    rating: number;
    review: string;
    status: 'pending' | 'approved' | 'rejected';
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

function parseList(items?: string | null): string[] {
    if (!items) return [];
    const matches = items.match(/<li>(.*?)<\/li>/g);
    if (!matches) return [];
    return matches.map((li) => li.replace(/<\/?li>/g, '').trim());
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`h-5 w-5 ${star <= rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};

export default function DetailMyCourse({
    course,
    courseRating,
    certificate,
    certificateParticipant,
}: {
    course: CourseProps | null;
    courseRating: CourseRating | null;
    certificate?: Certificate | null;
    certificateParticipant?: CertificateParticipant | null;
}) {
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    if (!course) {
        return (
            <UserLayout>
                <Head title="Kelas Tidak Ditemukan" />
                <div className="flex h-screen items-center justify-center">
                    <div className="text-center">
                        <p className="mb-4">Detail kelas tidak dapat ditemukan.</p>
                        <Button variant="outline" asChild>
                            <Link href="/profile/my-courses">Kembali Ke Kelas Saya</Link>
                        </Button>
                    </div>
                </div>
            </UserLayout>
        );
    }

    const courseItem = course.course_items?.[0];
    const courseData = courseItem?.course;
    const courseInvoiceStatus = course.status;
    const keyPointList = parseList(courseData?.key_points);
    const isCompleted = courseItem?.progress === 100;
    const hasCertificate = certificate && isCompleted && courseRating && courseInvoiceStatus === 'paid';

    if (!courseData || !courseItem) {
        return (
            <UserLayout>
                <Head title="Kelas Tidak Ditemukan" />
                <div className="flex h-screen items-center justify-center">
                    <p>Detail kelas tidak dapat ditemukan.</p>
                </div>
            </UserLayout>
        );
    }

    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner':
                return 'border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300';
            case 'intermediate':
                return 'border-orange-300 bg-orange-100 text-orange-700 dark:border-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
            case 'advanced':
                return 'border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300';
            default:
                return 'border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
        }
    };

    return (
        <div>
            <Head title={courseData.title} />
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
                                    <Link href="/profile/my-courses">Kelas Saya</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{courseData.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Hero Section */}
                    <div className="mb-8 overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Left: Image */}
                            <div className="relative aspect-video lg:aspect-auto">
                                <img
                                    src={courseData.thumbnail ? `/storage/${courseData.thumbnail}` : '/assets/images/placeholder.png'}
                                    alt={courseData.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Right: Info */}
                            <div className="flex flex-col justify-center p-6 lg:p-8">
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        📌 Terdaftar {format(new Date(courseItem.created_at), 'MMMM yyyy', { locale: id })}
                                    </span>
                                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getLevelColor(courseData.level)}`}>
                                        🎮 Level {courseData.level}
                                    </span>
                                    {hasCertificate ? (
                                        <span className="flex items-center gap-1 rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            <Award size={14} />
                                            Sertifikat Tersedia
                                        </span>
                                    ) : null}
                                    {isCompleted ? (
                                        <span className="flex items-center gap-1 rounded-full border border-purple-300 bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                            <CheckCircle size={14} />
                                            Selesai
                                        </span>
                                    ) : null}
                                </div>

                                <h1 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">{courseData.title}</h1>

                                <p className="mb-6 text-gray-600 dark:text-gray-400">{courseData.short_description}</p>

                                <div className="space-y-3">
                                    {courseData.category ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                                                <BookOpen size={18} className="text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{courseData.category.name}</p>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                                            <Clock size={18} className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Mode Pembelajaran</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Belajar Mandiri (Self-Paced)</p>
                                        </div>
                                    </div>

                                    {isCompleted && courseItem.completed_at ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                                                <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Diselesaikan pada</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {format(new Date(courseItem.completed_at), 'dd MMMM yyyy', { locale: id })}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                {courseInvoiceStatus !== 'paid' ? (
                                    <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
                                        <p className="font-semibold text-red-700 dark:text-red-300">
                                            ⚠️ Selesaikan pembayaran untuk mengakses kelas!
                                        </p>
                                    </div>
                                ) : null}

                                <div className="mt-6">
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={() => router.get(route('learn.course.detail', { course: courseData.slug }))}
                                        disabled={courseInvoiceStatus !== 'paid'}
                                    >
                                        <Play size={18} className="mr-2" />
                                        {isCompleted ? 'Lihat Kembali Materi' : 'Lanjutkan Belajar'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Content - 2 Columns */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Success Message (After Completion) */}
                            {isCompleted && hasCertificate ? (
                                <div className="overflow-hidden rounded-2xl border border-green-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-green-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-green-500 to-emerald-600 p-6 dark:border-gray-700">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="rounded-full bg-white p-2.5">
                                                <Award className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold">Selamat! Anda Telah Menyelesaikan Kelas!</h2>
                                                <p className="text-sm text-green-50">
                                                    Terima kasih atas dedikasi Anda dalam menyelesaikan seluruh materi pembelajaran
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                            <CheckCircle size={16} />
                                            <span>Selesai pada: {format(new Date(courseItem.completed_at!), 'dd MMMM yyyy', { locale: id })}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* Completion Message (Need Rating) */}
                            {isCompleted && !courseRating ? (
                                <div className="overflow-hidden rounded-2xl border border-blue-200 bg-white/95 shadow-xl backdrop-blur-sm dark:border-blue-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-blue-500 to-cyan-600 p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-between gap-3 text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-full bg-white p-2.5">
                                                    <Star className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold">Selamat Menyelesaikan Kelas!</h2>
                                                    <p className="text-sm text-blue-50">
                                                        Berikan rating dan review untuk mendapatkan sertifikat kelulusan
                                                    </p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="secondary" className="shrink-0" onClick={() => setIsRatingDialogOpen(true)}>
                                                <Star className="mr-2 h-4 w-4" />
                                                Beri Rating
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* Progress Section */}
                            <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-orange-600" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Progress Pembelajaran</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progres Anda</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{courseItem.progress}%</span>
                                        </div>
                                        <div className="h-3 w-full rounded-full bg-gray-200 shadow-inner dark:bg-gray-700">
                                            <div
                                                className={`relative h-3 rounded-full transition-all duration-500 ease-out ${
                                                    courseItem.progress === 100
                                                        ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg'
                                                        : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
                                                }`}
                                                style={{ width: `${courseItem.progress}%` }}
                                            >
                                                {courseItem.progress > 10 ? (
                                                    <div className="absolute inset-0 animate-pulse rounded-full bg-white/20"></div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                                            <div className="flex items-center gap-2">
                                                {isCompleted ? (
                                                    <>
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">Selesai</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="h-5 w-5 rounded-full border-2 border-blue-300 dark:border-blue-600"></div>
                                                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                            Sedang Berlangsung
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {isCompleted && courseItem.completed_at ? (
                                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                                Diselesaikan pada: {format(new Date(courseItem.completed_at), 'dd MMMM yyyy, HH:mm', { locale: id })}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            {courseData.description ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Tentang Kelas</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-700 dark:text-gray-300">{courseData.description}</p>
                                    </div>
                                </div>
                            ) : null}

                            {/* Key Points */}
                            {keyPointList.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                        <div className="flex items-center gap-2">
                                            <Lightbulb className="h-5 w-5 text-yellow-600" />
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Yang Akan Anda Pelajari</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-6">
                                        {keyPointList.map((keyPoint, idx) => (
                                            <div key={idx} className="flex items-start gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                                                <BadgeCheck size={18} className="mt-0.5 min-w-6 text-green-600" />
                                                <p className="text-gray-700 dark:text-gray-300">{keyPoint}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Sidebar - 1 Column */}
                        <div className="space-y-6 lg:col-span-1">
                            {/* Rating Display */}
                            {courseRating ? (
                                <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                    <div className="border-b bg-gradient-to-r from-amber-500 to-orange-600 p-4 dark:border-gray-700">
                                        <div className="flex items-center gap-2 text-white">
                                            <Star className="h-5 w-5" />
                                            <h2 className="font-semibold">Rating & Review Anda</h2>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                                            <div className="mb-2 flex items-center gap-2">
                                                <CheckCircle size={16} className="text-green-600" />
                                                <span className="text-sm font-medium text-green-800 dark:text-green-200">Review Terkirim</span>
                                            </div>
                                            <StarRating rating={courseRating.rating} />
                                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">"{courseRating.review}"</p>
                                        </div>
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
                                                src={`${route('profile.course.certificate.preview', { course: courseData.slug })}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
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
                                                    <a href={route('profile.course.certificate', { course: courseData.slug })} target="_blank">
                                                        <Download size={16} className="mr-2" />
                                                        Unduh Sertifikat
                                                    </a>
                                                </Button>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <a
                                                        href={route('profile.course.certificate.preview', { course: courseData.slug })}
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
                                                    : courseInvoiceStatus !== 'paid'
                                                      ? 'Selesaikan pembayaran'
                                                      : !isCompleted
                                                        ? `Selesaikan pembelajaran (${courseItem.progress}%)`
                                                        : !courseRating
                                                          ? 'Berikan rating & review'
                                                          : 'Sertifikat sedang diproses'}
                                            </p>
                                            <Button variant="outline" className="w-full" disabled>
                                                <Download size={16} className="mr-2" />
                                                Sertifikat Belum Tersedia
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Action */}
                            <div className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
                                <div className="border-b bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5 text-purple-600" />
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Akses Pembelajaran</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <Button
                                        className="w-full"
                                        onClick={() => router.get(route('learn.course.detail', { course: courseData.slug }))}
                                        disabled={courseInvoiceStatus !== 'paid'}
                                    >
                                        <Play size={16} className="mr-2" />
                                        {isCompleted ? 'Lihat Kembali Materi' : 'Lanjutkan Belajar'}
                                    </Button>
                                    <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                                        {courseInvoiceStatus === 'paid' ? 'Akses selamanya untuk materi ini' : 'Selesaikan pembayaran untuk akses'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {courseData ? (
                <RatingDialog
                    isOpen={isRatingDialogOpen}
                    onClose={() => setIsRatingDialogOpen(false)}
                    course={{
                        id: courseData.id,
                        title: courseData.title,
                        thumbnail: courseData.thumbnail,
                        description: courseData.description || courseData.short_description || '',
                    }}
                />
            ) : null}
        </div>
    );
}
