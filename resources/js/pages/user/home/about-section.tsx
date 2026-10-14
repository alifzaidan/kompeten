import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Product {
    title: string;
    description: string;
    image: string;
    icon?: string;
    href: string;
}

export default function AboutSection() {
    const { t } = useTranslation('home');

    const products: Product[] = [
        {
            title: t('offer.certificationTitle'),
            description: t('offer.certificationDesc'),
            image: '/assets/images/Sertifikasi.webp',
            href: '/certification',
        },
        {
            title: t('offer.bootcampTitle'),
            description: t('offer.bootcampDesc'),
            image: '/assets/images/Bootcamp.webp',
            href: '/bootcamp',
        },
        {
            title: t('offer.webinarTitle'),
            description: t('offer.webinarDesc'),
            image: '/assets/images/Webinar.webp',
            href: '/webinar',
        },
        {
            title: t('offer.courseTitle'),
            description: t('offer.courseDesc'),
            image: '/assets/images/Bootcamp.webp',
            href: '/course',
        },
        {
            title: t('offer.bundleTitle'),
            description: t('offer.bundleDesc'),
            image: '/assets/images/Bundling.webp',
            href: '/bundle',
        },
    ];

    const [index, setIndex] = useState(0);
    const TOTAL_ITEMS = products.length;

    const infiniteProducts = [...products, ...products, ...products];

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
        <section className="mx-auto w-full max-w-7xl px-4 pt-16">
            <div className="mb-4 text-center">
                <h2 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl dark:text-white">{t('offer.title')}</h2>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                    {t('offer.subtitle')}
                </p>
            </div>

            <div className="relative">
                <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r to-transparent" />
                <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l to-transparent" />

                <Carousel index={index} onIndexChange={handleIndexChange} disableDrag className="relative">
                    <CarouselContent>
                        {infiniteProducts.map((product, idx) => (
                            <CarouselItem key={`product-${idx}`} className="p-2 md:basis-1/2 md:p-6 lg:basis-1/3 lg:p-12">
                                <Link href={product.href} className="group flex h-full justify-center">
                                    <div className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                                        {/* Image Header */}
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col p-6">
                                            <h3 className="group-hover:text-primary mb-3 text-2xl font-bold text-gray-900 transition-colors dark:text-white">
                                                {product.title}
                                            </h3>
                                            <p className="mb-6 flex-1 text-justify text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                                {product.description}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4">
                                                <span className="text-primary text-lg font-bold">Kompeten</span>
                                                <img src="/assets/images/logo-primary.png" alt="Kompeten Logo" className="h-6 w-6 object-contain" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNavigation />
                </Carousel>
            </div>
        </section>
    );
}
