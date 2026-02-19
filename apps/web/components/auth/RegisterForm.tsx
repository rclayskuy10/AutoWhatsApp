"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!terms) {
            alert("Anda harus menyetujui Syarat & Ketentuan.");
            return;
        }
        setIsLoading(true);

        try {
            // TODO: Ganti dengan API call sebenarnya
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Register berhasil:", { fullname, email, phone, password });
            router.push("/dashboard");
        } catch (error) {
            console.error("Register gagal:", error);
            alert("Pendaftaran gagal. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="fullname"
                >
                    Nama Lengkap
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">
                            person
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green text-gray-900 placeholder-gray-400 sm:text-sm transition-colors"
                        id="fullname"
                        name="fullname"
                        placeholder="Masukkan nama lengkap Anda"
                        required
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* Email Bisnis */}
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="email"
                >
                    Email Bisnis
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">
                            mail
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green text-gray-900 placeholder-gray-400 sm:text-sm transition-colors"
                        id="email"
                        name="email"
                        placeholder="nama@perusahaan.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
            </div>

            {/* Nomor WhatsApp */}
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="phone"
                >
                    Nomor WhatsApp
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">
                            phone_iphone
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green text-gray-900 placeholder-gray-400 sm:text-sm transition-colors"
                        id="phone"
                        name="phone"
                        placeholder="081234567890"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                    Pastikan nomor ini aktif di WhatsApp.
                </p>
            </div>

            {/* Kata Sandi */}
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="password"
                >
                    Kata Sandi
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">
                            lock
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green text-gray-900 placeholder-gray-400 sm:text-sm transition-colors"
                        id="password"
                        name="password"
                        placeholder="Minimal 8 karakter"
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <span className="material-symbols-outlined text-gray-400 hover:text-gray-600 text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Syarat & Ketentuan */}
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        className="h-4 w-4 text-wa-green focus:ring-wa-green border-gray-300 rounded"
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                        disabled={isLoading}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700" htmlFor="terms">
                        Saya setuju dengan{" "}
                        <a
                            className="text-wa-green hover:text-wa-dark"
                            href="#"
                        >
                            Syarat &amp; Ketentuan
                        </a>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-wa-green hover:bg-wa-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wa-green transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Memproses...</span>
                        </>
                    ) : (
                        "Daftar Sekarang"
                    )}
                </button>
            </div>
        </form>
    );
}
