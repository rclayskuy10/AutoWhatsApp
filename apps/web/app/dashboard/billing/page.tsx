"use client";

import { useState } from "react";
import Link from "next/link";
import { billingPlans } from "@/data/dummy/billing";

export default function TagihanPage() {
    // Ambil data paket dari billing dummy
    const planName = "Pro Monthly"; // Ini bisa dari database/state management
    const planData = billingPlans.find(plan => plan.name === planName);
    
    // Data paket aktif saat ini
    const currentPlan = {
        name: planData?.name || "Pro Monthly",
        type: planData?.type || "subscription",
        priceMonthly: planData?.priceMonthly || "Rp 199.000",
        nextBilling: "2026-02-28",
        currentUsage: 85420,
        totalQuota: 150000, // Ambil dari monthlyLimit di planData jika perlu
        features: planData?.features || [],
    };

    // Hitung hari tersisa
    const calculateDaysRemaining = () => {
        const today = new Date();
        const billingDate = new Date(currentPlan.nextBilling);
        const diffTime = billingDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysRemaining = calculateDaysRemaining();
    const isNearExpiry = daysRemaining <= 7; // Jika kurang dari 7 hari
    const usagePercent = Math.round((currentPlan.currentUsage / currentPlan.totalQuota) * 100);

    // State untuk simulasi pembayaran
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeSuccess, setUpgradeSuccess] = useState<string | null>(null);

    // Dummy billing history
    const billingHistory = [
        { id: "INV-2026-001", date: "28 Jan 2026", amount: currentPlan.priceMonthly, status: "Lunas", method: "Transfer Bank BCA" },
        { id: "INV-2025-012", date: "28 Des 2025", amount: currentPlan.priceMonthly, status: "Lunas", method: "E-Wallet GoPay" },
        { id: "INV-2025-011", date: "28 Nov 2025", amount: currentPlan.priceMonthly, status: "Lunas", method: "QRIS" },
        { id: "INV-2025-010", date: "28 Okt 2025", amount: currentPlan.priceMonthly, status: "Lunas", method: "Transfer Bank Mandiri" },
        { id: "INV-2025-009", date: "28 Sep 2025", amount: currentPlan.priceMonthly, status: "Lunas", method: "Kartu Kredit" },
    ];

    // Urutan paket untuk upgrade logic
    const planOrder = ["Starter Pack", "Basic Pack", "Power Pack", "Pro Monthly", "Business", "Enterprise"];
    const currentPlanIndex = planOrder.indexOf(currentPlan.name);
    const upgradePlans = billingPlans.filter(p => {
        const idx = planOrder.indexOf(p.name);
        return idx > currentPlanIndex;
    });

    // Handle upgrade
    const handleUpgrade = (selectedPlan: string) => {
        setShowUpgradeModal(false);
        setUpgradeSuccess(selectedPlan);
        setTimeout(() => setUpgradeSuccess(null), 5000);
    };


    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Tagihan</h1>
                <p className="text-sm text-gray-500 mt-1">Kelola paket langganan dan tagihan Anda</p>
            </div>

            {/* Alert jika mendekati expired */}
            {isNearExpiry && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-orange-400 text-[24px]">warning</span>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-orange-800">
                                Paket Anda akan segera berakhir!
                            </h3>
                            <p className="text-sm text-orange-700 mt-1">
                                Langganan Anda akan berakhir dalam {daysRemaining} hari. Segera bayar tagihan untuk melanjutkan layanan tanpa gangguan.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Alert */}
            {paymentSuccess && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-green-400 text-[24px]">check_circle</span>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-green-800">
                                Pembayaran Berhasil!
                            </h3>
                            <p className="text-sm text-green-700 mt-1">
                                Terima kasih! Paket Anda telah diperpanjang hingga {new Date(new Date(currentPlan.nextBilling).setMonth(new Date(currentPlan.nextBilling).getMonth() + 1)).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Upgrade Success Alert */}
            {upgradeSuccess && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-400 text-[24px]">rocket_launch</span>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-blue-800">
                                Upgrade Berhasil!
                            </h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Paket Anda berhasil diupgrade ke <strong>{upgradeSuccess}</strong>. Fitur baru sudah aktif dan dapat digunakan sekarang.
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            isNearExpiry ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                        }`}>
                            {isNearExpiry ? 'Segera Berakhir' : 'Aktif'}
                        </span>
                        <button
                            onClick={() => setShowHistoryModal(true)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Riwayat Tagihan
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Nama Paket
                        </p>
                        <h3 className="text-xl font-bold text-wa-green">{currentPlan.name}</h3>
                        <p className="text-sm text-gray-600">Bulanan</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            Perpanjangan Berikutnya
                        </p>
                        <h3 className="text-xl font-bold text-gray-900">
                            {new Date(currentPlan.nextBilling).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </h3>
                        <p className="text-sm text-gray-600">Tagihan: {currentPlan.priceMonthly}</p>
                    </div>
                    <div className="space-y-3 lg:col-span-2">
                        <div className="flex justify-between items-end mb-1">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                Penggunaan Kuota Pesan
                            </p>
                            <span className="text-sm font-bold text-gray-900">
                                {currentPlan.currentUsage.toLocaleString()} / {currentPlan.totalQuota.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full ${usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-orange-500' : 'bg-wa-green'}`}
                                style={{ width: `${usagePercent}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">
                            Sisa {(currentPlan.totalQuota - currentPlan.currentUsage).toLocaleString()} pesan bulan ini
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                    {upgradePlans.length > 0 && (
                        <button
                            className="px-6 py-2.5 text-wa-green font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2 border-2 border-wa-green hover:bg-green-50"
                            onClick={() => setShowUpgradeModal(true)}
                        >
                            <span className="material-symbols-outlined text-[20px]">upgrade</span>
                            Upgrade Paket
                        </button>
                    )}
                    <button
                        className={`px-6 py-2.5 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2 ${
                            isNearExpiry 
                                ? 'bg-orange-500 hover:bg-orange-600' 
                                : 'bg-wa-green hover:bg-wa-dark'
                        }`}
                        onClick={() => setShowPaymentModal(true)}
                    >
                        <span className="material-symbols-outlined text-[20px]">payments</span>
                        Bayar Tagihan
                    </button>
                </div>
            </div>

            {/* Fitur Paket Aktif */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fitur Paket {currentPlan.name}</h3>
                    <p className="text-sm text-gray-500">Berikut adalah fitur yang tersedia dalam paket Anda saat ini</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined text-wa-green text-[24px] flex-shrink-0">
                                check_circle
                            </span>
                            <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <span className="material-symbols-outlined text-blue-500 text-[24px]">info</span>
                        <div>
                            <p className="text-sm font-medium text-blue-900">Ingin akses lebih banyak fitur?</p>
                            <p className="text-xs text-blue-700 mt-1">
                                Upgrade ke paket yang lebih tinggi untuk mendapatkan kuota lebih besar, fitur advanced, dan dedicated support.
                            </p>
                            <Link
                                href="/dashboard/choose-package"
                                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
                            >
                                Lihat Paket Lainnya
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal (Sandbox) */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Bayar Tagihan</h3>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {/* Detail Tagihan */}
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Paket</span>
                                    <span className="font-medium text-gray-900">{currentPlan.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Periode</span>
                                    <span className="font-medium text-gray-900">1 Bulan</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Berlaku hingga</span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(new Date(currentPlan.nextBilling).setMonth(new Date(currentPlan.nextBilling).getMonth() + 1)).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="font-bold text-wa-green text-lg">{currentPlan.priceMonthly}</span>
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
                                    <strong>Mode Sandbox:</strong> Ini adalah simulasi pembayaran. Tidak ada transaksi nyata yang akan diproses.
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

            {/* Billing History Modal */}
            {showHistoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowHistoryModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Riwayat Tagihan</h3>
                            </div>
                            <button onClick={() => setShowHistoryModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Invoice</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Tanggal</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Nominal</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {billingHistory.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3">
                                                <div className="font-mono text-xs font-medium text-gray-900">{item.id}</div>
                                                <div className="text-xs text-gray-400">{item.method}</div>
                                            </td>
                                            <td className="px-6 py-3 text-gray-600">{item.date}</td>
                                            <td className="px-6 py-3 font-medium text-gray-900">{item.amount}</td>
                                            <td className="px-6 py-3">
                                                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700">
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowHistoryModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upgrade Paket Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowUpgradeModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-wa-green">
                                    <span className="material-symbols-outlined text-[20px]">upgrade</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Upgrade Paket</h3>
                                    <p className="text-xs text-gray-500">Paket saat ini: <strong className="text-wa-green">{currentPlan.name}</strong></p>
                                </div>
                            </div>
                            <button onClick={() => setShowUpgradeModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {upgradePlans.map((plan) => (
                                    <div key={plan.name} className="relative border border-gray-200 rounded-xl p-5 hover:border-wa-green hover:shadow-md transition-all group">
                                        {plan.badge && (
                                            <span className={`absolute -top-2.5 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${plan.badgeColor}`}>
                                                {plan.badge}
                                            </span>
                                        )}
                                        <h4 className="text-base font-bold text-gray-900">{plan.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1 mb-3">{plan.description}</p>
                                        <div className="mb-4">
                                            <span className="text-2xl font-bold text-gray-900">{plan.priceMonthly}</span>
                                            {plan.priceMonthly !== "Custom" && (
                                                <span className="text-xs text-gray-400 ml-1">/{plan.type === "subscription" ? "bulan" : "paket"}</span>
                                            )}
                                        </div>
                                        <ul className="space-y-2 mb-5">
                                            {plan.features.slice(0, 4).map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                                    <span className="material-symbols-outlined text-wa-green text-[16px] flex-shrink-0 mt-0.5">check_circle</span>
                                                    {feature}
                                                </li>
                                            ))}
                                            {plan.features.length > 4 && (
                                                <li className="text-xs text-gray-400 pl-6">+{plan.features.length - 4} fitur lainnya</li>
                                            )}
                                        </ul>
                                        <button
                                            onClick={() => handleUpgrade(plan.name)}
                                            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                                plan.priceMonthly === "Custom"
                                                    ? "bg-gray-900 text-white hover:bg-gray-800"
                                                    : "bg-wa-green text-white hover:bg-wa-dark"
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {plan.priceMonthly === "Custom" ? "call" : "upgrade"}
                                            </span>
                                            {plan.priceMonthly === "Custom" ? "Hubungi Sales" : "Pilih Paket Ini"}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Info */}
                            <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                                <span className="material-symbols-outlined text-blue-500 text-[20px] flex-shrink-0">info</span>
                                <p className="text-xs text-blue-800">
                                    <strong>Catatan:</strong> Upgrade akan langsung aktif. Sisa kuota dari paket sebelumnya akan ditambahkan ke paket baru Anda. Selisih biaya akan dihitung secara prorata.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
