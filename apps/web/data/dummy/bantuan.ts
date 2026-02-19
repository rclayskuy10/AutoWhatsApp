// ============================
// Bantuan (Help) dummy data
// ============================

export interface HelpCategory {
    id: number;
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    iconColor: string;
    hoverBg: string;
    keywords: string[];
}

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

export const helpCategories: HelpCategory[] = [
    {
        id: 1,
        title: "Dokumentasi API",
        description: "Panduan lengkap integrasi API untuk pengembang. Pelajari cara menghubungkan sistem Anda.",
        icon: "code",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        hoverBg: "group-hover:bg-blue-100",
        keywords: ["api", "developer", "integrasi", "webhook", "rest", "dokumentasi", "pengembang"],
    },
    {
        id: 2,
        title: "Panduan Pengguna",
        description: "Tutorial langkah demi langkah untuk menggunakan fitur-fitur dashboard dan manajemen kampanye.",
        icon: "menu_book",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        hoverBg: "group-hover:bg-orange-100",
        keywords: ["panduan", "tutorial", "pengguna", "dashboard", "kampanye", "fitur", "langkah"],
    },
    {
        id: 3,
        title: "Pertanyaan Umum (FAQ)",
        description: "Jawaban cepat untuk pertanyaan yang sering diajukan mengenai akun, tagihan, dan teknis.",
        icon: "help_outline",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        hoverBg: "group-hover:bg-purple-100",
        keywords: ["faq", "pertanyaan", "akun", "tagihan", "teknis", "umum", "sering"],
    },
    {
        id: 4,
        title: "Manajemen Perangkat",
        description: "Cara menghubungkan, mengelola, dan memantau status perangkat WhatsApp Anda.",
        icon: "smartphone",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        hoverBg: "group-hover:bg-green-100",
        keywords: ["perangkat", "device", "whatsapp", "koneksi", "qr", "scan", "hubungkan"],
    },
    {
        id: 5,
        title: "Kampanye & Pesan",
        description: "Panduan membuat dan mengelola kampanye pesan massal, templat, dan penjadwalan.",
        icon: "campaign",
        iconBg: "bg-red-50",
        iconColor: "text-red-600",
        hoverBg: "group-hover:bg-red-100",
        keywords: ["kampanye", "pesan", "massal", "blast", "templat", "jadwal", "broadcast"],
    },
    {
        id: 6,
        title: "Kontak & Grup",
        description: "Panduan mengimpor, mengelola, dan mengelompokkan kontak untuk target pesan Anda.",
        icon: "contacts",
        iconBg: "bg-teal-50",
        iconColor: "text-teal-600",
        hoverBg: "group-hover:bg-teal-100",
        keywords: ["kontak", "grup", "import", "csv", "kelompok", "daftar", "nomor"],
    },
];

export const faqItems: FaqItem[] = [
    {
        id: 1,
        question: "Bagaimana cara menghubungkan perangkat WhatsApp?",
        answer: "Buka menu 'Perangkat' di dashboard, klik 'Tambah Perangkat', lalu scan QR Code yang muncul menggunakan WhatsApp di ponsel Anda. Perangkat akan terhubung dalam beberapa detik.",
        category: "Perangkat",
    },
    {
        id: 2,
        question: "Berapa batas pesan yang bisa dikirim per hari?",
        answer: "Batas pengiriman pesan tergantung pada paket langganan Anda. Paket Starter hingga 1.000 pesan/hari, Paket Business hingga 10.000 pesan/hari, dan Paket Enterprise tidak terbatas.",
        category: "Paket",
    },
    {
        id: 3,
        question: "Bagaimana cara mengimpor kontak dari file CSV?",
        answer: "Buka menu 'Kontak', klik tombol 'Import CSV', pilih file CSV Anda. Format yang didukung: kolom nama dan nomor telepon (dengan kode negara, contoh: +6281234567890).",
        category: "Kontak",
    },
    {
        id: 4,
        question: "Apakah saya bisa menjadwalkan pengiriman pesan?",
        answer: "Ya, saat membuat kampanye baru Anda dapat memilih opsi 'Terjadwal' dan mengatur tanggal serta waktu pengiriman. Kampanye akan berjalan otomatis sesuai jadwal.",
        category: "Kampanye",
    },
    {
        id: 5,
        question: "Bagaimana cara mendapatkan API Key?",
        answer: "Buka menu 'Kunci API' di dashboard, Anda akan melihat API Key yang sudah digenerate. Anda bisa menyalin atau membuat ulang key sesuai kebutuhan.",
        category: "API",
    },
    {
        id: 6,
        question: "Apakah akun saya aman?",
        answer: "Ya, kami menggunakan enkripsi end-to-end untuk semua komunikasi. Anda juga bisa mengaktifkan verifikasi dua langkah (2FA) di halaman Profil untuk keamanan tambahan.",
        category: "Keamanan",
    },
];
