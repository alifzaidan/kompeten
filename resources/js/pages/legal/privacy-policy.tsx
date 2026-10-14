import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';

    return (
        <UserLayout>
            <Head title={isEn ? 'Privacy Policy' : 'Kebijakan Privasi'} />
            <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                {isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {isEn ? 'Last updated: December 31, 2025' : 'Terakhir diperbarui: 31 Desember 2025'}
                            </p>
                        </div>
                        {isEn ? (
                            <div className="prose prose-gray dark:prose-invert max-w-none text-justify">
                                <section className="mb-8">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        This Privacy Policy explains how our training institution collects, uses, stores, and protects the personal data of users and participants. By accessing the website and using our services, participants are deemed to have read, understood, and agreed to this Privacy Policy.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Information We Collect</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>
                                            Identity data, such as full name, email address, phone number, residential address, occupation, educational background, profile photo (optional), and payment information.
                                        </li>
                                        <li>
                                            Automatically collected information, such as IP address, geographic location, device type, operating system, browser used, browsing activity on our platform, access time and duration, pages visited, learning progress, and content interactions.
                                        </li>
                                        <li>
                                            Information from third parties, such as social media platform details (if logging in via social accounts), payment service provider data, and partner information.
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">How We Collect Data</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Online registration form submissions</li>
                                        <li>Enrollment in training or certification programs</li>
                                        <li>Communications via email, WhatsApp, or other official channels</li>
                                        <li>User activity while navigating the website</li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Use of Personal Data</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Registration processing and training administration</li>
                                        <li>Execution of training programs, certifications, and evaluations</li>
                                        <li>Delivery of schedule updates, course materials, and announcements</li>
                                        <li>Participant support and communications</li>
                                        <li>Service quality improvement and program development</li>
                                        <li>Compliance with applicable statutory reporting and legal obligations</li>
                                        <li>Fraud prevention and security protection</li>
                                        <li>Research and product analytics</li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Data Storage and Security</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>We store participant personal data as long as necessary for training and administrative objectives.</li>
                                        <li>
                                            Our institution adopts reasonable security measures to safeguard data against unauthorized access, use, or disclosure.
                                        </li>
                                        <li>Access to personal data is restricted to authorized personnel only.</li>
                                        <li>
                                            While we implement best security practices, no transmission over the internet is completely impenetrable. Participants are advised to maintain strong passwords and safeguard their account credentials.
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Data Disclosure to Third Parties</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>We never sell or rent user personal data to third parties.</li>
                                        <li>
                                            Personal data may be shared with authorized third-party partners solely to deliver services (e.g., certification bodies, learning management providers).
                                        </li>
                                        <li>
                                            Disclosures may also occur when mandated by court orders, laws, or governing regulatory authorities.
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Data Retention</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Active accounts: Throughout the active lifetime of the participant account</li>
                                        <li>Transaction records: 10 years following completion of transaction</li>
                                        <li>Communication history: 3 years following last recorded message</li>
                                        <li>System audit logs: 1 year from logging event</li>
                                        <li>Marketing consent: Until consent is actively withdrawn</li>
                                    </ul>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        Data is safely and permanently deleted once retention periods expire unless extended retention is required by statutory laws.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">User Rights</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Access and update personal data</li>
                                        <li>Request correction of inaccurate information</li>
                                        <li>Request deletion of personal data in accordance with statutory conditions</li>
                                        <li>Withdraw consent for specific processing activities</li>
                                    </ul>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        Requests regarding user rights can be submitted via official institution contact channels.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Cookies and Similar Technologies</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Preserving login sessions</li>
                                        <li>Retaining user preferences</li>
                                        <li>Optimizing platform performance</li>
                                        <li>Analyzing visitor web traffic</li>
                                    </ul>
                                    <div className="mt-4">
                                        <h3 className="mb-2 font-semibold">Types of Cookies</h3>
                                        <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
                                            <li>
                                                <strong>Essential Cookies</strong>: Required for core site functionality
                                            </li>
                                            <li>
                                                <strong>Analytics Cookies</strong>: Help us understand usage trends
                                            </li>
                                            <li>
                                                <strong>Functional Cookies</strong>: Remember user choices and preferences
                                            </li>
                                            <li>
                                                <strong>Marketing Cookies</strong>: Used for tailored promotions
                                            </li>
                                        </ul>
                                    </div>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        You can configure cookie settings through your browser. However, disabling certain cookies may impact site functionality.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">International Data Transfers</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Participant personal data may be processed and stored on cloud servers located outside Indonesia. We ensure cross-border data transfers adhere to adequate security safeguards and international compliance standards.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Children's Privacy</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Our services are not intended for children under 13 years of age. We do not knowingly collect personal data from minors under 13. If you believe your child has submitted personal details, please contact us promptly for deletion.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Changes to Privacy Policy</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        We may revise this Privacy Policy periodically. Material modifications will be notified via email or announcement banners. Revised policies take effect from the updated publication date shown above.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Consent</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        By using our website and enrolling in training programs, you express agreement to the collection, processing, and management of your data in accordance with this Privacy Policy.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Contact Us</h2>
                                    <div className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                        <p className="mb-2">
                                            If you have questions, inquiries, or feedback regarding this Privacy Policy, please contact us at:
                                        </p>
                                        <p>Email: kompetenidn@gmail.com</p>
                                        <p>Whatsapp: +62 895-2851-4480</p>
                                        <p>Instagram: @kompeten.idn @tictaxacademy</p>
                                        <p>Address: Permata Permadani Residence Blok B1, Pendem, Kec. Junrejo, Kota Batu, Jawa Timur, 65324</p>
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="prose prose-gray dark:prose-invert max-w-none text-justify">
                                <section className="mb-8">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Kebijakan Privasi ini menjelaskan bagaimana lembaga pelatihan mengumpulkan, menggunakan, menyimpan, dan melindungi
                                        data pribadi pengguna dan peserta. Dengan mengakses website serta menggunakan layanan kami, peserta dianggap telah
                                        membaca, memahami, dan menyetujui Kebijakan Privasi ini.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Informasi yang Kami Kumpulkan</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>
                                            Data identitas, seperti nama lengkap, alamat email, nomor telepon, dan alamat domisili, pekerjaan dan latar
                                            belakang pendidikan, foto profil (opsional), dan informasi pembayaran.
                                        </li>
                                        <li>
                                            Informasi yang dikumpulkan secara otomatis, seperti alamat IP dan lokasi geografis, jenis perangkat dan sistem
                                            operasi, browser yang digunakan, aktivitas browsing di platform kami, waktu akses dan durasi penggunaan,
                                            halaman yang dikunjungi, progres pembelajaran, interaksi dengan konten.
                                        </li>
                                        <li>
                                            Informasi dari pihak ketiga, seperti informasi dari platform media sosial (jika peserta login menggunakan akun
                                            sosial media), data dari penyedia layanan dan pembayaran, informasi dari mitra bisnis kami.
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Cara Pengumpulan Data</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Pengisian formulir pendaftaran online</li>
                                        <li>Pendaftaran program pelatihan atau sertifikasi</li>
                                        <li>Komunikasi melalui email, whatsapp, atau media resmi lainnya</li>
                                        <li>Aktivitas pengguna saat mengakses website</li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Penggunaan Data Pribadi</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Proses pendaftaran dan administrasi pelatihan</li>
                                        <li>Pelaksanaan program pelatihan, sertifikasi, dan evaluasi</li>
                                        <li>Penyampaian informasi terkait jadwal, materi, dan pengumuman</li>
                                        <li>Keperluan komunikasi dan layanan peserta</li>
                                        <li>Peningkatan kualitas layanan dan pengembangan program</li>
                                        <li>Keperluan pelaporan dan kepatuhan terhadap peraturan yang berlaku</li>
                                        <li>Mencegah penipuan dan aktivitas yang merugikan</li>
                                        <li>Melakukan riset dan analisis untuk pengembangan produk</li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Penyimpanan dan Keamanan Data</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Kami menyimpan data pribadi peserta selama diperlukan untuk tujuan pelatihan dan administrasi.</li>
                                        <li>
                                            Lembaga pelatihan menerapkan langkah-langkah keamanan yang wajar untuk melindungi data dari akses, penggunaan,
                                            atau pengungkapan yang tidak sah.
                                        </li>
                                        <li>Akses terhadap data pribadi dibatasi hanya kepada pihak yang berwenang.</li>
                                        <li>
                                            Meskipun kami berusaha maksimal melindungi data peserta, tidak ada sistem yang 100% aman. Kami mendorong
                                            peserta untuk menggunakan kata sandi yang kuat dan menjaga kerahasiaan informasi akun peserta.
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Pengungkapan Data kepada Pihak Ketiga</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Kami tidak menjual atau menyewakan data pribadi pengguna kepada pihak ketiga.</li>
                                        <li>
                                            Data pribadi dapat dibagikan kepada pihak ketiga yang bekerja sama dengan lembaga pelatihan, sepanjang
                                            diperlukan untuk pelaksanaan layanan (misalnya: mitra sertifikasi, penyedia sistem pembelajaran).
                                        </li>
                                        <li>
                                            Pengungkapan data juga dapat dilakukan apabila diwajibkan oleh hukum atau peraturan perundang-undangan yang
                                            berlaku.
                                        </li>
                                    </ul>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Penyimpanan dan Retensi Data</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Akun aktif: Selama akun peserta masih aktif</li>
                                        <li>Data transaksi: 10 tahun setelah transaksi berakhir</li>
                                        <li>Data komunikasi: 3 tahun setelah komunikasi terakhir</li>
                                        <li>Log sistem: 1 tahun setelah pencatatan</li>
                                        <li>Data marketing: Hingga peserta menarik persetujuan</li>
                                    </ul>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        Data akan dihapus secara aman setelah periode retensi berakhir, kecuali jika diwajibkan oleh hukum untuk
                                        menyimpannya lebih lama.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Hak Pengguna</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Mengakses dan memperbarui data pribadi</li>
                                        <li>Meminta perbaikan atas data yang tidak akurat</li>
                                        <li>Meminta penghapusan data pribadi sesuai ketentuan yang berlaku</li>
                                        <li>Menarik persetujuan penggunaan data untuk keperluan tertentu</li>
                                    </ul>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        Permintaan terkait hak pengguna dapat disampaikan melalui kontak resmi lembaga pelatihan.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Cookie dan Teknologi Serupa</h2>
                                    <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                        <li>Menjaga sesi login peserta</li>
                                        <li>Menyimpan preferensi pengguna</li>
                                        <li>Meningkatkan pengalaman pengguna</li>
                                        <li>Menganalisis penggunaan website</li>
                                        <li>Menyimpan preferensi pengguna</li>
                                    </ul>
                                    <div className="mt-4">
                                        <h3 className="mb-2 font-semibold">Jenis Cookies</h3>
                                        <ul className="ml-4 list-inside list-disc space-y-1">
                                            <li>
                                                <strong>Essential Cookies</strong>: Diperlukan untuk fungsi dasar website
                                            </li>
                                            <li>
                                                <strong>Analytics Cookies</strong>: Membantu kami memahami penggunaan website
                                            </li>
                                            <li>
                                                <strong>Functional Cookies</strong>: Menyimpan preferensi pengguna
                                            </li>
                                            <li>
                                                <strong>Marketing Cookies</strong>: Digunakan untuk menampilkan iklan yang relevan
                                            </li>
                                        </ul>
                                    </div>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                                        Pengguna dapat mengatur penggunaan cookie melalui pengaturan browser masing-masing. Namun, menonaktifkan cookies
                                        tertentu dapat memengaruhi fungsionalitas website.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Transfer Data Internasional</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Data pribadi peserta dapat diproses dan disimpan di server yang berlokasi di luar Indonesia. Kami memastikan bahwa
                                        setiap transfer data internasional dilakukan dengan perlindungan yang memadai sesuai dengan hukum yang berlaku,
                                        termasuk melalui perjanjian perlindungan data yang sesuai.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Perlindungan Data Anak</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak dengan sengaja mengumpulkan
                                        informasi pribadi dari anak-anak di bawah usia 13 tahun. Jika peserta adalah orang tua atau wali dan mengetahui
                                        bahwa anak peserta telah memberikan informasi pribadi kepada kami, silakan hubungi kami untuk menghapus informasi
                                        tersebut.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Perubahan Kebijakan Privasi</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami
                                        atau karena alasan operasional, hukum, atau regulasi lainnya. Perubahan material akan diberitahukan kepada peserta
                                        melalui email atau pemberitahuan di platform kami. Kebijakan yang diperbarui akan berlaku sejak tanggal "Terakhir
                                        diperbarui" yang tercantum di bagian atas halaman ini.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Persetujuan</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Dengan menggunakan website dan mengikuti program pelatihan, pengguna menyatakan telah memberikan persetujuan atas
                                        pengumpulan, penggunaan, dan pengolahan data pribadi sesuai dengan Kebijakan Privasi ini.
                                    </p>
                                </section>
                                <section className="mb-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Kontak</h2>
                                    <div className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                        <p className="mb-2">
                                            Apabila memiliki pertanyaan, permintaan, atau keluhan terkait Kebijakan Privasi ini, silahkan menghubungi kami
                                            melalui:
                                        </p>
                                        <p>Email: kompetenidn@gmail.com</p>
                                        <p>Whatsapp: +62 895-2851-4480</p>
                                        <p>Instagram: @kompeten.idn @tictaxacademy</p>
                                        <p>Alamat: Permata Permadani Residence Blok B1, Pendem, Kec. Junrejo, Kota Batu, Jawa Timur, 65324</p>
                                    </div>
                                </section>
                            </div>
                        )}
                        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {isEn
                                    ? 'By using our services, you agree to the privacy policy above.'
                                    : 'Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi di atas.'}
                            </p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {isEn ? 'Also read our ' : 'Baca juga '}
                                <Link href={route('terms-and-conditions')} className="text-blue-600 underline hover:text-blue-800">
                                    {isEn ? 'Terms and Conditions' : 'Syarat dan Ketentuan'}
                                </Link>{'}
                                {isEn ? '.' : ' kami.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
