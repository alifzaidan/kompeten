import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInitials } from '@/hooks/use-initials';
import UserLayout from '@/layouts/user-layout';
import { rupiahFormatter } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowRight, BookOpen, BookText, Calendar, CalendarDays, Clock, Eye, FileText, Mail, Phone, Star, Users, Video } from 'lucide-react';
import { motion } from 'motion/react';

interface Category {
    id: string;
    name: string;
}

interface Course {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    category: Category;
    price: number;
    discount_price?: number;
    level: string;
    students_count: number;
    rating: number;
}

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    thumbnail?: string;
    category: Category;
    read_time: number;
    views: number;
    published_at: string;
}

interface Webinar {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    category: Category;
    price: number;
    strikethrough_price: number;
    start_time: string;
    end_time: string;
    batch?: number;
    registration_deadline: string;
    is_registration_closed: boolean;
}

interface Bootcamp {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    category: Category;
    price: number;
    strikethrough_price: number;
    start_date: string;
    end_date: string;
    batch?: number;
    registration_deadline: string;
    is_registration_closed: boolean;
    duration_weeks: number;
}

interface Mentor {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
    email: string;
    phone_number?: string;
}

interface Stats {
    total_courses: number;
    total_articles: number;
    total_webinars: number;
    total_bootcamps: number;
}

interface MentorShowProps {
    mentor: Mentor;
    courses: Course[];
    articles: Article[];
    webinars: Webinar[];
    bootcamps: Bootcamp[];
    stats: Stats;
}

