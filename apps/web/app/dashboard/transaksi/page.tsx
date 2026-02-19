"use client";

import { type TransactionData, transactions } from "@/data/dummy/transactions";

export default function TransaksiPage() {
    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transaksi</h1>
                    <p className="mt-1 text-sm text-gray-500">Kelola dan pantau riwayat pembayaran pengguna</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50">
                        <span className="material-symbols-outlined text-[18px]">
                            filter_list
                        </span>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm shadow-wa-green/30">
                        <span className="material-symbols-outlined text-[18px]">
                            download
                        </span>
                        Ekspor Riwayat
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Total Pendapatan */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">
                                Total Pendapatan
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Rp 128.500.000
                            </h3>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium bg-green-50 w-fit px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">
                                    trending_up
                                </span>
                                +12.5% dari bulan lalu
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                            <span className="material-symbols-outlined text-2xl">
                                payments
                            </span>
                        </div>
                    </div>

                    {/* Transaksi Pending */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">
                                Transaksi Pending
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900">
                                14
                            </h3>
                            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1 font-medium bg-orange-50 w-fit px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">
                                    warning
                                </span>
                                Perlu tindakan segera
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                            <span className="material-symbols-outlined text-2xl">
                                pending_actions
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6 relative max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </span>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green placeholder-gray-500"
                        placeholder="Cari ID transaksi atau nama user..."
                        type="text"
                    />
                </div>

                {/* Table */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                                <tr>
                                    <th className="px-6 py-4" scope="col">
                                        ID Transaksi
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Nama User
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Paket
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Nominal
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Metode Pembayaran
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Status
                                    </th>
                                    <th
                                        className="px-6 py-4 text-right"
                                        scope="col"
                                    >
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {transactions.map((trx, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        {/* ID Transaksi */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {trx.id}
                                        </td>

                                        {/* Nama User */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-8 w-8 overflow-hidden rounded-full flex items-center justify-center font-bold text-xs ${trx.userInitialsColor}`}
                                                >
                                                    {trx.userInitials}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {trx.userName}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {trx.userEmail}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Paket */}
                                        <td className="px-6 py-4 text-gray-900">
                                            {trx.plan}
                                        </td>

                                        {/* Nominal */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {trx.amount}
                                        </td>

                                        {/* Metode Pembayaran */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-gray-400 text-lg">
                                                    {trx.paymentIcon}
                                                </span>
                                                {trx.paymentMethod}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${trx.statusColor}`}
                                            >
                                                {trx.status}
                                            </span>
                                        </td>

                                        {/* Tanggal */}
                                        <td className="px-6 py-4 text-right text-gray-400">
                                            {trx.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        {/* Mobile pagination */}
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Next
                            </button>
                        </div>

                        {/* Desktop pagination */}
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Menampilkan{" "}
                                    <span className="font-medium text-gray-900">
                                        1
                                    </span>{" "}
                                    sampai{" "}
                                    <span className="font-medium text-gray-900">
                                        4
                                    </span>{" "}
                                    dari{" "}
                                    <span className="font-medium text-gray-900">
                                        248
                                    </span>{" "}
                                    hasil
                                </p>
                            </div>
                            <div>
                                <nav
                                    aria-label="Pagination"
                                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                >
                                    <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <span className="material-symbols-outlined text-[20px]">
                                            chevron_left
                                        </span>
                                    </button>
                                    <button className="relative z-10 inline-flex items-center bg-wa-green px-4 py-2 text-sm font-semibold text-white focus:z-20">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        3
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                                        ...
                                    </span>
                                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        10
                                    </button>
                                    <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        <span className="sr-only">Next</span>
                                        <span className="material-symbols-outlined text-[20px]">
                                            chevron_right
                                        </span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
