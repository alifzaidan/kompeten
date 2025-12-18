import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Webinar {
    title: string;
    thumbnail?: string | null;
    description?: string | null;
    start_time: string;
    end_time: string;
    category?: { name: string };
    batch?: string | null;
}

interface HeroSectionProps {
    webinar: Webinar;
    onRegisterClick: () => void;
}

export default function HeroSection({ webinar, onRegisterClick }: HeroSectionProps) {
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
                                    <Link href="/webinar">Webinar</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{webinar.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="mt-8 mb-4">
                        <span className="mt-8 mb-4 text-gray-600 dark:text-gray-400">
                            {new Date(webinar.start_time).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                            {' | '}
                            {new Date(webinar.start_time).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Asia/Jakarta',
                            })}{' '}
                            -{' '}
                            {new Date(webinar.end_time).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Asia/Jakarta',
                            })}{' '}
                            WIB
                        </span>
                    </div>

                    <h1 className="mb-4 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">{webinar.title}</h1>

                    {webinar.category && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Kategori:</span>
                            <span className="border-primary-foreground bg-secondary text-primary-foreground rounded-full border px-3 py-1 text-sm font-medium">
                                {webinar.category.name}
                            </span>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button onClick={onRegisterClick}>Daftar Sekarang</Button>
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
