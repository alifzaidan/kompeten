import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Award, Calendar } from 'lucide-react';

interface PartnershipProduct {
    title: string;
    category?: { name: string };
    short_description?: string | null;
    registration_deadline: string;
    duration_days: number;
    price: number;
    strikethrough_price: number;
}

interface HeroSectionProps {
    partnershipProduct: PartnershipProduct;
    onRegisterClick: () => void;
}

export default function HeroSection({ partnershipProduct, onRegisterClick }: HeroSectionProps) {
    const deadlineDate = new Date(partnershipProduct.registration_deadline);
    const discountPercentage =
        partnershipProduct.strikethrough_price > 0
            ? Math.round(((partnershipProduct.strikethrough_price - partnershipProduct.price) / partnershipProduct.strikethrough_price) * 100)
            : 0;

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
                                    <Link href="/certification">Sertifikasi Kerjasama</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{partnershipProduct.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="mt-8 mb-4 flex flex-wrap items-center gap-3">
                        {partnershipProduct.category && (
                            <span className="border-primary-foreground bg-secondary text-primary-foreground rounded-full border px-4 py-1 text-sm font-medium">
                                {partnershipProduct.category.name}
                            </span>
                        )}
                        <span className="rounded-full border border-blue-300 bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            <Calendar className="mr-1 inline-block h-4 w-4" />
                            {partnershipProduct.duration_days} Hari
                        </span>
                        {discountPercentage > 0 && (
                            <span className="rounded-full border border-red-300 bg-red-100 px-4 py-1 text-sm font-medium text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                                Hemat {discountPercentage}%
                            </span>
                        )}
                    </div>

                    <h1 className="mb-4 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">{partnershipProduct.title}</h1>

                    {partnershipProduct.short_description && (
                        <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">{partnershipProduct.short_description}</p>
                    )}

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        ⏰ Daftar sebelum: {format(deadlineDate, 'dd MMMM yyyy, HH:mm', { locale: id })} WIB
                    </div>

                    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button onClick={onRegisterClick}>
                            <Award className="mr-2 h-4 w-4" />
                            Daftar Sekarang
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                                Hubungi Kami
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="https://ppppmi.id" target="_blank" rel="noopener noreferrer">
                                Terafiliasi dengan P4MI
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
