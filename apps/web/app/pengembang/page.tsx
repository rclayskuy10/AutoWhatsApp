import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
    title: "Pengembang - AutoWhatsApp.web.id",
    description: "Portal pengembang, SDK, dan resources untuk integrasi WhatsApp API",
};

const resources = [
    {
        icon: "menu_book",
        title: "Dokumentasi API",
        description: "Referensi lengkap semua endpoint REST API dengan contoh request & response.",
        href: "/dokumentasi",
        tag: "Docs",
    },
    {
        icon: "data_object",
        title: "SDK Libraries",
        description: "SDK resmi untuk Node.js, Python, dan PHP. Install via package manager favorit Anda.",
        href: "/dokumentasi",
        tag: "SDK",
    },
    {
        icon: "terminal",
        title: "API Playground",
        description: "Coba API langsung dari browser dengan sandbox interaktif. Tidak perlu setup.",
        href: "/dokumentasi",
        tag: "Tools",
    },
    {
        icon: "webhook",
        title: "Webhook Guide",
        description: "Panduan setup webhook untuk menerima event real-time dari WhatsApp.",
        href: "/dokumentasi",
        tag: "Guide",
    },
    {
        icon: "integration_instructions",
        title: "Contoh Integrasi",
        description: "Template project dan contoh integrasi untuk berbagai use case populer.",
        href: "/dokumentasi",
        tag: "Examples",
    },
    {
        icon: "error",
        title: "Error Reference",
        description: "Daftar lengkap error code beserta penjelasan dan cara mengatasinya.",
        href: "/dokumentasi",
        tag: "Reference",
    },
];

const useCases = [
    {
        title: "E-Commerce — Notifikasi Order",
        description: "Kirim konfirmasi pesanan, update pengiriman, dan bukti pembayaran otomatis ke pelanggan via WhatsApp.",
        code: `// Kirim notifikasi order
await client.messages.send({
  to: customer.phone,
  template: "order_confirmation",
  variables: {
    name: customer.name,
    orderId: order.id,
    total: formatCurrency(order.total),
    trackingUrl: order.trackingUrl
  }
});`,
        icon: "shopping_cart",
    },
    {
        title: "SaaS — Onboarding Sequence",
        description: "Kirim serangkaian pesan onboarding otomatis ke user baru setelah registrasi.",
        code: `// Schedule onboarding messages
await client.campaigns.create({
  name: "New User Onboarding",
  contacts: [newUser.phone],
  template: "welcome_series",
  schedule: {
    type: "drip",
    delays: ["0m", "1h", "1d", "3d"]
  }
});`,
        icon: "rocket_launch",
    },
    {
        title: "Customer Support — Auto Reply",
        description: "Atur chatbot untuk menjawab pertanyaan umum dan eskalasi ke agen secara otomatis.",
        code: `// Setup auto-reply rule
await client.chatbot.createRule({
  trigger: { type: "keyword", words: ["harga", "price"] },
  action: {
    type: "reply",
    template: "pricing_info"
  },
  fallback: {
    type: "escalate",
    to: "support_team"
  }
});`,
        icon: "support_agent",
    },
];

const changelog = [
    {
        version: "v2.4.0",
        date: "15 Feb 2026",
        changes: [
            "Chatbot Builder — drag & drop flow editor",
            "Support media messages (gambar, video, dokumen)",
            "Webhook retry mechanism dengan exponential backoff",
        ],
    },
    {
        version: "v2.3.0",
        date: "20 Jan 2026",
        changes: [
            "Campaign scheduling dengan timezone support",
            "Bulk contact import via CSV/Excel",
            "Dashboard analytics real-time",
        ],
    },
    {
        version: "v2.2.0",
        date: "10 Des 2025",
        changes: [
            "Multi-device support hingga 10 perangkat",
            "Template variables dinamis {{1}}, {{2}}",
            "Rate limiting yang lebih adil per paket",
        ],
    },
    {
        version: "v2.1.0",
        date: "15 Nov 2025",
        changes: [
            "REST API v1 release",
            "SDK Node.js & Python",
            "Webhook untuk incoming messages & status updates",
        ],
    },
];

