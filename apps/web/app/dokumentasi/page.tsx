import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
    title: "Dokumentasi - AutoWhatsApp.web.id",
    description: "Dokumentasi lengkap API dan panduan penggunaan AutoWhatsApp",
};

const quickStart = [
    {
        step: 1,
        title: "Buat Akun",
        description: "Daftar akun gratis di AutoWhatsApp.web.id dan verifikasi email Anda.",
        icon: "person_add",
    },
    {
        step: 2,
        title: "Hubungkan Perangkat",
        description: "Scan QR code dari dashboard untuk menghubungkan nomor WhatsApp Anda.",
        icon: "qr_code_scanner",
    },
    {
        step: 3,
        title: "Dapatkan API Key",
        description: "Generate API key dari halaman Kunci API di dashboard Anda.",
        icon: "key",
    },
    {
        step: 4,
        title: "Kirim Pesan Pertama",
        description: "Gunakan API key untuk mengirim pesan WhatsApp pertama Anda.",
        icon: "send",
    },
];

const apiSections = [
    {
        title: "Authentication",
        icon: "lock",
        description: "Pelajari cara autentikasi request API menggunakan API Key.",
        endpoints: ["POST /auth/login", "POST /auth/refresh", "POST /auth/logout"],
    },
    {
        title: "Messages",
        icon: "chat",
        description: "Kirim pesan teks, media, dan template ke kontak WhatsApp.",
        endpoints: [
            "POST /messages/send",
            "POST /messages/send-bulk",
            "GET /messages/{id}/status",
            "POST /messages/send-media",
        ],
    },
    {
        title: "Contacts",
        icon: "contacts",
        description: "Kelola database kontak Anda melalui API.",
        endpoints: [
            "GET /contacts",
            "POST /contacts",
            "PUT /contacts/{id}",
            "DELETE /contacts/{id}",
            "POST /contacts/import",
        ],
    },
    {
        title: "Devices",
        icon: "devices",
        description: "Kelola perangkat WhatsApp yang terhubung.",
        endpoints: [
            "GET /devices",
            "POST /devices/connect",
            "DELETE /devices/{id}",
            "GET /devices/{id}/qr",
        ],
    },
    {
        title: "Campaigns",
        icon: "campaign",
        description: "Buat dan kelola kampanye pesan massal.",
        endpoints: [
            "GET /campaigns",
            "POST /campaigns",
            "PUT /campaigns/{id}",
            "POST /campaigns/{id}/start",
            "GET /campaigns/{id}/stats",
        ],
    },
    {
        title: "Webhooks",
        icon: "webhook",
        description: "Konfigurasi webhook untuk menerima event real-time.",
        endpoints: [
            "GET /webhooks",
            "POST /webhooks",
            "PUT /webhooks/{id}",
            "DELETE /webhooks/{id}",
            "GET /webhooks/{id}/logs",
        ],
    },
    {
        title: "Templates",
        icon: "description",
        description: "Kelola template pesan dengan variabel dinamis.",
        endpoints: [
            "GET /templates",
            "POST /templates",
            "PUT /templates/{id}",
            "DELETE /templates/{id}",
        ],
    },
    {
        title: "Analytics",
        icon: "analytics",
        description: "Ambil data analitik dan laporan performa.",
        endpoints: [
            "GET /analytics/overview",
            "GET /analytics/messages",
            "GET /analytics/campaigns",
            "GET /analytics/export",
        ],
    },
];

const sdks = [
    {
        lang: "Node.js",
        install: "npm install @autowhatsapp/sdk",
        code: `const AutoWA = require('@autowhatsapp/sdk');

const client = new AutoWA({
  apiKey: 'YOUR_API_KEY'
});

// Kirim pesan teks
await client.messages.send({
  to: '6281234567890',
  message: 'Halo dari AutoWhatsApp!'
});`,
    },
    {
        lang: "Python",
        install: "pip install autowhatsapp",
        code: `from autowhatsapp import AutoWA

client = AutoWA(api_key="YOUR_API_KEY")

# Kirim pesan teks
client.messages.send(
    to="6281234567890",
    message="Halo dari AutoWhatsApp!"
)`,
    },
    {
        lang: "PHP",
        install: "composer require autowhatsapp/sdk",
        code: `<?php
use AutoWhatsApp\\Client;

$client = new Client('YOUR_API_KEY');

// Kirim pesan teks
$client->messages->send([
    'to' => '6281234567890',
    'message' => 'Halo dari AutoWhatsApp!'
]);`,
    },
    {
        lang: "cURL",
        install: "",
        code: `curl -X POST https://api.autowhatsapp.web.id/v1/messages/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "6281234567890",
    "message": "Halo dari AutoWhatsApp!"
  }'`,
    },
];

