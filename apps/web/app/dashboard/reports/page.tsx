"use client";

import { useState } from "react";
import { dailyStats, campaignPerformance, templateStats } from "@/data/dummy/reports";

export default function LaporanPage() {
    const [period, setPeriod] = useState("7d");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const totalSent = dailyStats.reduce((a, b) => a + b.sent, 0);
    const totalDelivered = dailyStats.reduce((a, b) => a + b.delivered, 0);
    const totalRead = dailyStats.reduce((a, b) => a + b.read, 0);
    const totalFailed = dailyStats.reduce((a, b) => a + b.failed, 0);
    const deliveryRate = ((totalDelivered / totalSent) * 100).toFixed(1);
    const readRate = ((totalRead / totalDelivered) * 100).toFixed(1);

    const maxSent = Math.max(...dailyStats.map((d) => d.sent));

    // Export PDF
    const handleExportPdf = () => {
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            showToast("Pop-up diblokir. Izinkan pop-up untuk export PDF.", "error");
            return;
        }
        const dailyRows = dailyStats.map(d => `
            <tr>
                <td style="border:1px solid #ddd;padding:8px;">${d.date}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${d.sent.toLocaleString()}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${d.delivered.toLocaleString()}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${d.read.toLocaleString()}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${d.failed.toLocaleString()}</td>
            </tr>
        `).join("");
        const campRows = campaignPerformance.map(c => `
            <tr>
                <td style="border:1px solid #ddd;padding:8px;">${c.name}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${c.sent.toLocaleString()}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${c.deliveryRate}%</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:right;">${c.readRate}%</td>
            </tr>
        `).join("");
        printWindow.document.write(`
            <html><head><title>Laporan & Analitik</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 18px; margin-bottom: 4px; }
                h2 { font-size: 14px; margin-top: 24px; margin-bottom: 8px; }
                p { font-size: 12px; color: #666; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
                th { border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left; font-weight: bold; }
                .summary { display: flex; gap: 16px; margin-bottom: 16px; }
                .stat { padding: 12px; border: 1px solid #ddd; border-radius: 8px; text-align: center; flex: 1; }
                .stat .val { font-size: 20px; font-weight: bold; }
                .stat .lbl { font-size: 11px; color: #888; }
                @media print { body { padding: 0; } }
            </style></head><body>
            <h1>Laporan & Analitik</h1>
            <p>Periode: ${period === "7d" ? "7 Hari" : period === "30d" ? "30 Hari" : "90 Hari"} | Tanggal export: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
            <div class="summary">
                <div class="stat"><div class="val">${totalSent.toLocaleString()}</div><div class="lbl">Total Terkirim</div></div>
                <div class="stat"><div class="val">${totalDelivered.toLocaleString()}</div><div class="lbl">Delivered</div></div>
                <div class="stat"><div class="val">${totalRead.toLocaleString()}</div><div class="lbl">Dibaca</div></div>
                <div class="stat"><div class="val">${totalFailed.toLocaleString()}</div><div class="lbl">Gagal</div></div>
                <div class="stat"><div class="val">${deliveryRate}%</div><div class="lbl">Delivery Rate</div></div>
            </div>
            <h2>Volume Pesan Harian</h2>
            <table><thead><tr><th>Tanggal</th><th style="text-align:right">Terkirim</th><th style="text-align:right">Delivered</th><th style="text-align:right">Dibaca</th><th style="text-align:right">Gagal</th></tr></thead><tbody>${dailyRows}</tbody></table>
            <h2>Performa Kampanye</h2>
            <table><thead><tr><th>Kampanye</th><th style="text-align:right">Terkirim</th><th style="text-align:right">Delivery Rate</th><th style="text-align:right">Read Rate</th></tr></thead><tbody>${campRows}</tbody></table>
            </body></html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 250);
        showToast("Laporan berhasil diexport ke PDF");
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

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Laporan & Analitik</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Pantau performa pengiriman pesan dan kampanye Anda
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Period selector */}
                    <div className="inline-flex bg-gray-100 rounded-lg p-0.5">
                        {[
                            { key: "7d", label: "7 Hari" },
                            { key: "30d", label: "30 Hari" },
                            { key: "90d", label: "90 Hari" },
                        ].map((p) => (
                            <button
                                key={p.key}
                                onClick={() => setPeriod(p.key)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${period === p.key
                                    ? "bg-white text-gray-800 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleExportPdf}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: "Total Terkirim", value: totalSent.toLocaleString(), icon: "send", color: "text-blue-600 bg-blue-50" },
                    { label: "Delivered", value: totalDelivered.toLocaleString(), icon: "done_all", color: "text-green-600 bg-green-50" },
                    { label: "Dibaca", value: totalRead.toLocaleString(), icon: "visibility", color: "text-purple-600 bg-purple-50" },
                    { label: "Gagal", value: totalFailed.toLocaleString(), icon: "error", color: "text-red-600 bg-red-50" },
                    { label: "Delivery Rate", value: `${deliveryRate}%`, icon: "trending_up", color: "text-wa-green bg-green-50" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl border border-gray-200 p-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                                <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Chart - Daily Message Volume */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Volume Pesan Harian</h2>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-wa-green"></span>
                            Terkirim
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            Dibaca
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            Gagal
                        </span>
                    </div>
                </div>

                {/* Simple bar chart */}
                <div className="flex items-end gap-3 h-48">
                    {dailyStats.map((day) => (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex flex-col items-center gap-0.5" style={{ height: "160px" }}>
                                <div className="w-full flex items-end gap-0.5 h-full">
                                    <div
                                        className="flex-1 bg-wa-green/80 rounded-t transition-all"
                                        style={{ height: `${(day.sent / maxSent) * 100}%` }}
                                        title={`Terkirim: ${day.sent}`}
                                    ></div>
                                    <div
                                        className="flex-1 bg-blue-400 rounded-t transition-all"
                                        style={{ height: `${(day.read / maxSent) * 100}%` }}
                                        title={`Dibaca: ${day.read}`}
                                    ></div>
                                    <div
                                        className="flex-1 bg-red-400 rounded-t transition-all"
                                        style={{ height: `${Math.max((day.failed / maxSent) * 100, 2)}%` }}
                                        title={`Gagal: ${day.failed}`}
                                    ></div>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400">{day.date}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Campaign Performance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Performa Kampanye</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500">Kampanye</th>
                                    <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500">Terkirim</th>
                                    <th className="text-right py-2 px-2 text-xs font-semibold text-gray-500">Delivery</th>
                                    <th className="text-right py-2 pl-2 text-xs font-semibold text-gray-500">Read Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaignPerformance.map((camp) => (
                                    <tr key={camp.name} className="border-b border-gray-50 last:border-0">
                                        <td className="py-2.5 pr-4 text-gray-700 font-medium truncate max-w-[150px]">
                                            {camp.name}
                                        </td>
                                        <td className="py-2.5 px-2 text-right text-gray-600">
                                            {camp.sent.toLocaleString()}
                                        </td>
                                        <td className="py-2.5 px-2 text-right">
                                            <span className="text-green-600 font-medium">{camp.deliveryRate}%</span>
                                        </td>
                                        <td className="py-2.5 pl-2 text-right">
                                            <span className={`font-medium ${camp.readRate >= 80 ? "text-green-600" : camp.readRate >= 60 ? "text-yellow-600" : "text-red-600"}`}>
                                                {camp.readRate}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Template Performance */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Performa Template</h2>
                    <div className="space-y-4">
                        {templateStats.map((tmpl) => (
                            <div key={tmpl.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <code className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                        {tmpl.name}
                                    </code>
                                    <span className="text-xs text-gray-500">{tmpl.used.toLocaleString()} digunakan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${tmpl.readRate >= 80 ? "bg-wa-green" : tmpl.readRate >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                                            style={{ width: `${tmpl.readRate}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600 w-12 text-right">
                                        {tmpl.readRate}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Engagement Insights */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Insight Engagement</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-3xl font-bold text-gray-800 mb-1">{readRate}%</div>
                        <div className="text-sm text-gray-500 mb-2">Read Rate</div>
                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +2.3% dari minggu lalu
                        </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-3xl font-bold text-gray-800 mb-1">14:32</div>
                        <div className="text-sm text-gray-500 mb-2">Rata-rata Waktu Baca</div>
                        <div className="text-xs text-gray-400">menit setelah dikirim</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-3xl font-bold text-gray-800 mb-1">08:00-10:00</div>
                        <div className="text-sm text-gray-500 mb-2">Jam Terbaik Kirim</div>
                        <div className="text-xs text-gray-400">read rate tertinggi</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4">
                <p className="text-xs text-gray-400">
                    Data diperbarui setiap 5 menit. Terakhir update: 18 Feb 2026, 14:30 WIB
                </p>
            </div>
        </div>
    );
}
