"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pathLabels: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/perangkat": "Devices",
    "/dashboard/kontak": "Contacts",
    "/dashboard/templat": "Templates",
    "/dashboard/kampanye": "Campaigns",
    "/dashboard/kunci-api": "API Keys",
    "/dashboard/tagihan": "Billing",
    "/dashboard/organisasi": "Organization",
    "/dashboard/bantuan": "Help Center",
    "/dashboard/profil": "Profile",
    "/dashboard/laporan": "Reports",
    "/dashboard/webhook-log": "Webhook Logs",
    "/dashboard/chatbot": "Chatbot",
    "/dashboard/manajemen-user": "User Management",
    "/dashboard/paket-langganan": "Subscription Plans",
    "/dashboard/transaksi": "Transactions",
    "/dashboard/pengaturan-sistem": "System Settings",
    "/dashboard/keamanan-audit": "Security & Audit",
};

const notifications = [
    {
        id: 1,
        type: "success",
        title: "Kampanye selesai",
        message: "\"Promo Valentine 2026\" berhasil mengirim 5.200 pesan",
        time: "5 menit lalu",
        read: false,
    },
    {
        id: 2,
        type: "warning",
        title: "Kuota hampir habis",
        message: "Kuota pesan Anda tersisa 15%. Upgrade paket untuk kuota lebih besar.",
        time: "1 jam lalu",
        read: false,
    },
    {
        id: 3,
        type: "error",
        title: "Perangkat terputus",
        message: "WhatsApp Business (081234567890) terputus. Silakan reconnect.",
        time: "2 jam lalu",
        read: false,
    },
    {
        id: 4,
        type: "info",
        title: "Update platform",
        message: "Fitur Chatbot Builder telah tersedia! Coba sekarang di menu Chatbot.",
        time: "1 hari lalu",
        read: true,
    },
    {
        id: 5,
        type: "success",
        title: "Pembayaran berhasil",
        message: "Tagihan Pro Plan bulan Februari telah berhasil dibayar.",
        time: "3 hari lalu",
        read: true,
    },
];

export default function DashboardHeader() {
    const pathname = usePathname();
    const [showNotif, setShowNotif] = useState(false);
    const [notifs, setNotifs] = useState(notifications);
    const notifRef = useRef<HTMLDivElement>(null);

    const currentLabel = pathLabels[pathname] || "Dashboard";
    const unreadCount = notifs.filter((n) => !n.read).length;

    // Close notification dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setShowNotif(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifs(notifs.map((n) => ({ ...n, read: true })));
    };

    const typeIcon: Record<string, { icon: string; color: string }> = {
        success: { icon: "check_circle", color: "text-green-500" },
        warning: { icon: "warning", color: "text-amber-500" },
        error: { icon: "error", color: "text-red-500" },
        info: { icon: "info", color: "text-blue-500" },
    };

    return (
        <div className="hidden lg:flex sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 h-14 items-center justify-between px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-sm">
                <Link
                    href="/dashboard"
                    className="text-gray-400 hover:text-wa-green transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">home</span>
                </Link>
                {pathname !== "/dashboard" && (
                    <>
                        <span className="material-symbols-outlined text-gray-300 text-sm">
                            chevron_right
                        </span>
                        <span className="text-gray-700 font-medium">{currentLabel}</span>
                    </>
                )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Search (compact) */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="w-48 pl-9 pr-3 py-1.5 bg-gray-100 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-gray-300 focus:w-64 transition-all"
                    />
                </div>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotif(!showNotif)}
                        className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotif && (
                        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                <h4 className="font-semibold text-gray-800 text-sm">Notifikasi</h4>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllRead}
                                        className="text-xs text-wa-green hover:text-wa-dark font-medium"
                                    >
                                        Tandai semua dibaca
                                    </button>
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifs.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors ${!notif.read ? "bg-blue-50/50" : ""
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-lg mt-0.5 ${typeIcon[notif.type].color}`}>
                                            {typeIcon[notif.type].icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {notif.title}
                                                </p>
                                                {!notif.read && (
                                                    <span className="w-2 h-2 bg-wa-green rounded-full flex-shrink-0"></span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                                <Link
                                    href="/dashboard"
                                    className="text-xs text-wa-green hover:text-wa-dark font-medium"
                                    onClick={() => setShowNotif(false)}
                                >
                                    Lihat semua notifikasi
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile link */}
                <Link
                    href="/dashboard/profil"
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">account_circle</span>
                </Link>
            </div>
        </div>
    );
}
