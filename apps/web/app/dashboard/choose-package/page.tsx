"use client";

import { useState } from "react";
import { billingPlans } from "@/data/dummy/billing";

export default function PilihPaketPage() {
    const [activeTab, setActiveTab] = useState<"topup" | "subscription">("topup");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Pisahkan berdasarkan tipe
    const topUpPlans = billingPlans.filter(plan => plan.type === "topup");
    const subscriptionPlans = billingPlans.filter(plan => plan.type === "subscription");
    const activePlans = activeTab === "topup" ? topUpPlans : subscriptionPlans;

    const handleSelectPlan = (plan: any) => {
        if (plan.priceMonthly === "Custom") {
            // Redirect to contact for custom plan
            window.location.href = "/dashboard/help";
            return;
        }
        setSelectedPlan(plan);
        setShowPaymentModal(true);
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Pilih Paket</h1>
                <p className="text-sm text-gray-500 mt-1">Upgrade atau beli paket sesuai kebutuhan Anda</p>
            </div>

            {/* Success Alert */}
            {paymentSuccess && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-green-400 text-[24px]">check_circle</span>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-green-800">
                                Pembelian Berhasil!
                            </h3>
                            <p className="text-sm text-green-700 mt-1">
                                Paket {selectedPlan?.name} telah aktif. Silakan cek halaman tagihan untuk detail lengkap.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Tab */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 bg-gray-100 p-1 rounded-full">
                    <button
                        onClick={() => setActiveTab("topup")}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                            activeTab === "topup"
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
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                            activeTab === "subscription"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Subscription
                    </button>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-[24px] flex-shrink-0">info</span>
                    <div>
                        <h3 className="text-sm font-semibold text-blue-900 mb-1">
                            {activeTab === "topup" ? "Top-Up Pack" : "Subscription"}
                        </h3>
                        <p className="text-xs text-blue-700">
                            {activeTab === "topup" 
                                ? "Paket sekali beli dengan kuota yang tidak expired sampai habis terpakai. Cocok untuk volume tidak menentu."
                                : "Langganan bulanan yang auto-renew dengan kuota reset setiap bulan. Hemat untuk bisnis dengan volume stabil."
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePlans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative bg-white border rounded-2xl p-6 flex flex-col transition-all ${
                            plan.popular
                                ? "border-wa-green shadow-lg ring-2 ring-wa-green ring-opacity-50"
                                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                    >
                        {plan.badge && (
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${plan.badgeColor || 'bg-wa-green text-white'}`}>
                                {plan.badge}
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-gray-900 mt-2">{plan.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">{plan.description}</p>

                        <div className="mb-6">
                            <span className="text-3xl font-extrabold text-gray-900">
                                {plan.priceMonthly}
                            </span>
                            {plan.priceMonthly !== "Custom" && (
                                <span className="text-gray-400 text-sm ml-1">
                                    /{activeTab === "topup" ? "one-time" : "bulan"}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => handleSelectPlan(plan)}
                            className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors mb-6 ${
                                plan.popular
                                    ? "bg-wa-green hover:bg-wa-dark text-white shadow-sm"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}
                        >
                            {plan.priceMonthly === "Custom" ? "Hubungi Sales" : "Beli Paket"}
                        </button>

                        <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Fitur Lengkap
                            </p>
                            <ul className="space-y-2.5">
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

            {/* Payment Modal (Sandbox) */}
            {showPaymentModal && selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Checkout Paket</h3>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {/* Detail Paket */}
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Paket</span>
                                    <span className="font-medium text-gray-900">{selectedPlan.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tipe</span>
                                    <span className="font-medium text-gray-900">
                                        {selectedPlan.type === "topup" ? "Top-Up (One-time)" : "Subscription (Bulanan)"}
                                    </span>
                                </div>
                                {selectedPlan.type === "subscription" && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Periode</span>
                                        <span className="font-medium text-gray-900">1 Bulan</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="font-bold text-wa-green text-lg">{selectedPlan.priceMonthly}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Metode Pembayaran */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
                                <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green text-sm">
                                    <option>Transfer Bank (BCA, Mandiri, BRI)</option>
                                    <option>E-Wallet (GoPay, OVO, Dana)</option>
                                    <option>QRIS</option>
                                    <option>Kartu Kredit/Debit</option>
                                </select>
                            </div>

                            {/* Info Sandbox */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                                <span className="material-symbols-outlined text-yellow-600 text-[20px]">info</span>
                                <p className="text-xs text-yellow-800">
                                    <strong>Mode Sandbox:</strong> Ini adalah simulasi pembayaran untuk testing. Tidak ada transaksi nyata yang akan diproses.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setPaymentSuccess(true);
                                    setTimeout(() => setPaymentSuccess(false), 5000);
                                }}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark"
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
