"use client";

import { useState, useMemo } from "react";
import { type TransactionData, transactions as initialTransactions } from "@/data/dummy/transactions";

export default function TransaksiPage() {
    const [trxList, setTrxList] = useState<TransactionData[]>(initialTransactions);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Modal states
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedTrx, setSelectedTrx] = useState<TransactionData | null>(null);
    const [newStatus, setNewStatus] = useState<string>("");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Filter & search
    const filteredTransactions = useMemo(() => {
        return trxList.filter(trx => {
            const matchesSearch =
                trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trx.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trx.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trx.plan.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || trx.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [trxList, searchQuery, statusFilter]);

    // Summary stats
    const summary = useMemo(() => {
        const totalRevenue = trxList
            .filter(t => t.status === "Sukses")
            .reduce((sum, t) => {
                const num = parseInt(t.amount.replace(/[^\d]/g, ""), 10);
                return sum + (isNaN(num) ? 0 : num);
            }, 0);
        const pendingCount = trxList.filter(t => t.status === "Pending").length;
        const failedCount = trxList.filter(t => t.status === "Gagal").length;
        return { totalRevenue, pendingCount, failedCount };
    }, [trxList]);

    const formatCurrency = (num: number) =>
        "Rp " + num.toLocaleString("id-ID");

    // Detail
    const openDetailModal = (trx: TransactionData) => {
        setSelectedTrx(trx);
        setShowDetailModal(true);
    };

    // Status change
    const openStatusModal = (trx: TransactionData, status: string) => {
        setSelectedTrx(trx);
        setNewStatus(status);
        setShowStatusModal(true);
    };

    const handleStatusChange = () => {
        if (!selectedTrx) return;
        const statusColorMap: Record<string, string> = {
            Sukses: "bg-green-50 text-green-700 ring-green-600/20",
            Gagal: "bg-red-50 text-red-700 ring-red-600/20",
            Pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        };
        setTrxList(trxList.map(t =>
            t === selectedTrx
                ? { ...t, status: newStatus, statusColor: statusColorMap[newStatus] || t.statusColor }
                : t
        ));
        setShowStatusModal(false);
        showToast(`Transaksi ${selectedTrx.id} berhasil diubah ke "${newStatus}"`);
        setSelectedTrx(null);
    };

    // Export PDF
    const handleExportPdf = () => {
        if (filteredTransactions.length === 0) {
            showToast("Tidak ada transaksi untuk diexport", "error");
            return;
        }
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            showToast("Pop-up diblokir. Izinkan pop-up untuk export PDF.", "error");
            return;
        }
        const rows = filteredTransactions.map(t => `
            <tr>
                <td style="border:1px solid #ddd;padding:8px;font-family:monospace;font-size:11px;">${t.id}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.userName}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.userEmail}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.plan}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.amount}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.paymentMethod}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.status}</td>
                <td style="border:1px solid #ddd;padding:8px;">${t.date}</td>
            </tr>
        `).join("");
        printWindow.document.write(`
            <html><head><title>Riwayat Transaksi</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 18px; margin-bottom: 4px; }
                p { font-size: 12px; color: #666; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 11px; }
                th { border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left; font-weight: bold; }
                @media print { body { padding: 0; } }
            </style></head><body>
            <h1>Riwayat Transaksi</h1>
            <p>Tanggal export: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} | Total: ${filteredTransactions.length} transaksi | Pendapatan: ${formatCurrency(summary.totalRevenue)}</p>
            <table><thead><tr><th>ID</th><th>Nama</th><th>Email</th><th>Paket</th><th>Nominal</th><th>Metode</th><th>Status</th><th>Tanggal</th></tr></thead><tbody>${rows}</tbody></table>
            </body></html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 250);
        showToast(`${filteredTransactions.length} transaksi berhasil diexport ke PDF`);
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
                    <h1 className="text-2xl font-bold text-gray-900">Transaksi</h1>
                    <p className="mt-1 text-sm text-gray-500">Kelola dan pantau riwayat pembayaran pengguna</p>
                </div>
                <button
                    onClick={handleExportPdf}
                    className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm shadow-wa-green/30"
                >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Ekspor Riwayat
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Pendapatan</p>
                        <h3 className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(summary.totalRevenue)}</h3>
                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium bg-green-50 w-fit px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-[14px]">trending_up</span>
                            +12.5% dari bulan lalu
                        </p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                        <span className="material-symbols-outlined text-2xl">payments</span>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Transaksi Pending</p>
                        <h3 className="mt-2 text-2xl font-bold text-gray-900">{summary.pendingCount}</h3>
                        {summary.pendingCount > 0 && (
                            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1 font-medium bg-orange-50 w-fit px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">warning</span>
                                Perlu tindakan segera
                            </p>
                        )}
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                        <span className="material-symbols-outlined text-2xl">pending_actions</span>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Transaksi Gagal</p>
                        <h3 className="mt-2 text-2xl font-bold text-gray-900">{summary.failedCount}</h3>
                        {summary.failedCount > 0 && (
                            <p className="text-xs text-red-600 mt-2 flex items-center gap-1 font-medium bg-red-50 w-fit px-2 py-0.5 rounded-full">
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                Perlu ditinjau
                            </p>
                        )}
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                        <span className="material-symbols-outlined text-2xl">cancel</span>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green placeholder-gray-400"
                        placeholder="Cari ID transaksi, nama, email, atau paket..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "Sukses", "Pending", "Gagal"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                                statusFilter === status
                                    ? "bg-wa-green text-white shadow-sm"
                                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            {status === "all" ? "Semua" : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                            <tr>
                                <th className="px-6 py-4" scope="col">ID Transaksi</th>
                                <th className="px-6 py-4" scope="col">Nama User</th>
                                <th className="px-6 py-4" scope="col">Paket</th>
                                <th className="px-6 py-4" scope="col">Nominal</th>
                                <th className="px-6 py-4" scope="col">Metode Pembayaran</th>
                                <th className="px-6 py-4" scope="col">Status</th>
                                <th className="px-6 py-4" scope="col">Tanggal</th>
                                <th className="px-6 py-4 text-right" scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center">
                                        <span className="material-symbols-outlined text-gray-300 text-[48px] mb-3 block">receipt_long</span>
                                        <p className="text-sm font-medium text-gray-500">Tidak ada transaksi ditemukan</p>
                                        <p className="text-xs text-gray-400 mt-1">Coba ubah kata kunci pencarian atau filter</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((trx, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-gray-900 font-mono text-xs">{trx.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 overflow-hidden rounded-full flex items-center justify-center font-bold text-xs ${trx.userInitialsColor}`}>
                                                    {trx.userInitials}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{trx.userName}</div>
                                                    <div className="text-xs text-gray-400">{trx.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900">{trx.plan}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{trx.amount}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-gray-400 text-lg">{trx.paymentIcon}</span>
                                                {trx.paymentMethod}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${trx.statusColor}`}>
                                                {trx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">{trx.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openDetailModal(trx)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-wa-green hover:bg-green-50 transition-colors"
                                                    title="Detail"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                {trx.status === "Pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => openStatusModal(trx, "Sukses")}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                                                            title="Approve"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                                        </button>
                                                        <button
                                                            onClick={() => openStatusModal(trx, "Gagal")}
                                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                            title="Reject"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">cancel</span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                        Menampilkan <span className="font-bold text-gray-900">{filteredTransactions.length}</span> dari <span className="font-bold text-gray-900">{trxList.length}</span> transaksi
                    </p>
                </div>
            </div>

            {/* ===== DETAIL MODAL ===== */}
            {showDetailModal && selectedTrx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Detail Transaksi</h3>
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">ID Transaksi</p>
                                    <p className="text-sm font-bold text-gray-900 font-mono">{selectedTrx.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Status</p>
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectedTrx.statusColor}`}>
                                        {selectedTrx.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Nama User</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedTrx.userName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Email</p>
                                    <p className="text-sm text-gray-700">{selectedTrx.userEmail}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Paket</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedTrx.plan}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Nominal</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedTrx.amount}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Metode Pembayaran</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-gray-400 text-[16px]">{selectedTrx.paymentIcon}</span>
                                        <p className="text-sm text-gray-700">{selectedTrx.paymentMethod}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Tanggal</p>
                                    <p className="text-sm text-gray-700">{selectedTrx.date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            {selectedTrx.status === "Pending" && (
                                <>
                                    <button
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            openStatusModal(selectedTrx, "Gagal");
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                                        Tolak
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            openStatusModal(selectedTrx, "Sukses");
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                        Setujui
                                    </button>
                                </>
                            )}
                            {selectedTrx.status !== "Pending" && (
                                <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Tutup</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== STATUS CHANGE MODAL ===== */}
            {showStatusModal && selectedTrx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-4 ${
                                newStatus === "Sukses" ? "bg-green-100" : "bg-red-100"
                            }`}>
                                <span className={`material-symbols-outlined text-[28px] ${
                                    newStatus === "Sukses" ? "text-green-600" : "text-red-600"
                                }`}>
                                    {newStatus === "Sukses" ? "check_circle" : "cancel"}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {newStatus === "Sukses" ? "Setujui Transaksi" : "Tolak Transaksi"}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {newStatus === "Sukses"
                                    ? <>Apakah Anda yakin ingin menyetujui transaksi <strong className="text-gray-900">{selectedTrx.id}</strong> senilai <strong className="text-gray-900">{selectedTrx.amount}</strong>?</>
                                    : <>Apakah Anda yakin ingin menolak transaksi <strong className="text-gray-900">{selectedTrx.id}</strong>? User akan dinotifikasi.</>
                                }
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowStatusModal(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button
                                onClick={handleStatusChange}
                                className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center justify-center gap-2 ${
                                    newStatus === "Sukses" ? "bg-wa-green hover:bg-wa-dark" : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {newStatus === "Sukses" ? "check" : "close"}
                                </span>
                                {newStatus === "Sukses" ? "Setujui" : "Tolak"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
