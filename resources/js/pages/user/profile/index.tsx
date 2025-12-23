import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProfileLayout from '@/layouts/profile/layout';
import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BookTextIcon, ExternalLink, GraduationCap, MessageCircle, MonitorPlay, Play, Presentation } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    slug: string;
    type: 'course' | 'bootcamp' | 'webinar';
    progress?: number;
    completed_at?: string;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    group_url?: string;
    enrolled_at: string;
}

interface ProfileProps {
    stats: {
        courses: number;
        bootcamps: number;
        webinars: number;
        total: number;
    };
    recentProducts: Product[];
}

export default function Profile({ stats, recentProducts }: ProfileProps) {
    const getProductTypeLabel = (type: string): string => {
        switch (type) {
            case 'course':
                return 'Kelas Online';
            case 'bootcamp':
                return 'Bootcamp';
            case 'webinar':
                return 'Webinar';
            default:
                return 'Produk';
        }
    };

    const getProductTypeIcon = (type: string) => {
        switch (type) {
            case 'course':
                return <BookTextIcon className="h-4 w-4" />;
            case 'bootcamp':
                return <Presentation className="h-4 w-4" />;
            case 'webinar':
                return <MonitorPlay className="h-4 w-4" />;
            default:
                return <GraduationCap className="h-4 w-4" />;
        }
    };

    const getProgressBadge = (progress: number) => {
        if (progress === 100) {
            return (
                <Badge className="border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Selesai
                </Badge>
            );
        } else if (progress > 0) {
            return (
                <Badge className="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Berlangsung
                </Badge>
            );
        } else {
            return (
                <Badge className="border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
                    Belum Dimulai
                </Badge>
            );
        }
    };

    const formatSchedule = (product: Product): string => {
        if (product.type === 'bootcamp') {
            const startDate = format(new Date(product.start_date!), 'dd MMM yyyy', { locale: id });
            const endDate = product.end_date ? format(new Date(product.end_date), 'dd MMM yyyy', { locale: id }) : '';
            return endDate ? `${startDate} - ${endDate}` : startDate;
        }

        if (product.type === 'webinar') {
            const startTime = format(new Date(product.start_time!), 'dd MMM yyyy, HH:mm', { locale: id });
            const endTime = product.end_time ? format(new Date(product.end_time), 'HH:mm', { locale: id }) : '';
            return endTime ? `${startTime} - ${endTime}` : startTime;
        }

        return '-';
    };

    return (
        <UserLayout>
            <Head title="Dashboard" />

            <ProfileLayout>
                <div className="space-y-6">
                    <Heading title="Dashboard" description="Pantau aktivitas dan progres belajar Anda di sini." />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-br from-orange-50 to-orange-100/50 pb-2 dark:border-gray-700 dark:from-orange-900/20 dark:to-orange-900/10">
                                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Produk</CardTitle>
                                <div className="rounded-full bg-white p-2.5 shadow-sm dark:bg-gray-800">
                                    <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Total item yang Anda ikuti</p>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-br from-blue-50 to-blue-100/50 pb-2 dark:border-gray-700 dark:from-blue-900/20 dark:to-blue-900/10">
                                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Kelas Online</CardTitle>
                                <div className="rounded-full bg-white p-2.5 shadow-sm dark:bg-gray-800">
                                    <BookTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.courses}</div>
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Kelas yang telah Anda beli</p>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-br from-purple-50 to-purple-100/50 pb-2 dark:border-gray-700 dark:from-purple-900/20 dark:to-purple-900/10">
                                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Bootcamp</CardTitle>
                                <div className="rounded-full bg-white p-2.5 shadow-sm dark:bg-gray-800">
                                    <Presentation className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.bootcamps}</div>
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Bootcamp yang Anda ikuti</p>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-br from-green-50 to-green-100/50 pb-2 dark:border-gray-700 dark:from-green-900/20 dark:to-green-900/10">
                                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Webinar</CardTitle>
                                <div className="rounded-full bg-white p-2.5 shadow-sm dark:bg-gray-800">
                                    <MonitorPlay className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.webinars}</div>
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Webinar yang Anda ikuti</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Heading title="Produk Saya" description="Daftar produk yang telah Anda beli dan ikuti." />
                        <Card className="overflow-hidden rounded-2xl border bg-white/95 shadow-xl backdrop-blur-sm dark:bg-gray-800/95">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-900/50">
                                            <TableHead className="font-semibold text-gray-900 dark:text-white">Produk</TableHead>
                                            <TableHead className="font-semibold text-gray-900 dark:text-white">Tipe</TableHead>
                                            <TableHead className="font-semibold text-gray-900 dark:text-white">Jadwal</TableHead>
                                            <TableHead className="font-semibold text-gray-900 dark:text-white">Status/Progress</TableHead>
                                            <TableHead className="font-semibold text-gray-900 dark:text-white">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentProducts.length > 0 ? (
                                            recentProducts.map((product) => (
                                                <TableRow key={`${product.type}-${product.id}`} className="border-gray-200 dark:border-gray-700">
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            {getProductTypeIcon(product.type)}
                                                            <Link
                                                                href={route(`profile.${product.type}.detail`, { [product.type]: product.slug })}
                                                                className="text-gray-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
                                                            >
                                                                {product.title}
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-gray-700 dark:text-gray-300">
                                                        {getProductTypeLabel(product.type)}
                                                    </TableCell>
                                                    <TableCell className="text-gray-700 dark:text-gray-300">
                                                        {product.type === 'course' ? (
                                                            <span className="text-gray-500 dark:text-gray-400">Belajar Mandiri</span>
                                                        ) : (
                                                            formatSchedule(product)
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.type === 'course' ? (
                                                            <div className="space-y-2">
                                                                {getProgressBadge(product.progress || 0)}
                                                                <div className="flex items-center gap-2">
                                                                    <Progress value={product.progress || 0} className="w-20" />
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {product.progress || 0}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Badge
                                                                variant="outline"
                                                                className="border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                            >
                                                                Terdaftar
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {product.type === 'course' ? (
                                                                <Button asChild size="sm" variant="outline">
                                                                    <Link href={route('profile.course.detail', { course: product.slug })}>
                                                                        <Play className="mr-1 h-4 w-4" />
                                                                        Belajar
                                                                    </Link>
                                                                </Button>
                                                            ) : (
                                                                <>
                                                                    <Button asChild size="sm" variant="outline">
                                                                        <Link
                                                                            href={route(`profile.${product.type}.detail`, {
                                                                                [product.type]: product.slug,
                                                                            })}
                                                                        >
                                                                            <ExternalLink className="mr-1 h-4 w-4" />
                                                                            Detail
                                                                        </Link>
                                                                    </Button>
                                                                    {product.group_url && (
                                                                        <Button asChild size="sm" variant="default">
                                                                            <a href={product.group_url} target="_blank" rel="noopener noreferrer">
                                                                                <MessageCircle className="mr-1 h-4 w-4" />
                                                                                Grup WA
                                                                            </a>
                                                                        </Button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="py-8 text-center">
                                                    <div className="text-gray-500">
                                                        <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
                                                        <p className="text-gray-700 dark:text-gray-300">Belum ada produk yang dibeli.</p>
                                                        <Button asChild className="mt-4" variant="outline">
                                                            <Link href={route('course.index')}>Jelajahi Kelas</Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </div>
                </div>
            </ProfileLayout>
        </UserLayout>
    );
}
