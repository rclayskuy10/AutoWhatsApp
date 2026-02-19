"use client";

import { useState } from "react";
import { type Device, initialDevices } from "@/data/dummy/devices";

export default function PerangkatPage() {
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    // Form states
    const [formName, setFormName] = useState("");
    const [formPhone, setFormPhone] = useState("");

    // Toast state
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const filteredDevices = devices.filter((device) => {
        const matchSearch =
            device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            device.phone.includes(searchQuery);
        const matchStatus =
            filterStatus === "all" ||
            (filterStatus === "connected" && device.status === "connected") ||
            (filterStatus === "disconnected" && device.status === "disconnected");
        return matchSearch && matchStatus;
    });

    // CREATE
    const handleAdd = () => {
        if (!formName.trim() || !formPhone.trim()) return;
        const newDevice: Device = {
            id: Date.now(),
            name: formName.trim(),
            phone: formPhone.trim(),
            status: "disconnected",
            battery: "--%",
            batteryIcon: "battery_unknown",
            lastSync: "Sinkronisasi: Belum pernah",
        };
        setDevices([...devices, newDevice]);
        setFormName("");
        setFormPhone("");
        setShowAddModal(false);
        showToast("Perangkat berhasil ditambahkan");
    };

    // EDIT
    const openEditModal = (device: Device) => {
        setSelectedDevice(device);
        setFormName(device.name);
        setFormPhone(device.phone);
        setShowEditModal(true);
    };

    const handleEdit = () => {
        if (!selectedDevice || !formName.trim() || !formPhone.trim()) return;
        setDevices(devices.map(d =>
            d.id === selectedDevice.id
                ? { ...d, name: formName.trim(), phone: formPhone.trim() }
                : d
        ));
        setShowEditModal(false);
        setSelectedDevice(null);
        setFormName("");
        setFormPhone("");
        showToast("Perangkat berhasil diperbarui");
    };

    // DELETE
    const openDeleteModal = (device: Device) => {
        setSelectedDevice(device);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (!selectedDevice) return;
        setDevices(devices.filter(d => d.id !== selectedDevice.id));
        setShowDeleteModal(false);
        setSelectedDevice(null);
        showToast("Perangkat berhasil dihapus");
    };

    const openAddModal = () => {
        setFormName("");
        setFormPhone("");
        setShowAddModal(true);
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-in slide-in-from-right ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">
                        {toast.type === "success" ? "check_circle" : "error"}
                    </span>
                    {toast.message}
                </div>
            )}

            {/* Title + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Perangkat</h1>
                    <p className="text-sm text-gray-500 mt-1">Kelola perangkat WhatsApp yang terhubung</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-wa-green hover:bg-wa-dark text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Tambah Perangkat
                </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-wa-green focus:ring-wa-green sm:text-sm"
                        placeholder="Cari nama perangkat atau nomor..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Status:</label>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wa-green focus:border-wa-green sm:text-sm rounded-lg"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Semua Status</option>
                        <option value="connected">Terhubung</option>
                        <option value="disconnected">Terputus</option>
                    </select>
                </div>
            </div>

            {/* Device Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredDevices.map((device) => (
                    <div
                        key={device.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${device.status === "connected" ? "bg-green-50" : "bg-gray-100"}`}>
                                    <span className={`material-symbols-outlined text-2xl ${device.status === "connected" ? "text-wa-green" : "text-gray-500"}`}>
                                        {device.status === "connected" ? "smartphone" : "phonelink_off"}
                                    </span>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${device.status === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${device.status === "connected" ? "bg-green-500" : "bg-red-500"}`}></span>
                                    {device.status === "connected" ? "Terhubung" : "Terputus"}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 truncate">{device.name}</h3>
                            <p className="text-sm text-gray-500 mb-6">{device.phone}</p>
                            <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">{device.batteryIcon}</span>
                                    {device.battery}
                                </span>
                                <span>{device.lastSync}</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end gap-2">
                            <button
                                onClick={() => openEditModal(device)}
                                className="text-gray-600 hover:text-wa-dark p-2 rounded-lg hover:bg-white transition-colors"
                                title="Edit"
                            >
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            {device.status === "connected" ? (
                                <button className="text-gray-600 hover:text-wa-dark p-2 rounded-lg hover:bg-white transition-colors" title="QR Code">
                                    <span className="material-symbols-outlined text-[20px]">qr_code</span>
                                </button>
                            ) : (
                                <button className="bg-wa-green hover:bg-wa-dark text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm">
                                    Scan Ulang
                                </button>
                            )}
                            <button
                                onClick={() => openDeleteModal(device)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 text-sm font-medium"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Device Card */}
                <div
                    onClick={openAddModal}
                    className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 min-h-[240px] hover:border-wa-green hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-wa-green text-3xl">add</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Tambah Perangkat Baru</h3>
                    <p className="text-sm text-gray-500 text-center mt-2 px-4">
                        Scan kode QR untuk menghubungkan nomor WhatsApp baru.
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {filteredDevices.length === 0 && (
                <div className="text-center py-12">
                    <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">devices</span>
                    <p className="text-gray-500 text-sm">Tidak ada perangkat ditemukan.</p>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Tambah Perangkat Baru</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perangkat</label>
                                <input
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    placeholder="Contoh: Sales WA 01"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                                <input
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    placeholder="Contoh: +62 812-3456-7890"
                                    value={formPhone}
                                    onChange={(e) => setFormPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button
                                onClick={handleAdd}
                                disabled={!formName.trim() || !formPhone.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Tambah Perangkat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedDevice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Edit Perangkat</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Perangkat</label>
                                <input
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                                <input
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    value={formPhone}
                                    onChange={(e) => setFormPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button
                                onClick={handleEdit}
                                disabled={!formName.trim() || !formPhone.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedDevice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Perangkat?</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus perangkat <strong>{selectedDevice.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
