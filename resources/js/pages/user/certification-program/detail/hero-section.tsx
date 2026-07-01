import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface CertificationProgram {
    title: string;
    slug: string;
    category?: { name: string };
    batch?: string | null;
}

export default function HeroSection({ program, onRegisterClick }: { program: CertificationProgram; onRegisterClick: () => void }) {
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
                                    <Link href="/certification-programs">Sertifikasi</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{program.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {program.batch && <p className="mt-8 mb-4 text-xl text-gray-600 dark:text-gray-400">Batch {program.batch}</p>}

                    <h1 className="mb-4 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">{program.title}</h1>

                    {program.category && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Kategori:</span>
                            <span className="border-primary-foreground bg-secondary text-primary-foreground rounded-full border px-3 py-1 text-sm font-medium">
                                {program.category.name}
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
