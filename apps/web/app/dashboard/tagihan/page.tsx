"use client";

import { useState } from "react";
import { type PricingPlan, billingPlans } from "@/data/dummy/billing";

export default function TagihanPage() {
    const [activeTab, setActiveTab] = useState<"topup" | "subscription">("topup");
    
    // Filter berdasarkan tipe yang dipilih
    const topUpPlans = billingPlans.filter(plan => plan.type === "topup");
    const subscriptionPlans = billingPlans.filter(plan => plan.type === "subscription");
    const plans = activeTab === "topup" ? topUpPlans : subscriptionPlans;

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Tagihan</h1>
                <p className="text-sm text-gray-500 mt-1">Kelola paket langganan dan tagihan Anda</p>
            </div>
                {/* Current Plan */}
                <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Paket Anda Saat Ini
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Detail langganan aktif, penggunaan kuota, dan tagihan.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Aktif
                            </span>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Riwayat Tagihan
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                Nama Paket
                            </p>
                            <h3 className="text-xl font-bold text-wa-green">Premium Plan</h3>
                            <p className="text-sm text-gray-600">Bulanan</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                Perpanjangan Berikutnya
                            </p>
                            <h3 className="text-xl font-bold text-gray-900">15 Okt 2026</h3>
                            <p className="text-sm text-gray-600">Tagihan: Rp. 148.500</p>
                        </div>
                        <div className="space-y-3 lg:col-span-2">
                            <div className="flex justify-between items-end mb-1">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                    Penggunaan Kuota Pesan
                                </p>
                                <span className="text-sm font-bold text-gray-900">
                                    85,420 / 125,000
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-wa-green h-2.5 rounded-full"
                                    style={{ width: "68%" }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 text-right">
                                Sisa 39,580 pesan bulan ini
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            className="px-6 py-2.5 bg-wa-green text-white font-medium rounded-lg hover:bg-wa-dark transition-colors shadow-sm"
                            onClick={() => {
                                document
                                    .getElementById("pricing-section")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Upgrade Paket
                        </button>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="text-center space-y-4 pt-4" id="pricing-section">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Pilih Model Pembayaran Anda
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                        Pilih antara Top-Up fleksibel (beli sesuai kebutuhan) atau Subscription bulanan (hemat untuk volume tinggi)
                    </p>
                </div>

                {/* Toggle Top-Up / Subscription */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                        <button
                            onClick={() => setActiveTab("topup")}
                            className={`px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${activeTab === "topup"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] md:text-[18px]">
                                    bolt
                                </span>
                                Top-Up Packs
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("subscription")}
                            className={`px-4 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${activeTab === "subscription"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] md:text-[18px]">
                                    autorenew
                                </span>
                                Subscription
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-6 md:p-8 flex flex-col relative transition-all min-h-[520px] ${plan.popular
                                ? "ring-2 ring-wa-green shadow-lg"
                                : "border border-gray-200 shadow-sm hover:border-gray-300"
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div
                                    className={`absolute -top-3 right-4 ${plan.badgeColor || 'bg-wa-green text-white'} px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-md`}
                                >
                                    {plan.badge}
                                </div>
                            )}

                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-1 mb-2">{plan.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-4 min-h-[40px]">
                                {plan.description}
                            </p>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {plan.priceMonthly}
                                    </span>
                                    {plan.priceMonthly !== "Custom" && (
                                        <span className="text-gray-500 text-xs md:text-sm">
                                            {activeTab === "topup" ? "" : "/bulan"}
                                        </span>
                                    )}
                                </div>
                                {activeTab === "topup" && plan.priceMonthly !== "Custom" && (
                                    <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                                        Pembayaran sekali, kuota tidak expired
                                    </p>
                                )}
                                {activeTab === "subscription" && plan.priceYearly && plan.priceYearly !== plan.priceMonthly && (
                                    <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                                        atau {plan.priceYearly}/tahun
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-3 mb-6 flex-1">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-2">
                                        <span className="material-symbols-outlined text-wa-green text-[18px] md:text-[20px] flex-shrink-0 mt-0.5">
                                            check_circle
                                        </span>
                                        <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-2.5 md:py-3 px-4 font-semibold rounded-lg transition-colors text-sm ${plan.popular
                                    ? "bg-wa-green text-white hover:bg-wa-dark shadow-md"
                                    : "border-2 border-wa-green text-wa-green hover:bg-green-50"
                                    }`}
                            >
                                {plan.priceMonthly === "Custom" ? "Hubungi Sales" : "Beli Sekarang"}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="w-full mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 md:p-8 border border-blue-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm flex-shrink-0">
                                <span className="material-symbols-outlined text-wa-green text-2xl md:text-3xl">
                                    {activeTab === "topup" ? "shopping_cart" : "business_center"}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-base md:text-lg font-bold text-gray-900">
                                    {activeTab === "topup" 
                                        ? "Butuh volume lebih besar?"
                                        : "Butuh solusi Enterprise?"}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">
                                    {activeTab === "topup"
                                        ? "Beli paket Top-Up berkali-kali atau upgrade ke Subscription untuk hemat lebih banyak."
                                        : "Perusahaan besar dengan volume tinggi? Dapatkan dedicated support dan custom integration."}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => activeTab === "topup" ? setActiveTab("subscription") : null}
                            className="w-full md:w-auto whitespace-nowrap px-6 py-2.5 md:py-3 bg-wa-green text-white font-medium rounded-lg hover:bg-wa-dark transition-colors shadow-sm text-sm"
                        >
                            {activeTab === "topup" ? "Lihat Subscription" : "Hubungi Sales"}
                        </button>
                    </div>
                </div>

        </div>
    );
}
