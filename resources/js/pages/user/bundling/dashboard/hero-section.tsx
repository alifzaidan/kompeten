import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroSection() {
    const features = [
        { icon: CheckCircle2, text: 'Hemat hingga 70%', color: 'text-green-500' },
        { icon: BookOpen, text: 'Multi Program', color: 'text-blue-500' },
        { icon: Calendar, text: 'Akses Selamanya', color: 'text-purple-500' },
        { icon: TrendingUp, text: 'Tingkatkan Karir', color: 'text-orange-500' },
    ];

    return (
        <section className="relative overflow-hidden py-16">
            <div className="relative mx-auto max-w-4xl px-4 text-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6"
                    >
                        <span className="bg-primary-foreground inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
                            🎉 Penawaran Paket Spesial
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 text-4xl leading-tight font-semibold text-gray-900 lg:text-6xl dark:text-white"
                    >
                        Investasi untuk
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Masa Depan</span>
                        <br />
                        Hemat Besar Hari Ini! 💰
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
                    >
                        Buka potensi tanpa batas dengan paket pembelajaran yang dikurasi dengan cermat. Dapatkan akses ke berbagai program premium
                        dengan harga yang tak tertandingi dan percepat pertumbuhan karir Anda.
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-8 grid grid-cols-2 gap-4"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                    className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800"
                                >
                                    <Icon className={`h-6 w-6 ${feature.color}`} />
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">{feature.text}</span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <a href="#bundles">
                            <Button size="lg">
                                Jelajahi Paket
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </a>
                        <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline">
                                Bicara dengan Ahli
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
