import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Magnetic } from '@/components/ui/magnetic';
import { Link } from '@inertiajs/react';
import { GalleryVerticalEnd, Percent } from 'lucide-react';
import { useRef, useState } from 'react';

type Category = {
    id: string;
    name: string;
};

interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    slug: string;
    strikethrough_price: number;
    price: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: Category;
    user?: {
        name: string;
        avatar?: string;
        bio?: string;
    };
}

interface CourseProps {
    categories: Category[];
    courses: Course[];
    myCourseIds: string[];
}

export default function CoursesSection({ categories, courses, myCourseIds }: CourseProps) {
    const [level, setLevel] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const categoryRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.pageX - (categoryRef.current?.offsetLeft ?? 0);
        scrollLeft.current = categoryRef.current?.scrollLeft ?? 0;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !categoryRef.current) return;
        e.preventDefault();
        const x = e.pageX - categoryRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        categoryRef.current.scrollLeft = scrollLeft.current - walk;
    };

    // Calculate discount percentage
    const calculateDiscount = (original: number, discounted: number) => {
        if (original === 0) return 0;
        return Math.round(((original - discounted) / original) * 100);
    };

    // Get level badge
    const getLevelBadge = (courseLevel: string) => {
        switch (courseLevel) {
            case 'beginner':
                return (
                    <Badge className="border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300">
                        Beginner
                    </Badge>
                );
            case 'intermediate':
                return (
                    <Badge className="border-yellow-300 bg-yellow-100 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                        Intermediate
                    </Badge>
                );
            case 'advanced':
                return (
                    <Badge className="border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                        Advanced
                    </Badge>
                );
            default:
                return null;
        }
    };

    const filteredCourses = courses.filter((course) => {
        const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
        const matchLevel = level === 'all' ? true : course.level === level;
        const matchCategory = selectedCategory === null ? true : course.category.id === selectedCategory;
        return matchSearch && matchLevel && matchCategory;
    });

    const visibleCourses = filteredCourses.slice(0, visibleCount);

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8" id="course">
            <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-semibold md:text-4xl">Tingkatkan Kemampuanmu Bersama Para Ahli</h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-4xl text-center">
                Akses berbagai materi pembelajaran berkualitas yang dirancang oleh para expert dan diperbarui secara berkala setiap bulannya.
            </p>

            <div className="mb-4 flex justify-between gap-2">
                <Input type="search" placeholder="Cari kelas..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filter Tingkat Kesulitan</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Pilih Tingkat Kesulitan</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={level} onValueChange={setLevel}>
                            <DropdownMenuRadioItem value="all">Semua</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="beginner">Beginner</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="intermediate">Intermediate</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="advanced">Advanced</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div
                className="mb-4 overflow-x-auto"
                ref={categoryRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ scrollbarWidth: 'none', cursor: isDragging.current ? 'grabbing' : 'grab' }}
            >
                <div className="flex w-max flex-nowrap gap-2 select-none">
                    <button
                        type="button"
                        onClick={() => setSelectedCategory(null)}
                        className={`rounded-xl border px-4 py-2 text-sm transition hover:cursor-pointer ${
                            selectedCategory === null
                                ? 'bg-primary-foreground text-secondary'
                                : 'hover:bg-accent dark:hover:bg-primary/10 bg-background border-gray-300 text-gray-800 dark:border-zinc-100/20 dark:bg-zinc-800 dark:text-zinc-100'
                        } `}
                    >
                        Semua Kategori
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => setSelectedCategory(category.id)}
                            className={`rounded-xl border px-4 py-2 text-sm transition hover:cursor-pointer ${
                                selectedCategory === category.id
                                    ? 'bg-primary-foreground text-secondary'
                                    : 'hover:bg-accent dark:hover:bg-primary/10 bg-background border-gray-300 text-gray-800 dark:border-zinc-100/20 dark:bg-zinc-800 dark:text-zinc-100'
                            } `}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCourses.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12">
                        <img src="/assets/images/not-found.webp" alt="Kelas Belum Tersedia" className="w-48" />
                        <div className="text-center text-gray-500">Belum ada kelas yang tersedia saat ini.</div>
                    </div>
                ) : (
                    visibleCourses.map((course) => {
                        const hasAccess = myCourseIds.includes(course.id);
                        const discount = calculateDiscount(course.strikethrough_price, course.price);

                        return (
                            <Link
                                key={course.id}
                                href={hasAccess ? `profile/my-courses/${course.slug}` : `/course/${course.slug}`}
                                className="h-full"
                            >
                                <div className="relative h-full overflow-hidden rounded-xl bg-zinc-300/30 p-[2px] dark:bg-zinc-700/30">
                                    <div
                                        className={`relative flex h-full w-full flex-col rounded-lg ${
                                            hasAccess ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-sidebar dark:bg-zinc-800'
                                        }`}
                                    >
                                        <div className="w-full flex-shrink-0 overflow-hidden rounded-t-lg">
                                            <div className="relative">
                                                <img
                                                    src={course.thumbnail ? `/storage/${course.thumbnail}` : '/assets/images/placeholder.png'}
                                                    alt={course.title}
                                                    className="h-48 w-full rounded-t-lg object-cover"
                                                />

                                                {/* Course Badge */}
                                                <span className="absolute top-2 left-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                    Kelas
                                                </span>

                                                {/* Discount Badge */}
                                                {!hasAccess && discount > 0 && (
                                                    <div className="absolute top-2 right-2">
                                                        <Badge className="bg-red-500 text-white shadow-lg">
                                                            <Percent size={12} className="mr-1" />
                                                            Hemat {discount}%
                                                        </Badge>
                                                    </div>
                                                )}

                                                {/* Access Badge */}
                                                {hasAccess && (
                                                    <div className="absolute top-2 right-2">
                                                        <Badge className="bg-green-500 text-white shadow-lg">Sudah Dimiliki</Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <h2 className="mx-4 mt-2 line-clamp-2 text-left text-lg font-semibold">{course.title}</h2>
                                        </div>

                                        <div className="mt-auto w-full p-4 text-left">
                                            <div className="flex items-end justify-between">
                                                {hasAccess ? (
                                                    <p className="text-primary text-sm font-medium">Anda sudah memiliki akses</p>
                                                ) : course.price === 0 ? (
                                                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">Gratis</p>
                                                ) : (
                                                    <div className="">
                                                        {course.strikethrough_price > 0 && course.strikethrough_price > course.price && (
                                                            <p className="text-sm text-red-500 line-through">
                                                                Rp {course.strikethrough_price.toLocaleString('id-ID')}
                                                            </p>
                                                        )}
                                                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                            Rp {course.price.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Category & Level Badge */}
                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge>{course.category.name}</Badge>
                                                    {getLevelBadge(course.level)}
                                                </div>
                                            </div>

                                            {/* Mentor Info - Fixed conditional rendering */}
                                            {course.user && (
                                                <div className="mt-2 flex items-center gap-3 border-t-2 border-neutral-200 pt-3 dark:border-gray-700">
                                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                                        {course.user.avatar ? (
                                                            <img
                                                                src={`/storage/${course.user.avatar}`}
                                                                alt={course.user.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="from-primary flex h-full w-full items-center justify-center bg-gradient-to-br to-orange-500 text-sm font-semibold text-white">
                                                                {course.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{course.user.name}</p>
                                                        <p className="text-primary text-xs">{course.user.bio}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>

            {visibleCount < filteredCourses.length && (
                <div className="mb-8 flex justify-center">
                    <Magnetic>
                        <Button type="button" className="mt-8 hover:cursor-pointer" onClick={() => setVisibleCount((prev) => prev + 6)}>
                            Lihat Lebih Banyak <GalleryVerticalEnd />
                        </Button>
                    </Magnetic>
                </div>
            )}
        </section>
    );
}
