import { OtherItem, ProductItem, ServiceItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Instagram } from 'lucide-react';
import { Button } from './ui/button';

const productItems: ProductItem[] = [
    {
        title: 'Kelas Online',
        href: '/course',
    },
    {
        title: 'Bootcamp',
        href: '/bootcamp',
    },
    {
        title: 'Webinar',
        href: '/webinar',
    },
    {
        title: 'Bundling',
        href: '/bundle',
    },
    {
        title: 'Sertifikasi',
        href: '/certification',
    },
];

const serviceItems: ServiceItem[] = [
    {
        title: 'Pusat Bantuan',
        href: 'https://wa.me/+6289528514480',
    },
    {
        title: 'Email Support',
        href: 'mailto:kompetenidn@gmail.com',
    },
];

const otherItems: OtherItem[] = [
    {
        title: 'Artikel & Blog',
        href: '/article',
    },
    {
        title: 'Syarat & Ketentuan',
        href: '/terms-and-conditions',
    },
    {
        title: 'Kebijakan Privasi',
        href: '/privacy-policy',
    },
];

export default function AppFooter() {
    return (
        <footer className="from-primary to-background relative overflow-hidden bg-gradient-to-t pt-12 pb-32 md:pt-16 lg:pb-12">
            <div className="absolute top-10 -left-20 h-40 w-40 rounded-full bg-gray-700/20 blur-3xl" />
            <div className="absolute top-20 -right-20 h-60 w-60 rounded-full bg-gray-700/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4">
                <div className="mb-8">
                    <div className="bg-primary/30 border-primary/10 rounded-3xl border p-8 shadow-xl backdrop-blur-md">
                        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                            <div className="max-w-2xl text-center lg:text-left">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">Wujudkan Karir Impian, Mulai dari Sini! ✨</h2>
                                <p className="text-sm text-gray-800 md:text-base">
                                    Bergabunglah dengan ribuan profesional yang telah mengakselerasi karir mereka bersama Kompeten
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <Button size="lg">
                                    <Link href="/course">Mulai Belajar Sekarang</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                                        Hubungi Kami
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:shadow-2xl">
                        <h4 className="mb-4 text-lg font-bold text-gray-900">Produk</h4>
                        <ul className="space-y-2">
                            {productItems.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="text-sm text-gray-800 transition-colors hover:text-gray-900 hover:underline">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:shadow-2xl">
                        <h4 className="mb-4 text-lg font-bold text-gray-900">Layanan</h4>
                        <ul className="space-y-2">
                            {serviceItems.map((item) => (
                                <li key={item.title}>
                                    <a
                                        href={item.href}
                                        className="text-sm text-gray-800 transition-colors hover:text-gray-900 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:shadow-2xl">
                        <h4 className="mb-4 text-lg font-bold text-gray-900">Lainnya</h4>
                        <ul className="space-y-2">
                            {otherItems.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="text-sm text-gray-800 transition-colors hover:text-gray-900 hover:underline">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:shadow-2xl">
                        <img src="/assets/images/logo-primary.png" alt="Kompeten Logo" className="mb-4 h-16 w-auto" />
                        <h5 className="mb-4 font-bold text-gray-900">Kompeten</h5>
                        <p className="text-sm text-gray-800">
                            Perumahan Permata Permadani, Blok B1. Kel. Pendem Kec. Junrejo Kota Batu Prov. Jawa Timur, 65324
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="text-xl font-bold text-gray-900">Kompeten</div>
                    <div className="text-sm text-gray-800">© 2025 Kompeten. All rights reserved.</div>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.tiktok.com/@kompetenidn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 transition-colors hover:text-gray-700"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.4381 2.01667C13.5298 2 14.6131 2.00833 15.6964 2C15.7631 3.27498 16.2214 4.57497 17.1548 5.47496C18.0881 6.39995 19.4047 6.82494 20.688 6.9666V10.3249C19.488 10.2832 18.2797 10.0332 17.1881 9.51656C16.7131 9.29991 16.2714 9.02491 15.8381 8.74157C15.8298 11.1749 15.8464 13.6082 15.8214 16.0332C15.7548 17.1998 15.3714 18.3581 14.6964 19.3164C13.6048 20.9164 11.7131 21.9581 9.7715 21.9914C8.57986 22.0581 7.38819 21.7331 6.37154 21.1331C4.68823 20.1414 3.50492 18.3248 3.32992 16.3748C3.31325 15.9582 3.30492 15.5415 3.32158 15.1332C3.47158 13.5499 4.25491 12.0332 5.47156 10.9999C6.85488 9.7999 8.78817 9.22491 10.5965 9.56656C10.6131 10.7999 10.5631 12.0332 10.5631 13.2665C9.73816 12.9999 8.77151 13.0749 8.04652 13.5749C7.52153 13.9165 7.12154 14.4415 6.91319 15.0332C6.7382 15.4582 6.7882 15.9248 6.79654 16.3748C6.99654 17.7415 8.31318 18.8914 9.71316 18.7665C10.6465 18.7581 11.5381 18.2165 12.0215 17.4248C12.1798 17.1498 12.3548 16.8665 12.3631 16.5415C12.4465 15.0498 12.4131 13.5665 12.4215 12.0749C12.4298 8.71657 12.4131 5.36661 12.4381 2.01667Z"
                                    fill="#323544"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/kompeten.idn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 transition-colors hover:text-gray-700"
                        >
                            <Instagram size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
