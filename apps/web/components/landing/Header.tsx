"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-wa-green flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-xl">chat</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-800">
                                AutoWhatsApp<span className="text-wa-green">.web.id</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            className="text-slate-600 hover:text-wa-green text-sm font-medium transition-colors"
                            href="/fitur"
                        >
                            Features
                        </Link>
                        <Link
                            className="text-slate-600 hover:text-wa-green text-sm font-medium transition-colors"
                            href="/pengembang"
                        >
                            Developers
                        </Link>
                        <Link
                            className="text-slate-600 hover:text-wa-green text-sm font-medium transition-colors"
                            href="/harga"
                        >
                            Pricing
                        </Link>
                        <Link
                            className="text-slate-600 hover:text-wa-green text-sm font-medium transition-colors"
                            href="/dokumentasi"
                        >
                            Documentation
                        </Link>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            className="text-slate-900 hover:text-wa-green text-sm font-semibold"
                            href="/masuk"
                        >
                            Sign In
                        </Link>
                        <Link
                            className="bg-wa-green hover:bg-wa-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-wa-green/20"
                            href="/daftar"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="text-slate-500 hover:text-slate-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="material-symbols-outlined">
                                {mobileMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
                    <div className="px-4 py-4 space-y-3">
                        <Link
                            className="block text-slate-600 hover:text-wa-green text-sm font-medium transition-colors py-2"
                            href="/fitur"
                        >
                            Features
                        </Link>
                        <Link
                            className="block text-slate-600 hover:text-wa-green text-sm font-medium transition-colors py-2"
                            href="/pengembang"
                        >
                            Developers
                        </Link>
                        <Link
                            className="block text-slate-600 hover:text-wa-green text-sm font-medium transition-colors py-2"
                            href="/harga"
                        >
                            Pricing
                        </Link>
                        <Link
                            className="block text-slate-600 hover:text-wa-green text-sm font-medium transition-colors py-2"
                            href="/dokumentasi"
                        >
                            Documentation
                        </Link>
                        <div className="pt-3 border-t border-slate-100 space-y-3">
                            <Link
                                className="block text-slate-900 hover:text-wa-green text-sm font-semibold py-2"
                                href="/masuk"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="block bg-wa-green hover:bg-wa-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm text-center"
                                href="/daftar"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
