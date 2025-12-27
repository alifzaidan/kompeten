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
        learning: null,
        certificate: null,
        payment: null,
        technical: null,
    });

    const faqCategories: FaqCategory[] = [
        {
            id: 'general',
            title: 'Umum & Pendaftaran',
            faqs: [
                {
                    question: 'Apa itu Kompeten IDN?',
                    answer: 'Kompeten IDN merupakan platform edukasi digital yang dirancang untuk mendukung pengembangan skill di era modern di berbagai bidang mulai dari akuntansi, ekonomi, perpajakan, teknologi, hingga desain.',
                },
                {
                    question: 'Apa saja yang tersedia di Kompeten?',
                    answer: 'Kompeten menawarkan berbagai layanan seperti Online Class, Bootcamp, Webinar, dan Program Sertifikasi.',
                },
                {
                    question: 'Apakah pelatihan ini terbuka untuk umum?',
                    answer: 'Tentu, pelatihan kami terbuka untuk mahasiswa, lulusan baru (fresh graduate), maupun profesional yang ingin meningkatkan keahlian di bidang akuntansi, ekonomi, perpajakan, teknologi, hingga desain.',
                },
                {
                    question: 'Bagaimana cara mendaftar pelatihan di Kompeten?',
                    answer: 'Pendaftaran dapat dilakukan langsung melalui website kami atau melalui link pendaftaran yang tersedia di bio Instagram @kompeten.idn. Kamu hanya perlu mengisi formulir pendaftaran dan melakukan konfirmasi pembayarannya.',
                },
                {
                    question: 'Apakah saya bisa mendaftar lebih dari satu program sekaligus?',
                    answer: 'Tentu saja. Namun, pastikan jadwal Live Class antar program tidak bentrok agar kamu bisa mengikuti sesi interaktif dengan maksimal.',
                },
                {
                    question: 'Kemana saya bisa mendapatkan informasi lebih lanjut tentang Kompeten?',
                    answer: 'Kamu dapat menghubungi admin di +6289528514480 atau mengikuti media sosial Kompeten di Instagram, TikTok, dan LinkedIn.',
                },
                {
                    question: 'Bagaimana cara mendaftar kelas yang diinginkan?',
                    answer: 'Kamu dapat mendaftar dengan mengklik tombol "Daftar" pada halaman kelas, mengisi formulir pendaftaran, dan melakukan pembayaran.',
                },
            ],
        },
        {
            id: 'learning',
            title: 'Sistem Pembelajaran',
            faqs: [
                {
                    question: 'Bagaimana alur belajar di Kompeten?',
                    answer: 'Alur belajar di Kompeten dimulai dengan memilih kelas atau bootcamp yang diinginkan. Kemudian mendapatkan akses materi pembelajaran yang dapat diakses kapan saja, dilengkapi modul, kuis, dan juga forum diskusi.',
                },
                {
                    question: 'Apakah kelas dilakukan secara tatap muka atau online?',
                    answer: 'Saat ini seluruh pelatihan kami dilakukan secara Online melalui platform Zoom (Live Session) dan Learning Management System (LMS) kami untuk akses materi mandiri.',
                },
                {
                    question: 'Bagaimana jika saya berhalangan hadir saat sesi Live Class?',
                    answer: 'Jangan khawatir. Setiap sesi akan direkam, dan rekaman kelas dapat diakses kembali hingga kapan aja tanpa ada batasan waktu. Recording dapat diakses dalam waktu maksimal 24 jam setelah sesi berakhir.',
                },
                {
                    question: 'Berapa lama masa akses materi pelatihan?',
                    answer: 'Masa akses materi (video rekaman dan modul) dapat diakses hingga kapan saja tanpa batasan waktu sehingga kamu bisa belajar lagi secara mandiri.',
                },
            ],
        },
        {
            id: 'certificate',
            title: 'Sertifikat & Kompetensi',
            faqs: [
                {
                    question: 'Apakah saya akan mendapatkan sertifikat?',
                    answer: 'Tentu saja, setiap peserta yang telah menyelesaikan pelatihan dan memenuhi syarat kelulusan (seperti mengerjakan post-test atau tugas) akan mendapatkan e-sertifikat resmi dari Kompeten IDN.',
                },
                {
                    question: 'Apakah sertifikat dari Kompeten IDN bisa digunakan untuk melamar kerja?',
                    answer: 'Tentu, sertifikat kami mencantumkan daftar kompetensi yang kamu pelajari, yang dapat memperkuat CV dan portofolio kamu di mata rekruter.',
                },
                {
                    question: 'Bagaimana memastikan kredibilitas e-sertifikat?',
                    answer: 'Di e-sertifikat terdapat qr code yang dapat discan dan berisi data diri peserta pelatihan mulai dari nama peserta, tanggal pelatihan, dan program yang diikuti sehingga tidak dapat dimanipulasi oleh pihak yang tidak bertanggung jawab.',
                },
            ],
        },
        {
            id: 'payment',
            title: 'Sistem Pembayaran',
            faqs: [
                {
                    question: 'Metode pembayaran apa saja yang tersedia?',
                    answer: 'Pembayaran dapat dilakukan melalui QRIS atau transfer bank menggunakan Virtual Account, e-wallet (GoPay, OVO, DANA).',
                },
                {
                    question: 'Bagaimana jika pembayaran saya belum terkonfirmasi?',
                    answer: 'Jika pembayaran belum terkonfirmasi dalam 1x24 jam, silakan hubungi tim support dengan menyertakan bukti pembayaran.',
                },
                {
                    question: 'Apa yang harus saya lakukan ketika sudah menyelesaikan pembayaran?',
                    answer: 'Setelah menyelesaikan pembayaran, kamu dapat melakukan konfirmasi ke admin (MinKo) atau langsung bergabung ke dalam grup whatsapp.',
                },
            ],
        },
        {
            id: 'technical',
            title: 'Teknis',
            faqs: [
                {
                    question: 'Perangkat apa yang saya butuhkan untuk mengikuti pelatihan?',
                    answer: 'Kami menyarankan penggunaan laptop/pc (Windows atau Mac) atau bisa juga menggunakan tablet untuk memudahkan saat praktik langsung.',
                },
                {
                    question: 'Saya mengalami kendala saat login ke member area, apa yang harus saya lakukan?',
                    answer: 'Silakan gunakan fitur "Lupa Password" di halaman login. Jika kendala berlanjut, hubungi admin (MinKo) di nomor +62 895-2851-4480.',
                },
                {
                    question: 'Bagaimana cara reset password?',
                    answer: 'Klik menu "Lupa Password" di halaman login, masukkan email terdaftar, lalu ikuti instruksi yang dikirimkan melalui email.',
                },
                {
                    question: 'Bagaimana jika video pembelajaran tidak dapat diputar?',
                    answer: 'Pastikan koneksi internet stabil, browser telah diperbarui, dan coba bersihkan cache browser.',
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
                    <TabsList className="flex w-full flex-row justify-start gap-3 overflow-x-auto bg-transparent px-1 py-2 lg:w-64 lg:flex-col lg:items-start lg:overflow-x-visible lg:px-0 lg:py-0">
                        {faqCategories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.id}
                                className="data-[state=active]:border-primary data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 flex w-full flex-shrink-0 items-center justify-between gap-3 rounded-full border border-neutral-200 bg-transparent p-5 text-left text-gray-700 transition-all hover:cursor-pointer hover:bg-gray-100 data-[state=active]:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                <span className="font-medium whitespace-nowrap">{category.title}</span>
                                <span className="text-2xl">
                                    <MoveRight />
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex-1 lg:h-[300px] lg:overflow-y-auto lg:pr-2">
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
