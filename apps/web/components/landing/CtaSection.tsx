export default function CtaSection() {
    return (
        <section className="bg-wa-green py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                    Siap Meningkatkan Komunikasi Bisnis Anda?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    Bergabunglah dengan ribuan pengembang dan bisnis yang telah
                    mempercayai AutoWhatsApp.web.id untuk solusi pesan WhatsApp mereka.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        className="bg-white text-wa-dark px-8 py-3 rounded-lg font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
                        href="#"
                    >
                        Coba Gratis Sekarang
                    </a>
                    <a
                        className="bg-wa-dark text-white border border-white/20 px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
                        href="#"
                    >
                        Jadwalkan Demo
                    </a>
                </div>
            </div>
        </section>
    );
}
