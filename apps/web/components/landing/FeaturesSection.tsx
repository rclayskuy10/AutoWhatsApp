export default function FeaturesSection() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-wa-green uppercase tracking-wide">
                        Fitur Canggih
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Semua yang Anda butuhkan untuk mengelola WhatsApp dalam skala besar
                    </p>
                    <p className="mt-4 text-lg text-slate-600">
                        Dibangun untuk efisiensi, keamanan, dan kebahagiaan pengembang.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-wa-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-wa-dark text-3xl">
                                devices
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                            Dukungan Multi-Perangkat
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Hubungkan beberapa nomor WhatsApp di bawah satu organisasi.
                            Tetapkan kuota dan kelola izin untuk tim atau klien yang berbeda
                            dengan lancar.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-wa-green/10 to-transparent rounded-bl-full"></div>
                        <div className="w-14 h-14 bg-wa-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-wa-dark text-3xl">
                                mark_chat_unread
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                            Pesan Massal
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Impor kontak, gunakan variabel dinamis, dan kirim kampanye yang
                            dipersonalisasi ke ribuan pengguna secara instan dengan
                            perlindungan anti-spam cerdas.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-wa-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-wa-dark text-3xl">
                                integration_instructions
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                            API Berbasis Pengembang
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Dokumentasi REST API yang tangguh dengan contoh CURL. Hasilkan
                            kunci API per proyek, pantau penggunaan secara real-time, dan
                            integrasikan dengan mudah.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
