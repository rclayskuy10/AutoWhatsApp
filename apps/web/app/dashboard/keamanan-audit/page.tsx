"use client";

import { type AuditLogEntry, auditLogs } from "@/data/dummy/audit";

export default function KeamananAuditPage() {
    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Keamanan & Audit</h1>
                    <p className="mt-1 text-sm text-gray-500">Monitor aktivitas sistem dan kelola kebijakan keamanan</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50">
                        <span className="material-symbols-outlined text-[18px]">
                            download
                        </span>
                        Export Log
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">
                            gpp_good
                        </span>
                        Kebijakan Keamanan
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="pb-20 space-y-6">
                {/* Stats Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Login Gagal */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Total Login Gagal (24 jam)
                            </p>
                            <h4 className="mt-2 text-2xl font-bold text-gray-900">
                                24
                            </h4>
                            <span className="mt-1 inline-flex items-center text-xs font-medium text-red-500">
                                <span className="material-symbols-outlined text-[14px] mr-1">
                                    arrow_upward
                                </span>
                                12% dari kemarin
                            </span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <span className="material-symbols-outlined text-[24px]">
                                lock_person
                            </span>
                        </div>
                    </div>

                    {/* Aktivitas Sensitif */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Aktivitas Sensitif Terdeteksi
                            </p>
                            <h4 className="mt-2 text-2xl font-bold text-gray-900">
                                3
                            </h4>
                            <span className="mt-1 inline-flex items-center text-xs font-medium text-yellow-600">
                                <span className="material-symbols-outlined text-[14px] mr-1">
                                    warning
                                </span>
                                Perlu ditinjau
                            </span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                            <span className="material-symbols-outlined text-[24px]">
                                policy
                            </span>
                        </div>
                    </div>

                    {/* Status Firewall */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Status Firewall
                            </p>
                            <h4 className="mt-2 text-2xl font-bold text-green-600">
                                Aktif
                            </h4>
                            <span className="mt-1 inline-flex items-center text-xs font-medium text-gray-500">
                                <span className="material-symbols-outlined text-[14px] mr-1">
                                    check_circle
                                </span>
                                Semua sistem aman
                            </span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <span className="material-symbols-outlined text-[24px]">
                                security
                            </span>
                        </div>
                    </div>
                </section>

                {/* Audit Log Table */}
                <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-gray-200">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Log Audit Sistem
                            </h3>
                            <p className="text-sm text-gray-500">
                                Riwayat aktivitas dan perubahan data dalam
                                sistem
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-auto">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    <span className="material-symbols-outlined text-[18px]">
                                        calendar_today
                                    </span>
                                </div>
                                <input
                                    className="w-full md:w-48 rounded-lg border-gray-200 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green"
                                    placeholder="Rentang Tanggal"
                                    type="text"
                                    defaultValue="Okt 01 - Okt 31, 2023"
                                />
                            </div>
                            <div className="w-full md:w-auto">
                                <select className="w-full md:w-40 rounded-lg border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green">
                                    <option value="">Semua Modul</option>
                                    <option value="user">User</option>
                                    <option value="billing">Tagihan</option>
                                    <option value="system">Sistem</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                <tr>
                                    <th
                                        className="px-6 py-4 font-semibold"
                                        scope="col"
                                    >
                                        Timestamp
                                    </th>
                                    <th
                                        className="px-6 py-4 font-semibold"
                                        scope="col"
                                    >
                                        Nama Admin
                                    </th>
                                    <th
                                        className="px-6 py-4 font-semibold"
                                        scope="col"
                                    >
                                        Modul
                                    </th>
                                    <th
                                        className="px-6 py-4 font-semibold"
                                        scope="col"
                                    >
                                        Aksi
                                    </th>
                                    <th
                                        className="px-6 py-4 font-semibold"
                                        scope="col"
                                    >
                                        Alamat IP
                                    </th>
                                    <th
                                        className="px-6 py-4 font-semibold"
                                        scope="col"
                                    >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {auditLogs.map((log, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {log.date}
                                            </div>
                                            <div className="text-xs">
                                                {log.time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${log.adminInitialsColor}`}
                                                >
                                                    {log.adminInitials}
                                                </div>
                                                <span className="font-medium text-gray-900">
                                                    {log.adminName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${log.moduleColor}`}
                                            >
                                                {log.module}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">
                                            {log.action}
                                            {log.actionCode && (
                                                <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded ml-1">
                                                    {log.actionCode}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {log.ip}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${log.status === "Sukses"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-700"
                                                    }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${log.status === "Sukses"
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                        }`}
                                                ></span>
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-xl">
                        <div className="text-sm text-gray-500">
                            Menampilkan{" "}
                            <span className="font-medium text-gray-900">1</span>{" "}
                            sampai{" "}
                            <span className="font-medium text-gray-900">5</span>{" "}
                            dari{" "}
                            <span className="font-medium text-gray-900">
                                1,204
                            </span>{" "}
                            hasil
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                disabled
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    chevron_left
                                </span>
                                Sebelumnya
                            </button>
                            <button className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Selanjutnya
                                <span className="material-symbols-outlined text-[16px]">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
