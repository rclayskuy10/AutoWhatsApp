"use client";

import { type PaketData, packages } from "@/data/dummy/packages";

export default function PaketLanggananPage() {
    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paket Langganan</h1>
                    <p className="mt-1 text-sm text-gray-500">Kelola jenis paket dan fitur yang tersedia untuk pengguna</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm shadow-wa-green/30">
                    <span className="material-symbols-outlined text-[18px]">
                        add
                    </span>
                    Tambah Paket Baru
                </button>
            </div>

            {/* Content */}
            <div>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                                <tr>
                                    <th className="px-6 py-4" scope="col">
                                        Nama Paket
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Harga Bulanan
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Harga Tahunan
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Limit Pesan/Hari
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Limit Pesan/Bulan
                                    </th>
                                    <th className="px-6 py-4" scope="col">
                                        Jumlah Perangkat
                                    </th>
                                    <th
                                        className="px-6 py-4 text-right"
                                        scope="col"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {packages.map((pkg, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors group"
                                    >
                                        {/* Nama Paket */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-10 w-10 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${pkg.iconColor}`}
                                                >
                                                    <span className="material-symbols-outlined text-xl">
                                                        {pkg.icon}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {pkg.name}
                                                    </div>
                                                    <div className="text-xs font-normal text-gray-400">
                                                        {pkg.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Harga Bulanan */}
                                        <td className="px-6 py-4 text-gray-900">
                                            {pkg.priceMonthly}
                                        </td>

                                        {/* Harga Tahunan */}
                                        <td className="px-6 py-4 text-gray-900">
                                            {pkg.priceYearly}
                                        </td>

                                        {/* Limit Pesan/Hari */}
                                        <td className="px-6 py-4">
                                            {pkg.dailyLimitBadge ? (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {pkg.dailyLimit}
                                                </span>
                                            ) : (
                                                pkg.dailyLimit
                                            )}
                                        </td>

                                        {/* Limit Pesan/Bulan */}
                                        <td className="px-6 py-4">
                                            {pkg.monthlyLimitBadge ? (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    {pkg.monthlyLimit}
                                                </span>
                                            ) : (
                                                pkg.monthlyLimit
                                            )}
                                        </td>

                                        {/* Jumlah Perangkat */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[16px] text-gray-400">
                                                    {pkg.deviceIcon}
                                                </span>
                                                <span>{pkg.deviceCount}</span>
                                            </div>
                                        </td>

                                        {/* Aksi */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    className="p-1 text-gray-400 hover:text-wa-green transition-colors"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>
                                                <button
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
