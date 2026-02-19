export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 hero-pattern z-0 pointer-events-none"></div>
            <div className="absolute top-20 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-wa-green/10 blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-light border border-wa-green/20 text-wa-dark text-xs font-semibold mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping-custom absolute inline-flex h-full w-full rounded-full bg-wa-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-wa-green"></span>
                    </span>
                    Baru: Arsitektur Multi-Tenant v2.0 Telah Hadir
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                    Skalakan Komunikasi WhatsApp <br className="hidden md:block" />
                    Anda dengan <span className="text-wa-green">Mudah</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
                    Platform yang mengutamakan pengembang untuk pesan massal. Integrasikan
                    API multi-tenant kami yang tangguh ke dalam aplikasi Anda dan jangkau
                    pelanggan secara instan di aplikasi favorit mereka.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <a
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-wa-green hover:bg-wa-dark shadow-lg shadow-wa-green/30 transition-all duration-200 transform hover:-translate-y-1"
                        href="#"
                    >
                        Mulai Gratis
                    </a>
                    <a
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200"
                        href="#"
                    >
                        <span className="material-symbols-outlined mr-2 text-wa-green">
                            code
                        </span>
                        Lihat Dokumen API
                    </a>
                </div>

                {/* Dashboard Preview */}
                <div className="relative max-w-5xl mx-auto mt-8">
                    <div className="relative rounded-xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-900/10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2 bg-wa-green/50 blur-xl rounded-full"></div>
                        <div className="rounded-lg overflow-hidden bg-slate-800 border border-slate-700 aspect-[16/9] flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-slate-50 flex">
                                {/* Sidebar */}
                                <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-4 space-y-4">
                                    <div className="h-8 w-24 bg-slate-200 rounded animate-pulse"></div>
                                    <div className="space-y-2 mt-4">
                                        <div className="h-8 w-full bg-wa-green/10 text-wa-dark rounded flex items-center px-3 text-sm font-medium">
                                            Dasbor
                                        </div>
                                        <div className="h-8 w-full hover:bg-slate-100 rounded flex items-center px-3 text-slate-500 text-sm">
                                            Kampanye
                                        </div>
                                        <div className="h-8 w-full hover:bg-slate-100 rounded flex items-center px-3 text-slate-500 text-sm">
                                            Kontak
                                        </div>
                                        <div className="h-8 w-full hover:bg-slate-100 rounded flex items-center px-3 text-slate-500 text-sm">
                                            Kunci API
                                        </div>
                                    </div>
                                </div>

                                {/* Main content area */}
                                <div className="flex-1 p-6 space-y-6 overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <div className="h-8 w-48 bg-slate-200 rounded"></div>
                                        <div className="h-8 w-32 bg-wa-green rounded text-white text-xs flex items-center justify-center">
                                            Kampanye Baru
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm h-24">
                                            <div className="text-xs text-slate-400">
                                                Total Terkirim
                                            </div>
                                            <div className="text-2xl font-bold text-slate-800 mt-1">
                                                12.450
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm h-24">
                                            <div className="text-xs text-slate-400">Terkirim</div>
                                            <div className="text-2xl font-bold text-wa-green mt-1">
                                                98,2%
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm h-24">
                                            <div className="text-xs text-slate-400">
                                                Penggunaan API
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full mt-3">
                                                <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Table Preview */}
                                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 h-full">
                                        <div className="flex gap-4 border-b border-slate-100 pb-3 mb-3">
                                            <div className="h-4 w-20 bg-slate-200 rounded"></div>
                                            <div className="h-4 w-20 bg-slate-100 rounded"></div>
                                            <div className="h-4 w-20 bg-slate-100 rounded"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-10 w-full bg-slate-50 rounded border border-slate-100"></div>
                                            <div className="h-10 w-full bg-slate-50 rounded border border-slate-100"></div>
                                            <div className="h-10 w-full bg-slate-50 rounded border border-slate-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
