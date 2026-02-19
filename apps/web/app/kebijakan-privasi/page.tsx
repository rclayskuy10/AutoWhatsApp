import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
    title: "Kebijakan Privasi - AutoWhatsApp.web.id",
    description: "Kebijakan privasi dan perlindungan data AutoWhatsApp.web.id",
};

export default function KebijakanPrivasiPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="pt-28 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Kebijakan Privasi
                        </h1>
                        <p className="text-sm text-gray-500">
                            Terakhir diperbarui: 1 Februari 2026
                        </p>
                    </div>

                    <div className="prose prose-gray max-w-none space-y-8">
                        <div>
                            <p className="text-gray-600 leading-relaxed">
                                AutoWhatsApp.web.id (&quot;kami&quot;, &quot;Platform&quot;) berkomitmen untuk melindungi
                                privasi dan data pribadi pengguna. Kebijakan privasi ini menjelaskan bagaimana
                                kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda saat
                                menggunakan layanan kami.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                1. Informasi yang Kami Kumpulkan
                            </h2>
                            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                                <p><strong className="text-gray-800">Informasi Akun:</strong> Nama, email, nomor telepon, dan kata sandi saat Anda mendaftar.</p>
                                <p><strong className="text-gray-800">Informasi Organisasi:</strong> Nama perusahaan, alamat, dan detail bisnis yang Anda berikan.</p>
                                <p><strong className="text-gray-800">Data Penggunaan:</strong> Log aktivitas, penggunaan fitur, statistik pengiriman pesan, dan data analitik.</p>
                                <p><strong className="text-gray-800">Data Teknis:</strong> Alamat IP, jenis browser, sistem operasi, dan informasi perangkat.</p>
                                <p><strong className="text-gray-800">Data Pembayaran:</strong> Informasi transaksi pembayaran diproses melalui payment gateway pihak ketiga (Midtrans/Xendit). Kami tidak menyimpan data kartu kredit secara langsung.</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                2. Penggunaan Informasi
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">check_circle</span>
                                    Menyediakan, mengelola, dan meningkatkan layanan Platform
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">check_circle</span>
                                    Memproses pembayaran dan langganan
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">check_circle</span>
                                    Mengirim notifikasi layanan dan pembaruan penting
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">check_circle</span>
                                    Mencegah penyalahgunaan dan menjaga keamanan platform
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">check_circle</span>
                                    Mematuhi kewajiban hukum yang berlaku
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                3. Perlindungan Data
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai
                                untuk melindungi data Anda, termasuk:
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">shield</span>
                                    Enkripsi data at-rest dan in-transit (TLS 1.3)
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">shield</span>
                                    Hash kata sandi menggunakan bcrypt
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">shield</span>
                                    Audit log dan monitoring keamanan 24/7
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">shield</span>
                                    Backup data terenkripsi secara berkala
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                4. Berbagi Data dengan Pihak Ketiga
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Kami tidak menjual data pribadi Anda. Data hanya dibagikan dengan pihak ketiga
                                dalam situasi berikut:
                            </p>
                            <ul className="mt-3 space-y-2 text-sm text-gray-600">
                                <li>• Payment gateway (Midtrans, Xendit) untuk pemrosesan pembayaran</li>
                                <li>• Penyedia layanan cloud untuk hosting dan infrastruktur</li>
                                <li>• Jika diwajibkan oleh hukum atau perintah pengadilan</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                5. Hak Pengguna
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                Anda memiliki hak untuk:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Mengakses dan mengunduh data pribadi Anda</li>
                                <li>• Memperbaiki data yang tidak akurat</li>
                                <li>• Meminta penghapusan data (right to be forgotten)</li>
                                <li>• Menolak penggunaan data untuk tujuan pemasaran</li>
                                <li>• Mencabut persetujuan pengolahan data</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                6. Retensi Data
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Data akun disimpan selama akun aktif. Setelah penghapusan akun, data pribadi
                                akan dihapus dalam 30 hari kerja, kecuali data yang wajib disimpan berdasarkan
                                peraturan perundang-undangan yang berlaku.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                7. Cookie
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Kami menggunakan cookie esensial untuk fungsi login dan preferensi pengguna.
                                Cookie analitik digunakan untuk memahami penggunaan platform dan hanya aktif
                                dengan persetujuan Anda.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                8. Perubahan Kebijakan
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan
                                diinformasikan melalui email dan notifikasi dashboard minimal 30 hari sebelum
                                berlaku efektif.
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">
                                Hubungi Kami
                            </h2>
                            <p className="text-sm text-gray-600 mb-3">
                                Untuk pertanyaan terkait privasi dan data pribadi:
                            </p>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>Email: <a href="mailto:privacy@autowhatsapp.web.id" className="text-wa-green hover:text-wa-dark">privacy@autowhatsapp.web.id</a></p>
                                <p>Alamat: Jakarta, Indonesia</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-wa-green transition-colors"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Kembali ke Beranda
                        </Link>
                        <Link
                            href="/syarat-ketentuan"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-wa-green transition-colors"
                        >
                            Syarat & Ketentuan
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
