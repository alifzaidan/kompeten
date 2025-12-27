import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BookOpen, BookText, FileText, Video } from 'lucide-react';
import { motion } from 'motion/react';

interface Mentor {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
    total_courses: number;
    total_articles: number;
    total_webinars: number;
    total_bootcamps: number;
}

interface MentorIndexProps {
    mentors: Mentor[];
}

export default function MentorIndex({ mentors }: MentorIndexProps) {
    const getInitials = useInitials();

    const stats = [
        { key: 'courses', label: 'Kelas', icon: BookText, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950' },
        { key: 'articles', label: 'Artikel', icon: FileText, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950' },
        { key: 'webinars', label: 'Webinar', icon: Video, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50 dark:bg-green-950' },
        { key: 'bootcamps', label: 'Bootcamp', icon: BookOpen, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-950' },
    ];

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
            <Head title="Mentor Kami" />

            <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                {/* Hero Section */}
                <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24">
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-gradient-to-l from-orange-200/30 to-transparent blur-3xl"></div>
                        <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-gradient-to-r from-blue-200/30 to-transparent blur-3xl"></div>
                    </div>

                    <div className="relative mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
                                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-4 py-2 text-sm font-semibold text-orange-600 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-400">
                                    👨‍🏫 Tim Profesional Kami
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
                            >
                                Belajar dari Para Ahli
                                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    Terbaik di Bidangnya
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400"
                            >
                                Mentor kami adalah praktisi berpengalaman yang siap membimbing Anda menuju kesuksesan karir
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Mentors Grid */}
                <section className="relative px-4 py-8 md:px-6 md:py-12">
                    <div className="mx-auto max-w-7xl">
                        {mentors.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                            >
                                {mentors.map((mentor) => (
                                    <motion.div key={mentor.id} variants={itemVariants}>
                                        <Link href={`/mentor/${mentor.id}`} className="group h-full">
                                            <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-orange-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-orange-600">
                                                {/* Top gradient accent */}
                                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                                <div className="flex flex-col p-8">
                                                    {/* Avatar Section */}
                                                    <div className="mb-6 flex justify-center">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400 to-purple-500 opacity-25 blur-lg transition-opacity duration-300 group-hover:opacity-40"></div>
                                                            <Avatar className="ring-primary/20 group-hover:ring-primary/50 relative h-24 w-24 ring-4 transition-all duration-300">
                                                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                                                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-purple-500 text-2xl font-bold text-white">
                                                                    {getInitials(mentor.name)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                    </div>

                                                    {/* Info Section */}
                                                    <div className="mb-6 text-center">
                                                        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                                                            {mentor.name}
                                                        </h3>
                                                        {mentor.bio && (
                                                            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{mentor.bio}</p>
                                                        )}
                                                    </div>

                                                    {/* Stats Grid */}
                                                    <div className="mb-6 grid grid-cols-2 gap-3">
                                                        {[
                                                            { value: mentor.total_courses, label: 'Kelas', icon: BookText },
                                                            { value: mentor.total_articles, label: 'Artikel', icon: FileText },
                                                            { value: mentor.total_webinars, label: 'Webinar', icon: Video },
                                                            { value: mentor.total_bootcamps, label: 'Bootcamp', icon: BookOpen },
                                                        ].map((stat, idx) => {
                                                            const StatIcon = stat.icon;
                                                            const colors = stats[idx];
                                                            return (
                                                                <div
                                                                    key={stat.label}
                                                                    className={`group/stat rounded-xl ${colors.bgColor} p-3 text-center transition-all duration-300 hover:shadow-md`}
                                                                >
                                                                    <div className={`mb-1.5 flex justify-center text-lg`}>
                                                                        <StatIcon
                                                                            className={`h-5 w-5 text-gray-600 transition-colors group-hover/stat:text-orange-600 dark:text-gray-400 dark:group-hover/stat:text-orange-400`}
                                                                        />
                                                                    </div>
                                                                    <p
                                                                        className={`bg-gradient-to-r text-lg font-bold ${colors.color} bg-clip-text text-transparent`}
                                                                    >
                                                                        {stat.value}
                                                                    </p>
                                                                    <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
                                                                        {stat.label}
                                                                    </p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* CTA Button */}
                                                    <Button className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50">
                                                        <span className="relative flex items-center justify-center gap-2">
                                                            Lihat Profile
                                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600"
                            >
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-6 text-7xl">
                                    👨‍🏫
                                </motion.div>
                                <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Belum Ada Mentor</p>
                                <p className="text-center text-gray-600 dark:text-gray-400">
                                    Mentor akan segera hadir untuk membantu <br /> pembelajaran Anda
                                </p>
                            </motion.div>
                        )}
                    </div>
                </section>
            </div>
        </UserLayout>
    );
}
