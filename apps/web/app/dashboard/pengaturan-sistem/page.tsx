"use client";

import { useState } from "react";

export default function PengaturanSistemPage() {
    const [midtransEnabled, setMidtransEnabled] = useState(true);
    const [xenditEnabled, setXenditEnabled] = useState(false);

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
                    <p className="mt-1 text-sm text-gray-500">Kelola konfigurasi aplikasi global dan integrasi pihak ketiga</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">
                        save
                    </span>
                    Simpan Perubahan
                </button>
            </div>

            {/* Content */}
            <div className="pb-20">
                <form
                    action="#"
                    className="space-y-6 max-w-5xl mx-auto"
                    method="POST"
                >
                    {/* Konfigurasi Umum */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <span className="material-symbols-outlined">
                                    tune
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    Konfigurasi Umum
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Informasi dasar tentang aplikasi SaaS Anda
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="app_name"
                                >
                                    Nama Aplikasi
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="app_name"
                                    placeholder="Misal: AutoWhatsApp Pro"
                                    type="text"
                                    defaultValue="AutoWhatsApp.web.id"
                                />
                            </div>
                            <div>
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="app_url"
                                >
                                    URL Aplikasi
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="app_url"
                                    placeholder="https://app.wablast.io"
                                    type="url"
                                    defaultValue="https://dashboard.wablast.io"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="support_email"
                                >
                                    Email Support
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="support_email"
                                    placeholder="support@domain.com"
                                    type="email"
                                    defaultValue="support@wablast.io"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Email ini akan ditampilkan kepada user jika
                                    mereka membutuhkan bantuan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pengaturan API & Webhook */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                <span className="material-symbols-outlined">
                                    api
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    Pengaturan API &amp; Webhook
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Konfigurasi endpoint untuk integrasi sistem
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="api_base_url"
                                >
                                    Global API Base URL
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">
                                            https://
                                        </span>
                                    </div>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-white py-2.5 pl-16 pr-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                        id="api_base_url"
                                        placeholder="api.wablast.io/v1"
                                        type="text"
                                        defaultValue="api.wablast.io/v1"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="callback_url"
                                >
                                    Default Callback URL
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="callback_url"
                                    placeholder="https://yoursite.com/webhook"
                                    type="url"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    URL ini akan digunakan jika user tidak
                                    menentukan callback URL spesifik.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Integrasi Payment Gateway */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                <span className="material-symbols-outlined">
                                    payments
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    Integrasi Payment Gateway
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Atur metode pembayaran otomatis untuk
                                    langganan
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {/* Midtrans */}
                            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-white p-1 shadow-sm flex items-center justify-center border border-gray-100">
                                            <span className="text-wa-green font-bold text-xs">
                                                MT
                                            </span>
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            Midtrans Payment
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMidtransEnabled(!midtransEnabled)
                                        }
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${midtransEnabled
                                            ? "bg-wa-green"
                                            : "bg-gray-300"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${midtransEnabled
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label
                                            className="mb-1.5 block text-xs font-medium text-gray-500"
                                            htmlFor="midtrans_server_key"
                                        >
                                            Server Key
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-white py-2 px-3 text-sm font-mono text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                            id="midtrans_server_key"
                                            placeholder="SB-Mid-server-..."
                                            type="password"
                                            defaultValue="SB-Mid-server-xxxxxxxxx"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="mb-1.5 block text-xs font-medium text-gray-500"
                                            htmlFor="midtrans_client_key"
                                        >
                                            Client Key
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-white py-2 px-3 text-sm font-mono text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                            id="midtrans_client_key"
                                            placeholder="SB-Mid-client-..."
                                            type="text"
                                            defaultValue="SB-Mid-client-xxxxxxxxx"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Xendit */}
                            <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-white p-1 shadow-sm flex items-center justify-center text-blue-600 font-bold text-xs border border-gray-100">
                                            XND
                                        </div>
                                        <span className="font-semibold text-gray-900">
                                            Xendit Payment
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setXenditEnabled(!xenditEnabled)
                                        }
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${xenditEnabled
                                            ? "bg-wa-green"
                                            : "bg-gray-300"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${xenditEnabled
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label
                                            className="mb-1.5 block text-xs font-medium text-gray-500"
                                            htmlFor="xendit_api_key"
                                        >
                                            Xendit Secret API Key
                                        </label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-white py-2 px-3 text-sm font-mono text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                            id="xendit_api_key"
                                            placeholder="xnd_..."
                                            type="password"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMTP Mailer */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                <span className="material-symbols-outlined">
                                    mail
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    SMTP Mailer
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Konfigurasi email sistem untuk notifikasi
                                    keluar
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                            <div className="md:col-span-8">
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="smtp_host"
                                >
                                    SMTP Host
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="smtp_host"
                                    placeholder="smtp.gmail.com"
                                    type="text"
                                />
                            </div>
                            <div className="md:col-span-4">
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="smtp_port"
                                >
                                    Port
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="smtp_port"
                                    placeholder="587"
                                    type="number"
                                />
                            </div>
                            <div className="md:col-span-6">
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="smtp_user"
                                >
                                    Username / Email
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="smtp_user"
                                    placeholder="user@domain.com"
                                    type="text"
                                />
                            </div>
                            <div className="md:col-span-6">
                                <label
                                    className="mb-1.5 block text-sm font-medium text-gray-900"
                                    htmlFor="smtp_pass"
                                >
                                    Password
                                </label>
                                <input
                                    className="w-full rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    id="smtp_pass"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-end">
                            <button
                                className="text-sm font-medium text-wa-green hover:text-wa-dark transition-colors"
                                type="button"
                            >
                                Tes Koneksi Email
                            </button>
                        </div>
                    </div>

                    {/* Mobile Save Button */}
                    <div className="fixed bottom-4 right-4 z-40 sm:hidden">
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-full bg-wa-green px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105"
                        >
                            <span className="material-symbols-outlined">
                                save
                            </span>
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
