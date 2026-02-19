// ============================
// Kampanye (Campaigns) dummy data
// ============================

export interface Campaign {
    id: number;
    name: string;
    device: string;
    target: string;
    status: string;
    statusColor: string;
    schedule: string;
}

export const statusOptions = [
    { label: "Berjalan", color: "bg-blue-100 text-blue-800" },
    { label: "Terjadwal", color: "bg-yellow-100 text-yellow-800" },
    { label: "Selesai", color: "bg-green-100 text-green-800" },
    { label: "Draf", color: "bg-gray-100 text-gray-800" },
];

export const initialCampaigns: Campaign[] = [
    {
        id: 1,
        name: "Promo Flash Sale Januari",
        device: "Samsung S21 (Main)",
        target: "1,500 Kontak",
        status: "Berjalan",
        statusColor: "bg-blue-100 text-blue-800",
        schedule: "Sekarang",
    },
    {
        id: 2,
        name: "Blast Info Maintenance",
        device: "iPhone 13 (Support)",
        target: "500 Kontak",
        status: "Terjadwal",
        statusColor: "bg-yellow-100 text-yellow-800",
        schedule: "25 Jan 2026, 01:00",
    },
    {
        id: 3,
        name: "Notifikasi Tagihan Q1",
        device: "Samsung S21 (Main)",
        target: "2,100 Kontak",
        status: "Selesai",
        statusColor: "bg-green-100 text-green-800",
        schedule: "10 Jan 2026, 09:00",
    },
    {
        id: 4,
        name: "Survey Pelanggan 2025",
        device: "Pixel 6 (Survey)",
        target: "850 Kontak",
        status: "Selesai",
        statusColor: "bg-green-100 text-green-800",
        schedule: "05 Jan 2026, 14:00",
    },
    {
        id: 5,
        name: "Ucapan Tahun Baru",
        device: "Samsung S21 (Main)",
        target: "3,000 Kontak",
        status: "Gagal (API Error)",
        statusColor: "bg-red-100 text-red-800",
        schedule: "01 Jan 2026, 00:00",
    },
];
