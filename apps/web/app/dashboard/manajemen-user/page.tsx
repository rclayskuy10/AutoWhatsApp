"use client";

import { type UserData, users } from "@/data/dummy/users";

export default function ManajemenUserPage() {
    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manajemen User</h1>
                    <p className="mt-1 text-sm text-gray-500">Kelola pengguna sistem, peran, dan kredensial</p>
                </div>
            </div>

            {/* Content */}
            <div>
                {/* Add User Form */}
                <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-wa-green">
                                <span className="material-symbols-outlined">
                                    person_add
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Tambah User Baru
                            </h3>
                        </div>
                    </div>
                    <form action="#" className="space-y-6" method="POST">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-600 mb-1.5"
                                    htmlFor="fullname"
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    className="block w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-wa-green focus:ring-wa-green"
                                    id="fullname"
                                    name="fullname"
                                    placeholder="Masukkan nama lengkap"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-600 mb-1.5"
                                    htmlFor="role"
                                >
                                    Role
                                </label>
                                <select
                                    className="block w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-wa-green focus:ring-wa-green"
                                    id="role"
                                    name="role"
                                    defaultValue=""
                                >
                                    <option disabled value="">
                                        Pilih Role Pengguna
                                    </option>
                                    <option value="superadmin">
                                        Super Admin
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="support">Support</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-600 mb-1.5"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="block w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-wa-green focus:ring-wa-green"
                                    id="email"
                                    name="email"
                                    placeholder="contoh@wablast.io"
                                    type="email"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-600 mb-1.5"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    className="block w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-wa-green focus:ring-wa-green"
                                    id="username"
                                    name="username"
                                    placeholder="Buat username unik"
                                    type="text"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label
                                    className="block text-sm font-medium text-gray-600 mb-1.5"
                                    htmlFor="password"
                                >
                                    Kata Sandi
                                </label>
                                <input
                                    className="block w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-wa-green focus:ring-wa-green"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    type="password"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Minimal 8 karakter, kombinasi huruf dan
                                    angka.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 mr-2"
                                type="button"
                            >
                                Batal
                            </button>
                            <button
                                className="flex items-center gap-2 rounded-lg bg-wa-green px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-wa-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-green transition-colors"
                                type="submit"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    save
                                </span>
                                Simpan User
                            </button>
                        </div>
                    </form>
                </div>

                {/* Users Table */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                        <h3 className="text-lg font-bold text-gray-900">
                            Daftar Pengguna Aktif
                        </h3>
                        <div className="flex gap-2">
                            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                <span className="material-symbols-outlined text-[18px]">
                                    filter_list
                                </span>
                                Filter
                            </button>
                            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                <span className="material-symbols-outlined text-[18px]">
                                    download
                                </span>
                                Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                                <tr>
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
                                    <th
                                        className="px-6 py-4 text-right"
                                        scope="col"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {users.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${user.initialsColor}`}
                                                >
                                                    {user.initials}
                                                </div>
                                                <span className="font-bold">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.roleColor}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">
                                            {user.username}
                                        </td>
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
                                                {user.role !==
                                                    "Super Admin" && (
                                                        <button
                                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                            Menampilkan{" "}
                            <span className="font-bold text-gray-900">
                                5
                            </span>{" "}
                            dari{" "}
                            <span className="font-bold text-gray-900">
                                12
                            </span>{" "}
                            pengguna
                        </p>
                        <div className="flex gap-2">
                            <button
                                className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                disabled
                            >
                                Sebelumnya
                            </button>
                            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50">
                                Berikutnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
