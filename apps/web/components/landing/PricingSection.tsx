"use client";

import { billingPlans } from "@/data/dummy/billing";
import Link from "next/link";

export default function PricingSection() {
    // Filter untuk tampilkan top-up packs di homepage
    const topUpPlans = billingPlans.filter(plan => plan.type === "topup").slice(0, 3);

    return (
        <section className="py-24 bg-slate-50" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-base font-semibold text-wa-green uppercase tracking-wide">
                        Harga Fleksibel
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Pilih paket yang sesuai untuk bisnis Anda
                    </p>
                    <p className="mt-4 text-slate-600">
                        Beli sesuai kebutuhan, tanpa komitmen bulanan. Top-up kapan saja!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topUpPlans.map((plan, index) => (
                        <div 
                            key={index}
                            className={`bg-white rounded-2xl p-8 shadow-sm flex flex-col relative
                                ${plan.popular ? 'border-2 border-wa-green shadow-xl' : 'border border-slate-200'}`}
                        >
                            {plan.badge && (
                                <div className={`absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 text-xs font-bold rounded-full uppercase ${plan.badgeColor || 'bg-wa-green text-white'}`}>
                                    {plan.badge}
                                </div>
                            )}
                            
                            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                            
                            <div className="mt-4 flex items-baseline">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {plan.priceMonthly}
                                </span>
                            </div>
                            
                            <p className="mt-2 text-xs text-slate-500">
                                Pembayaran sekali, kuota tidak expired
                            </p>
                            
                            <p className="mt-2 text-slate-600 text-sm">
                                {plan.description}
                            </p>
                            
                            <ul className="mt-6 space-y-4 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="material-symbols-outlined text-wa-green text-sm mr-2 mt-0.5">
                                            check_circle
                                        </span>
                                        <span className="text-sm text-slate-600">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            
                            <Link
                                href="/daftar"
                                className={`mt-8 block w-full font-semibold text-center py-3 rounded-lg transition-colors
                                    ${plan.popular 
                                        ? 'bg-wa-green hover:bg-wa-dark text-white shadow-lg shadow-wa-green/30' 
                                        : 'bg-slate-50 hover:bg-slate-100 text-wa-green border border-wa-green'
                                    }`}
                            >
                                Mulai Sekarang
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA untuk lihat semua paket */}
                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">
                        Butuh paket subscription atau volume lebih besar?
                    </p>
                    <Link
                        href="/harga"
                        className="inline-flex items-center gap-2 text-wa-green hover:text-wa-dark font-semibold transition-colors"
                    >
                        Lihat Semua Paket
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
