"use client";

import { useState, useMemo } from "react";
import { type UserData, users as initialUsers } from "@/data/dummy/users";

const roleColorMap: Record<string, string> = {
    "Super Admin": "bg-purple-50 text-purple-700 ring-purple-700/10",
    User: "bg-blue-50 text-blue-700 ring-blue-700/10",
};

const statusColorMap: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    inactive: "bg-gray-100 text-gray-500 ring-gray-500/10",
};

const initialsColorPool = [
    "bg-wa-green/10 text-wa-green",
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-yellow-100 text-yellow-600",
    "bg-orange-100 text-orange-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-teal-100 text-teal-600",
];

const ITEMS_PER_PAGE = 5;

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function generateId(): string {
    return `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function ManajemenUserPage() {
    const [userList, setUserList] = useState<UserData[]>(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("Semua");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    // Bulk selection
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Form states
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formUsername, setFormUsername] = useState("");
    const [formRole, setFormRole] = useState("User");
    const [formPassword, setFormPassword] = useState("");
    const [formStatus, setFormStatus] = useState<"active" | "inactive">("active");

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Filtered users
    const filteredUsers = useMemo(() => {
        return userList.filter((u) => {
            const matchesSearch =
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === "Semua" || u.role === roleFilter;
            const matchesStatus = statusFilter === "Semua" || u.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [userList, searchQuery, roleFilter, statusFilter]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedUsers = filteredUsers.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    );

    // Reset page when filters change
    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };
    const handleRoleFilterChange = (val: string) => {
        setRoleFilter(val);
        setCurrentPage(1);
    };
    const handleStatusFilterChange = (val: string) => {
        setStatusFilter(val);
        setCurrentPage(1);
    };

    // Bulk selection helpers
    const allPageSelected =
        paginatedUsers.length > 0 &&
        paginatedUsers.every((u) => selectedIds.has(u.id));

    const toggleSelectAll = () => {
        const newSet = new Set(selectedIds);
        if (allPageSelected) {
            paginatedUsers.forEach((u) => newSet.delete(u.id));
        } else {
            paginatedUsers.forEach((u) => newSet.add(u.id));
        }
        setSelectedIds(newSet);
    };

    const toggleSelectOne = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    // Reset form
    const resetForm = () => {
        setFormName("");
        setFormEmail("");
        setFormUsername("");
        setFormRole("User");
        setFormPassword("");
        setFormStatus("active");
    };

    // ===== CREATE =====
    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleAdd = () => {
        if (!formName.trim() || !formEmail.trim() || !formUsername.trim() || !formPassword.trim()) {
            showToast("Semua field wajib diisi", "error");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formEmail.trim())) {
            showToast("Format email tidak valid", "error");
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(formUsername.trim().replace("@", ""))) {
            showToast("Username hanya boleh huruf, angka, dan underscore", "error");
            return;
        }
        if (formPassword.length < 8) {
            showToast("Kata sandi minimal 8 karakter", "error");
            return;
        }
        const emailExists = userList.some(
            (u) => u.email.toLowerCase() === formEmail.trim().toLowerCase()
        );
        if (emailExists) {
            showToast("Email sudah digunakan", "error");
            return;
        }
        const usernameClean = formUsername.trim().replace("@", "");
        const usernameExists = userList.some(
            (u) => u.username === `@${usernameClean}`
        );
        if (usernameExists) {
            showToast("Username sudah digunakan", "error");
            return;
        }

        const newUser: UserData = {
            id: generateId(),
            name: formName.trim(),
            role: formRole,
            roleColor: roleColorMap[formRole] || roleColorMap.User,
            email: formEmail.trim(),
            username: `@${usernameClean}`,
            initials: getInitials(formName),
            initialsColor: initialsColorPool[userList.length % initialsColorPool.length],
            status: formStatus,
            createdAt: new Date().toISOString().split("T")[0],
            lastLogin: "-",
        };
        setUserList([...userList, newUser]);
        setShowAddModal(false);
        resetForm();
        showToast(`User "${newUser.name}" berhasil ditambahkan`);
    };

    // ===== READ (Detail) =====
    const openDetailModal = (user: UserData) => {
        setSelectedUser(user);
        setShowDetailModal(true);
    };

    // ===== UPDATE =====
    const openEditModal = (user: UserData) => {
        setSelectedUser(user);
        setFormName(user.name);
        setFormEmail(user.email);
        setFormUsername(user.username.replace("@", ""));
        setFormRole(user.role);
        setFormStatus(user.status);
        setFormPassword("");
        setShowEditModal(true);
    };

    const handleEdit = () => {
        if (!selectedUser || !formName.trim() || !formEmail.trim() || !formUsername.trim()) {
            showToast("Nama, email, dan username wajib diisi", "error");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formEmail.trim())) {
            showToast("Format email tidak valid", "error");
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(formUsername.trim().replace("@", ""))) {
            showToast("Username hanya boleh huruf, angka, dan underscore", "error");
            return;
        }
        if (formPassword && formPassword.length < 8) {
            showToast("Kata sandi minimal 8 karakter", "error");
            return;
        }
        const emailExists = userList.some(
            (u) => u.id !== selectedUser.id && u.email.toLowerCase() === formEmail.trim().toLowerCase()
        );
        if (emailExists) {
            showToast("Email sudah digunakan oleh user lain", "error");
            return;
        }
        const usernameClean = formUsername.trim().replace("@", "");
        const usernameExists = userList.some(
            (u) => u.id !== selectedUser.id && u.username === `@${usernameClean}`
        );
        if (usernameExists) {
            showToast("Username sudah digunakan oleh user lain", "error");
            return;
        }

        setUserList(
            userList.map((u) =>
                u.id === selectedUser.id
                    ? {
                          ...u,
                          name: formName.trim(),
                          email: formEmail.trim(),
                          username: `@${usernameClean}`,
                          role: formRole,
                          roleColor: roleColorMap[formRole] || roleColorMap.User,
                          initials: getInitials(formName),
                          status: formStatus,
                      }
                    : u
            )
        );
        setShowEditModal(false);
        setSelectedUser(null);
        resetForm();
        showToast("User berhasil diperbarui");
    };

    // ===== TOGGLE STATUS =====
    const handleToggleStatus = (user: UserData) => {
        const newStatus = user.status === "active" ? "inactive" : "active";
        setUserList(
            userList.map((u) =>
                u.id === user.id ? { ...u, status: newStatus } : u
            )
        );
        showToast(
            `User "${user.name}" ${newStatus === "active" ? "diaktifkan" : "dinonaktifkan"}`
        );
    };

    // ===== DELETE =====
    const openDeleteModal = (user: UserData) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (!selectedUser) return;
        if (selectedUser.role === "Super Admin") {
            showToast("Super Admin tidak dapat dihapus", "error");
            setShowDeleteModal(false);
            setSelectedUser(null);
            return;
        }
        setUserList(userList.filter((u) => u.id !== selectedUser.id));
        const newSelectedIds = new Set(selectedIds);
        newSelectedIds.delete(selectedUser.id);
        setSelectedIds(newSelectedIds);
        setShowDeleteModal(false);
        showToast(`User "${selectedUser.name}" berhasil dihapus`);
        setSelectedUser(null);
    };

    // ===== BULK DELETE =====
    const openBulkDeleteModal = () => {
        if (selectedIds.size === 0) {
            showToast("Pilih minimal 1 user untuk dihapus", "error");
            return;
        }
        const hasSuperAdmin = userList.some(
            (u) => selectedIds.has(u.id) && u.role === "Super Admin"
        );
        if (hasSuperAdmin) {
            showToast("Super Admin tidak dapat dihapus", "error");
            return;
        }
        setShowBulkDeleteModal(true);
    };

    const handleBulkDelete = () => {
        const count = selectedIds.size;
        setUserList(userList.filter((u) => !selectedIds.has(u.id)));
        setSelectedIds(new Set());
        setShowBulkDeleteModal(false);
        showToast(`${count} user berhasil dihapus`);
    };

    // ===== EXPORT PDF =====
    const handleExport = () => {
        if (filteredUsers.length === 0) {
            showToast("Tidak ada data untuk diexport", "error");
            return;
        }
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            showToast("Pop-up diblokir. Izinkan pop-up untuk export PDF.", "error");
            return;
        }
        const rows = filteredUsers.map((u) => `
            <tr>
                <td style="border:1px solid #ddd;padding:8px;">${u.name}</td>
                <td style="border:1px solid #ddd;padding:8px;">${u.role}</td>
                <td style="border:1px solid #ddd;padding:8px;">${u.email}</td>
                <td style="border:1px solid #ddd;padding:8px;">${u.username}</td>
                <td style="border:1px solid #ddd;padding:8px;">${u.status === "active" ? "Aktif" : "Nonaktif"}</td>
                <td style="border:1px solid #ddd;padding:8px;">${u.createdAt}</td>
                <td style="border:1px solid #ddd;padding:8px;">${u.lastLogin}</td>
            </tr>
        `).join("");
        printWindow.document.write(`
            <html><head><title>Manajemen User - Export</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { font-size: 18px; margin-bottom: 4px; }
                p { font-size: 12px; color: #666; margin-bottom: 16px; }
                table { width: 100%; border-collapse: collapse; font-size: 12px; }
                th { border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left; font-weight: bold; }
                @media print { body { padding: 0; } }
            </style></head><body>
            <h1>Data Manajemen User</h1>
            <p>Tanggal export: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} | Total: ${filteredUsers.length} user</p>
            <table>
                <thead><tr>
                    <th>Nama</th><th>Role</th><th>Email</th><th>Username</th><th>Status</th><th>Dibuat</th><th>Login Terakhir</th>
                </tr></thead>
                <tbody>${rows}</tbody>
            </table>
            </body></html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 250);
        showToast(`${filteredUsers.length} user berhasil diexport ke PDF`);
    };

    // Pagination helpers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const pageNumbers = useMemo(() => {
        const pages: (number | "...")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (safePage > 3) pages.push("...");
            for (
                let i = Math.max(2, safePage - 1);
                i <= Math.min(totalPages - 1, safePage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (safePage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    }, [safePage, totalPages]);

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div
                    className={`fixed top-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
                        toast.type === "success" ? "bg-wa-green" : "bg-red-500"
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        {toast.type === "success" ? "check_circle" : "error"}
                    </span>
                    {toast.message}
                </div>
            )}

            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen User</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola pengguna sistem, peran, dan kredensial
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {selectedIds.size > 0 && (
                        <button
                            onClick={openBulkDeleteModal}
                            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                            Hapus ({selectedIds.size})
                        </button>
                    )}
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white transition-all hover:bg-wa-dark shadow-sm shadow-wa-green/30"
                    >
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        Tambah User Baru
                    </button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        className="w-full rounded-lg border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm focus:border-wa-green focus:ring-wa-green placeholder-gray-400"
                        placeholder="Cari nama, email, username, atau role..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <select
                    className="rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-600 shadow-sm focus:border-wa-green focus:ring-wa-green"
                    value={roleFilter}
                    onChange={(e) => handleRoleFilterChange(e.target.value)}
                >
                    <option value="Semua">Semua Role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="User">User</option>
                </select>
                <select
                    className="rounded-lg border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-600 shadow-sm focus:border-wa-green focus:ring-wa-green"
                    value={statusFilter}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                >
                    <option value="Semua">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                </select>
                <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export
                </button>
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                            <tr>
                                <th className="px-4 py-4" scope="col">
                                    <input
                                        type="checkbox"
                                        checked={allPageSelected}
                                        onChange={toggleSelectAll}
                                        className="h-4 w-4 rounded border-gray-300 text-wa-green focus:ring-wa-green cursor-pointer"
                                    />
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    Nama User
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    Role
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    Email
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    Username
                                </th>
                                <th className="px-6 py-4" scope="col">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right" scope="col">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <span className="material-symbols-outlined text-gray-300 text-[48px] mb-3 block">
                                            person_off
                                        </span>
                                        <p className="text-sm font-medium text-gray-500">
                                            Tidak ada user ditemukan
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Coba ubah kata kunci pencarian atau filter
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`hover:bg-gray-50 transition-colors ${
                                            selectedIds.has(user.id) ? "bg-green-50/40" : ""
                                        }`}
                                    >
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.has(user.id)}
                                                onChange={() => toggleSelectOne(user.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-wa-green focus:ring-wa-green cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${user.initialsColor}`}
                                                >
                                                    {user.initials}
                                                </div>
                                                <span className="font-bold">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.roleColor}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer transition-colors ${statusColorMap[user.status]}`}
                                                title={`Klik untuk ${user.status === "active" ? "nonaktifkan" : "aktifkan"}`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        user.status === "active"
                                                            ? "bg-emerald-500"
                                                            : "bg-gray-400"
                                                    }`}
                                                />
                                                {user.status === "active" ? "Aktif" : "Nonaktif"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openDetailModal(user)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        visibility
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-wa-green hover:bg-green-50 transition-colors"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        edit
                                                    </span>
                                                </button>
                                                {user.role !== "Super Admin" && (
                                                    <button
                                                        onClick={() => openDeleteModal(user)}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            delete
                                                        </span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-400">
                        Menampilkan{" "}
                        <span className="font-bold text-gray-900">
                            {filteredUsers.length === 0
                                ? 0
                                : (safePage - 1) * ITEMS_PER_PAGE + 1}
                            –
                            {Math.min(safePage * ITEMS_PER_PAGE, filteredUsers.length)}
                        </span>{" "}
                        dari{" "}
                        <span className="font-bold text-gray-900">{filteredUsers.length}</span>{" "}
                        pengguna
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => goToPage(safePage - 1)}
                                disabled={safePage <= 1}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Halaman Sebelumnya"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    chevron_left
                                </span>
                            </button>
                            {pageNumbers.map((p, idx) =>
                                p === "..." ? (
                                    <span
                                        key={`ellipsis-${idx}`}
                                        className="px-2 text-xs text-gray-400"
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => goToPage(p as number)}
                                        className={`min-w-[32px] h-8 rounded-lg text-xs font-medium transition-colors ${
                                            safePage === p
                                                ? "bg-wa-green text-white shadow-sm"
                                                : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}
                            <button
                                onClick={() => goToPage(safePage + 1)}
                                disabled={safePage >= totalPages}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Halaman Berikutnya"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== ADD MODAL ===== */}
            {showAddModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowAddModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-wa-green">
                                    <span className="material-symbols-outlined text-[20px]">
                                        person_add
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Tambah User Baru</h3>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        placeholder="Masukkan nama lengkap"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        value={formRole}
                                        onChange={(e) => setFormRole(e.target.value)}
                                    >
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        placeholder="contoh@autowhatsapp.web.id"
                                        type="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
                                            @
                                        </span>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 pl-7 pr-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                            placeholder="username"
                                            value={formUsername}
                                            onChange={(e) => setFormUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        value={formStatus}
                                        onChange={(e) =>
                                            setFormStatus(e.target.value as "active" | "inactive")
                                        }
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Nonaktif</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Kata Sandi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        placeholder="Minimal 8 karakter"
                                        type="password"
                                        value={formPassword}
                                        onChange={(e) => setFormPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark flex items-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Simpan User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== DETAIL MODAL ===== */}
            {showDetailModal && selectedUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => { setShowDetailModal(false); setSelectedUser(null); }}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-[20px]">
                                        person
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Detail User</h3>
                            </div>
                            <button
                                onClick={() => { setShowDetailModal(false); setSelectedUser(null); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            {/* User avatar & name */}
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className={`h-16 w-16 rounded-full flex items-center justify-center text-lg font-bold ${selectedUser.initialsColor}`}
                                >
                                    {selectedUser.initials}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                        {selectedUser.name}
                                    </h4>
                                    <span
                                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectedUser.roleColor}`}
                                    >
                                        {selectedUser.role}
                                    </span>
                                </div>
                            </div>
                            {/* Info grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400 mb-1">Email</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedUser.email}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400 mb-1">
                                        Username
                                    </p>
                                    <p className="text-sm font-mono font-medium text-gray-900">
                                        {selectedUser.username}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400 mb-1">Status</p>
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColorMap[selectedUser.status]}`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                selectedUser.status === "active"
                                                    ? "bg-emerald-500"
                                                    : "bg-gray-400"
                                            }`}
                                        />
                                        {selectedUser.status === "active" ? "Aktif" : "Nonaktif"}
                                    </span>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400 mb-1">ID</p>
                                    <p className="text-sm font-mono font-medium text-gray-900">
                                        {selectedUser.id}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400 mb-1">
                                        Tanggal Dibuat
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {formatDate(selectedUser.createdAt)}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs font-medium text-gray-400 mb-1">
                                        Login Terakhir
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {selectedUser.lastLogin === "-"
                                            ? "Belum pernah login"
                                            : formatDate(selectedUser.lastLogin)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => { setShowDetailModal(false); setSelectedUser(null); }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => {
                                    setShowDetailModal(false);
                                    openEditModal(selectedUser);
                                }}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark flex items-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== EDIT MODAL ===== */}
            {showEditModal && selectedUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowEditModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined text-[20px]">
                                        edit
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Edit User</h3>
                            </div>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Role <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        value={formRole}
                                        onChange={(e) => setFormRole(e.target.value)}
                                    >
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        type="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
                                            @
                                        </span>
                                        <input
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 pl-7 pr-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                            value={formUsername}
                                            onChange={(e) => setFormUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Status
                                    </label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        value={formStatus}
                                        onChange={(e) =>
                                            setFormStatus(e.target.value as "active" | "inactive")
                                        }
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Nonaktif</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Reset Kata Sandi
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 bg-gray-50 py-2.5 px-3 text-sm focus:border-wa-green focus:ring-wa-green"
                                        placeholder="Kosongkan jika tidak diubah"
                                        type="password"
                                        value={formPassword}
                                        onChange={(e) => setFormPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark flex items-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== DELETE MODAL ===== */}
            {showDeleteModal && selectedUser && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
                                <span className="material-symbols-outlined text-red-600 text-[28px]">
                                    delete_forever
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus User</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus user{" "}
                                <strong className="text-gray-900">{selectedUser.name}</strong>?
                                Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    delete
                                </span>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== BULK DELETE MODAL ===== */}
            {showBulkDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowBulkDeleteModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
                                <span className="material-symbols-outlined text-red-600 text-[28px]">
                                    delete_sweep
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Hapus {selectedIds.size} User
                            </h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus{" "}
                                <strong className="text-gray-900">{selectedIds.size} user</strong>{" "}
                                yang dipilih? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowBulkDeleteModal(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    delete_sweep
                                </span>
                                Hapus Semua
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
