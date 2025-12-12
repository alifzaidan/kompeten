import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '@/components/ui/carousel';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { useEffect, useState } from 'react';

interface Mentor {
    id: number;
    name: string;
    role: string;
    image: string;
    bgColor: string;
}

interface Testimony {
    name: string;
    role: string;
    avatar: string;
    text: string;
}

export default function TestimonySection() {
    const mentors: Mentor[] = [
        {
            id: 1,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-yellow-400',
        },
        {
            id: 2,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-pink-300',
        },
        {
            id: 3,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-gray-300',
        },
        {
            id: 4,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-blue-300',
        },
        {
            id: 5,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-purple-300',
        },
        {
            id: 6,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-yellow-400',
        },
        {
            id: 7,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-pink-300',
        },
        {
            id: 8,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-gray-300',
        },
        {
            id: 9,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-blue-300',
        },
        {
            id: 10,
            name: 'Muchammad Alif Zaidan',
            role: 'Fullstack Web Developer',
            image: '/assets/images/mentor-1.png',
            bgColor: 'bg-purple-300',
        },
    ];

    const testimonies: Testimony[] = [
        {
            name: 'Nihayatul Maulasari',
            role: 'Mentor Akuntan',
            avatar: '/assets/images/mentor-dummy.jpg',
            text: 'Lorem ipsum dolor amet consectetur. Et aliquam in morbi duis sit mi bibendum lobortis turpis. Est aliquet amet malesuada dui sed. Aliquam vitae aliquam porta lectus. Id purus ultricies commodo et dui leo nisl viverra.',
        },
        {
            name: 'Budi Santoso',
            role: 'Konsultan Pajak',
            avatar: '/assets/images/mentor-dummy.jpg',
            text: 'Program pelatihan yang sangat membantu dalam pengembangan karir saya di bidang perpajakan. Materi yang diberikan sangat applicable dan mentor sangat berpengalaman.',
        },
        {
            name: 'Rina Kartika',
            role: 'Tax Specialist',
            avatar: '/assets/images/mentor-dummy.jpg',
            text: 'Sekolah Pajak memberikan pembelajaran yang komprehensif dan mudah dipahami. Sangat recommended untuk yang ingin mendalami ilmu perpajakan secara profesional.',
        },
        {
            name: 'Ahmad Rizky',
            role: 'Financial Advisor',
            avatar: '/assets/images/mentor-dummy.jpg',
            text: 'Kualitas pengajaran yang luar biasa dengan praktik langsung yang sangat membantu pemahaman. Investasi terbaik untuk karir di bidang keuangan dan perpajakan.',
        },
        {
            name: 'Maya Sari',
            role: 'Accounting Manager',
            avatar: '/assets/images/mentor-dummy.jpg',
            text: 'Instruktur yang profesional dan materi yang up to date dengan regulasi terbaru. Sangat puas dengan hasil pembelajaran yang didapat dari Sekolah Pajak.',
        },
    ];

    const [index, setIndex] = useState(0);
    const TOTAL_ITEMS = testimonies.length;

    const infiniteTestimonies = [...testimonies, ...testimonies, ...testimonies];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => {
                const next = prev + 1;
                if (next >= TOTAL_ITEMS * 2) {
                    return TOTAL_ITEMS;
                }
                return next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [TOTAL_ITEMS]);

    useEffect(() => {
        setIndex(TOTAL_ITEMS);
    }, [TOTAL_ITEMS]);

    const handleIndexChange = (newIndex: number) => {
        if (newIndex < 0) {
            setIndex(TOTAL_ITEMS * 2 - 1);
        } else if (newIndex >= TOTAL_ITEMS * 3) {
            setIndex(TOTAL_ITEMS);
        } else {
            setIndex(newIndex);
        }
    };

    return (
        <section className="bg-background w-full px-4 py-8" id="testimony-section">
            <div className="mx-auto max-w-4xl">
                <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-semibold md:text-4xl">
                    Biar nggak cuma katanya—buktinya ada di sini.
                </h2>
                <p className="text-muted-foreground mx-auto mb-12 max-w-xl text-center">
                    Simak testimoni peserta yang udah merasakan perubahan nyata setelah ikut kelas di Kompeten
                </p>

                <div className="relative">
                    <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r to-transparent md:w-64" />
                    <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l to-transparent md:w-64" />

                    <InfiniteSlider speed={50} speedOnHover={20} gap={24} className="p-4">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor.id}
                                className="group h-20 w-20 flex-shrink-0 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-lg md:h-24 md:w-24"
                            >
                                <img
                                    src={mentor.image}
                                    alt={mentor.name}
                                    className="h-full w-full object-cover object-center transition-all duration-500"
                                />
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>

            {/* Testimony Section */}
            <div className="relative mt-8">
                <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r to-transparent md:w-72" />
                <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l to-transparent md:w-72" />

                <div className="mx-auto w-full">
                    <Carousel index={index} onIndexChange={handleIndexChange} disableDrag className="relative">
                        <CarouselContent>
                            {infiniteTestimonies.map((testimony, idx) => (
                                <CarouselItem key={`testimony-${idx}`} className="px-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="flex justify-center">
                                        <div className="bg-card flex min-h-[300px] w-full flex-col rounded-2xl border-2 p-5">
                                            <div className="grid h-full grid-cols-3 justify-between gap-2">
                                                <div className="col-span-1 flex flex-col gap-2">
                                                    <h3 className="text-lg font-semibold">Bikin Website Gratis</h3>
                                                    <div className="mt-auto flex flex-wrap gap-2">
                                                        <Badge>AI</Badge>
                                                        <Badge>Frontend</Badge>
                                                        <Badge>Lovable</Badge>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 flex flex-col rounded-lg bg-neutral-100 p-3 inset-shadow-sm inset-shadow-neutral-400">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={testimony.avatar}
                                                            alt={testimony.name}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.src =
                                                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"%3E%3Ccircle cx="12" cy="8" r="4"/%3E%3Cpath d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/%3E%3C/svg%3E';
                                                            }}
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 dark:text-white">{testimony.name}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">{testimony.role}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto space-y-2">
                                                        <div className="mt-3 flex items-center gap-2">
                                                            <div className="flex gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">5.0</span>
                                                        </div>
                                                        <p className="line-clamp-6 flex-grow text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                            {testimony.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNavigation />
                        <div className="mx-auto mt-8 max-w-7xl px-4">
                            <div className="flex justify-center gap-2">
                                {testimonies.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setIndex(TOTAL_ITEMS + idx)}
                                        className={`h-2 rounded-full transition-all ${
                                            index % TOTAL_ITEMS === idx ? 'bg-primary w-8' : 'bg-primary/30 hover:bg-primary/50 w-2'
                                        }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
