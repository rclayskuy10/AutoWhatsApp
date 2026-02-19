import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Halaman Login Pengguna - AutoWhatsApp.web.id",
    description: "Kelola pesan massal WhatsApp Anda dengan mudah",
};

export default function MasukPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f0f2f5]">
            {/* Header / Brand */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-wa-green text-4xl">
                        chat_bubble
                    </span>
                    <span className="text-3xl font-bold tracking-tight text-gray-800">
                        AutoWhatsApp<span className="text-wa-green">.web.id</span>
                    </span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Masuk ke akun Anda
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Kelola pesan massal WhatsApp Anda dengan mudah
                </p>
            </div>

            {/* Login Card */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    <LoginForm />

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Atau lanjutkan dengan
                                </span>
                            </div>
                        </div>

                        {/* Google Sign In */}
                        <div className="mt-6">
                            <a
                                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                href="#"
                            >
                                <span className="sr-only">Sign in with Google</span>
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                                </svg>
                                <span className="ml-2 text-gray-700">Google</span>
                            </a>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Belum punya akun?{" "}
                            <a
                                className="font-medium text-wa-dark hover:text-wa-green transition-colors"
                                href="/daftar"
                            >
                                Daftar gratis
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-8 text-center text-xs text-gray-400">
                    <p>© 2026 AutoWhatsApp.web.id - Hak cipta dilindungi undang-undang.</p>
                    <div className="mt-2 space-x-4">
                        <a className="hover:text-gray-500 hover:underline" href="#">
                            Syarat Layanan
                        </a>
                        <a className="hover:text-gray-500 hover:underline" href="#">
                            Kebijakan Privasi
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
