"use client";

import { useState } from "react";
import { type Contact, initialContacts, groupOptions, initialsColors } from "@/data/dummy/contacts";
import { getInitials, ITEMS_PER_PAGE } from "@/data/helpers";

export default function KontakPage() {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterGroup, setFilterGroup] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // Form states
    const [formName, setFormName] = useState("");
    const [formCompany, setFormCompany] = useState("");
    const [formPhone, setFormPhone] = useState("");
    const [formGroup, setFormGroup] = useState("Umum");
    const [formStatus, setFormStatus] = useState<"Aktif" | "Non-aktif">("Aktif");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Select all
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const filteredContacts = contacts.filter((contact) => {
        const matchSearch =
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.phone.includes(searchQuery) ||
            contact.group.toLowerCase().includes(searchQuery.toLowerCase());
        const matchGroup = filterGroup === "all" || contact.group === filterGroup;
        return matchSearch && matchGroup;
    });

    // Pagination
    const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const resetForm = () => {
        setFormName("");
        setFormCompany("");
        setFormPhone("");
        setFormGroup("Umum");
        setFormStatus("Aktif");
    };

    // CREATE
    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleAdd = () => {
        if (!formName.trim() || !formPhone.trim()) return;
        const groupOpt = groupOptions.find(g => g.label === formGroup);
        const newContact: Contact = {
            id: Date.now(),
            name: formName.trim(),
            company: formCompany.trim(),
            phone: formPhone.trim(),
            group: formGroup,
            groupColor: groupOpt?.color || "bg-gray-100 text-gray-800",
            status: formStatus,
            initials: getInitials(formName),
            initialsColor: initialsColors[Math.floor(Math.random() * initialsColors.length)],
        };
        setContacts([...contacts, newContact]);
        setShowAddModal(false);
        resetForm();
        showToast("Kontak berhasil ditambahkan");
    };

    // EDIT
    const openEditModal = (contact: Contact) => {
        setSelectedContact(contact);
        setFormName(contact.name);
        setFormCompany(contact.company);
        setFormPhone(contact.phone);
        setFormGroup(contact.group);
        setFormStatus(contact.status);
        setShowEditModal(true);
    };

    const handleEdit = () => {
        if (!selectedContact || !formName.trim() || !formPhone.trim()) return;
        const groupOpt = groupOptions.find(g => g.label === formGroup);
        setContacts(contacts.map(c =>
            c.id === selectedContact.id
                ? {
                    ...c,
                    name: formName.trim(),
                    company: formCompany.trim(),
                    phone: formPhone.trim(),
                    group: formGroup,
                    groupColor: groupOpt?.color || c.groupColor,
                    status: formStatus,
                    initials: getInitials(formName),
                }
                : c
        ));
        setShowEditModal(false);
        setSelectedContact(null);
        resetForm();
        showToast("Kontak berhasil diperbarui");
    };

    // DELETE
    const openDeleteModal = (contact: Contact) => {
        setSelectedContact(contact);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (!selectedContact) return;
        setContacts(contacts.filter(c => c.id !== selectedContact.id));
        setSelectedIds(selectedIds.filter(id => id !== selectedContact.id));
        setShowDeleteModal(false);
        setSelectedContact(null);
        showToast("Kontak berhasil dihapus");
        // Fix page if now empty
        if (paginatedContacts.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // BULK DELETE
    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        setContacts(contacts.filter(c => !selectedIds.includes(c.id)));
        showToast(`${selectedIds.length} kontak berhasil dihapus`);
        setSelectedIds([]);
    };

    // SELECT
    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        const pageIds = paginatedContacts.map(c => c.id);
        const allSelected = pageIds.every(id => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
        } else {
            setSelectedIds(prev => [...new Set([...prev, ...pageIds])]);
        }
    };

    const ContactFormModal = ({ isEdit }: { isEdit: boolean }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">
                        {isEdit ? "Edit Kontak" : "Tambah Kontak Baru"}
                    </h3>
                    <button onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            placeholder="Contoh: Andi Darmawan"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            placeholder="Contoh: PT. Maju Mundur"
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp *</label>
                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                            placeholder="Contoh: +62 812-3456-7890"
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grup</label>
                            <select
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                value={formGroup}
                                onChange={(e) => setFormGroup(e.target.value)}
                            >
                                {groupOptions.map(g => (
                                    <option key={g.label} value={g.label}>{g.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                value={formStatus}
                                onChange={(e) => setFormStatus(e.target.value as "Aktif" | "Non-aktif")}
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Non-aktif">Non-aktif</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={isEdit ? handleEdit : handleAdd}
                        disabled={!formName.trim() || !formPhone.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isEdit ? "Simpan Perubahan" : "Tambah Kontak"}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">
                        {toast.type === "success" ? "check_circle" : "error"}
                    </span>
                    {toast.message}
                </div>
            )}

            {/* Title + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kontak</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola daftar kontak WhatsApp Anda</p>
                </div>
                <div className="flex items-center gap-3">
                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleBulkDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                            Hapus ({selectedIds.length})
                        </button>
                    )}
                    <button
                        onClick={openAddModal}
                        className="bg-wa-green hover:bg-wa-dark text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                        Tambah Kontak
                    </button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-wa-green focus:ring-wa-green sm:text-sm"
                        placeholder="Cari nama, nomor, atau tag..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Grup:</label>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wa-green focus:border-wa-green sm:text-sm rounded-lg"
                        value={filterGroup}
                        onChange={(e) => { setFilterGroup(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="all">Semua Grup</option>
                        {groupOptions.map(g => (
                            <option key={g.label} value={g.label}>{g.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Contact Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left" scope="col">
                                    <input
                                        className="rounded border-gray-300 text-wa-green focus:ring-wa-green h-4 w-4"
                                        type="checkbox"
                                        checked={paginatedContacts.length > 0 && paginatedContacts.every(c => selectedIds.includes(c.id))}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Nomor WhatsApp</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Grup/Tag</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedContacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            className="rounded border-gray-300 text-wa-green focus:ring-wa-green h-4 w-4"
                                            type="checkbox"
                                            checked={selectedIds.includes(contact.id)}
                                            onChange={() => toggleSelect(contact.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${contact.initialsColor}`}>
                                                    {contact.initials}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                                {contact.company && (
                                                    <div className="text-sm text-gray-500">{contact.company}</div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contact.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.groupColor}`}>
                                            {contact.group}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contact.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                            {contact.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openEditModal(contact)} className="text-gray-400 hover:text-wa-green mx-2" title="Edit">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button onClick={() => openDeleteModal(contact)} className="text-gray-400 hover:text-red-600 mx-2" title="Hapus">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredContacts.length === 0 && (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">contacts</span>
                        <p className="text-gray-500 text-sm">Tidak ada kontak ditemukan.</p>
                    </div>
                )}

                {/* Pagination */}
                {filteredContacts.length > 0 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Menampilkan{" "}
                                    <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> sampai{" "}
                                    <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)}</span> dari{" "}
                                    <span className="font-medium">{filteredContacts.length}</span> hasil
                                </p>
                            </div>
                            <div>
                                <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                ? "z-10 bg-green-50 border-wa-green text-wa-dark"
                                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {showAddModal && <ContactFormModal isEdit={false} />}

            {/* Edit Modal */}
            {showEditModal && selectedContact && <ContactFormModal isEdit={true} />}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Kontak?</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus kontak <strong>{selectedContact.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
