// ============================
// Laporan (Reports) dummy data
// ============================

interface DailyStat {
    date: string;
    sent: number;
    delivered: number;
    read: number;
    failed: number;
}

interface CampaignPerformance {
    name: string;
    sent: number;
    delivered: number;
    read: number;
    replied: number;
    deliveryRate: number;
    readRate: number;
}

interface TemplateStat {
    name: string;
    used: number;
    readRate: number;
}

export const dailyStats: DailyStat[] = [
    { date: "12 Feb", sent: 1240, delivered: 1180, read: 890, failed: 12 },
    { date: "13 Feb", sent: 1580, delivered: 1520, read: 1100, failed: 8 },
    { date: "14 Feb", sent: 2100, delivered: 2050, read: 1650, failed: 15 },
    { date: "15 Feb", sent: 1890, delivered: 1840, read: 1420, failed: 10 },
    { date: "16 Feb", sent: 2340, delivered: 2280, read: 1780, failed: 6 },
    { date: "17 Feb", sent: 1750, delivered: 1700, read: 1350, failed: 9 },
    { date: "18 Feb", sent: 980, delivered: 950, read: 720, failed: 4 },
];

export const campaignPerformance: CampaignPerformance[] = [
    {
        name: "Promo Valentine 2026",
        sent: 5200,
        delivered: 5080,
        read: 3900,
        replied: 420,
        deliveryRate: 97.7,
        readRate: 76.8,
    },
    {
        name: "Flash Sale Weekend",
        sent: 3400,
        delivered: 3320,
        read: 2450,
        replied: 280,
        deliveryRate: 97.6,
        readRate: 73.8,
    },
    {
        name: "Newsletter Februari",
        sent: 8900,
        delivered: 8650,
        read: 5200,
        replied: 150,
        deliveryRate: 97.2,
        readRate: 60.1,
    },
    {
        name: "Reminder Pembayaran",
        sent: 1200,
        delivered: 1190,
        read: 1050,
        replied: 890,
        deliveryRate: 99.2,
        readRate: 88.2,
    },
    {
        name: "Welcome New Users",
        sent: 450,
        delivered: 448,
        read: 380,
        replied: 120,
        deliveryRate: 99.6,
        readRate: 84.8,
    },
];

export const templateStats: TemplateStat[] = [
    { name: "order_confirmation", used: 4530, readRate: 89.2 },
    { name: "payment_reminder", used: 3200, readRate: 85.5 },
    { name: "welcome_message", used: 2800, readRate: 92.1 },
    { name: "promo_blast", used: 8900, readRate: 62.3 },
    { name: "shipping_update", used: 3100, readRate: 78.9 },
];
