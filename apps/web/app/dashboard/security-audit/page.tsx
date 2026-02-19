"use client";

import { useState, useMemo } from "react";
import { type AuditLogEntry, auditLogs as initialLogs } from "@/data/dummy/audit";

export default function KeamananAuditPage() {
    const [logs] = useState<AuditLogEntry[]>(initialLogs);
    const [searchQuery, setSearchQuery] = useState("");
    const [moduleFilter, setModuleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState<"" | "Sukses" | "Gagal">("");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Kebijakan Keamanan modal
    const [showPolicyModal, setShowPolicyModal] = useState(false);;

    // Filter logs
    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesSearch =
                !searchQuery ||
                log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (log.actionCode || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesModule = !moduleFilter || log.module === moduleFilter;
            const matchesStatus = !statusFilter || log.status === statusFilter;
            return matchesSearch && matchesModule && matchesStatus;
        });
    }, [logs, searchQuery, moduleFilter, statusFilter]);

    // Stats
    const stats = useMemo(() => {
        const failedLogins = logs.filter(l => l.action.includes("Login") && l.status === "Gagal").length;
        const sensitiveActions = logs.filter(l => l.action.includes("Hapus") || l.action.includes("Update API")).length;
        return { failedLogins, sensitiveActions };
    }, [logs]);

    // Get unique modules for filter
    const uniqueModules = useMemo(() => {
        const modules = [...new Set(logs.map(l => l.module))];
        return modules.sort();
    }, [logs]);

    // Detail modal
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

    const openDetail = (log: AuditLogEntry) => {
        setSelectedLog(log);
        setShowDetailModal(true);
    };

    // Export PDF
    const handleExportLog = () => {
        if (filteredLogs.length === 0) {
            showToast("Tidak ada log untuk diexport", "error");
            return;
        }
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            showToast("Pop-up diblokir. Izinkan pop-up untuk export PDF.", "error");
            return;
        }
        const rows = filteredLogs.map(l => `
            <tr>
                <td style="border:1px solid #ddd;padding:8px;">${l.date} ${l.time}</td>
                <td style="border:1px solid #ddd;padding:8px;">${l.adminName}</td>
                <td style="border:1px solid #ddd;padding:8px;">${l.module}</td>
                <td style="border:1px solid #ddd;padding:8px;">${l.action}${l.actionCode ? " (" + l.actionCode + ")" : ""}</td>
                <td style="border:1px solid #ddd;padding:8px;">${l.ip}</td>
                <td style="border:1px solid #ddd;padding:8px;">${l.status}</td>
            </tr>
        `).join("");
        printWindow.document.write(`
            <html><head><title>Log Audit Keamanan</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 18px; margin-bottom: 4px; }
                p { font-size: 12px; color: #666; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 11px; }
                th { border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left; font-weight: bold; }
                @media print { body { padding: 0; } }
            </style></head><body>
            <h1>Log Audit Keamanan</h1>
            <p>Tanggal export: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} | Total: ${filteredLogs.length} log</p>
            <table><thead><tr><th>Timestamp</th><th>Admin</th><th>Modul</th><th>Aksi</th><th>IP</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>
            </body></html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 250);
        showToast(`${filteredLogs.length} log berhasil diexport ke PDF`);
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.message}
                </div>
            )}

            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Keamanan & Audit</h1>
                    <p className="mt-1 text-sm text-gray-500">Monitor aktivitas sistem dan kelola kebijakan keamanan</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportLog}
                        className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Log
                    </button>
                    <button
                        onClick={() => setShowPolicyModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[18px]">gpp_good</span>
                        Kebijakan Keamanan
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Login Gagal (24 jam)</p>
                        <h4 className="mt-2 text-2xl font-bold text-gray-900">{stats.failedLogins}</h4>
                        <span className="mt-1 inline-flex items-center text-xs font-medium text-red-500">
                            <span className="material-symbols-outlined text-[14px] mr-1">arrow_upward</span>
                            12% dari kemarin
                        </span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600">
                        <span className="material-symbols-outlined text-[24px]">lock_person</span>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Aktivitas Sensitif Terdeteksi</p>
                        <h4 className="mt-2 text-2xl font-bold text-gray-900">{stats.sensitiveActions}</h4>
                        {stats.sensitiveActions > 0 && (
                            <span className="mt-1 inline-flex items-center text-xs font-medium text-yellow-600">
                                <span className="material-symbols-outlined text-[14px] mr-1">warning</span>
                                Perlu ditinjau
                            </span>
                        )}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                        <span className="material-symbols-outlined text-[24px]">policy</span>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status Firewall</p>
                        <h4 className="mt-2 text-2xl font-bold text-green-600">Aktif</h4>
                        <span className="mt-1 inline-flex items-center text-xs font-medium text-gray-500">
                            <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span>
                            Semua sistem aman
                        </span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        <span className="material-symbols-outlined text-[24px]">security</span>
                    </div>
                </div>
            </div>

            {/* Audit Log Table */}
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Log Audit Sistem</h3>
                        <p className="text-sm text-gray-500">Riwayat aktivitas dan perubahan data dalam sistem</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        {/* Search */}
                        <div className="relative w-full md:w-auto">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <span className="material-symbols-outlined text-[18px]">search</span>
                            </span>
                            <input
                                className="w-full md:w-56 rounded-lg border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green placeholder-gray-400"
                                placeholder="Cari admin, aksi, IP..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* Module filter */}
                        <select
                            className="w-full md:w-40 rounded-lg border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                            value={moduleFilter}
                            onChange={(e) => setModuleFilter(e.target.value)}
                        >
                            <option value="">Semua Modul</option>
                            {uniqueModules.map(mod => (
                                <option key={mod} value={mod}>{mod}</option>
                            ))}
                        </select>
                        {/* Status filter */}
                        <select
                            className="w-full md:w-36 rounded-lg border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as "" | "Sukses" | "Gagal")}
                        >
                            <option value="">Semua Status</option>
                            <option value="Sukses">Sukses</option>
                            <option value="Gagal">Gagal</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                            <tr>
                                <th className="px-6 py-4" scope="col">Timestamp</th>
                                <th className="px-6 py-4" scope="col">Nama Admin</th>
                                <th className="px-6 py-4" scope="col">Modul</th>
                                <th className="px-6 py-4" scope="col">Aksi</th>
                                <th className="px-6 py-4" scope="col">Alamat IP</th>
                                <th className="px-6 py-4" scope="col">Status</th>
                                <th className="px-6 py-4 text-right" scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <span className="material-symbols-outlined text-gray-300 text-[48px] mb-3 block">search_off</span>
                                        <p className="text-sm font-medium text-gray-500">Tidak ada log ditemukan</p>
                                        <p className="text-xs text-gray-400 mt-1">Coba ubah filter atau kata kunci pencarian</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{log.date}</div>
                                            <div className="text-xs">{log.time}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${log.adminInitialsColor}`}>
                                                    {log.adminInitials}
                                                </div>
                                                <span className="font-medium text-gray-900">{log.adminName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${log.moduleColor}`}>
                                                {log.module}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">
                                            {log.action}
                                            {log.actionCode && (
                                                <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded ml-1">{log.actionCode}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">{log.ip}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                                                log.status === "Sukses" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                            }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${log.status === "Sukses" ? "bg-green-600" : "bg-red-600"}`}></span>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => openDetail(log)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-wa-green hover:bg-green-50 transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-xl">
                    <p className="text-xs text-gray-400">
                        Menampilkan <span className="font-bold text-gray-900">{filteredLogs.length}</span> dari <span className="font-bold text-gray-900">{logs.length}</span> log
                    </p>
                </div>
            </section>

            {/* ===== DETAIL MODAL ===== */}
            {showDetailModal && selectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-[20px]">info</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Detail Log Audit</h3>
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Tanggal</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedLog.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Waktu</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedLog.time}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Administrator</p>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${selectedLog.adminInitialsColor}`}>
                                            {selectedLog.adminInitials}
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedLog.adminName}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Status</p>
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                                        selectedLog.status === "Sukses" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                    }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${selectedLog.status === "Sukses" ? "bg-green-600" : "bg-red-600"}`}></span>
                                        {selectedLog.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Modul</p>
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectedLog.moduleColor}`}>
                                        {selectedLog.module}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Alamat IP</p>
                                    <p className="text-sm font-mono text-gray-700">{selectedLog.ip}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-gray-400 mb-1">Aksi</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedLog.action}
                                        {selectedLog.actionCode && (
                                            <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded ml-2">{selectedLog.actionCode}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Tutup</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== KEBIJAKAN KEAMANAN MODAL ===== */}
            {showPolicyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowPolicyModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-wa-green">
                                    <span className="material-symbols-outlined text-[20px]">gpp_good</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Kebijakan Keamanan</h3>
                            </div>
                            <button onClick={() => setShowPolicyModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4">
                            {[
                                { icon: "lock", title: "Autentikasi 2 Faktor (2FA)", desc: "Wajib aktif untuk semua akun administrator. Menggunakan TOTP atau SMS verification.", status: "Aktif", color: "text-green-600 bg-green-50" },
                                { icon: "timer", title: "Session Timeout", desc: "Sesi otomatis berakhir setelah 30 menit tidak aktif. Dapat dikonfigurasi per role.", status: "30 menit", color: "text-blue-600 bg-blue-50" },
                                { icon: "password", title: "Kebijakan Password", desc: "Minimal 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol. Wajib diganti setiap 90 hari.", status: "Aktif", color: "text-green-600 bg-green-50" },
                                { icon: "block", title: "Rate Limiting", desc: "Maksimal 5 percobaan login gagal. Akun terkunci selama 15 menit setelah melebihi batas.", status: "5 percobaan", color: "text-orange-600 bg-orange-50" },
                                { icon: "vpn_lock", title: "IP Whitelisting", desc: "Akses dashboard hanya diperbolehkan dari IP yang terdaftar. Berlaku untuk akun admin.", status: "Nonaktif", color: "text-gray-600 bg-gray-100" },
                                { icon: "history", title: "Retensi Log Audit", desc: "Log audit disimpan selama 365 hari. Setelah itu data akan diarsipkan secara otomatis.", status: "365 hari", color: "text-purple-600 bg-purple-50" },
                            ].map((policy, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${policy.color}`}>
                                        <span className="material-symbols-outlined text-[20px]">{policy.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="text-sm font-bold text-gray-900">{policy.title}</h4>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${policy.color}`}>{policy.status}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{policy.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowPolicyModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