export default function DokumentasiPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-wa-green/10 text-wa-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <span className="material-symbols-outlined text-base">menu_book</span>
                        Dokumentasi Lengkap
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Dokumentasi <span className="text-wa-green">API</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                        Panduan lengkap untuk mengintegrasikan AutoWhatsApp API ke dalam aplikasi Anda.
                        Mulai dari quick start hingga referensi endpoint detail.
                    </p>
                    <div className="max-w-xl mx-auto relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari di dokumentasi..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 focus:border-wa-green"
                        />
                    </div>
                </div>
            </section>

            {/* Quick Start */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Start</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickStart.map((step) => (
                            <div
                                key={step.step}
                                className="relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="absolute -top-3 -left-1 w-7 h-7 bg-wa-green text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {step.step}
                                </div>
                                <div className="w-10 h-10 rounded-lg bg-wa-green/10 flex items-center justify-center mb-3">
                                    <span className="material-symbols-outlined text-wa-green">
                                        {step.icon}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                                <p className="text-sm text-gray-500">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Base URL & Auth */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Base URL & Autentikasi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-wa-green text-xl">link</span>
                                Base URL
                            </h3>
                            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                                https://api.autowhatsapp.web.id/v1
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-wa-green text-xl">lock</span>
                                Header Autentikasi
                            </h3>
                            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                                <span className="text-blue-400">Authorization</span>:{" "}
                                <span className="text-green-400">Bearer YOUR_API_KEY</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                        <span className="material-symbols-outlined text-amber-500 mt-0.5">warning</span>
                        <div className="text-sm text-amber-800">
                            <strong>Penting:</strong> Jangan pernah mengekspos API key di client-side code.
                            Selalu gunakan environment variables dan server-side requests.
                        </div>
                    </div>
                </div>
            </section>

            {/* API Reference */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">API Reference</h2>
                    <p className="text-gray-500 mb-8">Daftar lengkap endpoint yang tersedia</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {apiSections.map((section) => (
                            <div
                                key={section.title}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-wa-green/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-wa-green">
                                            {section.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{section.title}</h3>
                                        <p className="text-xs text-gray-500">{section.description}</p>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    {section.endpoints.map((endpoint) => {
                                        const [method, path] = endpoint.split(" ");
                                        const methodColors: Record<string, string> = {
                                            GET: "bg-blue-100 text-blue-700",
                                            POST: "bg-green-100 text-green-700",
                                            PUT: "bg-amber-100 text-amber-700",
                                            DELETE: "bg-red-100 text-red-700",
                                        };
                                        return (
                                            <div
                                                key={endpoint}
                                                className="flex items-center gap-2 text-sm font-mono"
                                            >
                                                <span
                                                    className={`text-xs font-bold px-2 py-0.5 rounded ${methodColors[method] || "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {method}
                                                </span>
                                                <span className="text-gray-600">{path}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SDK & Code Examples */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">SDK & Contoh Kode</h2>
                    <p className="text-gray-500 mb-8">Mulai cepat dengan SDK resmi kami</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sdks.map((sdk) => (
                            <div
                                key={sdk.lang}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                            >
                                <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                    <span className="font-semibold text-sm text-gray-700">
                                        {sdk.lang}
                                    </span>
                                    {sdk.install && (
                                        <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {sdk.install}
                                        </code>
                                    )}
                                </div>
                                <pre className="p-6 text-sm text-gray-300 bg-gray-900 overflow-x-auto">
                                    <code>{sdk.code}</code>
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rate Limiting */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limiting</h2>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Paket</th>
                                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Request/menit</th>
                                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Pesan/hari</th>
                                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Webhook events</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 px-6 text-gray-700 font-medium">Pemula</td>
                                    <td className="py-3 px-6 text-center text-gray-600">30</td>
                                    <td className="py-3 px-6 text-center text-gray-600">33</td>
                                    <td className="py-3 px-6 text-center text-gray-400">—</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 px-6 text-gray-700 font-medium">Pro</td>
                                    <td className="py-3 px-6 text-center text-gray-600">120</td>
                                    <td className="py-3 px-6 text-center text-gray-600">1.667</td>
                                    <td className="py-3 px-6 text-center text-gray-600">Unlimited</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-6 text-gray-700 font-medium">Enterprise</td>
                                    <td className="py-3 px-6 text-center text-gray-600">Custom</td>
                                    <td className="py-3 px-6 text-center text-gray-600">Custom</td>
                                    <td className="py-3 px-6 text-center text-gray-600">Unlimited</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                        <div className="text-sm text-blue-800">
                            Saat rate limit terlampaui, API akan mengembalikan status <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">429 Too Many Requests</code>.
                            Gunakan header <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">X-RateLimit-Reset</code> untuk mengetahui waktu reset.
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-3">Butuh Bantuan?</h2>
                    <p className="text-slate-400 mb-6">
                        Tim support kami siap membantu Anda mengintegrasikan AutoWhatsApp
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/dashboard/bantuan"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-wa-green hover:bg-wa-dark text-white font-medium rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">help</span>
                            Pusat Bantuan
                        </Link>
                        <Link
                            href="/pengembang"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-600 hover:border-slate-400 text-white font-medium rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">code</span>
                            Portal Pengembang
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
