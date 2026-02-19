"use client";

import { useState } from "react";
import { type HelpCategory, type FaqItem, helpCategories, faqItems } from "@/data/dummy/bantuan";

export default function BantuanPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const filteredCategories = helpCategories.filter(cat =>
        searchQuery.trim() === "" ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.keywords.some(k => k.includes(searchQuery.toLowerCase()))
    );

    const filteredFaqs = faqItems.filter(faq =>
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Hero / Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8 text-center relative bg-gradient-to-b from-green-50 to-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bagaimana kami bisa membantu Anda?</h2>
                <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                    Cari artikel bantuan, panduan, dan dokumentasi untuk memaksimalkan penggunaan platform kami.
                </p>
                <div className="max-w-2xl mx-auto relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-wa-green focus:ring-wa-green focus:ring-1 sm:text-sm shadow-sm"
                        placeholder="Cari topik bantuan..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-sm text-gray-500 mt-3">
                        Menampilkan {filteredCategories.length} kategori dan {filteredFaqs.length} FAQ untuk &ldquo;{searchQuery}&rdquo;
                    </p>
                )}
            </div>

            {/* Help Categories Grid */}
            {filteredCategories.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredCategories.map((cat) => (
                        <a className="block group h-full" href="#" key={cat.id}>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full p-6 transition-all duration-200 hover:shadow-md hover:border-wa-green">
                                <div className={`w-12 h-12 ${cat.iconBg} rounded-lg flex items-center justify-center mb-4 ${cat.hoverBg} transition-colors`}>
                                    <span className={`material-symbols-outlined ${cat.iconColor} text-2xl`}>{cat.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-wa-dark transition-colors">{cat.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {/* No categories message */}
            {searchQuery && filteredCategories.length === 0 && filteredFaqs.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">search_off</span>
                    <p className="text-gray-500 text-sm">Tidak ada hasil ditemukan untuk &ldquo;{searchQuery}&rdquo;</p>
                    <button onClick={() => setSearchQuery("")} className="mt-3 text-wa-dark text-sm font-medium hover:underline">
                        Hapus pencarian
                    </button>
                </div>
            )}

            {/* FAQ Section */}
            {filteredFaqs.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">Pertanyaan yang Sering Diajukan</h2>
                        <p className="text-sm text-gray-500 mt-1">Klik pertanyaan untuk melihat jawaban</p>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {filteredFaqs.map((faq) => (
                            <div key={faq.id}>
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-wa-green text-[20px]">help</span>
                                        <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                                    </div>
                                    <span className={`material-symbols-outlined text-gray-400 text-[20px] transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>
                                {expandedFaq === faq.id && (
                                    <div className="px-6 pb-4 pl-14">
                                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                                        <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{faq.category}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contact Support CTA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Butuh bantuan lebih lanjut?</h2>
                        <p className="text-gray-500">Tim dukungan kami siap membantu Anda menyelesaikan masalah yang Anda hadapi.</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-wa-green text-white font-semibold rounded-lg hover:bg-wa-dark transition-colors shadow-sm text-sm">
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        Hubungi Kami via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
