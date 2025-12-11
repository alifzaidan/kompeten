import { OtherItem, ProductItem, ServiceItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Instagram } from 'lucide-react';

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
        title: 'Software House',
        href: 'https://kompeten.co.id/',
    },
    {
        title: 'Pusat Bantuan',
        href: 'https://wa.me/+6289528514480',
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
        <footer className="from-primary/80 to-background bg-gradient-to-t py-8 sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
                <div>
                    {/* Logo untuk light mode */}
                    <img src="/assets/images/logo-primary-2.png" alt="Logo Kompeten" className="block w-24 fill-current dark:hidden" />
                    {/* Logo untuk dark mode */}
                    <img src="/assets/images/logo-secondary-2.png" alt="Logo Kompeten" className="hidden w-24 fill-current dark:block" />
                    <p className="my-4">Empowering Minds, Rising Together 🚀</p>
                    <h5 className="font-semibold">CV. Kompeten</h5>
                    <p className="text-gray-800 dark:text-gray-400">
                        Perumahan Permata Permadani, Blok B1. Kel. Pendem Kec. Junrejo Kota Batu Prov. Jawa Timur, 65324 <br /> +6289528514480
                    </p>
                </div>
                <div className="flex gap-8 sm:gap-12">
                    <div>
                        <h4 className="mb-4 font-semibold">Produk</h4>
                        <ul className="space-y-2">
                            {productItems.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="hover:underline">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold">Layanan</h4>
                        <ul className="space-y-2">
                            {serviceItems.map((item) => (
                                <li key={item.title}>
                                    <a href={item.href} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold">Lainnya</h4>
                        <ul className="space-y-2">
                            {otherItems.map((item) => (
                                <li key={item.title}>
                                    <Link href={item.href} className="hover:underline">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="sm:text-right">
                    <h4 className="mb-4 font-semibold">Media Sosial</h4>
                    <div className="flex items-center gap-4 sm:justify-end">
                        <a href="https://www.instagram.com/kompeten/" target="_blank">
                            <Instagram />
                        </a>
                    </div>
                    <p className="mt-4">
                        Ikuti kami di media sosial untuk mendapatkan informasi terbaru, tips, dan konten menarik seputar teknologi.
                    </p>
                </div>
            </div>
            <div className="mt-12 text-center text-xs">&copy; 2025 Kompeten. All rights reserved.</div>
        </footer>
    );
}
