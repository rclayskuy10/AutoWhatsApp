import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
    title: "Fitur - AutoWhatsApp.web.id",
    description: "Fitur lengkap platform pesan massal WhatsApp untuk bisnis",
};

const features = [
    {
        icon: "devices",
        title: "Multi-Device Support",
        description:
            "Hubungkan hingga 10 perangkat WhatsApp dalam satu akun. Kelola semua perangkat dari satu dashboard terpusat dengan monitoring real-time.",
        highlights: [
            "Scan QR code langsung dari dashboard",
            "Monitor status koneksi real-time",
            "Auto-reconnect saat terputus",
            "Rotasi perangkat otomatis",
        ],
    },
    {
        icon: "campaign",
        title: "Kampanye Massal",
        description:
            "Kirim pesan ke ribuan kontak sekaligus dengan personalisasi dinamis. Atur jadwal, delay anti-ban, dan tracking delivery otomatis.",
        highlights: [
            "Kirim hingga 100.000 pesan/hari",
            "Template pesan dengan variabel dinamis",
            "Smart delay anti-ban otomatis",
            "Penjadwalan kampanye fleksibel",
        ],
    },
    {
        icon: "code",
        title: "REST API Developer-First",
        description:
            "API RESTful lengkap dengan dokumentasi OpenAPI. Integrasikan WhatsApp ke aplikasi Anda hanya dalam hitungan menit.",
        highlights: [
            "Endpoint sederhana & well-documented",
            "Webhook real-time untuk event handling",
            "SDK untuk Node.js, Python, PHP",
            "Rate limiting yang adil & transparan",
        ],
    },
    {
        icon: "smart_toy",
        title: "Chatbot & Auto-Reply",
        description:
            "Bangun flow chatbot interaktif tanpa coding. Atur auto-reply berdasarkan kata kunci, jadwal, atau kondisi tertentu.",
        highlights: [
            "Visual flow builder drag & drop",
            "Keyword-based auto response",
            "Balasan berdasarkan jam kerja",
            "Eskalasi ke agen manusia",
        ],
    },
    {
        icon: "contacts",
        title: "Manajemen Kontak",
        description:
            "Kelola database kontak dengan tag, grup, dan segmentasi. Import dari CSV/Excel atau integrasikan via API.",
        highlights: [
            "Import massal CSV/Excel",
            "Tag & grup untuk segmentasi",
            "Deteksi duplikat otomatis",
            "Custom fields tak terbatas",
        ],
    },
    {
        icon: "analytics",
        title: "Laporan & Analitik",
        description:
            "Dashboard analitik real-time untuk memantau performa kampanye, delivery rate, dan engagement kontak Anda.",
        highlights: [
            "Delivery & read receipt tracking",
            "Grafik performa harian/mingguan",
            "Export laporan PDF & CSV",
            "Metrik engagement per templat",
        ],
    },
    {
        icon: "security",
        title: "Keamanan Enterprise",
        description:
            "Keamanan tingkat enterprise dengan enkripsi end-to-end, RBAC, audit log, dan compliance standard industri.",
        highlights: [
            "Role-based access control (RBAC)",
            "Audit log lengkap semua aktivitas",
            "Enkripsi data at-rest & in-transit",
            "Two-factor authentication (2FA)",
        ],
    },
    {
        icon: "webhook",
        title: "Webhook & Integrasi",
        description:
            "Terima notifikasi real-time untuk setiap event melalui webhook. Integrasikan dengan platform populer.",
        highlights: [
            "Webhook untuk semua event",
            "Integrasi Zapier & Make",
            "Webhook retry & logging",
            "Custom HTTP headers",
        ],
    },
    {
        icon: "group",
        title: "Multi-Tenant & Tim",
        description:
            "Kelola banyak organisasi dalam satu platform. Undang anggota tim dengan peran berbeda untuk kolaborasi yang efisien.",
        highlights: [
            "Organisasi & workspace terpisah",
            "Peran: Pemilik, Admin, Staf",
            "Isolasi data antar tenant",
            "Manajemen billing per organisasi",
        ],
    },
];

export default function FiturPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-wa-green/10 text-wa-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        Platform Terlengkap
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Semua yang Anda Butuhkan untuk{" "}
                        <span className="text-wa-green">WhatsApp Automation</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                        Dari pengiriman pesan massal hingga chatbot canggih — kami menyediakan
                        tools lengkap untuk mengoptimalkan komunikasi bisnis Anda melalui WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/daftar"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-wa-green hover:bg-wa-dark text-white font-medium rounded-lg transition-colors shadow-sm"
                        >
                            Mulai Gratis
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </Link>
                        <Link
                            href="/dokumentasi"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300"
                        >
                            <span className="material-symbols-outlined text-xl">menu_book</span>
                            Lihat Dokumentasi
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-wa-green/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-wa-green/10 text-wa-green flex items-center justify-center mb-4 group-hover:bg-wa-green group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">
                                        {feature.icon}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                    {feature.description}
                                </p>
                                <ul className="space-y-2">
                                    {feature.highlights.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-sm text-gray-600"
                                        >
                                            <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">
                                                check_circle
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Mengapa Memilih AutoWhatsApp?
                        </h2>
                        <p className="text-gray-500">
                            Bandingkan fitur kami dengan solusi lain di pasaran
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                                            Fitur
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-wa-green">
                                            AutoWhatsApp
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-gray-400">
                                            Kompetitor A
                                        </th>
                                        <th className="text-center py-4 px-6 font-semibold text-gray-400">
                                            Kompetitor B
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Multi-Device", true, true, false],
                                        ["REST API", true, true, true],
                                        ["Chatbot Builder", true, false, true],
                                        ["Webhook Real-time", true, true, false],
                                        ["Bulk Messaging", true, true, true],
                                        ["Multi-Tenant", true, false, false],
                                        ["Audit Log", true, false, false],
                                        ["Custom SMTP", true, false, true],
                                        ["Harga Terjangkau", true, false, false],
                                    ].map(([feature, us, a, b], i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-gray-100 last:border-0"
                                        >
                                            <td className="py-3 px-6 text-gray-700 font-medium">
                                                {feature as string}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {us ? (
                                                    <span className="material-symbols-outlined text-wa-green">
                                                        check_circle
                                                    </span>
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-300">
                                                        cancel
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {a ? (
                                                    <span className="material-symbols-outlined text-gray-400">
                                                        check_circle
                                                    </span>
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-300">
                                                        cancel
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {b ? (
                                                    <span className="material-symbols-outlined text-gray-400">
                                                        check_circle
                                                    </span>
                                                ) : (
                                                    <span className="material-symbols-outlined text-gray-300">
                                                        cancel
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Siap Meningkatkan Komunikasi Bisnis Anda?
                    </h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        Mulai gratis sekarang dan rasakan kemudahan WhatsApp automation
                    </p>
                    <Link
                        href="/daftar"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-wa-green hover:bg-wa-dark text-white font-semibold rounded-lg transition-colors shadow-md shadow-wa-green/20 text-lg"
                    >
                        Coba Gratis 14 Hari
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                    <p className="text-sm text-gray-400 mt-4">
                        Tidak perlu kartu kredit. Setup dalam 2 menit.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
