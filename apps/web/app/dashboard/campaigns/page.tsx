"use client";

import { useState } from "react";
import { type Campaign, initialCampaigns, statusOptions } from "@/data/dummy/campaigns";
import { ITEMS_PER_PAGE } from "@/data/helpers";

export default function KampanyePage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

    // Form states
    const [formName, setFormName] = useState("");
    const [formDevice, setFormDevice] = useState("");
    const [formTarget, setFormTarget] = useState("");
    const [formStatus, setFormStatus] = useState("Draf");
    const [formSchedule, setFormSchedule] = useState("");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Select
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const filteredCampaigns = campaigns.filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = filterStatus === "all" || c.status.toLowerCase().startsWith(filterStatus.toLowerCase());
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
    const paginatedCampaigns = filteredCampaigns.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const resetForm = () => {
        setFormName("");
        setFormDevice("");
        setFormTarget("");
        setFormStatus("Draf");
        setFormSchedule("");
    };

    // CREATE
    const openAddModal = () => { resetForm(); setShowAddModal(true); };
    const handleAdd = () => {
        if (!formName.trim() || !formDevice.trim() || !formTarget.trim()) return;
        const statusOpt = statusOptions.find(s => s.label === formStatus);
        const newCampaign: Campaign = {
            id: Date.now(),
            name: formName.trim(),
            device: formDevice.trim(),
            target: formTarget.trim(),
            status: formStatus,
            statusColor: statusOpt?.color || "bg-gray-100 text-gray-800",
            schedule: formSchedule.trim() || "Belum dijadwalkan",
        };
        setCampaigns([newCampaign, ...campaigns]);
        setShowAddModal(false);
        resetForm();
        showToast("Kampanye berhasil dibuat");
    };

    // EDIT
    const openEditModal = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        setFormName(campaign.name);
        setFormDevice(campaign.device);
        setFormTarget(campaign.target);
        setFormStatus(campaign.status);
        setFormSchedule(campaign.schedule);
        setShowEditModal(true);
    };
    const handleEdit = () => {
        if (!selectedCampaign || !formName.trim() || !formDevice.trim()) return;
        const statusOpt = statusOptions.find(s => s.label === formStatus);
        setCampaigns(campaigns.map(c =>
            c.id === selectedCampaign.id
                ? {
                    ...c,
                    name: formName.trim(),
                    device: formDevice.trim(),
                    target: formTarget.trim(),
                    status: formStatus,
                    statusColor: statusOpt?.color || c.statusColor,
                    schedule: formSchedule.trim() || c.schedule,
                }
                : c
        ));
        setShowEditModal(false);
        setSelectedCampaign(null);
        resetForm();
        showToast("Kampanye berhasil diperbarui");
    };

    // DELETE
    const openDeleteModal = (campaign: Campaign) => { setSelectedCampaign(campaign); setShowDeleteModal(true); };
    const handleDelete = () => {
        if (!selectedCampaign) return;
        setCampaigns(campaigns.filter(c => c.id !== selectedCampaign.id));
        setSelectedIds(selectedIds.filter(id => id !== selectedCampaign.id));
        setShowDeleteModal(false);
        setSelectedCampaign(null);
        showToast("Kampanye berhasil dihapus");
        if (paginatedCampaigns.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // BULK
    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        setCampaigns(campaigns.filter(c => !selectedIds.includes(c.id)));
        showToast(`${selectedIds.length} kampanye berhasil dihapus`);
        setSelectedIds([]);
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const toggleSelectAll = () => {
        const pageIds = paginatedCampaigns.map(c => c.id);
        const allSelected = pageIds.every(id => selectedIds.includes(id));
        if (allSelected) setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
        else setSelectedIds(prev => [...new Set([...prev, ...pageIds])]);
    };

    const CampaignFormModal = ({ isEdit }: { isEdit: boolean }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                        {isEdit ? "Edit Kampanye" : "Buat Kampanye Baru"}
                    </h3>
                    <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kampanye *</label>
                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            placeholder="Contoh: Promo Flash Sale Januari"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Perangkat *</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                placeholder="Contoh: Samsung S21 (Main)"
                                value={formDevice}
                                onChange={(e) => setFormDevice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target *</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                placeholder="Contoh: 1,500 Kontak"
                                value={formTarget}
                                onChange={(e) => setFormTarget(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                value={formStatus}
                                onChange={(e) => setFormStatus(e.target.value)}
                            >
                                {statusOptions.map(s => (
                                    <option key={s.label} value={s.label}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal Kirim</label>
                            <input
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                type="datetime-local"
                                value={formSchedule}
                                onChange={(e) => setFormSchedule(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Batal
                    </button>
                    <button
                        onClick={isEdit ? handleEdit : handleAdd}
                        disabled={!formName.trim() || !formDevice.trim() || !formTarget.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEdit ? "Simpan Perubahan" : "Buat Kampanye"}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 space-y-6">
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.message}
                </div>
            )}

            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kampanye</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola dan pantau kampanye pesan Anda</p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedIds.length > 0 && (
                        <button onClick={handleBulkDelete} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                            Hapus ({selectedIds.length})
                        </button>
                    )}
                    <button onClick={openAddModal} className="bg-wa-green hover:bg-wa-dark text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Buat Kampanye
                    </button>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-wa-green focus:ring-wa-green sm:text-sm"
                        placeholder="Cari nama kampanye..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Status:</label>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wa-green focus:border-wa-green sm:text-sm rounded-lg"
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="all">Semua Status</option>
                        <option value="berjalan">Berjalan</option>
                        <option value="terjadwal">Terjadwal</option>
                        <option value="selesai">Selesai</option>
                        <option value="gagal">Gagal</option>
                        <option value="draf">Draf</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left" scope="col">
                                    <input className="rounded border-gray-300 text-wa-green focus:ring-wa-green h-4 w-4" type="checkbox"
                                        checked={paginatedCampaigns.length > 0 && paginatedCampaigns.every(c => selectedIds.includes(c.id))}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Nama Kampanye</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Perangkat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Target</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Jadwal Kirim</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedCampaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input className="rounded border-gray-300 text-wa-green focus:ring-wa-green h-4 w-4" type="checkbox"
                                            checked={selectedIds.includes(campaign.id)}
                                            onChange={() => toggleSelect(campaign.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="material-symbols-outlined text-gray-400 text-[18px] mr-2">smartphone</span>
                                            <span className="text-sm text-gray-600">{campaign.device}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.target}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign.statusColor}`}>{campaign.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.schedule}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openEditModal(campaign)} className="text-gray-400 hover:text-wa-green mx-2" title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button onClick={() => openDeleteModal(campaign)} className="text-gray-400 hover:text-red-600 mx-2" title="Hapus">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredCampaigns.length === 0 && (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">campaign</span>
                        <p className="text-gray-500 text-sm">Tidak ada kampanye ditemukan.</p>
                    </div>
                )}

                {filteredCampaigns.length > 0 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-700">
                                Menampilkan <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> sampai{" "}
                                <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCampaigns.length)}</span> dari{" "}
                                <span className="font-medium">{filteredCampaigns.length}</span> hasil
                            </p>
                            <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button key={page} onClick={() => setCurrentPage(page)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage ? "z-10 bg-green-50 border-wa-green text-wa-dark" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}>
                                        {page}
                                    </button>
                                ))}
                                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </div>

            {showAddModal && <CampaignFormModal isEdit={false} />}
            {showEditModal && selectedCampaign && <CampaignFormModal isEdit={true} />}

            {showDeleteModal && selectedCampaign && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Kampanye?</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus kampanye <strong>{selectedCampaign.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
