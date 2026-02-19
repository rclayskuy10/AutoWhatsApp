"use client";

import { useState } from "react";
import { type PaketData, packages as initialPackages } from "@/data/dummy/packages";

export default function PaketLanggananPage() {
    const [packageList, setPackageList] = useState<PaketData[]>(initialPackages);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState<PaketData | null>(null);

    // Form states
    const [formName, setFormName] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formPriceMonthly, setFormPriceMonthly] = useState("");
    const [formPriceYearly, setFormPriceYearly] = useState("");
    const [formDailyLimit, setFormDailyLimit] = useState("");
    const [formMonthlyLimit, setFormMonthlyLimit] = useState("");
    const [formDeviceCount, setFormDeviceCount] = useState("Unlimited Perangkat");
    const [formType, setFormType] = useState<"topup" | "subscription">("topup");
    const [formBadge, setFormBadge] = useState("");
    const [formIcon, setFormIcon] = useState("bolt");
    const [formIconColor, setFormIconColor] = useState("bg-yellow-100 text-yellow-600");
    const [formFeatures, setFormFeatures] = useState("");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Filter
    const filteredPackages = packageList.filter(pkg =>
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pkg.type || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const iconOptions = [
        { value: "bolt", label: "Bolt", color: "bg-yellow-100 text-yellow-600" },
        { value: "rocket_launch", label: "Rocket", color: "bg-blue-100 text-blue-600" },
        { value: "flash_on", label: "Flash", color: "bg-orange-100 text-orange-600" },
        { value: "diamond", label: "Diamond", color: "bg-purple-100 text-purple-600" },
        { value: "business_center", label: "Business", color: "bg-indigo-100 text-indigo-600" },
        { value: "apartment", label: "Apartment", color: "bg-gray-100 text-gray-600" },
        { value: "star", label: "Star", color: "bg-amber-100 text-amber-600" },
        { value: "workspace_premium", label: "Premium", color: "bg-pink-100 text-pink-600" },
    ];

    // Reset form
    const resetForm = () => {
        setFormName("");
        setFormDesc("");
        setFormPriceMonthly("");
        setFormPriceYearly("");
        setFormDailyLimit("");
        setFormMonthlyLimit("");
        setFormDeviceCount("Unlimited Perangkat");
        setFormType("topup");
        setFormBadge("");
        setFormIcon("bolt");
        setFormIconColor("bg-yellow-100 text-yellow-600");
        setFormFeatures("");
    };

    // CREATE
    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleAdd = () => {
        if (!formName.trim() || !formPriceMonthly.trim()) {
            showToast("Nama paket dan harga bulanan wajib diisi", "error");
            return;
        }
        const newPkg: PaketData = {
            name: formName.trim(),
            description: formDesc.trim(),
            icon: formIcon,
            iconColor: formIconColor,
            priceMonthly: formPriceMonthly.trim(),
            priceYearly: formPriceYearly.trim() || formPriceMonthly.trim(),
            dailyLimit: formDailyLimit.trim() || "500 Pesan",
            dailyLimitBadge: formDailyLimit.trim().toLowerCase() === "unlimited",
            monthlyLimit: formMonthlyLimit.trim() || "5.000 Total Pesan",
            monthlyLimitBadge: formMonthlyLimit.trim().toLowerCase() === "unlimited",
            deviceCount: formDeviceCount.trim(),
            deviceIcon: "smartphone",
            type: formType,
            badge: formBadge.trim() || undefined,
            features: formFeatures.trim() ? formFeatures.split("\n").map(f => f.trim()).filter(Boolean) : [],
        };
        setPackageList([...packageList, newPkg]);
        setShowAddModal(false);
        resetForm();
        showToast(`Paket "${newPkg.name}" berhasil ditambahkan`);
    };

    // EDIT
    const openEditModal = (pkg: PaketData) => {
        setSelectedPkg(pkg);
        setFormName(pkg.name);
        setFormDesc(pkg.description);
        setFormPriceMonthly(pkg.priceMonthly);
        setFormPriceYearly(pkg.priceYearly);
        setFormDailyLimit(pkg.dailyLimit);
        setFormMonthlyLimit(pkg.monthlyLimit);
        setFormDeviceCount(pkg.deviceCount);
        setFormType(pkg.type || "topup");
        setFormBadge(pkg.badge || "");
        setFormIcon(pkg.icon);
        setFormIconColor(pkg.iconColor);
        setFormFeatures(pkg.features ? pkg.features.join("\n") : "");
        setShowEditModal(true);
    };

    const handleEdit = () => {
        if (!selectedPkg || !formName.trim() || !formPriceMonthly.trim()) {
            showToast("Nama paket dan harga bulanan wajib diisi", "error");
            return;
        }
        setPackageList(packageList.map(pkg =>
            pkg === selectedPkg
                ? {
                    ...pkg,
                    name: formName.trim(),
                    description: formDesc.trim(),
                    icon: formIcon,
                    iconColor: formIconColor,
                    priceMonthly: formPriceMonthly.trim(),
                    priceYearly: formPriceYearly.trim() || formPriceMonthly.trim(),
                    dailyLimit: formDailyLimit.trim(),
                    dailyLimitBadge: formDailyLimit.trim().toLowerCase() === "unlimited",
                    monthlyLimit: formMonthlyLimit.trim(),
                    monthlyLimitBadge: formMonthlyLimit.trim().toLowerCase() === "unlimited",
                    deviceCount: formDeviceCount.trim(),
                    type: formType,
                    badge: formBadge.trim() || undefined,
                    features: formFeatures.trim() ? formFeatures.split("\n").map(f => f.trim()).filter(Boolean) : [],
                }
                : pkg
        ));
        setShowEditModal(false);
        setSelectedPkg(null);
        resetForm();
        showToast("Paket berhasil diperbarui");
    };

    // DELETE
    const openDeleteModal = (pkg: PaketData) => {
        setSelectedPkg(pkg);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (!selectedPkg) return;
        setPackageList(packageList.filter(pkg => pkg !== selectedPkg));
        setShowDeleteModal(false);
        showToast(`Paket "${selectedPkg.name}" berhasil dihapus`);
        setSelectedPkg(null);
    };

    // Shared form fields for Add/Edit modals
    const renderFormFields = () => (
        <div className="space-y-5">
            {/* Row 1: Name & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Paket <span className="text-red-500">*</span></label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Contoh: Pro Monthly"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipe Paket <span className="text-red-500">*</span></label>
                    <select
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        value={formType}
                        onChange={(e) => setFormType(e.target.value as "topup" | "subscription")}
                    >
                        <option value="topup">Top-up (Sekali Beli)</option>
                        <option value="subscription">Subscription (Langganan)</option>
                    </select>
                </div>
            </div>

            {/* Row 2: Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                <input
                    className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                    placeholder="Deskripsi singkat paket"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                />
            </div>

            {/* Row 3: Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Bulanan <span className="text-red-500">*</span></label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Rp 199.000"
                        value={formPriceMonthly}
                        onChange={(e) => setFormPriceMonthly(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga Tahunan</label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Rp 1.990.000"
                        value={formPriceYearly}
                        onChange={(e) => setFormPriceYearly(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 4: Limits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Limit Pesan/Hari</label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Contoh: 5.000 Pesan"
                        value={formDailyLimit}
                        onChange={(e) => setFormDailyLimit(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Limit Pesan/Bulan</label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Contoh: 150.000 Pesan"
                        value={formMonthlyLimit}
                        onChange={(e) => setFormMonthlyLimit(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 5: Device & Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah Perangkat</label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Unlimited Perangkat"
                        value={formDeviceCount}
                        onChange={(e) => setFormDeviceCount(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Badge / Label</label>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                        placeholder="Contoh: Paling Laku 🔥"
                        value={formBadge}
                        onChange={(e) => setFormBadge(e.target.value)}
                    />
                </div>
            </div>

            {/* Row 6: Icon picker */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ikon Paket</label>
                <div className="flex flex-wrap gap-2">
                    {iconOptions.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                setFormIcon(opt.value);
                                setFormIconColor(opt.color);
                            }}
                            className={`flex items-center gap-1.5 rounded-lg border-2 px-3 py-2 text-sm transition-all ${
                                formIcon === opt.value
                                    ? "border-wa-green bg-green-50 ring-1 ring-wa-green"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <div className={`h-7 w-7 rounded-md flex items-center justify-center ${opt.color}`}>
                                <span className="material-symbols-outlined text-[16px]">{opt.value}</span>
                            </div>
                            <span className="text-xs text-gray-600">{opt.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Row 7: Features */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Fitur (satu per baris)</label>
                <textarea
                    className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                    rows={4}
                    placeholder={"500 pesan/hari\nTotal 5.000 pesan\nUnlimited Perangkat"}
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-400">Tulis setiap fitur di baris baru</p>
            </div>
        </div>
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

            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Paket Langganan</h1>
                    <p className="mt-1 text-sm text-gray-500">Kelola jenis paket dan fitur yang tersedia untuk pengguna</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm shadow-wa-green/30"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Tambah Paket Baru
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green placeholder-gray-400"
                        placeholder="Cari nama paket, deskripsi, atau tipe..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Packages Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                            <tr>
                                <th className="px-6 py-4" scope="col">Nama Paket</th>
                                <th className="px-6 py-4" scope="col">Tipe</th>
                                <th className="px-6 py-4" scope="col">Harga Bulanan</th>
                                <th className="px-6 py-4" scope="col">Harga Tahunan</th>
                                <th className="px-6 py-4" scope="col">Limit Pesan/Hari</th>
                                <th className="px-6 py-4" scope="col">Limit Pesan/Bulan</th>
                                <th className="px-6 py-4" scope="col">Perangkat</th>
                                <th className="px-6 py-4" scope="col">Fitur</th>
                                <th className="px-6 py-4 text-right" scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {filteredPackages.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center">
                                        <span className="material-symbols-outlined text-gray-300 text-[48px] mb-3 block">inventory_2</span>
                                        <p className="text-sm font-medium text-gray-500">Tidak ada paket ditemukan</p>
                                        <p className="text-xs text-gray-400 mt-1">Coba ubah kata kunci pencarian</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPackages.map((pkg, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                        {/* Nama Paket */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${pkg.iconColor}`}>
                                                    <span className="material-symbols-outlined text-xl">{pkg.icon}</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{pkg.name}</div>
                                                    <div className="text-xs font-normal text-gray-400">{pkg.description}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Tipe */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                                pkg.type === "subscription"
                                                    ? "bg-purple-50 text-purple-700 ring-purple-700/10"
                                                    : "bg-blue-50 text-blue-700 ring-blue-700/10"
                                            }`}>
                                                {pkg.type === "subscription" ? "Langganan" : "Top-up"}
                                            </span>
                                            {pkg.badge && (
                                                <div className="text-[10px] text-gray-400 mt-1">{pkg.badge}</div>
                                            )}
                                        </td>

                                        {/* Harga Bulanan */}
                                        <td className="px-6 py-4 text-gray-900 font-medium">{pkg.priceMonthly}</td>

                                        {/* Harga Tahunan */}
                                        <td className="px-6 py-4 text-gray-900">{pkg.priceYearly}</td>

                                        {/* Limit Pesan/Hari */}
                                        <td className="px-6 py-4">
                                            {pkg.dailyLimitBadge ? (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{pkg.dailyLimit}</span>
                                            ) : pkg.dailyLimit}
                                        </td>

                                        {/* Limit Pesan/Bulan */}
                                        <td className="px-6 py-4">
                                            {pkg.monthlyLimitBadge ? (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{pkg.monthlyLimit}</span>
                                            ) : pkg.monthlyLimit}
                                        </td>

                                        {/* Perangkat */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[16px] text-gray-400">{pkg.deviceIcon}</span>
                                                <span>{pkg.deviceCount}</span>
                                            </div>
                                        </td>

                                        {/* Fitur */}
                                        <td className="px-6 py-4">
                                            {pkg.features && pkg.features.length > 0 ? (
                                                <div className="relative group/tooltip">
                                                    <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                                                        <span className="material-symbols-outlined text-[18px]">info</span>
                                                        {pkg.features.length} fitur
                                                    </button>
                                                    <div className="absolute left-0 top-full mt-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50">
                                                        <div className="space-y-1.5">
                                                            {pkg.features.map((feature, idx) => (
                                                                <div key={idx} className="flex items-start gap-2">
                                                                    <span className="text-green-400">✓</span>
                                                                    <span>{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm">-</span>
                                            )}
                                        </td>

                                        {/* Aksi */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEditModal(pkg)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-wa-green hover:bg-green-50 transition-colors"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(pkg)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
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
                        Menampilkan <span className="font-bold text-gray-900">{filteredPackages.length}</span> dari <span className="font-bold text-gray-900">{packageList.length}</span> paket
                    </p>
                </div>
            </div>

            {/* ===== ADD MODAL ===== */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-wa-green">
                                    <span className="material-symbols-outlined text-[20px]">add_box</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Tambah Paket Baru</h3>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {renderFormFields()}
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button onClick={handleAdd} className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Simpan Paket
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== EDIT MODAL ===== */}
            {showEditModal && selectedPkg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Edit Paket</h3>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {renderFormFields()}
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button onClick={handleEdit} className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== DELETE MODAL ===== */}
            {showDeleteModal && selectedPkg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
                                <span className="material-symbols-outlined text-red-600 text-[28px]">delete_forever</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Paket</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus paket <strong className="text-gray-900">{selectedPkg.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
