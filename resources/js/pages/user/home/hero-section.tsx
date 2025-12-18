import { SearchCommand } from '@/components/search-command';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function HeroSection() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <section className="relative mx-auto w-full max-w-7xl px-4 py-6 md:py-10">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-6 md:py-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 text-center text-4xl leading-snug font-semibold sm:text-5xl md:text-6xl"
                >
                    Solusi cerdas untuk mengembangkan skill-mu
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8 text-center text-base sm:text-lg md:mb-12 md:text-xl"
                >
                    Dirancang secara matang agar kamu bisa memahami materi lebih cepat, tanpa rumit, dan langsung bisa dipraktikkan.
                </motion.p>

                {/* Search Bar - Article Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-4 w-full max-w-2xl"
                >
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari kelas, bootcamp, webinar, atau artikel..."
                            readOnly
                            onClick={() => setSearchOpen(true)}
                            className="h-14 cursor-pointer rounded-full border-2 pr-4 pl-12 text-base shadow-lg transition-all hover:border-orange-300 focus:border-orange-500"
                        />
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-muted-foreground mb-8"
                >
                    Belajar dan naik level jadi lebih mudah—semuanya ada di sini.
                </motion.p>
            </div>

            <div className="relative">
                {/* <ResponsiveSVG /> */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute left-1/2 z-20 flex -translate-x-1/2 gap-2 pt-3 sm:top-4"
                >
                    <Button size="lg">
                        <a href="#products">Layanan Kami</a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                            Hubungi Kami
                        </a>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative mx-auto w-full max-w-7xl"
                >
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
                        <span className="text-sm font-semibold text-white drop-shadow-lg md:text-base">4500+ Pengguna</span>
                    </div>
                </motion.div>
            </div>

            <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </section>
    );
}
