"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type UserRole = "super_admin" | "user";

interface QuickLoginAccount {
    role: UserRole;
    email: string;
    password: string;
    name: string;
    badge: string;
    badgeColor: string;
}

const quickLoginAccounts: QuickLoginAccount[] = [
    {
        role: "super_admin",
        email: "admin@wablast.io",
        password: "admin123",
        name: "Super Admin",
        badge: "Admin",
        badgeColor: "bg-red-500",
    },
    {
        role: "user",
        email: "user@wablast.io",
        password: "user123",
        name: "User Demo",
        badge: "User",
        badgeColor: "bg-blue-500",
    },
];

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Determine role based on email
            const role = email.includes("admin") ? "super_admin" : "user";
            console.log("Login berhasil:", { email, password, rememberMe, role });

            // Store role in localStorage for dashboard
            localStorage.setItem("userRole", role);
            localStorage.setItem("userEmail", email);

            router.push("/dashboard");
        } catch (error) {
            console.error("Login gagal:", error);
            alert("Login gagal. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickLogin = async (account: QuickLoginAccount) => {
        setEmail(account.email);
        setPassword(account.password);
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 800));

            console.log("Quick login berhasil:", account);
            localStorage.setItem("userRole", account.role);
            localStorage.setItem("userEmail", account.email);
            localStorage.setItem("userName", account.name);

            router.push("/dashboard");
        } catch (error) {
            console.error("Quick login gagal:", error);
            alert("Login gagal. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Quick Login Buttons */}
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                    Login Cepat (Demo)
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {quickLoginAccounts.map((account) => (
                        <button
                            key={account.role}
                            type="button"
                            onClick={() => handleQuickLogin(account)}
                            disabled={isLoading}
                            className="flex flex-col items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:border-wa-green hover:bg-wa-green/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-600 group-hover:text-wa-green text-2xl">
                                    {account.role === "super_admin"
                                        ? "admin_panel_settings"
                                        : "person"}
                                </span>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-gray-900">
                                    {account.name}
                                </p>
                                <span
                                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium text-white ${account.badgeColor}`}
                                >
                                    {account.badge}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">
                        Atau login manual
                    </span>
                </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-[20px]">
                                mail
                            </span>
                        </div>
                        <input
                            autoComplete="email"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm placeholder-gray-400"
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

                {/* Kata Sandi */}
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="password"
                    >
                        Kata Sandi
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-[20px]">
                                lock
                            </span>
                        </div>
                        <input
                            autoComplete="current-password"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm placeholder-gray-400"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            className="h-4 w-4 text-wa-green focus:ring-wa-green border-gray-300 rounded"
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={isLoading}
                        />
                        <label
                            className="ml-2 block text-sm text-gray-900"
                            htmlFor="remember-me"
                        >
                            Ingat saya
                        </label>
                    </div>
                    <div className="text-sm">
                        <a
                            className="font-medium text-wa-dark hover:text-wa-green transition-colors"
                            href="#"
                        >
                            Lupa kata sandi?
                        </a>
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-wa-green hover:bg-wa-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wa-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                            "Masuk"
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
