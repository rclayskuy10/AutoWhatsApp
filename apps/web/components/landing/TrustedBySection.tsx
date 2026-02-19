export default function TrustedBySection() {
    return (
        <section className="border-y border-slate-100 bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
                    Dipercaya oleh 2.000+ bisnis dan pengembang
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-xl text-slate-700 flex items-center gap-1">
                            <span className="w-6 h-6 bg-slate-800 rounded-sm"></span> Vertex
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-xl text-slate-700 flex items-center gap-1">
                            <span className="w-6 h-6 rounded-full border-4 border-slate-800"></span>{" "}
                            Sphere
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-xl text-slate-700 flex items-center gap-1">
                            <span className="material-symbols-outlined">bolt</span> EnergyCo
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-xl text-slate-700 flex items-center gap-1">
                            Global<span className="font-light">Tech</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-xl text-slate-700 flex items-center gap-1">
                            <span className="material-symbols-outlined">diamond</span> Nexus
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
