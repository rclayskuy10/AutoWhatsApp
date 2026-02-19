"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { webhookLogs, eventTypes } from "@/data/dummy/webhook";

export default function WebhookLogPage() {
    const router = useRouter();
    const [filterEvent, setFilterEvent] = useState("Semua Event");
    const [filterStatus, setFilterStatus] = useState("Semua");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Copy payload
    const handleCopyPayload = (payload: string) => {
        const formatted = JSON.stringify(JSON.parse(payload), null, 2);
        navigator.clipboard.writeText(formatted).then(() => {
            showToast("Payload berhasil disalin ke clipboard");
        }).catch(() => {
            showToast("Gagal menyalin payload", "error");
        });
    };

    const filtered = webhookLogs.filter((log) => {
        const matchEvent = filterEvent === "Semua Event" || log.event === filterEvent;
        const matchStatus =
            filterStatus === "Semua" ||
            (filterStatus === "Success" && log.status >= 200 && log.status < 300) ||
            (filterStatus === "Error" && (log.status >= 400 || log.status >= 500));
        return matchEvent && matchStatus;
    });

    const totalSuccess = webhookLogs.filter((l) => l.status >= 200 && l.status < 300).length;
    const totalFailed = webhookLogs.filter((l) => l.status >= 400).length;
    const avgDuration = Math.round(
        webhookLogs.reduce((a, b) => a + b.duration, 0) / webhookLogs.length
    );

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Log Webhook</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Riwayat pengiriman webhook dan detail payload
                    </p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/api-keys")}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <span className="material-symbols-outlined text-lg">settings</span>
                    Konfigurasi Webhook
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-gray-800">{webhookLogs.length}</div>
                    <div className="text-xs text-gray-500">Total Event (hari ini)</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-green-600">{totalSuccess}</div>
                    <div className="text-xs text-gray-500">Sukses (2xx)</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-red-600">{totalFailed}</div>
                    <div className="text-xs text-gray-500">Gagal (4xx/5xx)</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="text-2xl font-bold text-gray-800">{avgDuration}ms</div>
                    <div className="text-xs text-gray-500">Rata-rata Response Time</div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <select
                    value={filterEvent}
                    onChange={(e) => setFilterEvent(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-wa-green/30"
                >
                    {eventTypes.map((e) => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-wa-green/30"
                >
                    <option value="Semua">Semua Status</option>
                    <option value="Success">Success (2xx)</option>
                    <option value="Error">Error (4xx/5xx)</option>
                </select>
            </div>

            {/* Log Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Event</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs hidden md:table-cell">URL</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-600 text-xs">Durasi</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-600 text-xs">Waktu</th>
                                <th className="text-center py-3 px-4 font-semibold text-gray-600 text-xs w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((log) => (
                                <Fragment key={log.id}>
                                    <tr
                                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${expandedId === log.id ? "bg-gray-50" : ""}`}
                                        onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                                    >
                                        <td className="py-3 px-4">
                                            <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                                                {log.event}
                                            </code>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${log.status >= 200 && log.status < 300
                                                    ? "bg-green-100 text-green-700"
                                                    : log.status >= 400 && log.status < 500
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-xs truncate max-w-[200px] hidden md:table-cell">
                                            {log.url}
                                        </td>
                                        <td className="py-3 px-4 text-right text-xs text-gray-600">
                                            <span className={log.duration > 5000 ? "text-red-600 font-medium" : ""}>
                                                {log.duration >= 1000
                                                    ? `${(log.duration / 1000).toFixed(1)}s`
                                                    : `${log.duration}ms`}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right text-xs text-gray-400">
                                            {log.timestamp}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`material-symbols-outlined text-gray-400 text-lg transition-transform ${expandedId === log.id ? "rotate-180" : ""}`}>
                                                expand_more
                                            </span>
                                        </td>
                                    </tr>
                                    {expandedId === log.id && (
                                        <tr key={`${log.id}-detail`}>
                                            <td colSpan={6} className="bg-gray-900 px-4 py-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-gray-400 font-medium">Response Payload</span>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleCopyPayload(log.payload); }}
                                                        className="text-xs text-wa-green hover:text-wa-dark flex items-center gap-1"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">content_copy</span>
                                                        Copy
                                                    </button>
                                                </div>
                                                <pre className="text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap">
                                                    {JSON.stringify(JSON.parse(log.payload), null, 2)}
                                                </pre>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-gray-300 text-5xl mb-3">inbox</span>
                        <p className="text-gray-400 text-sm">Tidak ada log webhook yang ditemukan</p>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                <div className="text-sm text-blue-800">
                    <strong>Retry Policy:</strong> Webhook yang gagal akan di-retry hingga 3 kali dengan
                    exponential backoff (1s, 5s, 30s). Setelah 3 kali gagal, event akan ditandai sebagai failed.
                </div>
            </div>
        </div>
    );
}
