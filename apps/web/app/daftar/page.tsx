import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
    title: "Halaman Pendaftaran Akun Baru - AutoWhatsApp.web.id",
    description:
        "Mulai perjalanan marketing WhatsApp Anda hari ini. Daftar akun AutoWhatsApp.web.id gratis.",
};

export default function DaftarPage() {
    return (
        <div className="h-screen flex overflow-hidden bg-white">
            <div className="flex w-full h-full">
                {/* Left Panel - Info */}
                <div className="hidden lg:flex w-1/2 bg-[#E7FCE3] flex-col justify-center px-12 relative overflow-hidden">
                    <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-wa-green opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-wa-dark opacity-5 rounded-full blur-3xl"></div>

                    <div className="z-10 max-w-lg mx-auto">
                        {/* Brand */}
                        <div className="flex items-center gap-2 mb-12">
                            <span className="material-symbols-outlined text-wa-green text-4xl">
                                chat_bubble
                            </span>
                            <span className="text-3xl font-bold tracking-tight text-gray-800">
                                AutoWhatsApp<span className="text-wa-green">.web.id</span>
                            </span>
                        </div>

                        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                            Solusi WhatsApp Marketing Terpadu untuk Bisnis Anda
                        </h2>
                        <p className="text-lg text-gray-600 mb-10">
                            Jangkau ribuan pelanggan dalam sekejap, otomatisasi pesan, dan
                            tingkatkan konversi bisnis Anda dengan platform kami.
                        </p>

                        {/* Feature Cards */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm transition-transform hover:scale-[1.02]">
                                <div className="w-12 h-12 rounded-full bg-wa-green flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined">
                                        rocket_launch
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">
                                        Bulk Messaging
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Kirim pesan massal tanpa batas ke pelanggan potensial Anda
                                        dengan aman dan cepat.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm transition-transform hover:scale-[1.02]">
                                <div className="w-12 h-12 rounded-full bg-[#34B7F1] flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined">api</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">
                                        Akses API Lengkap
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Integrasikan WhatsApp dengan sistem CRM, toko online, atau
                                        aplikasi custom Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm transition-transform hover:scale-[1.02]">
                                <div className="w-12 h-12 rounded-full bg-[#075E54] flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">
                                        Kolaborasi Tim
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Satu nomor WhatsApp untuk banyak agen CS. Pantau kinerja tim
                                        secara real-time.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-[18px]">
                                verified_user
                            </span>
                            Terpercaya oleh 10,000+ bisnis di Indonesia
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 py-12 lg:px-20 overflow-y-auto">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            {/* Mobile Brand */}
                            <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
                                <span className="material-symbols-outlined text-wa-green text-3xl">
                                    chat_bubble
                                </span>
                                <span className="text-2xl font-bold tracking-tight text-gray-800">
                                    AutoWhatsApp<span className="text-wa-green">.web.id</span>
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Daftar Akun</h2>
                            <p className="mt-2 text-gray-600">
                                Mulai perjalanan marketing WhatsApp Anda hari ini.
                            </p>
                        </div>

                        <RegisterForm />

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Sudah punya akun?{" "}
                                <a
                                    className="font-medium text-wa-green hover:text-wa-dark"
                                    href="/masuk"
                                >
                                    Masuk di sini
                                </a>
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <p className="text-xs text-center text-gray-400">
                                © 2026 AutoWhatsApp.web.id Inc. Semua hak dilindungi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
