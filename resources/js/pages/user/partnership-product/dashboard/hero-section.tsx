import { Button } from '@/components/ui/button';
import { ArrowRight, Award, BookOpen, CheckCircle2, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function HeroSection() {
    const features = [
        { icon: CheckCircle2, text: 'Sertifikat Resmi', color: 'text-green-500' },
        { icon: Award, text: 'Partner Terpercaya', color: 'text-blue-500' },
        { icon: Shield, text: 'Kredibilitas Tinggi', color: 'text-purple-500' },
        { icon: BookOpen, text: 'Materi Premium', color: 'text-orange-500' },
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
                            ✨ Program Sertifikasi Kerjasama
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 text-4xl leading-tight font-semibold text-gray-900 lg:text-6xl dark:text-white"
                    >
                        Sertifikasi dari
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Partner Terpercaya</span>
                        <br />
                        Tingkatkan Kredibilitas! 🎓
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
                    >
                        Program sertifikasi yang dirancang bersama partner industri terkemuka untuk meningkatkan kompetensi profesional dan membuka
                        peluang karir lebih luas di berbagai bidang.
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
                        <a href="#partnership-products">
                            <Button size="lg">
                                Lihat Program Sertifikasi
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </a>
                        <a href="https://wa.me/+6289528514480" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline">
                                Konsultasi Gratis
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
