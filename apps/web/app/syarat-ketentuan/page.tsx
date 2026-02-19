import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
    title: "Syarat & Ketentuan - AutoWhatsApp.web.id",
    description: "Syarat dan ketentuan penggunaan layanan AutoWhatsApp.web.id",
};

export default function SyaratKetentuanPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="pt-28 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Syarat & Ketentuan
                        </h1>
                        <p className="text-sm text-gray-500">
                            Terakhir diperbarui: 1 Februari 2026
                        </p>
                    </div>

                    <div className="prose prose-gray max-w-none space-y-8">
                        <div>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Dengan mendaftar dan menggunakan layanan AutoWhatsApp.web.id (&quot;Platform&quot;),
                                Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan seksama
                                sebelum menggunakan layanan kami.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                1. Definisi
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><strong className="text-gray-800">&quot;Platform&quot;</strong> — Layanan SaaS AutoWhatsApp.web.id termasuk website, dashboard, dan API.</li>
                                <li><strong className="text-gray-800">&quot;Pengguna&quot;</strong> — Individu atau entitas yang terdaftar dan menggunakan Platform.</li>
                                <li><strong className="text-gray-800">&quot;Layanan&quot;</strong> — Semua fitur yang disediakan Platform termasuk pengiriman pesan, manajemen kontak, dan API.</li>
                                <li><strong className="text-gray-800">&quot;Konten&quot;</strong> — Semua teks, gambar, data, dan materi yang diunggah/dikirim melalui Platform.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                2. Akun & Pendaftaran
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Anda harus berusia minimal 18 tahun untuk menggunakan Platform.</li>
                                <li>• Informasi yang diberikan saat pendaftaran harus akurat dan terkini.</li>
                                <li>• Anda bertanggung jawab penuh atas keamanan akun dan kata sandi Anda.</li>
                                <li>• Satu akun hanya boleh digunakan oleh satu organisasi/individu.</li>
                                <li>• Kami berhak menangguhkan akun yang melanggar ketentuan ini.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                3. Penggunaan yang Diperbolehkan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-green-800 text-sm mb-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">check_circle</span>
                                        Diperbolehkan
                                    </h4>
                                    <ul className="space-y-1 text-xs text-green-700">
                                        <li>• Notifikasi transaksional (pesanan, pembayaran)</li>
                                        <li>• Komunikasi bisnis dengan persetujuan penerima</li>
                                        <li>• Customer support dan layanan pelanggan</li>
                                        <li>• Reminder dan konfirmasi janji temu</li>
                                        <li>• Update produk kepada pelanggan yang opt-in</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-red-800 text-sm mb-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">cancel</span>
                                        Dilarang
                                    </h4>
                                    <ul className="space-y-1 text-xs text-red-700">
                                        <li>• Spam atau pesan massal tanpa persetujuan</li>
                                        <li>• Penipuan, phishing, atau skema ilegal</li>
                                        <li>• Konten SARA, pornografi, atau kekerasan</li>
                                        <li>• Scraping atau harvesting nomor telepon</li>
                                        <li>• Pelanggaran kebijakan WhatsApp</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                4. Langganan & Pembayaran
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Paket berbayar ditagih sesuai siklus yang dipilih (bulanan/tahunan).</li>
                                <li>• Pembayaran bersifat non-refundable kecuali ditentukan lain.</li>
                                <li>• Perubahan harga akan diinformasikan 30 hari sebelum berlaku.</li>
                                <li>• Kegagalan pembayaran selama 7 hari dapat mengakibatkan penangguhan layanan.</li>
                                <li>• Kuota pesan yang tidak terpakai tidak dapat dialihkan ke bulan berikutnya.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                5. API & Fair Use
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• API key bersifat rahasia dan tidak boleh dibagikan.</li>
                                <li>• Rate limiting berlaku sesuai paket langganan.</li>
                                <li>• Penyalahgunaan API dapat mengakibatkan pembatasan atau penangguhan.</li>
                                <li>• Kami berhak mengubah spesifikasi API dengan pemberitahuan sebelumnya.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                6. Service Level Agreement (SLA)
                            </h2>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Paket</th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Uptime</th>
                                            <th className="text-center py-3 px-4 font-semibold text-gray-700">Support</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-2 px-4 text-gray-700">Pemula</td>
                                            <td className="py-2 px-4 text-center text-gray-600">99%</td>
                                            <td className="py-2 px-4 text-center text-gray-600">Email (48 jam)</td>
                                        </tr>
                                        <tr className="border-b border-gray-100">
                                            <td className="py-2 px-4 text-gray-700">Pro</td>
                                            <td className="py-2 px-4 text-center text-gray-600">99.5%</td>
                                            <td className="py-2 px-4 text-center text-gray-600">Prioritas (12 jam)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 text-gray-700">Enterprise</td>
                                            <td className="py-2 px-4 text-center text-gray-600">99.9%</td>
                                            <td className="py-2 px-4 text-center text-gray-600">24/7 Dedicated</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                7. Batasan Tanggung Jawab
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Platform disediakan &quot;as is&quot; tanpa jaminan tersirat.</li>
                                <li>• Kami tidak bertanggung jawab atas kerugian akibat downtime di luar kendali kami.</li>
                                <li>• Tanggung jawab maksimal kami terbatas pada biaya langganan 3 bulan terakhir.</li>
                                <li>• Pengguna bertanggung jawab penuh atas konten yang dikirim melalui Platform.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                8. Penghentian Layanan
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Anda dapat membatalkan langganan kapan saja melalui dashboard.</li>
                                <li>• Setelah pembatalan, akses berlanjut hingga akhir periode yang sudah dibayar.</li>
                                <li>• Kami dapat menghentikan akun yang melanggar syarat penggunaan tanpa pemberitahuan.</li>
                                <li>• Data akan disimpan 30 hari setelah penutupan akun sebelum dihapus permanen.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                9. Hukum yang Berlaku
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia. Setiap sengketa
                                akan diselesaikan melalui musyawarah terlebih dahulu, dan jika tidak tercapai
                                kesepakatan, akan diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI).
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-2">
                                Pertanyaan?
                            </h2>
                            <p className="text-sm text-gray-600 mb-3">
                                Hubungi tim legal kami untuk pertanyaan terkait syarat & ketentuan:
                            </p>
                            <p className="text-sm text-gray-600">
                                Email: <a href="mailto:legal@autowhatsapp.web.id" className="text-wa-green hover:text-wa-dark">legal@autowhatsapp.web.id</a>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <Link
                            href="/kebijakan-privasi"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-wa-green transition-colors"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Kebijakan Privasi
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-wa-green transition-colors"
                        >
                            Kembali ke Beranda
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
