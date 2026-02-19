"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { billingPlans } from "@/data/dummy/billing";

const faqs = [
    {
        q: "Apa bedanya paket Top-Up dengan Subscription?",
        a: "Top-Up adalah paket sekali beli dengan kuota yang tidak expired sampai habis terpakai. Subscription adalah paket berlangganan bulanan yang auto-renew setiap bulan dengan kuota yang reset.",
    },
    {
        q: "Apakah kuota Top-Up bisa expired?",
        a: "Tidak! Kuota Top-Up Anda aktif sampai habis terpakai, tidak ada batasan waktu. Sangat cocok untuk bisnis dengan volume tidak menentu.",
    },
    {
        q: "Metode pembayaran apa saja yang diterima?",
        a: "Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana), kartu kredit/debit, dan QRIS melalui Midtrans & Xendit.",
    },
    {
        q: "Bisakah saya top-up berkali-kali?",
        a: "Tentu! Anda bisa top-up kapan saja dan kuota akan terakumulasi. Misalnya beli Basic 2x = 20.000 pesan total.",
    },
    {
        q: "Apakah pesan yang gagal terkirim dihitung dalam kuota?",
        a: "Tidak. Hanya pesan yang berhasil terkirim (delivered) yang dihitung dalam kuota Anda. Pesan gagal tidak mengurangi kuota.",
    },
    {
        q: "Bagaimana jika kuota saya habis?",
        a: "Anda akan mendapat notifikasi saat kuota mencapai 70%, 85%, dan 95%. Jika habis, tinggal top-up lagi dalam hitungan menit!",
    },
    {
        q: "Apakah ada kontrak jangka panjang?",
        a: "Tidak ada kontrak! Paket Top-Up bisa dibeli kapan saja sesuai kebutuhan. Paket Subscription bisa dibatalkan kapan saja tanpa penalti.",
    },
    {
        q: "Apakah data saya aman?",
        a: "Keamanan adalah prioritas kami. Semua data dienkripsi (at-rest & in-transit), kami menerapkan RBAC, audit log, dan mengikuti standar keamanan industri.",
    },
];

function formatPrice(price: number) {
    if (price === 0) return "Gratis";
    if (price === -1) return "Custom";
    return `Rp ${price.toLocaleString("id-ID")}`;
}

export default function HargaPage() {
    const [activeTab, setActiveTab] = useState<"topup" | "subscription">("topup");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Pisahkan berdasarkan tipe
    const topUpPlans = billingPlans.filter(plan => plan.type === "topup");
    const subscriptionPlans = billingPlans.filter(plan => plan.type === "subscription");
    const activePlans = activeTab === "topup" ? topUpPlans : subscriptionPlans;

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Harga Sederhana &{" "}
                        <span className="text-wa-green">Transparan</span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                        Pilih model pembayaran yang sesuai: Top-Up fleksibel atau Subscription rutin bulanan
                    </p>

                    {/* Toggle */}
                    <div className="inline-flex items-center gap-3 bg-gray-100 p-1 rounded-full">
                        <button
                            onClick={() => setActiveTab("topup")}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === "topup"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Top-Up Packs
                            <span className="ml-1.5 text-xs text-wa-green font-semibold">
                                Populer
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("subscription")}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === "subscription"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Subscription
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {activePlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white border rounded-2xl p-8 flex flex-col ${plan.popular
                                    ? "border-wa-green shadow-xl shadow-wa-green/10 scale-105"
                                    : "border-gray-200 hover:border-gray-300"
                                    } transition-all`}
                            >
                                {plan.badge && (
                                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full ${plan.badgeColor || 'bg-wa-green text-white'}`}>
                                        {plan.badge}
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mt-1 mb-6">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {plan.priceMonthly}
                                    </span>
                                    {plan.priceMonthly !== "Custom" && (
                                        <span className="text-gray-400 text-sm ml-1">
                                            /{activeTab === "topup" ? "one-time" : "bulan"}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href={plan.priceMonthly === "Custom" ? "/dokumentasi" : "/daftar"}
                                    className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors mb-8 block ${plan.popular
                                        ? "bg-wa-green hover:bg-wa-dark text-white shadow-sm"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {plan.priceMonthly === "Custom" ? "Hubungi Sales" : "Mulai Sekarang"}
                                </Link>

                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                        Fitur Lengkap
                                    </p>
                                    <ul className="space-y-3">
                                        {plan.features.map((f, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="material-symbols-outlined text-wa-green text-base mt-0.5 flex-shrink-0">
                                                    check_circle
                                                </span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-gray-500">
                            Jawaban untuk pertanyaan umum seputar harga dan layanan kami
                        </p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-medium text-gray-800 text-sm pr-4">
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`material-symbols-outlined text-gray-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""
                                            }`}
                                    >
                                        expand_more
                                    </span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Masih Ragu? Coba Dulu Gratis!
                    </h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        Daftar sekarang dan nikmati akses penuh selama 14 hari tanpa biaya
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/daftar"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-wa-green hover:bg-wa-dark text-white font-semibold rounded-lg transition-colors shadow-md shadow-wa-green/20"
                        >
                            Mulai Gratis Sekarang
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <Link
                            href="/dokumentasi"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            Jadwalkan Demo
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
