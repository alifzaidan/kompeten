interface GalleryItem {
    id: number;
    image: string;
    title?: string;
}

export default function GallerySection() {
    const galleryItems: GalleryItem[] = [
        {
            id: 1,
            image: '/assets/images/hero.png',
        },
        {
            id: 2,
            image: '/assets/images/hero.png',
        },
        {
            id: 3,
            image: '/assets/images/hero.png',
            title: 'Sekolah',
        },
        {
            id: 4,
            image: '/assets/images/hero.png',
            title: 'Universitas',
        },
        {
            id: 5,
            image: '/assets/images/hero.png',
            title: 'Pelatihan',
        },
        {
            id: 6,
            image: '/assets/images/hero.png',
            title: 'Kelas Online',
        },
    ];

    return (
        <section className="mx-auto mb-4 w-full max-w-7xl p-4 sm:mb-8">
            <div className="grid gap-4 lg:grid-cols-12">
                <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-9 lg:grid-cols-9">
                    <div className="group relative col-span-12 h-[400px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-4">
                        <img
                            src={galleryItems[0].image}
                            alt="Gallery 1"
                            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                        <div className="from-primary to-primary-foreground absolute inset-0 bg-gradient-to-br opacity-80" />
                    </div>

                    <div className="group relative col-span-12 h-[400px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-5">
                        <img
                            src={galleryItems[1].image}
                            alt="Gallery 2"
                            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                        <div className="from-primary to-primary-foreground absolute inset-0 bg-gradient-to-br opacity-80" />
                    </div>

                    <div className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3">
                        <img
                            src={galleryItems[3].image}
                            alt="Gallery 4"
                            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {galleryItems[3].title && (
                            <div className="absolute right-4 bottom-4 rounded-lg border border-white/30 bg-white/20 px-2 py-1 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                                {galleryItems[3].title}
                            </div>
                        )}
                    </div>

                    <div className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-6">
                        <img
                            src={galleryItems[4].image}
                            alt="Gallery 5"
                            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {galleryItems[4].title && (
                            <div className="absolute right-4 bottom-4 rounded-lg border border-white/30 bg-white/20 px-2 py-1 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                                {galleryItems[4].title}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-1">
                    <div className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3">
                        <img
                            src={galleryItems[2].image}
                            alt="Gallery 3"
                            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {galleryItems[2].title && (
                            <div className="absolute right-4 bottom-4 rounded-lg border border-white/30 bg-white/20 px-2 py-1 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                                {galleryItems[2].title}
                            </div>
                        )}
                    </div>
                    <div className="group relative col-span-12 h-[320px] overflow-hidden rounded-3xl md:col-span-1 lg:col-span-3 lg:h-[400px]">
                        <img
                            src={galleryItems[5].image}
                            alt="Gallery 6"
                            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {galleryItems[5].title && (
                            <div className="absolute right-4 bottom-4 rounded-lg border border-white/30 bg-white/20 px-2 py-1 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                                {galleryItems[5].title}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
