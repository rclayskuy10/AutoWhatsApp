"use client";

import { useState } from "react";
import { type Template, initialTemplates, categoryOptions } from "@/data/dummy/templates";
import { formatDate, ITEMS_PER_PAGE } from "@/data/helpers";

export default function TemplatPage() {
    const [templates, setTemplates] = useState<Template[]>(initialTemplates);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    // Form states
    const [formName, setFormName] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [formCategory, setFormCategory] = useState("Promosi");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Select
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const filteredTemplates = templates.filter((tpl) => {
        const matchSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tpl.message.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = filterCategory === "all" || tpl.category === filterCategory;
        return matchSearch && matchCategory;
    });

    const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
    const paginatedTemplates = filteredTemplates.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const resetForm = () => {
        setFormName("");
        setFormMessage("");
        setFormCategory("Promosi");
    };

    // CREATE
    const openAddModal = () => { resetForm(); setShowAddModal(true); };
    const handleAdd = () => {
        if (!formName.trim() || !formMessage.trim()) return;
        const catOpt = categoryOptions.find(c => c.label === formCategory);
        const newTemplate: Template = {
            id: Date.now(),
            name: formName.trim(),
            message: formMessage.trim(),
            category: formCategory,
            categoryColor: catOpt?.color || "bg-gray-100 text-gray-800",
            lastModified: formatDate(),
        };
        setTemplates([newTemplate, ...templates]);
        setShowAddModal(false);
        resetForm();
        showToast("Templat berhasil ditambahkan");
    };

    // EDIT
    const openEditModal = (tpl: Template) => {
        setSelectedTemplate(tpl);
        setFormName(tpl.name);
        setFormMessage(tpl.message);
        setFormCategory(tpl.category);
        setShowEditModal(true);
    };
    const handleEdit = () => {
        if (!selectedTemplate || !formName.trim() || !formMessage.trim()) return;
        const catOpt = categoryOptions.find(c => c.label === formCategory);
        setTemplates(templates.map(t =>
            t.id === selectedTemplate.id
                ? { ...t, name: formName.trim(), message: formMessage.trim(), category: formCategory, categoryColor: catOpt?.color || t.categoryColor, lastModified: formatDate() }
                : t
        ));
        setShowEditModal(false);
        setSelectedTemplate(null);
        resetForm();
        showToast("Templat berhasil diperbarui");
    };

    // DELETE
    const openDeleteModal = (tpl: Template) => { setSelectedTemplate(tpl); setShowDeleteModal(true); };
    const handleDelete = () => {
        if (!selectedTemplate) return;
        setTemplates(templates.filter(t => t.id !== selectedTemplate.id));
        setSelectedIds(selectedIds.filter(id => id !== selectedTemplate.id));
        setShowDeleteModal(false);
        setSelectedTemplate(null);
        showToast("Templat berhasil dihapus");
        if (paginatedTemplates.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // BULK DELETE
    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        setTemplates(templates.filter(t => !selectedIds.includes(t.id)));
        showToast(`${selectedIds.length} templat berhasil dihapus`);
        setSelectedIds([]);
    };

    // SELECT
    const toggleSelect = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const toggleSelectAll = () => {
        const pageIds = paginatedTemplates.map(t => t.id);
        const allSelected = pageIds.every(id => selectedIds.includes(id));
        if (allSelected) setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
        else setSelectedIds(prev => [...new Set([...prev, ...pageIds])]);
    };

    const TemplateFormModal = ({ isEdit }: { isEdit: boolean }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                        {isEdit ? "Edit Templat" : "Tambah Templat Baru"}
                    </h3>
                    <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Templat *</label>
                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            placeholder="Contoh: Promo Flash Sale"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                        >
                            {categoryOptions.map(c => (
                                <option key={c.label} value={c.label}>{c.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pesan *</label>
                        <textarea
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            rows={5}
                            placeholder="Gunakan {{1}}, {{2}} untuk variabel dinamis..."
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                        />
                        <p className="mt-1 text-xs text-gray-400">Gunakan {"{{1}}"}, {"{{2}}"} dst. untuk variabel dinamis.</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Batal
                    </button>
                    <button
                        onClick={isEdit ? handleEdit : handleAdd}
                        disabled={!formName.trim() || !formMessage.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEdit ? "Simpan Perubahan" : "Tambah Templat"}
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

            {/* Title + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Templat</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola templat pesan WhatsApp Anda</p>
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
                        Tambah Templat
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
                        placeholder="Cari nama templat atau isi pesan..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Kategori:</label>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wa-green focus:border-wa-green sm:text-sm rounded-lg"
                        value={filterCategory}
                        onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="all">Semua Kategori</option>
                        {categoryOptions.map(c => (
                            <option key={c.label} value={c.label}>{c.label}</option>
                        ))}
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
                                        checked={paginatedTemplates.length > 0 && paginatedTemplates.every(t => selectedIds.includes(t.id))}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Nama Templat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3" scope="col">Isi Pesan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Terakhir Diubah</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedTemplates.map((tpl) => (
                                <tr key={tpl.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input className="rounded border-gray-300 text-wa-green focus:ring-wa-green h-4 w-4" type="checkbox"
                                            checked={selectedIds.includes(tpl.id)}
                                            onChange={() => toggleSelect(tpl.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{tpl.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 truncate max-w-xs">{tpl.message}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tpl.categoryColor}`}>{tpl.category}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tpl.lastModified}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openEditModal(tpl)} className="text-gray-400 hover:text-wa-green mx-2" title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button onClick={() => openDeleteModal(tpl)} className="text-gray-400 hover:text-red-600 mx-2" title="Hapus">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">description</span>
                        <p className="text-gray-500 text-sm">Tidak ada templat ditemukan.</p>
                    </div>
                )}

                {filteredTemplates.length > 0 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-700">
                                Menampilkan <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> sampai{" "}
                                <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTemplates.length)}</span> dari{" "}
                                <span className="font-medium">{filteredTemplates.length}</span> hasil
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

            {showAddModal && <TemplateFormModal isEdit={false} />}
            {showEditModal && selectedTemplate && <TemplateFormModal isEdit={true} />}

            {showDeleteModal && selectedTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Templat?</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus templat <strong>{selectedTemplate.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
