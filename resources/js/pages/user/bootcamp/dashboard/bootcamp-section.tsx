import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Magnetic } from '@/components/ui/magnetic';
import { Link } from '@inertiajs/react';
import { Calendar, GalleryVerticalEnd, Percent } from 'lucide-react';
import { useRef, useState } from 'react';

type Category = {
    id: string;
    name: string;
};

interface Bootcamp {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    slug: string;
    strikethrough_price: number;
    price: number;
    start_date: string;
    end_date: string;
    level?: 'beginner' | 'intermediate' | 'advanced';
    category: Category;
    user?: {
        name: string;
        avatar?: string;
        bio?: string;
    };
}

interface BootcampProps {
    categories: Category[];
    bootcamps: Bootcamp[];
    myBootcampIds: string[];
}

export default function BootcampSection({ categories, bootcamps, myBootcampIds }: BootcampProps) {
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
    const getLevelBadge = (level?: string) => {
        if (!level) return null;

        switch (level) {
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

    const filteredBootcamp = bootcamps.filter((bootcamp) => {
        const matchSearch = bootcamp.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === null ? true : bootcamp.category.id === selectedCategory;
        return matchSearch && matchCategory;
    });

    const visibleBootcamps = filteredBootcamp.slice(0, visibleCount);

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8" id="bootcamp">
            <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-semibold md:text-4xl">Transformasi Karir Digital Dimulai dari Sini</h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-4xl text-center">
                Kuasai keterampilan digital terkini melalui program pembelajaran intensif bersama mentor berpengalaman.
            </p>

            <div className="mb-4 flex">
                <Input type="search" placeholder="Cari bootcamp..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
                {visibleBootcamps.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12">
                        <img src="/assets/images/not-found.webp" alt="Bootcamp Belum Tersedia" className="w-48" />
                        <div className="text-center text-gray-500">Belum ada bootcamp yang tersedia saat ini.</div>
                    </div>
                ) : (
                    visibleBootcamps.map((bootcamp) => {
                        const hasAccess = myBootcampIds.includes(bootcamp.id);
                        const discount = calculateDiscount(bootcamp.strikethrough_price, bootcamp.price);

                        return (
                            <Link
                                key={bootcamp.id}
                                href={hasAccess ? `profile/my-bootcamps/${bootcamp.slug}` : `/bootcamp/${bootcamp.slug}`}
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
                                                    src={bootcamp.thumbnail ? `/storage/${bootcamp.thumbnail}` : '/assets/images/placeholder.png'}
                                                    alt={bootcamp.title}
                                                    className="w-full rounded-t-lg object-cover md:h-72"
                                                />

                                                {/* Bootcamp Badge */}
                                                <span className="absolute top-2 left-2 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                                                    Bootcamp
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
                                            <h2 className="mx-4 mt-2 line-clamp-2 text-left text-lg font-semibold">{bootcamp.title}</h2>
                                        </div>

                                        <div className="mt-auto w-full p-4 text-left">
                                            <div className="flex items-end justify-between">
                                                {hasAccess ? (
                                                    <p className="text-primary text-sm font-medium">Anda sudah memiliki akses</p>
                                                ) : bootcamp.price === 0 ? (
                                                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">Gratis</p>
                                                ) : (
                                                    <div className="">
                                                        {bootcamp.strikethrough_price > 0 && bootcamp.strikethrough_price > bootcamp.price && (
                                                            <p className="text-sm text-red-500 line-through">
                                                                Rp {bootcamp.strikethrough_price.toLocaleString('id-ID')}
                                                            </p>
                                                        )}
                                                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                            Rp {bootcamp.price.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Category & Level Badge */}
                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge>{bootcamp.category.name}</Badge>
                                                    {getLevelBadge(bootcamp.level)}
                                                </div>
                                            </div>

                                            {/* Date Display */}
                                            <div className="mt-2 flex items-center gap-2">
                                                <Calendar size="18" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(bootcamp.start_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}{' '}
                                                    -{' '}
                                                    {new Date(bootcamp.end_date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>

                                            {/* Mentor Info */}
                                            {bootcamp.user && (
                                                <div className="mt-2 flex items-center gap-3 border-t-2 border-neutral-200 pt-3 dark:border-gray-700">
                                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                                        {bootcamp.user.avatar ? (
                                                            <img
                                                                src={`/storage/${bootcamp.user.avatar}`}
                                                                alt={bootcamp.user.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="from-primary flex h-full w-full items-center justify-center bg-gradient-to-br to-orange-500 text-sm font-semibold text-white">
                                                                {bootcamp.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{bootcamp.user.name}</p>
                                                        <p className="text-primary text-xs">{bootcamp.user.bio || 'Mentor'}</p>
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

            {visibleCount < filteredBootcamp.length && (
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
