import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from '@/components/ui/carousel';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { useEffect, useState } from 'react';

interface Testimony {
    name: string;
    asal: string;
    course: string;
    avatar: string;
    text: string;
    tags: string[];
}

export default function TestimonySection() {
    const testimonies: Testimony[] = [
        {
            name: 'Melina Putri Rusmawati',
            asal: 'Universitas Dian Nuswantoro',
            course: 'Basic Accurate Online',
            avatar: '/assets/images/testimonials/MELINA PUTRI RUSMAWATI.png',
            text: 'Mentornya seru dan mudah dipahami pada saat menjelaskan. Grup whatsapp terbuka jadi jika ada pertanyaan bisa ditanyakan di grup.',
            tags: ['Accurate', 'Accounting', 'Online'],
        },
        {
            name: 'Julia Dwi Cahya',
            asal: 'Universitas Kuningan',
            course: 'Basic Accurate Online',
            avatar: '/assets/images/testimonials/JULIA DWI CAHYA.png',
            text: 'Kesan saya terhadap pelatihan ini sangat positif. Materi yang disampaikan cukup jelas, sistematis, dan relevan dengan praktik kerja. Pemateri juga komunikatif serta responsif dalam menjawab pertanyaan, sehingga suasana pelatihan menjadi interaktif dan mudah dipahami.',
            tags: ['Accurate', 'Accounting', 'Basic'],
        },
        {
            name: 'Annisa Tri Handari',
            asal: 'Universitas Pancasila',
            course: 'Basic Accurate Online',
            avatar: '/assets/images/testimonials/ANNISA TRI HANDARI.png',
            text: 'Kesan saya mengikuti pelatihan Accurate kali ini sangat positif. Materi yang disampaikan jelas dan aplikatif, terutama dalam penggunaan fitur software. Pelatihan ini membantu saya memahami cara memanfaatkan sistem akuntansi dengan lebih efisien dan memberikan wawasan baru. Secara keseluruhan, sangat bermanfaat.',
            tags: ['Accurate', 'Software', 'Accounting'],
        },
        {
            name: 'Ananda Putra Kawilarang',
            asal: 'Universitas Kristen Satya Wacana',
            course: 'Audit Internal',
            avatar: '/assets/images/testimonials/ANANDA PUTRA KAWILARANG.png',
            text: 'Sangat baik, materi yang diberikan cukup jelas serta mendapatkan rekaman kelas sebelumnya dan tes untuk menguji pengetahuan dalam audit internal. Pengajar juga berasal dari tenaga profesional yang sudah menguasai bidangnya jadi apabila ada pertanyaan dari peserta bisa dijawab dengan jelas.',
            tags: ['Audit', 'Internal', 'Professional'],
        },
        {
            name: 'Muhammad Ade Alvien Liandi',
            asal: 'Universitas Siliwangi',
            course: 'Audit Internal',
            avatar: '/assets/images/testimonials/MUHAMMAD ADE ALVIEN LIANDI.png',
            text: 'Pelatihan ini sangat bermanfaat karena memberikan pemahaman baru tentang bagaimana audit internal dilakukan di suatu organisasi.',
            tags: ['Audit', 'Internal', 'Organization'],
        },
        {
            name: 'Ryco Tarnuwardhana Putra, S.AP.',
            asal: 'Universitas Dr. Soetomo Surabaya',
            course: 'Intermediate Accurate Online',
            avatar: '/assets/images/testimonials/RYCO TARNUWARDHANA PUTRA, S.AP..png',
            text: 'Kesan saya selama mengikuti pelatihan Accurate Intermediate ini sangat positif. Materi yang disampaikan cukup jelas dan terstruktur, sehingga meskipun saya bukan dari latar belakang akuntansi murni, saya tetap bisa mengikuti dengan baik.',
            tags: ['Accurate', 'Intermediate', 'Accounting'],
        },
        {
            name: 'Ros Endah Rahmawati',
            asal: 'Universitas Gadjah Mada',
            course: 'Coretax',
            avatar: '/assets/images/testimonials/ROS ENDAH RAHMAWATI.png',
            text: 'Pemaparan narasumber sangat jelas dan membantu saya memahami lebih dalam tentang penggunaan Coretax dalam proses pelaporan pajak. Narasumber menyampaikan materi dengan jelas dan terstruktur. Selain itu, praktik langsung membuat peserta lebih mudah memahami materi yang disampaikan.',
            tags: ['Coretax', 'Tax', 'Reporting'],
        },
        {
            name: 'Fadiya Naura Hasna',
            asal: 'Universitas Nurtanio Bandung',
            course: 'Coretax',
            avatar: '/assets/images/testimonials/FADIYA NAURA HASNA.png',
            text: 'Ilmunya bermanfaat untuk saat ini karena coretax merupakan sistem baru dan banyak pemula yang masih belum lancar cara menggunakannya.',
            tags: ['Coretax', 'Tax', 'System'],
        },
        {
            name: 'Dhea Eka Andini',
            asal: 'PT Hiroyuki Worldwide Education',
            course: 'Basic Zahir Accounting',
            avatar: '/assets/images/testimonials/DHEA EKA ANDINI.png',
            text: 'Senang, deg-deg ser, bangga karena baru bulan Desember ini baru terealisasi ikut e-course accounting yang super duper affordable banget. Dan untuk pelaksanaannya fleksibel secara tempat dan waktu, serta mengkombinasikan antara belajar mandiri dan ada coach.',
            tags: ['Zahir', 'Accounting', 'E-Learning'],
        },
        {
            name: 'Silvi Kunniyati Emiliyah',
            asal: 'Umum',
            course: 'Basic Zahir Accounting',
            avatar: '/assets/images/testimonials/SILVI KUNNIYATI EMILIYAH.png',
            text: 'Menyenangkan walaupun, tadinya agak bingung sebenernya, tapi tutornya asik dan bahasanya mudah dipahami menurut saya.',
            tags: ['Zahir', 'Accounting', 'Basic'],
        },
        {
            name: 'Ahmad Rinaldi',
            asal: 'Universitas Syiah Kuala',
            course: 'Basic Zahir Accounting',
            avatar: '/assets/images/testimonials/AHMAD RINALDI.png',
            text: 'Tutor yang diberikan mentor sangat jelas dengan studi kasus.',
            tags: ['Zahir', 'Tutorial', 'Case Study'],
        },
        {
            name: 'Aulia Akbar Navis',
            asal: 'UIN Surabaya',
            course: 'Data Analyst',
            avatar: '/assets/images/testimonials/AULIA AKBAR NAVIS.png',
            text: 'Saya merasa mendapatkan ilmu yang aplikatif, terutama dalam hal pengolahan data, visualisasi, dan penggunaan tools seperti Excel, SQL, dan Python. Materi disampaikan dengan jelas, dan mentor sangat responsif.',
            tags: ['Data', 'Excel', 'Python'],
        },
        {
            name: 'Dyandra Augustine Faisal',
            asal: 'UIN Syarif Hidayatullah Jakarta',
            course: 'Data Analyst',
            avatar: '/assets/images/testimonials/DYANDRA AUGUSTINE FAISAL.png',
            text: 'Sangat bermanfaat tentunya karena bisa menambah insight dan wawasan baru yang berguna untuk menunjang karier kedepannya serta mengembangkan skill yang baru di bidang yang relevan dengan jurusan saya.',
            tags: ['Data', 'Analyst', 'Career'],
        },
        {
            name: 'St Ainun Khairunnisa',
            asal: 'Universitas Negeri Makassar',
            course: 'Data Analyst',
            avatar: '/assets/images/testimonials/ST AINUN KHAIRUNNISA.png',
            text: 'Awalnya saya kira bakalan boring, karena saya tidak ada dasar dalam data analyst, cuman tertarik untuk membuka skills baru. Ternyata kak Vania seru banget ngejelesinnya, semakin pindah slide, semakin antusias, cara menjelaskannya mudah + cepat dimengerti untuk orang awam.',
            tags: ['Data', 'Analyst', 'Beginner'],
        },
        {
            name: 'Dwi Aryanto',
            asal: 'UIN Sultan Maulana Hasanuddin Banten',
            course: 'Data Analyst',
            avatar: '/assets/images/testimonials/DWI ARYANTO.png',
            text: 'Saya jadi lebih paham bagaimana mengolah dan menganalisis data secara sistematis. Rasanya sangat menyenangkan bisa belajar langsung dari mentor yang berpengalaman dan bisa praktek langsung lewat studi kasus yang relevan. Ilmu yang saya dapat benar-benar membuka wawasan baru.',
            tags: ['Data', 'Analysis', 'Systematic'],
        },
        {
            name: 'Ifra Ramadina Afifah Muiz',
            asal: 'Universitas Primagraha',
            course: 'Meta Ads: Digital Marketing',
            avatar: '/assets/images/testimonials/IFRA RAMADINA AFIFAH MUIZ.png',
            text: 'Materinya cukup baik dan bermanfaat untuk saya pemula yang baru belajar digital marketing. Bahkan, ada praktek untuk buat champaign di Facebook/meta ads juga.',
            tags: ['Meta Ads', 'Marketing', 'Facebook'],
        },
        {
            name: 'Sirilus Gantang Prasetya',
            asal: 'Universitas Janabadra',
            course: 'Meta Ads: Digital Marketing',
            avatar: '/assets/images/testimonials/SIRILUS GANTANG PRASETYA.png',
            text: 'Saya mendapatkan banyak pengetahuan baru tentang strategi pemasaran digital, SEO, media sosial, iklan digital, dan analisis data. Materi yang disajikan sangat relevan dan aplikatif, sehingga saya bisa langsung mempraktekkan apa yang dipelajari.',
            tags: ['Digital', 'Marketing', 'SEO'],
        },
        {
            name: 'Alifia Rizky Zalfa',
            asal: 'Universitas Bhayangkara Jakarta',
            course: 'Excel Laporan Keuangan',
            avatar: '/assets/images/testimonials/ALIFIA RIZKY ZALFA.png',
            text: 'Pelatihannya sangat bermanfaat, penjelasan dari pemateri mudah dipahami, dan materi yang diberikan langsung bisa diterapkan. Saya juga merasa terbantu dengan praktik langsung di Excel, karena membuat proses belajar lebih efektif dan tidak membosankan.',
            tags: ['Excel', 'Finance', 'Reporting'],
        },
        {
            name: 'Herliana Ayu Kusumawati',
            asal: 'Universitas Amikom Yogyakarta',
            course: 'Excel Laporan Keuangan',
            avatar: '/assets/images/testimonials/HERLIANA AYU KUSUMAWATI.png',
            text: 'Pelatihannya sangat bermanfaat dan mudah dipahami. Suasana kelas juga interaktif, sehingga membuat proses belajar menjadi menyenangkan.',
            tags: ['Excel', 'Finance', 'Interactive'],
        },
        {
            name: 'Cut Raihan Inayatillah',
            asal: 'Universitas Syiah Kuala',
            course: 'Excel Laporan Keuangan',
            avatar: '/assets/images/testimonials/CUT RAIHAN INAYATILLAH.png',
            text: 'Sangat efektif, dimulai dari waktu sampai dengan arahan2 yang detail untuk diberikan ketika pelatihan, infonya jelas, kelasnya juga dimulai tepat waktu.',
            tags: ['Excel', 'Finance', 'Efficient'],
        },
        {
            name: 'Eva Riyanti Dwi Lestari',
            asal: 'Universitas Islam Negeri Sunan Gunung Djati Bandung',
            course: 'Coretax',
            avatar: '/assets/images/testimonials/EVA RIYANTI DWI LESTARI.png',
            text: 'Melalui pelatihan kali ini yang membahas SPT PPh dan unifikasi, saya merasa pemahaman saya semakin bertambah, terutama karena materi disampaikan secara runtut dan disertai praktik langsung di Coretax.',
            tags: ['Coretax', 'SPT', 'Tax'],
        },
        {
            name: 'Noer Ainy Rimadhany',
            asal: 'Universitas Negeri Surabaya',
            course: 'Coretax',
            avatar: '/assets/images/testimonials/NOER AINY RIMADHANY.png',
            text: 'Materi yang disampaikan jelas dan praktis, sehingga memudahkan dalam memahami alur penggunaan Coretax. Selain itu, contoh kasus yang diberikan juga sesuai dengan praktik sebenarnya, sehingga saya merasa lebih siap untuk mengaplikasikannya di dunia kerja.',
            tags: ['Coretax', 'Tax', 'Practical'],
        },
        {
            name: 'Fadli Nudjun',
            asal: 'STIE Hidayatullah Depok',
            course: 'Audit Internal',
            avatar: '/assets/images/testimonials/FADLI NUDJUN.png',
            text: 'Pelatihan ini sangat menarik karena dibawakan oleh pemateri berpengalaman serta materinya mudah dimengerti dan membahas praktek langsung dilapangan.',
            tags: ['Audit', 'Internal', 'Practice'],
        },
        {
            name: 'Hanifa Fidiena',
            asal: 'Universitas Muhammadiyah Surakarta',
            course: 'Audit ATLAS',
            avatar: '/assets/images/testimonials/HANIFA FIDIENA.png',
            text: 'Sangat sederhana dan mudah dipahami sebagai lulusan akuntansi yang belum berkesempatan terjun dalam profesional bidang audit.',
            tags: ['Audit', 'ATLAS', 'Accounting'],
        },
        {
            name: 'Dwiyanjana Santyo Nugroho',
            asal: 'Universitas Pembangunan Nasional Veteran Yogyakarta',
            course: 'Audit ATLAS',
            avatar: '/assets/images/testimonials/DWIYANJANA SANTYO NUGROHO.png',
            text: 'Sesuai ekspektasi, instruktur dapat menjelaskan dengan baik masing2 siklus di ATLAS.',
            tags: ['Audit', 'ATLAS', 'Cycle'],
        },
        {
            name: 'Rifa Rofilah Mahdiyah',
            asal: 'Universitas Trisakti',
            course: 'Audit Eksternal',
            avatar: '/assets/images/testimonials/RIFA ROFILAH MAHDIYAH.png',
            text: 'Workshop yang sangat informatif karena materi yg diberikan materi dasar dan penjelasan oleh mentor sangat jelas. Workshop juga interaktif karena banyak pertanyaan yang dijawab oleh mentor.',
            tags: ['Audit', 'External', 'Workshop'],
        },
        {
            name: 'Natasha Puspa Faradilla',
            asal: 'Universitas Mercu Buana',
            course: 'Audit Eksternal',
            avatar: '/assets/images/testimonials/NATASHA PUSPA FARADILLA.png',
            text: 'Suka sekali dengan pembicara karena memberikan informasi yang sangat detail mengenai dasar tentang audit, panitia juga sangat korporatif sehingga acaranya berjalan dengan lancar dan tertib, dan sertif juga cepet banget dan langsung masuk lewat email jadi efisien.',
            tags: ['Audit', 'External', 'Certificate'],
        },
        {
            name: 'Renandia Ridhaning Pangesti',
            asal: 'UIN Kiai Ageng Muhammad Besari Ponorogo',
            course: 'Brevet Pajak AB dan Sertifikasi CFTR',
            avatar: '/assets/images/testimonials/RENANDIA RIDHANING PANGESTI.png',
            text: 'Sebagai mahasiswa, mengikuti Brevet AB memberikan pengalaman belajar yang sangat bermanfaat khususnya dalam bidang perpajakan. Program ini membantu saya memahami ketentuan dan praktik perpajakan secara lebih aplikatif tidak hanya berdasarkan teori di perkuliahan. Materi yang disampaikan terstruktur dan relevan sehingga menambah wawasan serta kesiapan saya dalam menghadapi dunia kerja.',
            tags: ['Brevet', 'Tax', 'CFTR'],
        },
        {
            name: 'Shalsa Rizkita Tiarani',
            asal: 'Universitas Sali Al-Aitaam',
            course: 'Brevet Pajak AB dan Sertifikasi CFTR',
            avatar: '/assets/images/testimonials/SHALSA RIZKITA TIARANI.png',
            text: 'Saya merasa pembelajaran disampaikan dengan jelas dan sistematis. Pemateri kompeten, materi mudah dipahami, dan sesi praktik membantu saya menguasai penerapan langsung di lapangan. Lingkungan kelasnya juga interaktif sehingga proses belajar terasa menyenangkan dan efektif.',
            tags: ['Brevet', 'Tax', 'Practice'],
        },
        {
            name: 'Muhammad Rayhan Pradipta',
            asal: 'Umum',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/MUHAMMAD RAYHAN PRADIPTA.png',
            text: 'Sangat senang bisa mengikuti sertifikasi ini & berhasil lulus dengan nilai yang baik. Semoga ilmu yang telah didapatkan bisa diterapkan & bermanfaat. Terima kasih untuk tutor dan admin.',
            tags: ['Accurate', 'Professional', 'Certificate'],
        },
        {
            name: 'Fitria Nur Utami',
            asal: 'Universitas Islam Indonesia',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/FITRIA NUR UTAMI.png',
            text: 'Pelatihan Accurate ini sangat bermanfaat dan membuka wawasan saya tentang software akuntansi Accurate. Materi yang diberikan sangat relevan dengan kebutuhan saya, terutama dalam mengelola keuangan bisnis secara lebih efisien dan akurat. Instruktur pelatihan juga sangat kompeten dan berpengalaman, sehingga penyampaian materi mudah dipahami. Saya merasa lebih percaya diri dalam menggunakan Accurate setelah mengikuti pelatihan ini.',
            tags: ['Accurate', 'Professional', 'Business'],
        },
        {
            name: 'A. Syahril Mubarok',
            asal: 'Universitas Islam Indonesia',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/A. SYAHRIL MUBAROK.png',
            text: 'Modul serta pelatihannya yang diberikan sangat detail dijelaskan oleh instruktur jadi saya mudah memahami dan mempelajarinya.',
            tags: ['Accurate', 'Professional', 'Detailed'],
        },
        {
            name: 'Agnemas Yusoep Islami',
            asal: 'Universitas Global Jakarta',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/AGNEMAS YUSOEP ISLAMI.png',
            text: 'Pelatihannya sangat benar benar bermanfaat, materi nya detail, mentornya menjelaskan step by step dengan jelas, walaupun terkadang terlalu cepat dikarenakan juga kejar kejaran dengan waktu dan materi yang sangat padat, tapi tenangnya ada rekaman video nya dan group diskusinya.',
            tags: ['Accurate', 'Professional', 'Step-by-Step'],
        },
        {
            name: 'Febrianus Antonius, SST.Pa., CTT.',
            asal: 'Zakheus Indonesia Service',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/FEBRIANUS ANTONIUS, SST.PA., CTT..png',
            text: 'Sangat membantu dalam pekerjaan dan menambah wawasan terkait software Accurate.',
            tags: ['Accurate', 'Professional', 'Software'],
        },
        {
            name: 'Adjie Nugroho Pamungkas',
            asal: 'Universitas Teknologi Yogyakarta',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/ADJIE NUGROHO PAMUNGKAS.png',
            text: 'Terimakasih kepada Instruktur dan Admin yang telah membantu selama pelatihan dan selama ujian, terimakasih juga atas materi yang diberikan. Jujur sangat bermanfaat untuk membantu pencatatan pengeluaran pembangunan kost milik orang tua saya.',
            tags: ['Accurate', 'Professional', 'Practical'],
        },
        {
            name: 'Seno Yudonegoro',
            asal: 'Universitas Katolik Soegijapranata',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/SENO YUDONEGORO.png',
            text: 'Mengikuti pelatihan dan sertifikasi Accurate memberikan saya pemahaman yang mendalam tentang penggunaan software akuntansi ini, meningkatkan efisiensi dalam pencatatan keuangan, serta menambah nilai tambah untuk mendukung karier saya di bidang akuntansi.',
            tags: ['Accurate', 'Professional', 'Accounting'],
        },
        {
            name: 'Amartia Rachmawati',
            asal: 'Universitas Mercu Buana',
            course: 'Sertifikasi Accurate Professional',
            avatar: '/assets/images/testimonials/AMARTIA RACHMAWATI.png',
            text: 'Kesan saya dalam mengikuti pelatihan sertifikasi accurate ini yakni menyenangkan karena selain mentornya baik dan ramah saya juga mendapatkan ilmu baru terkait accurate.',
            tags: ['Accurate', 'Professional', 'Friendly'],
        },
    ];

    const [index, setIndex] = useState(0);
    const TOTAL_ITEMS = testimonies.length;

    const infiniteTestimonies = [...testimonies, ...testimonies, ...testimonies];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => {
                const next = prev + 1;
                if (next >= TOTAL_ITEMS * 2) {
                    return TOTAL_ITEMS;
                }
                return next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [TOTAL_ITEMS]);

    useEffect(() => {
        setIndex(TOTAL_ITEMS);
    }, [TOTAL_ITEMS]);

    const handleIndexChange = (newIndex: number) => {
        if (newIndex < 0) {
            setIndex(TOTAL_ITEMS * 2 - 1);
        } else if (newIndex >= TOTAL_ITEMS * 3) {
            setIndex(TOTAL_ITEMS);
        } else {
            setIndex(newIndex);
        }
    };

    return (
        <section className="bg-background w-full px-4 py-8" id="testimony-section">
            <div className="mx-auto max-w-4xl">
                <h2 className="mx-auto mb-4 max-w-4xl text-center text-3xl font-semibold md:text-4xl">
                    Biar nggak cuma katanya—buktinya ada di sini.
                </h2>
                <p className="text-muted-foreground mx-auto mb-12 max-w-xl text-center">
                    Simak testimoni peserta yang udah merasakan perubahan nyata setelah ikut kelas di Kompeten
                </p>

                <div className="relative">
                    <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r to-transparent md:w-64" />
                    <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l to-transparent md:w-64" />

                    <InfiniteSlider speed={50} speedOnHover={20} gap={24} className="p-4">
                        {testimonies
                            .filter((testimony) => testimony.avatar)
                            .map((testimony, idx) => (
                                <div
                                    key={`avatar-${idx}`}
                                    className="group h-20 w-20 flex-shrink-0 overflow-hidden rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-24 md:w-24"
                                >
                                    <img
                                        src={testimony.avatar}
                                        alt={testimony.name}
                                        className="h-full w-full object-cover object-top transition-all duration-500"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            const parent = target.parentElement;
                                            if (parent) {
                                                parent.style.display = 'none';
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                    </InfiniteSlider>
                </div>
            </div>

            {/* Testimony Section */}
            <div className="relative mt-8">
                <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r to-transparent md:w-72" />
                <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l to-transparent md:w-72" />

                <div className="mx-auto w-full">
                    <Carousel index={index} onIndexChange={handleIndexChange} disableDrag className="relative">
                        <CarouselContent>
                            {infiniteTestimonies.map((testimony, idx) => (
                                <CarouselItem key={`testimony-${idx}`} className="px-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="flex justify-center">
                                        <div className="bg-card flex min-h-[300px] w-full flex-col rounded-2xl border-2 p-5">
                                            <div className="grid h-full grid-cols-3 justify-between gap-2">
                                                <div className="col-span-1 flex flex-col gap-2">
                                                    <h3 className="text-lg font-semibold">{testimony.course}</h3>
                                                    <div className="mt-auto flex flex-wrap gap-2">
                                                        {testimony.tags.map((tag, tagIdx) => (
                                                            <Badge key={tagIdx} variant="secondary">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-span-2 flex flex-col rounded-lg bg-neutral-100 p-3 inset-shadow-sm inset-shadow-neutral-400 dark:bg-neutral-800">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                                                            <img
                                                                src={testimony.avatar}
                                                                alt={testimony.name}
                                                                className="h-full w-full object-cover object-top"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    const parent = target.parentElement;
                                                                    if (parent) {
                                                                        parent.innerHTML = `
                                                                            <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                                                    <circle cx="12" cy="8" r="4"/>
                                                                                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                                                                                </svg>
                                                                            </div>
                                                                        `;
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="truncate font-semibold text-gray-900 dark:text-white">{testimony.name}</h3>
                                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{testimony.asal}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto space-y-2">
                                                        <div className="mt-3 flex items-center gap-2">
                                                            <div className="flex gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg
                                                                        key={i}
                                                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">5.0</span>
                                                        </div>
                                                        <p className="line-clamp-6 flex-grow text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                            {testimony.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNavigation />
                        <div className="mx-auto mt-8 max-w-7xl px-4">
                            <div className="flex justify-center gap-2">
                                {testimonies.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setIndex(TOTAL_ITEMS + idx)}
                                        className={`h-2 rounded-full transition-all ${
                                            index % TOTAL_ITEMS === idx ? 'bg-primary w-8' : 'bg-primary/30 hover:bg-primary/50 w-2'
                                        }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
