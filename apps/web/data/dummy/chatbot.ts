// ============================
// Chatbot dummy data
// ============================

export interface ChatRule {
    id: string;
    name: string;
    trigger: string;
    triggerType: "keyword" | "exact" | "regex" | "all";
    response: string;
    isActive: boolean;
    priority: number;
    matchCount: number;
    lastTriggered: string;
}

export const initialRules: ChatRule[] = [
    {
        id: "1",
        name: "Salam Pembuka",
        trigger: "halo, hai, hi, hello, selamat",
        triggerType: "keyword",
        response: "Halo! 👋 Terima kasih sudah menghubungi kami. Ada yang bisa kami bantu hari ini?",
        isActive: true,
        priority: 1,
        matchCount: 1250,
        lastTriggered: "5 menit lalu",
    },
    {
        id: "2",
        name: "Info Harga",
        trigger: "harga, price, berapa, biaya, tarif",
        triggerType: "keyword",
        response: "📋 Paket kami:\n\n• Pemula — Gratis (1.000 pesan/bln)\n• Pro — Rp 450.000/bln (50.000 pesan/bln)\n• Enterprise — Hubungi sales\n\nKunjungi https://autowhatsapp.web.id/harga untuk info lengkap!",
        isActive: true,
        priority: 2,
        matchCount: 840,
        lastTriggered: "12 menit lalu",
    },
    {
        id: "3",
        name: "Jam Operasional",
        trigger: "jam, buka, operasional, tutup, weekend",
        triggerType: "keyword",
        response: "🕐 Jam operasional support kami:\n\nSenin - Jumat: 08:00 - 18:00 WIB\nSabtu: 09:00 - 15:00 WIB\nMinggu: Libur\n\nDi luar jam kerja, silakan tinggalkan pesan dan kami akan membalas saat jam kerja.",
        isActive: true,
        priority: 3,
        matchCount: 320,
        lastTriggered: "1 jam lalu",
    },
    {
        id: "4",
        name: "Status Pesanan",
        trigger: "status, pesanan, order, tracking, kirim",
        triggerType: "keyword",
        response: "📦 Untuk mengecek status pesanan, silakan kirimkan nomor pesanan Anda (contoh: INV-2026XXXX). Tim kami akan segera mengecek dan menginformasikan statusnya.",
        isActive: true,
        priority: 4,
        matchCount: 560,
        lastTriggered: "30 menit lalu",
    },
    {
        id: "5",
        name: "Keluhan / Komplain",
        trigger: "keluhan, komplain, kecewa, masalah, error, bug",
        triggerType: "keyword",
        response: "Kami mohon maaf atas ketidaknyamanan yang Anda alami 🙏\n\nTim support kami akan segera menghubungi Anda. Mohon jelaskan detail masalah yang Anda alami agar kami bisa membantu dengan lebih cepat.",
        isActive: true,
        priority: 5,
        matchCount: 95,
        lastTriggered: "3 jam lalu",
    },
    {
        id: "6",
        name: "Di Luar Jam Kerja",
        trigger: "",
        triggerType: "all",
        response: "Terima kasih sudah menghubungi kami. Saat ini kami sedang di luar jam operasional. Pesan Anda telah kami terima dan akan dibalas pada jam kerja berikutnya. 🙏",
        isActive: false,
        priority: 99,
        matchCount: 180,
        lastTriggered: "Kemarin",
    },
];
