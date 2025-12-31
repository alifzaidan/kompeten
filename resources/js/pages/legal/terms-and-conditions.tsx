import UserLayout from '@/layouts/user-layout';
import { Head } from '@inertiajs/react';

export default function TermsAndConditions() {
    return (
        <UserLayout>
            <Head title="Syarat dan Ketentuan" />
            <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Syarat dan Ketentuan</h1>
                            <p className="text-gray-600 dark:text-gray-400">Terakhir diperbarui: 31 Desember 2025</p>
                        </div>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <section className="mb-8">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Halaman Syarat dan Ketentuan ini mengatur penggunaan layanan, program pelatihan, serta fasilitas yang disediakan
                                    oleh lembaga pelatihan. Dengan mengakses dan menggunakan website serta mengikuti program pelatihan, pengguna, dan
                                    peserta dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.
                                </p>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Ketentuan Umum</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Syarat dan Ketentuan ini berlaku untuk seluruh pengguna website dan peserta program pelatihan.</li>
                                    <li>
                                        Lembaga pelatihan berhak mengubah, menambah, atau mengurangi isi Syarat dan Ketentuan sewaktu-waktu tanpa
                                        pemberitahuan terlebih dahulu.
                                    </li>
                                    <li>Perubahan akan berlaku sejak ditampilkan di website resmi lembaga pelatihan.</li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Pendaftaran dan Keikutsertaan Program</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Peserta wajib mengisi data pendaftaran dengan benar, lengkap, dan sesuai dengan identitas diri.</li>
                                    <li>Peserta bertanggung jawab atas keakuratan data yang diberikan.</li>
                                    <li>
                                        Lembaga pelatihan berhak menolak atau membatalkan pendaftaran apabila ditemukan data yang tidak valid atau
                                        tidak sesuai.
                                    </li>
                                    <li>Pendaftaran dianggap sah setelah peserta menyelesaikan seluruh proses administrasi yag ditentukan.</li>
                                </ul>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">Peserta bertanggung jawab untuk:</p>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Menjaga kerahasiaan informasi akun.</li>
                                    <li>Memastikan informasi yang diberikan akurat dan terkini.</li>
                                    <li>Memberitahu kami apabila terjadi penggunaan akun yang tidak sah.</li>
                                    <li>Tidak memberikan akun kepada pihak lain.</li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Layanan Kami</h2>
                                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                                    <div>
                                        <h3 className="mb-2 font-semibold">Sertifikasi</h3>
                                        <ul className="ml-4 list-inside list-disc space-y-1">
                                            <li>Program pelatihan yang disertai dengan ujian sertifikasi</li>
                                            <li>Sertifikat kelulusan bagi peserta yang memenuhi standar nilai yang telah ditentukan</li>
                                            <li>Materi dan recording dapat diakses kapan saja</li>
                                            <li>Konsultasi selama program pelatihan berlangsung</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Bootcamp</h3>
                                        <ul className="ml-4 list-inside list-disc space-y-1">
                                            <li>Program dengan jadwal dan durasi yang telah ditentukan</li>
                                            <li>Kelas interaktif dengan mentor dan peserta lain melalui zoom meeting</li>
                                            <li>Pembelajaran secara asynchronous dan synchronous</li>
                                            <li>E-sertifikat peserta bagi yang menyelesaikan program</li>
                                            <li>Akses materi, modul, dan recording seumur hidup</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Bundling</h3>
                                        <ul className="ml-4 list-inside list-disc space-y-1">
                                            <li>Pelatihan dengan lebih dari satu program bootcamp dengan durasi dan jadwal yang telah ditentukan</li>
                                            <li>Pembelajaran secara asynchronous dan synchronous</li>
                                            <li>E-sertifikat sejumlah program bootcamp yang diikuti</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">Webinar</h3>
                                        <ul className="ml-4 list-inside list-disc space-y-1">
                                            <li>Sesi tatap muka dengan mentor melalui zoom meeting sesuai jadwal yang telah ditentukan</li>
                                            <li>Kesempatan diskusi interaktif dengan mentor</li>
                                            <li>Akses recording webinar setelah acara berakhir</li>
                                            <li>E-sertifikat keikutsertaan sebagai peserta webinar</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Biaya Pelatihan dan Pembayaran</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        Biaya pelatihan tercantum pada masing-masing program dan dapat berubah sesuai kebijakan lembaga pelatihan.
                                    </li>
                                    <li>Pembayaran dilakukan melalui metode yang telah ditentukan dan diinformasikan secara resmi.</li>
                                    <li>Peserta wajib melakukan pembayaran sesuai dengan batas waktu yang ditentukan.</li>
                                    <li>
                                        Biaya yang telah dibayarkan tidak dapat dikembalikan (non-refundable), kecuali ditentukan lain oleh lembaga
                                        pelatihan.
                                    </li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Pelaksanaan Pelatihan</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        Pelatihan dapat diselenggarakan secara online (syncronous dan asyncronous), offline, atau hybrid sesuai dengan
                                        informasi program.
                                    </li>
                                    <li>Jadwal pelatihan dapat berubah sewaktu-waktu dengan pemberitahuan kepada peserta.</li>
                                    <li>Peserta wajib mengikuti pelatihan sesuai jadwal dan ketentuan yang berlaku.</li>
                                    <li>
                                        Lembaga pelatihan tidak bertanggung jawab atas kendala teknis yang disebabkan oleh perangkat atau jaringan
                                        internet peserta.
                                    </li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Hak dan Kewajiban Peserta</h2>
                                <h3 className="mb-2 font-semibold">Hak Peserta</h3>
                                <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Mendapatkan materi pelatihan berupa modul dan studi kasus sesuai dengan program yang diikuti.</li>
                                    <li>Mendapatkan akses ke fasilitas pelatihan yang disediakan tanpa ada batasan waktu.</li>
                                    <li>Mendapatkan e-sertifikat pelatihan atau e-sertifikat kelulusan apabila memenuhi ketentuan kelulusan.</li>
                                </ul>
                                <h3 className="mt-4 mb-2 font-semibold">Kewajiban Peserta</h3>
                                <ul className="ml-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
                                    <li>Mengikuti pelatihan dengan tertib dan bertanggung jawab.</li>
                                    <li>Menjaga etika dan sikap profesional selama pelatihan berlangsung.</li>
                                    <li>Tidak melakukan tindakan yang dapat mengganggu proses pembelajaran.</li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Sertifikat</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        Sertifikat diberikan kepada peserta yang telah memenuhi syarat kehadiran dan kelulusan sesuai ketentuan
                                        program.
                                    </li>
                                    <li>Sertifikat hanya berlaku untuk peserta yang terdaftar secara resmi.</li>
                                    <li>
                                        Penyalahgunaan sertifikat untuk kepentingan yang melanggar hukum menjadi tanggung jawab peserta sepenuhnya.
                                    </li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Hak Kekayaan Intelektual</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        Seluruh materi pelatihan, modul, video pembelajaran, recording pelatihan, kode program, logo dan merek dagang
                                        serta konten yang disediakan merupakan milik lembaga pelatihan atau pihak terkait.
                                    </li>
                                    <li>
                                        Peserta dilarang memperbanyak, mendistribusikan, atau mempublikasikan materi tanpa izin tertulis dari lembaga
                                        pelatihan.
                                    </li>
                                    <li>Pelanggaran terhadap ketentuan ini dapat dikenakan sanksi sesuai peraturan yang berlaku.</li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Pembatalan dan Penghentian Keikutsertaan</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>
                                        Lembaga pelatihan berhak membatalkan atau menghentikan keikutsertaan peserta apabila peserta melanggar Syarat
                                        dan Ketentuan.
                                    </li>
                                    <li>Peserta yang mengundurkan diri tidak berhak atas pengembalian biaya pelatihan.</li>
                                    <li>
                                        Lembaga pelatihan dapat membatalkan program dengan alasan tertentu dan akan memberikan informasi lebih lanjut
                                        kepada peserta.
                                    </li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Pembatasan Tanggung Jawab</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Kompeten IDN tidak bertanggung jawab atas:</li>
                                    <li>Gangguan teknis atau pemadaman server.</li>
                                    <li>Kehilangan data akibat kesalahan pengguna.</li>
                                    <li>Kerugian finansial yang timbul dari penggunaan platform.</li>
                                    <li>Ketidakakuratan informasi yang disediakan oleh pihak ketiga.</li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Privasi dan Kerahasiaan Data</h2>
                                <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Data pribadi peserta akan dijaga kerahasiaannya dan digunakan hanya untuk keperluan pelatihan.</li>
                                    <li>
                                        Lembaga pelatihan berkomitmen melindungi data peserta sesuai dengan ketentuan peraturan perundang-undangan
                                        yang berlaku.
                                    </li>
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Perubahan Syarat dan Ketentuan</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Kompeten IDN berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku efektif setelah
                                    dipublikasikan di halaman ini. Pengguna dianjurkan untuk memeriksa halaman ini secara berkala untuk mengetahui
                                    perubahan terbaru.
                                </p>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Hukum yang Berlaku</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia.
                                    Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
                                </p>
                            </section>
                            <section className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Hubungi Kami</h2>
                                <div className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                    <p className="mb-2">
                                        Jika terdapat pertanyaan mengenai syarat dan ketentuan ini, silahkan menghubungi kami melalui:
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
                                Dengan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan di atas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
