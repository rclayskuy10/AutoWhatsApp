"use client";

import { useState } from "react";
import { defaultApiConfig } from "@/data/dummy/api-keys";

export default function KunciApiPage() {
    // API Key state
    const [apiKey, setApiKey] = useState(defaultApiConfig.apiKey);
    const [showKey, setShowKey] = useState(false);
    const [keyCreatedAt] = useState(defaultApiConfig.keyCreatedAt);

    // Webhook state
    const [webhookUrl, setWebhookUrl] = useState("");
    const [eventMsg, setEventMsg] = useState(true);
    const [eventStatus, setEventStatus] = useState(true);
    const [webhookSecret] = useState(defaultApiConfig.webhookSecret);
    const [showSecret, setShowSecret] = useState(false);

    // Modal states
    const [showRegenModal, setShowRegenModal] = useState(false);

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Copy to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey).then(() => {
            showToast("API Key berhasil disalin ke clipboard");
        }).catch(() => {
            showToast("Gagal menyalin API Key", "error");
        });
    };

    // Regenerate key
    const handleRegenerate = () => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let newKey = "sk_live_";
        for (let i = 0; i < 32; i++) {
            newKey += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setApiKey(newKey);
        setShowRegenModal(false);
        showToast("API Key berhasil di-regenerasi. Pastikan Anda memperbarui semua integrasi.");
    };

    // Save webhook settings
    const handleSaveWebhook = () => {
        showToast("Konfigurasi webhook berhasil disimpan");
    };

    // Test webhook connection
    const handleTestConnection = () => {
        if (!webhookUrl.trim()) {
            showToast("Masukkan URL webhook terlebih dahulu", "error");
            return;
        }
        showToast("Test koneksi berhasil! Webhook endpoint merespon dengan baik.");
    };

    const maskedKey = showKey ? apiKey : apiKey.slice(0, 12) + "..." + apiKey.slice(-5);

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.message}
                </div>
            )}

            {/* Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Pengaturan Kunci API</h1>
                <p className="text-sm text-gray-500 mt-1">Kelola kunci API untuk integrasi dengan aplikasi Anda</p>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <span className="material-symbols-outlined text-blue-400">info</span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">
                            Setiap akun hanya memiliki akses ke <strong>satu Kunci API Produksi</strong>. Gunakan kunci ini untuk mengintegrasikan layanan AutoWhatsApp.web.id dengan aplikasi Anda. Jaga kerahasiaan kunci ini.
                        </p>
                    </div>
                </div>
            </div>

            {/* API Key Details */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Detail Kunci API</h2>
                    <p className="text-sm text-gray-500 mt-1">Kunci ini memberikan akses penuh ke akun Anda.</p>
                </div>
                <div className="p-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Production Key</label>
                                <div className="flex items-center gap-2 font-mono text-gray-800 bg-white border border-gray-300 rounded px-3 py-2 w-full sm:w-auto max-w-lg">
                                    <span className="material-symbols-outlined text-gray-400 text-sm">vpn_key</span>
                                    <span className="truncate">{maskedKey}</span>
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="text-gray-400 hover:text-gray-600 ml-auto"
                                        title={showKey ? "Sembunyikan" : "Tampilkan"}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showKey ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                    Salin
                                </button>
                                <button
                                    onClick={() => setShowRegenModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                                    Regenerasi
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span>Status: <strong>Aktif</strong></span>
                        <span className="mx-1">•</span>
                        <span>Dibuat pada: {keyCreatedAt}</span>
                    </div>
                </div>
            </div>

            {/* Webhook Configuration */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Konfigurasi Webhooks</h2>
                        <p className="text-sm text-gray-500 mt-1">Terima notifikasi real-time untuk pesan masuk dan status pengiriman.</p>
                    </div>
                    <button
                        onClick={handleTestConnection}
                        className="text-wa-green text-sm font-medium hover:text-wa-dark"
                    >
                        Tes Koneksi
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Webhook URL */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">URL Webhook</label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    https://
                                </span>
                                <input
                                    className="focus:ring-wa-green focus:border-wa-green flex-1 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="api.domainanda.com/webhook/autowhatsapp"
                                    type="text"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Kami akan mengirimkan payload JSON POST ke URL ini untuk setiap event.</p>
                        </div>

                        {/* Event Subscriptions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Event yang di-subscribe</label>
                            <div className="space-y-2">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            className="focus:ring-wa-green h-4 w-4 text-wa-green border-gray-300 rounded"
                                            id="event_msg"
                                            type="checkbox"
                                            checked={eventMsg}
                                            onChange={(e) => setEventMsg(e.target.checked)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-medium text-gray-700" htmlFor="event_msg">Pesan Masuk</label>
                                        <p className="text-gray-500 text-xs">Ketika seseorang membalas pesan Anda.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            className="focus:ring-wa-green h-4 w-4 text-wa-green border-gray-300 rounded"
                                            id="event_status"
                                            type="checkbox"
                                            checked={eventStatus}
                                            onChange={(e) => setEventStatus(e.target.checked)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-medium text-gray-700" htmlFor="event_status">Status Pesan</label>
                                        <p className="text-gray-500 text-xs">Pembaruan status (terkirim, dibaca, gagal).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secret Key */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key Webhook</label>
                            <div className="flex items-center gap-2">
                                <input
                                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500"
                                    readOnly
                                    type={showSecret ? "text" : "password"}
                                    value={webhookSecret}
                                />
                                <button
                                    onClick={() => setShowSecret(!showSecret)}
                                    className="text-gray-400 hover:text-wa-green"
                                >
                                    <span className="material-symbols-outlined">
                                        {showSecret ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Gunakan key ini untuk memverifikasi signature payload.</p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={handleSaveWebhook}
                        className="bg-wa-green hover:bg-wa-dark text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                        type="button"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>

            {/* Regenerate Confirmation Modal */}
            {showRegenModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Regenerasi API Key?</h3>
                            <p className="text-sm text-gray-500">
                                API Key lama akan langsung tidak aktif. Semua integrasi yang menggunakan key lama akan berhenti bekerja. Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowRegenModal(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleRegenerate}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                Regenerasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
