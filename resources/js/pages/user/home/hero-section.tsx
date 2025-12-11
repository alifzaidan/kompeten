import { SearchCommand } from '@/components/search-command';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <section className="relative mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
            <div className="flex flex-col items-center py-6 md:py-12">
                <h1 className="mb-6 text-center text-4xl font-semibold sm:text-5xl md:text-6xl">Lorem ipsum dolor consectetur.</h1>
                <p className="mb-10 max-w-2xl text-center text-lg sm:text-xl md:mb-16 md:text-2xl">
                    Lorem ipsum viverra sit dolor blandit sit amet consectetur. Varius mauris blandit viverra lectus.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setSearchOpen(true)}
                    className="mb-4 border-neutral-600 bg-neutral-100 text-neutral-600 hover:text-neutral-500"
                >
                    <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                    <p className="min-w-xs text-left">Cari Kelas...</p>
                </Button>
                <p className="text-muted-foreground">Lorem ipsum dolor blandit sit amet.</p>
            </div>

            <div className="relative">
                {/* <ResponsiveSVG /> */}

                <div className="absolute left-1/2 z-20 flex -translate-x-1/2 gap-2 pt-3 sm:top-4">
                    <Button size="lg">Our Services</Button>
                    <Button size="lg" variant="outline">
                        Contact Us
                    </Button>
                </div>

                <div className="relative mx-auto w-full max-w-7xl">
                    <img src="/assets/images/hero.png" alt="Hero Section" loading="lazy" className="w-full rounded-4xl object-cover shadow-lg" />

                    <div className="absolute top-auto bottom-4 left-6 z-10 flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-lg sm:top-6 sm:bottom-auto">
                        <div className="flex -space-x-2">
                            <div className="h-4 w-4 rounded-full bg-blue-500 ring-2 ring-white md:h-7 md:w-7" />
                            <div className="h-4 w-4 rounded-full bg-green-500 ring-2 ring-white md:h-7 md:w-7" />
                            <div className="h-4 w-4 rounded-full bg-purple-500 ring-2 ring-white md:h-7 md:w-7" />
                        </div>
                        <span className="text-sm font-semibold text-white drop-shadow-lg md:text-base">5000+ Alumni</span>
                    </div>

                    <div className="absolute top-auto right-6 bottom-4 z-10 flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-lg sm:top-6 sm:bottom-auto">
                        <span className="md:text-xl">⭐</span>
                        <span className="text-sm font-semibold text-white drop-shadow-lg md:text-base">4500+ (User)</span>
                    </div>
                </div>
            </div>

            <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </section>
    );
}