export default function MentorShow({ mentor, courses, articles, webinars, bootcamps, stats }: MentorShowProps) {
    const getInitials = useInitials();

    const levelColors: Record<string, string> = {
        beginner: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
        intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400',
        advanced: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    };

    const levelLabels: Record<string, string> = {
        beginner: 'Pemula',
        intermediate: 'Menengah',
        advanced: 'Lanjutan',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <UserLayout>
            <Head title={`Mentor - ${mentor.name}`} />

            <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                {/* Hero Section with Background */}
                <section className="relative overflow-hidden px-4 py-12 md:px-6 md:py-20">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-gradient-to-l from-orange-200/30 to-transparent blur-3xl"></div>
                        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gradient-to-r from-purple-200/30 to-transparent blur-3xl"></div>
                    </div>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative mx-auto max-w-5xl"
                    >
                        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-12 md:text-left">
                            {/* Avatar */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 h-32 w-32 rounded-3xl bg-gradient-to-br from-orange-400 to-purple-500 opacity-30 blur-2xl"></div>
                                    <Avatar className="ring-primary/20 relative h-32 w-32 ring-4">
                                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-purple-500 text-5xl font-bold text-white">
                                            {getInitials(mentor.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </motion.div>

                            {/* Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1"
                            >
                                <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">{mentor.name}</h1>

                                <p className="text-muted-foreground mb-6 text-base md:text-lg">
                                    {mentor.bio || 'Mentor profesional di Kompeten yang siap membimbing Anda'}
                                </p>

                                {/* Contact Info */}
                                <div className="mb-6 flex flex-col gap-3 text-sm md:flex-row md:gap-6">
                                    {mentor.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail className="text-primary h-5 w-5" />
                                            <span className="text-gray-600 dark:text-gray-400">{mentor.email}</span>
                                        </div>
                                    )}
                                    {mentor.phone_number && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="text-primary h-5 w-5" />
                                            <span className="text-gray-600 dark:text-gray-400">{mentor.phone_number}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Stats Cards */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="grid grid-cols-2 gap-3 md:grid-cols-4"
                                >
                                    {[
                                        { value: stats.total_courses, label: 'Kelas', icon: BookText, color: 'from-blue-500 to-blue-600' },
                                        { value: stats.total_bootcamps, label: 'Bootcamp', icon: BookOpen, color: 'from-orange-500 to-orange-600' },
                                        { value: stats.total_webinars, label: 'Webinar', icon: Video, color: 'from-green-500 to-green-600' },
                                        { value: stats.total_articles, label: 'Artikel', icon: FileText, color: 'from-purple-500 to-purple-600' },
                                    ].map((stat) => {
                                        const StatIcon = stat.icon;
                                        return (
                                            <div
                                                key={stat.label}
                                                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <div className="mb-1 flex items-center justify-between">
                                                    <p className={`bg-gradient-to-r ${stat.color} bg-clip-text text-2xl font-bold text-transparent`}>
                                                        {stat.value}
                                                    </p>
                                                    <StatIcon className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                                                </div>
                                                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Content Section */}
                <section className="relative px-4 py-8 md:px-6 md:py-12">
                    <div className="mx-auto max-w-5xl">
                        <Tabs defaultValue="courses" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
                                <TabsTrigger
                                    value="courses"
                                    className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm md:text-sm dark:data-[state=active]:bg-gray-700"
                                >
                                    <BookText className="mr-1 h-4 w-4" />
                                    <span className="hidden sm:inline">Kelas</span>
                                    <span className="sm:hidden">{courses.length}</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="bootcamps"
                                    className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm md:text-sm dark:data-[state=active]:bg-gray-700"
                                >
                                    <BookOpen className="mr-1 h-4 w-4" />
                                    <span className="hidden sm:inline">Bootcamp</span>
                                    <span className="sm:hidden">{bootcamps.length}</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="webinars"
                                    className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm md:text-sm dark:data-[state=active]:bg-gray-700"
                                >
                                    <Video className="mr-1 h-4 w-4" />
                                    <span className="hidden sm:inline">Webinar</span>
                                    <span className="sm:hidden">{webinars.length}</span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="articles"
                                    className="rounded-lg text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm md:text-sm dark:data-[state=active]:bg-gray-700"
                                >
                                    <FileText className="mr-1 h-4 w-4" />
                                    <span className="hidden sm:inline">Artikel</span>
                                    <span className="sm:hidden">{articles.length}</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Courses Tab */}
                            <TabsContent value="courses" className="mt-8">
                                {courses.length > 0 ? (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {courses.map((course) => (
                                            <motion.div key={course.id} variants={itemVariants}>
                                                <Link href={`/course/${course.slug}`} className="group h-full">
                                                    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-orange-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                                                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                                        <div className="aspect-video overflow-hidden">
                                                            <img
                                                                src={
                                                                    course.thumbnail
                                                                        ? `/storage/${course.thumbnail}`
                                                                        : '/assets/images/placeholder.png'
                                                                }
                                                                alt={course.title}
                                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="mb-3 flex items-center justify-between gap-2">
                                                                <Badge variant="secondary" className="text-xs">
                                                                    {course.category.name}
                                                                </Badge>
                                                                <Badge
                                                                    className={`text-xs ${levelColors[course.level] || 'bg-gray-100 text-gray-700'}`}
                                                                >
                                                                    {levelLabels[course.level] || course.level}
                                                                </Badge>
                                                            </div>

                                                            <h3 className="group-hover:text-primary mb-3 line-clamp-2 font-semibold transition-colors">
                                                                {course.title}
                                                            </h3>

                                                            <div className="text-muted-foreground mb-4 flex items-center gap-4 text-xs">
                                                                <div className="flex items-center gap-1">
                                                                    <Users className="h-3.5 w-3.5" />
                                                                    {course.students_count} siswa
                                                                </div>
                                                                {course.rating > 0 && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                                        {course.rating.toFixed(1)}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <Separator className="mb-4" />

                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    {course.discount_price ? (
                                                                        <>
                                                                            <p className="text-muted-foreground text-xs line-through">
                                                                                {rupiahFormatter.format(course.price)}
                                                                            </p>
                                                                            <p className="text-primary text-lg font-bold">
                                                                                {rupiahFormatter.format(course.discount_price)}
                                                                            </p>
                                                                        </>
                                                                    ) : (
                                                                        <p className="text-primary text-lg font-bold">
                                                                            {course.price === 0 ? 'Gratis' : rupiahFormatter.format(course.price)}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <ArrowRight className="text-muted-foreground h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <EmptyState title="Belum ada kelas" description="Mentor belum membuat kelas apapun." />
                                )}
                            </TabsContent>

                            {/* Bootcamps Tab */}
                            <TabsContent value="bootcamps" className="mt-8">
                                {bootcamps.length > 0 ? (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {bootcamps.map((bootcamp) => {
                                            const isDisabled = bootcamp.is_registration_closed;

                                            return (
                                                <motion.div key={bootcamp.id} variants={itemVariants}>
                                                    {!isDisabled ? (
                                                        <Link href={`/bootcamp/${bootcamp.slug}`} className="group h-full">
                                                            <BootcampCard bootcamp={bootcamp} isDisabled={isDisabled} />
                                                        </Link>
                                                    ) : (
                                                        <div className="group h-full">
                                                            <BootcampCard bootcamp={bootcamp} isDisabled={isDisabled} />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                ) : (
                                    <EmptyState title="Belum ada bootcamp" description="Mentor belum mengajar bootcamp apapun." />
                                )}
                            </TabsContent>

                            {/* Webinars Tab */}
                            <TabsContent value="webinars" className="mt-8">
                                {webinars.length > 0 ? (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {webinars.map((webinar) => {
                                            const isDisabled = webinar.is_registration_closed;

                                            return (
                                                <motion.div key={webinar.id} variants={itemVariants}>
                                                    {!isDisabled ? (
                                                        <Link href={`/webinar/${webinar.slug}`} className="group h-full">
                                                            <WebinarCard webinar={webinar} isDisabled={isDisabled} />
                                                        </Link>
                                                    ) : (
                                                        <div className="group h-full">
                                                            <WebinarCard webinar={webinar} isDisabled={isDisabled} />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                ) : (
                                    <EmptyState title="Belum ada webinar" description="Mentor belum mengadakan webinar apapun." />
                                )}
                            </TabsContent>

                            {/* Articles Tab */}
                            <TabsContent value="articles" className="mt-8">
                                {articles.length > 0 ? (
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                                    >
                                        {articles.map((article) => (
                                            <motion.div key={article.id} variants={itemVariants}>
                                                <Link href={`/article/${article.slug}`} className="group h-full">
                                                    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-orange-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
                                                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                                        <div className="aspect-video overflow-hidden">
                                                            <img
                                                                src={
                                                                    article.thumbnail
                                                                        ? `/storage/${article.thumbnail}`
                                                                        : '/assets/images/placeholder.png'
                                                                }
                                                                alt={article.title}
                                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                        </div>
                                                        <div className="p-4">
                                                            <Badge variant="secondary" className="mb-3 text-xs">
                                                                {article.category.name}
                                                            </Badge>

                                                            <h3 className="group-hover:text-primary mb-2 line-clamp-2 font-semibold transition-colors">
                                                                {article.title}
                                                            </h3>

                                                            {article.excerpt && (
                                                                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">{article.excerpt}</p>
                                                            )}

                                                            <Separator className="mb-3" />

                                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock className="h-3.5 w-3.5" />
                                                                        {article.read_time} min
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Eye className="h-3.5 w-3.5" />
                                                                        {article.views}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar className="h-3.5 w-3.5" />
                                                                    {format(new Date(article.published_at), 'dd MMM', { locale: id })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <EmptyState title="Belum ada artikel" description="Mentor belum membuat artikel apapun." />
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}

// Helper Components
function BootcampCard({ bootcamp, isDisabled }: { bootcamp: Bootcamp; isDisabled: boolean }) {
    return (
        <div
            className={`relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 ${
                isDisabled ? 'opacity-60' : 'group-hover:border-orange-300 group-hover:shadow-xl'
            } dark:border-gray-700 dark:bg-gray-800`}
        >
            <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 transition-opacity duration-300 ${!isDisabled && 'group-hover:opacity-100'}`}
            ></div>

            <div className="relative aspect-video overflow-hidden">
                <img
                    src={bootcamp.thumbnail ? `/storage/${bootcamp.thumbnail}` : '/assets/images/placeholder.png'}
                    alt={bootcamp.title}
                    className={`h-full w-full object-cover ${!isDisabled && 'transition-transform duration-300 group-hover:scale-110'}`}
                />
                {isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold">
                            Pendaftaran Ditutup
                        </Badge>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs">
                        {bootcamp.category.name}
                    </Badge>
                    {bootcamp.batch && (
                        <Badge variant="outline" className="text-xs">
                            Batch {bootcamp.batch}
                        </Badge>
                    )}
                </div>

                <h3 className={`mb-3 line-clamp-2 font-semibold transition-colors ${!isDisabled && 'group-hover:text-primary'}`}>{bootcamp.title}</h3>

                <div className="text-muted-foreground mb-4 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {format(new Date(bootcamp.start_date), 'dd MMM', { locale: id })} -{' '}
                        {format(new Date(bootcamp.end_date), 'dd MMM yyyy', { locale: id })}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Durasi: {bootcamp.duration_weeks} minggu
                    </div>
                </div>

                <Separator className="mb-4" />

                <div className="flex items-center justify-between">
                    <div>
                        {bootcamp.strikethrough_price > 0 && (
                            <p className="text-muted-foreground text-xs line-through">{rupiahFormatter.format(bootcamp.strikethrough_price)}</p>
                        )}
                        <p className={`text-lg font-bold ${isDisabled ? 'text-gray-500' : 'text-primary'}`}>
                            {bootcamp.price === 0 ? 'Gratis' : rupiahFormatter.format(bootcamp.price)}
                        </p>
                    </div>
                    {!isDisabled && (
                        <ArrowRight className="text-muted-foreground h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                </div>
            </div>
        </div>
    );
}

function WebinarCard({ webinar, isDisabled }: { webinar: Webinar; isDisabled: boolean }) {
    return (
        <div
            className={`relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 ${
                isDisabled ? 'opacity-60' : 'group-hover:border-orange-300 group-hover:shadow-xl'
            } dark:border-gray-700 dark:bg-gray-800`}
        >
            <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 transition-opacity duration-300 ${!isDisabled && 'group-hover:opacity-100'}`}
            ></div>

            <div className="relative aspect-video overflow-hidden">
                <img
                    src={webinar.thumbnail ? `/storage/${webinar.thumbnail}` : '/assets/images/placeholder.png'}
                    alt={webinar.title}
                    className={`h-full w-full object-cover ${!isDisabled && 'transition-transform duration-300 group-hover:scale-110'}`}
                />
                {isDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold">
                            Pendaftaran Ditutup
                        </Badge>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-xs">
                        {webinar.category.name}
                    </Badge>
                    {webinar.batch && (
                        <Badge variant="outline" className="text-xs">
                            Batch {webinar.batch}
                        </Badge>
                    )}
                </div>

                <h3 className={`mb-3 line-clamp-2 font-semibold transition-colors ${!isDisabled && 'group-hover:text-primary'}`}>{webinar.title}</h3>

                <div className="text-muted-foreground mb-4 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {format(new Date(webinar.start_time), 'dd MMM yyyy', { locale: id })}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {format(new Date(webinar.start_time), 'HH:mm', { locale: id })} -{' '}
                        {format(new Date(webinar.end_time), 'HH:mm', { locale: id })} WIB
                    </div>
                </div>

                <Separator className="mb-4" />

                <div className="flex items-center justify-between">
                    <div>
                        {webinar.strikethrough_price > 0 && (
                            <p className="text-muted-foreground text-xs line-through">{rupiahFormatter.format(webinar.strikethrough_price)}</p>
                        )}
                        <p className={`text-lg font-bold ${isDisabled ? 'text-gray-500' : 'text-primary'}`}>
                            {webinar.price === 0 ? 'Gratis' : rupiahFormatter.format(webinar.price)}
                        </p>
                    </div>
                    {!isDisabled && (
                        <ArrowRight className="text-muted-foreground h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                </div>
            </div>
        </div>
    );
}

function EmptyState({ title, description }: { title: string; description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600"
        >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-4 text-5xl">
                📝
            </motion.div>
            <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
            <p className="text-center text-gray-600 dark:text-gray-400">{description}</p>
        </motion.div>
    );
}
