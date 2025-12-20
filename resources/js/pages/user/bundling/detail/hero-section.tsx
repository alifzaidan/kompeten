import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Package } from 'lucide-react';

interface Bundle {
    title: string;
    short_description?: string | null;
    registration_deadline?: string | null;
    bundle_items_count: number;
    price: number;
    strikethrough_price: number;
}

interface HeroSectionProps {
    bundle: Bundle;
    discountPercentage: number;
    onRegisterClick: () => void;
}

export default function HeroSection({ bundle, discountPercentage, onRegisterClick }: HeroSectionProps) {
    const deadlineDate = bundle.registration_deadline ? new Date(bundle.registration_deadline) : null;

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
                                    <Link href="/bundle">Paket Bundling</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{bundle.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="mt-8 mb-4 flex flex-wrap items-center gap-3">
                        <span className="border-primary-foreground bg-secondary text-primary-foreground rounded-full border px-4 py-1 text-sm font-medium">
                            <Package className="mr-1 inline-block h-4 w-4" />
                            {bundle.bundle_items_count} Program
                        </span>
                        {discountPercentage > 0 && (
                            <span className="rounded-full border border-red-300 bg-red-100 px-4 py-1 text-sm font-medium text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300">
                                Hemat {discountPercentage}%
                            </span>
                        )}
                    </div>

                    <h1 className="mb-4 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">{bundle.title}</h1>

                    {bundle.short_description && <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">{bundle.short_description}</p>}

                    {deadlineDate && (
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                            ⏰ Daftar sebelum: {format(deadlineDate, 'dd MMMM yyyy, HH:mm', { locale: id })} WIB
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button onClick={onRegisterClick}>
                            <Package className="mr-2 h-4 w-4" />
                            Daftar Sekarang
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                                Hubungi Kami
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
