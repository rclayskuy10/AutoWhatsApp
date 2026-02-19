// ============================
// Templat (Templates) dummy data
// ============================

export interface Template {
    id: number;
    name: string;
    message: string;
    category: string;
    categoryColor: string;
    lastModified: string;
}

export const categoryOptions = [
    { label: "Promosi", color: "bg-blue-100 text-blue-800" },
    { label: "OTP", color: "bg-yellow-100 text-yellow-800" },
    { label: "Notifikasi", color: "bg-green-100 text-green-800" },
    { label: "Ucapan", color: "bg-purple-100 text-purple-800" },
];

export const initialTemplates: Template[] = [
    {
        id: 1,
        name: "Promo Flash Sale",
        message: "Halo {{1}}, dapatkan diskon 50% untuk pembelian produk hari ini hanya di...",
        category: "Promosi",
        categoryColor: "bg-blue-100 text-blue-800",
        lastModified: "12 Jan 2026, 10:30",
    },
    {
        id: 2,
        name: "Kode OTP Login",
        message: "Jangan berikan kode ini kepada siapapun. Kode OTP Anda adalah: {{1}}",
        category: "OTP",
        categoryColor: "bg-yellow-100 text-yellow-800",
        lastModified: "10 Jan 2026, 14:15",
    },
    {
        id: 3,
        name: "Konfirmasi Pesanan",
        message: "Terima kasih {{1}}, pesanan Anda #{{2}} telah kami terima dan sedang diproses.",
        category: "Notifikasi",
        categoryColor: "bg-green-100 text-green-800",
        lastModified: "08 Jan 2026, 09:00",
    },
    {
        id: 4,
        name: "Ucapan Ulang Tahun",
        message: "Selamat ulang tahun {{1}}! Semoga panjang umur dan sukses selalu. Dari kami...",
        category: "Ucapan",
        categoryColor: "bg-purple-100 text-purple-800",
        lastModified: "05 Jan 2026, 11:20",
    },
    {
        id: 5,
        name: "Tagihan Bulanan",
        message: "Halo {{1}}, tagihan bulan ini sebesar {{2}} sudah tersedia. Mohon segera...",
        category: "Notifikasi",
        categoryColor: "bg-green-100 text-green-800",
        lastModified: "02 Jan 2026, 08:45",
    },
];
