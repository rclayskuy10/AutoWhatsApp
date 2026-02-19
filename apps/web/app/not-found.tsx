import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 - Halaman Tidak Ditemukan | AutoWhatsApp.web.id",
    description: "Halaman yang Anda cari tidak ditemukan",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                {/* Illustration */}
                <div className="relative mb-8">
                    <div className="text-[160px] font-extrabold text-gray-100 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-wa-green/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-wa-green text-5xl">
                                search_off
                            </span>
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Halaman Tidak Ditemukan
                </h1>
                <p className="text-gray-500 mb-8 text-lg">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                    Silakan periksa kembali URL atau kembali ke beranda.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-wa-green hover:bg-wa-dark text-white font-medium rounded-lg transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-xl">home</span>
                        Kembali ke Beranda
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300"
                    >
                        <span className="material-symbols-outlined text-xl">dashboard</span>
                        Ke Dashboard
                    </Link>
                </div>

                <p className="text-sm text-gray-400 mt-10">
                    Butuh bantuan?{" "}
                    <Link href="/dokumentasi" className="text-wa-green hover:text-wa-dark transition-colors underline">
                        Lihat dokumentasi
                    </Link>{" "}
                    atau{" "}
                    <a href="mailto:support@autowhatsapp.web.id" className="text-wa-green hover:text-wa-dark transition-colors underline">
                        hubungi support
                    </a>
                </p>
            </div>
        </div>
    );
}
