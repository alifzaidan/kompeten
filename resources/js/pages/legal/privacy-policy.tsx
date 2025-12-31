import UserLayout from '@/layouts/user-layout';
import { Head, Link } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <UserLayout>
            <Head title="Kebijakan Privasi" />
            <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Kebijakan Privasi</h1>
                            <p className="text-gray-600 dark:text-gray-400">Terakhir diperbarui: 31 Desember 2025</p>
                        </div>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
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
                        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi di atas.
                            </p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Baca juga{' '}
                                <Link href={route('terms-and-conditions')} className="text-blue-600 underline hover:text-blue-800">
                                    Syarat dan Ketentuan
                                </Link>{' '}
                                kami.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