export default function PengembangPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-wa-green/20 text-wa-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <span className="material-symbols-outlined text-base">code</span>
                        Developer Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Build with{" "}
                        <span className="text-wa-green">AutoWhatsApp API</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        API RESTful yang powerful dan mudah digunakan. Integrasikan WhatsApp messaging
                        ke aplikasi Anda dalam hitungan menit, bukan minggu.
                    </p>

                    {/* Code snippet */}
                    <div className="max-w-2xl mx-auto bg-gray-950 rounded-xl border border-gray-700 overflow-hidden text-left mb-8">
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-700 bg-gray-900">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <span className="text-xs text-gray-500 ml-2">Terminal</span>
                        </div>
                        <pre className="p-5 text-sm text-gray-300 overflow-x-auto">
                            <code>{`$ curl -X POST https://api.autowhatsapp.web.id/v1/messages/send \\
    -H "Authorization: Bearer sk_live_xxxxx" \\
    -H "Content-Type: application/json" \\
    -d '{"to": "6281234567890", "message": "Hello World!"}'

{
  "success": true,
  "data": {
    "messageId": "msg_abc123",
    "status": "sent",
    "timestamp": "2026-02-18T10:30:00Z"
  }
}`}</code>
                        </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/daftar"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-wa-green hover:bg-wa-dark text-white font-medium rounded-lg transition-colors shadow-lg shadow-wa-green/20"
                        >
                            Dapatkan API Key
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </Link>
                        <Link
                            href="/dokumentasi"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">menu_book</span>
                            Baca Dokumentasi
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "99.9%", label: "Uptime SLA" },
                            { value: "<100ms", label: "Avg Response Time" },
                            { value: "2,000+", label: "Developers" },
                            { value: "50M+", label: "Messages/bulan" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Developer Resources</h2>
                    <p className="text-gray-500 mb-8">Semua yang Anda butuhkan untuk memulai</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resources.map((resource) => (
                            <Link
                                key={resource.title}
                                href={resource.href}
                                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-wa-green/30 transition-all"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-wa-green/10 flex items-center justify-center group-hover:bg-wa-green group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-wa-green group-hover:text-white">
                                            {resource.icon}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                        {resource.tag}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                                <p className="text-sm text-gray-500">{resource.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Use Cases</h2>
                    <p className="text-gray-500 mb-8">Contoh implementasi nyata menggunakan API kami</p>

                    <div className="space-y-6">
                        {useCases.map((uc) => (
                            <div
                                key={uc.title}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="material-symbols-outlined text-wa-green">
                                            {uc.icon}
                                        </span>
                                        <h3 className="font-bold text-gray-900">{uc.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">{uc.description}</p>
                                </div>
                                <pre className="p-6 bg-gray-900 text-sm text-gray-300 overflow-x-auto">
                                    <code>{uc.code}</code>
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Changelog */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Changelog</h2>
                    <p className="text-gray-500 mb-8">Update dan perbaikan terbaru</p>

                    <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
                        <div className="space-y-8">
                            {changelog.map((release) => (
                                <div key={release.version} className="relative pl-12">
                                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-wa-green border-2 border-white shadow-sm"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold text-gray-900">{release.version}</span>
                                        <span className="text-xs text-gray-400">{release.date}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {release.changes.map((change) => (
                                            <li key={change} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="text-wa-green mt-1">•</span>
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">Siap untuk Build?</h2>
                    <p className="text-gray-400 mb-6">
                        Mulai integrasikan WhatsApp API ke aplikasi Anda sekarang
                    </p>
                    <Link
                        href="/daftar"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-wa-green hover:bg-wa-dark text-white font-semibold rounded-lg transition-colors shadow-lg shadow-wa-green/20"
                    >
                        Dapatkan API Key Gratis
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
