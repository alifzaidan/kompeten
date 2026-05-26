import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Magnetic } from '@/components/ui/magnetic';
import { Spotlight } from '@/components/ui/spotlight';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, GalleryVerticalEnd, GraduationCap, Percent } from 'lucide-react';
import { useRef, useState } from 'react';

type Category = {
    id: string;
    name: string;
};

interface Mentor {
    name: string;
    avatar?: string;
    bio?: string;
}

interface Program {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    type: 'regular' | 'scholarship';
    category: Category;
    price: number;
    scholarship_price?: number;
    strikethrough_price?: number;
    thumbnail?: string | null;
    registration_deadline?: string;
    mentor?: Mentor;
    mentors?: Mentor[];
}

interface MyProgramIds {
    certificationPrograms?: string[];
}

interface CertificationProgramSectionProps {
    categories: Category[];
    programs: Program[];
    myProgramIds?: string[] | MyProgramIds;
}

export default function CertificationProgramSection({ categories, programs, myProgramIds }: CertificationProgramSectionProps) {
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

    const filteredPrograms = programs.filter((program) => {
        const matchSearch = program.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === null ? true : program.category.id === selectedCategory;
        return matchSearch && matchCategory;
    });

    const visiblePrograms = filteredPrograms.slice(0, visibleCount);

    const safeMyProgramIds = Array.isArray(myProgramIds) ? myProgramIds : myProgramIds?.certificationPrograms || [];

    const hasProgramAccess = (programId: string) => safeMyProgramIds.includes(programId);

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8" id="bootcamp">
            <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-semibold md:text-4xl">
                Raih Sertifikasi Profesional dan Tingkatkan Karirmu
            </h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-4xl text-center">Pilih program sertifikasi yang sesuai dengan tujuan karirmu.</p>

            <div className="mb-4 flex">
                <Input type="search" placeholder="Cari program sertifikasi..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
                {visiblePrograms.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12">
                        <img src="/assets/images/not-found.webp" alt="Program Belum Tersedia" className="w-48" />
                        <div className="text-center text-gray-500">Belum ada program sertifikasi yang tersedia saat ini.</div>
                    </div>
                ) : (
                    visiblePrograms.map((program) => {
                        const displayPrice = program.type === 'scholarship' ? (program.scholarship_price ?? program.price) : program.price;
                        const deadlineDate = program.registration_deadline ? new Date(program.registration_deadline) : null;
                        const hasAccess = hasProgramAccess(program.id);
                        const discount =
                            program.strikethrough_price && program.strikethrough_price > displayPrice
                                ? Math.round(((program.strikethrough_price - displayPrice) / program.strikethrough_price) * 100)
                                : 0;
                        const mentors = program.mentors && program.mentors.length > 0 ? program.mentors : program.mentor ? [program.mentor] : [];
                        const programUrl = hasAccess
                            ? `/profile/my-certification-programs/${program.slug}`
                            : route('certification-programs.detail', program.slug);

                        return (
                            <Link key={program.id} href={programUrl} className="h-full">
                                <div className="relative h-full overflow-hidden rounded-xl bg-zinc-300/30 p-[2px] dark:bg-zinc-700/30">
                                    <Spotlight className="bg-primary blur-2xl" size={284} />
                                    <div
                                        className={`relative flex h-full w-full flex-col rounded-lg transition-colors ${
                                            hasAccess ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-sidebar dark:bg-zinc-800'
                                        }`}
                                    >
                                        <div className="w-full flex-shrink-0 overflow-hidden rounded-t-lg">
                                            <div className="relative">
                                                <img
                                                    src={program.thumbnail ? `/storage/${program.thumbnail}` : '/assets/images/placeholder.png'}
                                                    alt={program.title}
                                                    className="w-full rounded-t-lg object-cover md:h-72"
                                                />
                                                <span className="absolute top-2 left-2 rounded-full bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">
                                                    <GraduationCap size={12} className="mr-1 inline-block align-[-2px]" />
                                                    {program.type === 'scholarship' ? 'Beasiswa' : 'Reguler'}
                                                </span>

                                                {!hasAccess && discount > 0 && (
                                                    <div className="absolute top-2 right-2">
                                                        <Badge className="bg-red-500 text-white shadow-lg">
                                                            <Percent size={12} className="mr-1" />
                                                            Hemat {discount}%
                                                        </Badge>
                                                    </div>
                                                )}

                                                {hasAccess && (
                                                    <div className="absolute top-2 right-2">
                                                        <Badge className="bg-green-500 text-white shadow-lg">Sudah Dimiliki</Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <h2 className="mx-4 mt-2 line-clamp-2 text-left text-lg font-semibold">{program.title}</h2>
                                        </div>

                                        <div className="mt-auto w-full p-4 text-left">
                                            <div className="flex items-end justify-between">
                                                {hasAccess ? (
                                                    <p className="text-primary text-sm font-medium">Anda sudah memiliki akses</p>
                                                ) : displayPrice === 0 ? (
                                                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">Gratis</p>
                                                ) : (
                                                    <div>
                                                        {program.strikethrough_price && program.strikethrough_price > displayPrice && (
                                                            <p className="text-sm text-red-500 line-through">
                                                                {formatRupiah(program.strikethrough_price)}
                                                            </p>
                                                        )}
                                                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                            {formatRupiah(displayPrice)}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="flex flex-col items-end gap-1">
                                                    <Badge>{program.category.name}</Badge>
                                                </div>
                                            </div>

                                            {deadlineDate && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Calendar size="18" />
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Daftar sebelum:{' '}
                                                        <span className="font-medium">{format(deadlineDate, 'dd MMM yyyy', { locale: id })}</span>
                                                    </p>
                                                </div>
                                            )}

                                            {mentors.length > 0 && (
                                                <div className="mt-2 flex items-center gap-3 border-t-2 border-neutral-200 pt-3 dark:border-gray-700">
                                                    <div className="flex -space-x-3">
                                                        {mentors.slice(0, 3).map((mentor, index) => (
                                                            <div
                                                                key={`${program.id}-mentor-${index}`}
                                                                className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white bg-gray-200 dark:border-zinc-800"
                                                            >
                                                                {mentor.avatar ? (
                                                                    <img
                                                                        src={`/storage/${mentor.avatar}`}
                                                                        alt={mentor.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="from-primary flex h-full w-full items-center justify-center bg-gradient-to-br to-orange-500 text-sm font-semibold text-white">
                                                                        {mentor.name.charAt(0).toUpperCase()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {mentors.length === 1 ? mentors[0].name : `${mentors.length} Mentor`}
                                                        </p>
                                                        <p className="text-primary text-xs">
                                                            {mentors.length === 1
                                                                ? (mentors[0].bio ?? 'Mentor')
                                                                : `${mentors
                                                                      .slice(0, 2)
                                                                      .map((mentor) => mentor.name)
                                                                      .join(', ')}${mentors.length > 2 ? ` +${mentors.length - 2} lainnya` : ''}`}
                                                        </p>
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
            {visibleCount < filteredPrograms.length && (
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
