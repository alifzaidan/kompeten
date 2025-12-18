import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Course {
    title: string;
    short_description?: string | null;
    level: 'beginner' | 'intermediate' | 'advanced';
    created_at: string;
    updated_at: string;
}

interface HeroSectionProps {
    course: Course;
    onRegisterClick: () => void;
}

export default function HeroSection({ course, onRegisterClick }: HeroSectionProps) {
    return (
        <section className="relative py-12 text-gray-900">
            <div className="relative mx-auto max-w-7xl px-4">
                <div className="col-span-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Beranda</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/course">Kelas Online</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{course.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <p className="mt-8 mb-4 text-xl text-gray-600 dark:text-gray-400">{course.short_description}</p>

                    <h1 className="mb-4 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">{course.title}</h1>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tingkatan:</span>
                        <span
                            className={
                                course.level === 'beginner'
                                    ? 'rounded-full border border-green-300 bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300'
                                    : course.level === 'intermediate'
                                      ? 'rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                      : 'rounded-full border border-red-300 bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300'
                            }
                        >
                            {course.level === 'beginner' ? 'Beginner' : course.level === 'intermediate' ? 'Intermediate' : 'Advanced'}
                        </span>
                    </div>
                    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button onClick={onRegisterClick}>Daftar Sekarang</Button>
                        <Button variant="outline" asChild>
                            <a
                                href={`https://wa.me/+6289528514480?text=${encodeURIComponent(`Halo, saya ingin mendaftar ${course.title}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hubungi Kami
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
