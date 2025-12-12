import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, MoveRight } from 'lucide-react';
import { useState } from 'react';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqCategory {
    id: string;
    title: string;
    icon?: string;
    faqs: FaqItem[];
}

export default function FaqSection() {
    const [expanded, setExpanded] = useState<Record<string, React.Key | null>>({
        general: 'faq-0',
        course: null,
        payment: null,
        technical: null,
    });

    const faqCategories: FaqCategory[] = [
        {
            id: 'general',
            title: 'Umum',
            faqs: [
                {
                    question: 'Apa itu Kompeten?',
                    answer: 'Kompeten adalah platform edukasi digital yang dikembangkan oleh CV. Kompeten dan dirancang untuk mendukung pengembangan skill di era modern mulai dari teknologi, desain, hingga bisnis.',
                },
                {
                    question: 'Apa saja fitur yang tersedia di Kompeten?',
                    answer: 'Kompeten menawarkan berbagai fitur seperti Kelas Online, Bootcamp, dan pelatihan dalam bentuk Webinar yang mencakup berbagai disiplin ilmu. Setiap fitur dirancang untuk memberikan pengalaman belajar yang interaktif dan mendalam, memungkinkan pengguna untuk mengembangkan keterampilan mereka secara efektif.',
                },
                {
                    question: 'Bagaimana alur belajar di Kompeten?',
                    answer: 'Alur belajar di Kompeten dimulai dengan memilih kelas atau bootcamp yang sesuai dengan minat dan kebutuhan Anda. Setelah mendaftar, Anda akan mendapatkan akses ke materi pembelajaran yang dapat diakses kapan saja. Setiap kelas dilengkapi dengan modul, quiz, dan forum diskusi untuk mendukung proses belajar Anda.',
                },
                {
                    question: 'Kemana saya bisa mendapatkan informasi lebih lanjut tentang Kompeten?',
                    answer: 'Untuk informasi lebih lanjut tentang Kompeten, Anda dapat menghubungi admin kami di +6289528514480. Kami juga aktif di media sosial, jadi pastikan untuk mengikuti kami di platform seperti Instagram, TikTok, dan LinkedIn untuk update terbaru dan tips belajar.',
                },
            ],
        },
        {
            id: 'course',
            title: 'Kelas & Bootcamp',
            faqs: [
                {
                    question: 'Bagaimana cara mendaftar kelas?',
                    answer: 'Anda dapat mendaftar kelas dengan mengklik tombol "Daftar" pada halaman detail kelas, kemudian mengisi formulir pendaftaran dan melakukan pembayaran.',
                },
                {
                    question: 'Apakah ada sertifikat setelah menyelesaikan kelas?',
                    answer: 'Ya, setiap peserta yang menyelesaikan kelas akan mendapatkan sertifikat digital yang dapat diunduh dan dibagikan di LinkedIn atau platform lainnya.',
                },
                {
                    question: 'Berapa lama akses kelas berlaku?',
                    answer: 'Akses kelas bervariasi tergantung tipe program. Untuk kelas online, akses seumur hidup. Untuk bootcamp, akses selama durasi program ditambah 3 bulan setelahnya.',
                },
                {
                    question: 'Apakah bisa mengikuti lebih dari satu kelas sekaligus?',
                    answer: 'Tentu saja! Anda dapat mengikuti beberapa kelas sekaligus sesuai dengan kemampuan dan waktu luang Anda.',
                },
            ],
        },
        {
            id: 'payment',
            title: 'Pembayaran',
            faqs: [
                {
                    question: 'Metode pembayaran apa saja yang tersedia?',
                    answer: 'Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, DANA), kartu kredit/debit, dan cicilan melalui berbagai platform.',
                },
                {
                    question: 'Apakah ada diskon untuk pembelian bundle?',
                    answer: 'Ya, kami sering memberikan diskon khusus untuk pembelian paket bundle atau promo tertentu. Pantau terus website dan media sosial kami untuk info promo terbaru.',
                },
                {
                    question: 'Bagaimana jika pembayaran saya belum terkonfirmasi?',
                    answer: 'Jika pembayaran Anda belum terkonfirmasi dalam 1x24 jam, silakan hubungi tim support kami dengan menyertakan bukti pembayaran.',
                },
                {
                    question: 'Apakah ada kebijakan refund?',
                    answer: 'Ya, kami memiliki kebijakan refund 7 hari setelah pembelian jika Anda belum mengakses lebih dari 20% materi kelas. Syarat dan ketentuan berlaku.',
                },
            ],
        },
        {
            id: 'technical',
            title: 'Teknis',
            faqs: [
                {
                    question: 'Perangkat apa yang dibutuhkan untuk mengikuti kelas?',
                    answer: 'Anda membutuhkan komputer atau smartphone dengan koneksi internet yang stabil. Browser yang direkomendasikan adalah Chrome, Firefox, atau Safari versi terbaru.',
                },
                {
                    question: 'Bagaimana jika video tidak bisa diputar?',
                    answer: 'Pastikan koneksi internet Anda stabil dan browser sudah diupdate ke versi terbaru. Jika masih bermasalah, coba clear cache browser atau hubungi support kami.',
                },
                {
                    question: 'Apakah bisa download materi kelas?',
                    answer: 'Beberapa materi dapat diunduh seperti slide presentasi dan file pendukung. Namun video pembelajaran hanya dapat diakses secara online untuk menjaga keamanan konten.',
                },
                {
                    question: 'Bagaimana cara reset password?',
                    answer: 'Klik "Lupa Password" pada halaman login, masukkan email terdaftar, dan ikuti instruksi yang dikirimkan ke email Anda untuk reset password.',
                },
            ],
        },
    ];

    const handleExpandedChange = (category: string, value: React.Key | null) => {
        setExpanded((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8">
            <h6 className="text-primary mb-3 text-xl font-semibold">FAQ</h6>
            <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row">
                <h2 className="max-w-lg text-3xl font-semibold md:text-4xl">Temukan jawaban pertanyaanmu di sini</h2>
                <p className="text-muted-foreground max-w-xl md:text-right">
                    Dapatkan pemahaman yang lebih komprehensif melalui rangkaian pertanyaan dan jawaban yang telah kami siapkan.
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <TabsList className="flex w-full flex-row justify-start gap-3 overflow-x-auto bg-transparent p-0 lg:w-64 lg:flex-col lg:items-start lg:overflow-x-visible">
                        {faqCategories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.id}
                                className="data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 flex w-full items-center justify-between gap-3 rounded-full border border-neutral-200 bg-transparent p-5 text-left text-gray-700 transition-all hover:cursor-pointer hover:bg-gray-100 data-[state=active]:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                <span className="font-medium whitespace-nowrap">{category.title}</span>
                                <span className="text-2xl">
                                    <MoveRight />
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex-1">
                        {faqCategories.map((category) => (
                            <TabsContent key={category.id} value={category.id} className="mt-0">
                                <Accordion
                                    className="flex w-full flex-col gap-2"
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    expandedValue={expanded[category.id]}
                                    onValueChange={(value) => handleExpandedChange(category.id, value)}
                                >
                                    {category.faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={`faq-${index}`}
                                            value={`faq-${index}`}
                                            className={`rounded-lg px-4 py-2 transition-colors hover:bg-neutral-100 ${
                                                expanded[category.id] === `faq-${index}` ? 'border-primary dark:bg-primary/10 bg-neutral-100' : ''
                                            }`}
                                        >
                                            <AccordionTrigger className="w-full text-left hover:cursor-pointer">
                                                <div className="flex w-full items-center justify-between gap-4">
                                                    <p className="font-medium text-gray-900 md:text-lg dark:text-gray-50">{faq.question}</p>
                                                    <ChevronDown className="text-primary h-5 w-5 shrink-0 transition-transform duration-200 group-data-expanded:-rotate-180" />
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="text-sm text-gray-600 md:text-base dark:text-gray-400">{faq.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>
                        ))}
                    </div>
                </div>
            </Tabs>
        </section>
    );
}
