"use client";

import { useState, useRef } from "react";
import { defaultProfile } from "@/data/dummy/profile";

export default function ProfilPage() {
    // Profile form state
    const [fullName, setFullName] = useState(defaultProfile.fullName);
    const [phone, setPhone] = useState(defaultProfile.phone);
    const [email, setEmail] = useState(defaultProfile.email);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    // Photo upload
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            showToast("File harus berupa gambar", "error");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast("Ukuran file maksimal 5MB", "error");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarPreview(reader.result as string);
            showToast("Foto profil berhasil diperbarui");
        };
        reader.readAsDataURL(file);
    };

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Password validation
    const passwordError = (() => {
        if (!newPassword && !confirmPassword) return null;
        if (newPassword.length > 0 && newPassword.length < 8) return "Kata sandi baru minimal 8 karakter";
        if (confirmPassword && newPassword !== confirmPassword) return "Konfirmasi kata sandi tidak cocok";
        return null;
    })();

    // Save profile
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim()) {
            showToast("Nama lengkap wajib diisi", "error");
            return;
        }
        showToast("Profil berhasil disimpan");
    };

    // Update password
    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword) {
            showToast("Masukkan kata sandi saat ini", "error");
            return;
        }
        if (newPassword.length < 8) {
            showToast("Kata sandi baru minimal 8 karakter", "error");
            return;
        }
        if (newPassword !== confirmPassword) {
            showToast("Konfirmasi kata sandi tidak cocok", "error");
            return;
        }
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showToast("Kata sandi berhasil diperbarui");
    };

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.message}
                </div>
            )}

            {/* Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Pengaturan Profil</h1>
                <p className="text-sm text-gray-500 mt-1">Perbarui informasi pribadi dan keamanan akun Anda</p>
            </div>

            {/* Informasi Pribadi */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Informasi Pribadi</h2>
                        <p className="text-sm text-gray-500 mt-1">Perbarui foto profil dan detail pribadi Anda.</p>
                    </div>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSaveProfile}>
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center gap-4">
                                <div
                                    className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-bold text-gray-400 border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="group-hover:opacity-0 transition-opacity">
                                            {fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?"}
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-wa-dark text-sm font-medium hover:underline">Ubah Foto Profil</button>
                            </div>

                            {/* Form Fields */}
                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400 text-[20px]">person</span>
                                            </div>
                                            <input
                                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm transition-colors"
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400 text-[20px]">phone</span>
                                            </div>
                                            <input
                                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm transition-colors"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400 text-[20px]">mail</span>
                                            </div>
                                            <input
                                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm transition-colors"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button type="submit" className="px-4 py-2 bg-wa-green text-white text-sm font-medium rounded-lg hover:bg-wa-dark transition-colors shadow-sm">
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Keamanan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Keamanan</h2>
                    <p className="text-sm text-gray-500 mt-1">Kelola kata sandi dan pengaturan keamanan akun Anda.</p>
                </div>
                <div className="p-8">
                    <form onSubmit={handleUpdatePassword}>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Ganti Kata Sandi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Saat Ini</label>
                                <div className="relative">
                                    <input
                                        className="block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm transition-colors"
                                        type={showCurrentPw ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showCurrentPw ? "visibility_off" : "visibility"}</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Baru</label>
                                <div className="relative">
                                    <input
                                        className="block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm transition-colors"
                                        type={showNewPw ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Min. 8 karakter"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPw(!showNewPw)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showNewPw ? "visibility_off" : "visibility"}</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                                <div className="relative">
                                    <input
                                        className="block w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm transition-colors"
                                        type={showConfirmPw ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Ulangi kata sandi"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPw(!showConfirmPw)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">{showConfirmPw ? "visibility_off" : "visibility"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Password validation hint */}
                        {passwordError && (
                            <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">error</span>
                                {passwordError}
                            </p>
                        )}

                        {/* Password strength hint */}
                        {newPassword.length > 0 && !passwordError && (
                            <div className="mt-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1 flex-1">
                                        <div className={`h-1.5 rounded-full flex-1 ${newPassword.length >= 8 ? "bg-green-500" : "bg-gray-200"}`} />
                                        <div className={`h-1.5 rounded-full flex-1 ${newPassword.length >= 10 && /[A-Z]/.test(newPassword) ? "bg-green-500" : "bg-gray-200"}`} />
                                        <div className={`h-1.5 rounded-full flex-1 ${newPassword.length >= 12 && /[^A-Za-z0-9]/.test(newPassword) ? "bg-green-500" : "bg-gray-200"}`} />
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {newPassword.length >= 12 && /[^A-Za-z0-9]/.test(newPassword) ? "Kuat" : newPassword.length >= 10 ? "Sedang" : "Lemah"}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end items-center gap-4">
                            <a
                                className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    showToast("Link reset kata sandi telah dikirim ke email Anda");
                                }}
                            >
                                Lupa kata sandi?
                            </a>
                            <button
                                type="submit"
                                disabled={!!passwordError || !currentPassword || !newPassword || !confirmPassword}
                                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Update Kata Sandi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
