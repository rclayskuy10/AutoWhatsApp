// ============================
// Paket Langganan (Subscription Packages) dummy data
// ============================

export interface PaketData {
    name: string;
    description: string;
    icon: string;
    iconColor: string;
    priceMonthly: string;
    priceYearly: string;
    dailyLimit: string;
    dailyLimitBadge: boolean;
    monthlyLimit: string;
    monthlyLimitBadge: boolean;
    deviceCount: string;
    deviceIcon: string;
    type?: "topup" | "subscription";
    badge?: string;
}

// ============================
// STRATEGI MVP: HYBRID MODEL (Top-up + Subscription)
// Tujuan: User repeat purchase 2-3x per bulan
// ============================

export const packages: PaketData[] = [
    // === TOP-UP PACKS (One-time purchase, habis pakai) ===
    {
        name: "Starter Pack",
        description: "Coba dulu, cocok untuk testing",
        icon: "bolt",
        iconColor: "bg-yellow-100 text-yellow-600",
        priceMonthly: "Rp 50.000",
        priceYearly: "Rp 50.000",
        dailyLimit: "500 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "5.000 Total Pesan",
        monthlyLimitBadge: false,
        deviceCount: "1 Perangkat",
        deviceIcon: "smartphone",
        type: "topup",
        badge: "Habis ~10 hari",
    },
    {
        name: "Basic Pack",
        description: "Untuk bisnis kecil yang baru mulai",
        icon: "rocket_launch",
        iconColor: "bg-blue-100 text-blue-600",
        priceMonthly: "Rp 70.000",
        priceYearly: "Rp 70.000",
        dailyLimit: "1.000 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "10.000 Total Pesan",
        monthlyLimitBadge: false,
        deviceCount: "1 Perangkat",
        deviceIcon: "smartphone",
        type: "topup",
        badge: "Paling Laku",
    },
    {
        name: "Power Pack",
        description: "Lebih hemat untuk volume menengah",
        icon: "flash_on",
        iconColor: "bg-orange-100 text-orange-600",
        priceMonthly: "Rp 120.000",
        priceYearly: "Rp 120.000",
        dailyLimit: "2.000 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "20.000 Total Pesan",
        monthlyLimitBadge: false,
        deviceCount: "2 Perangkat",
        deviceIcon: "devices",
        type: "topup",
        badge: "Best Value",
    },

    // === MONTHLY SUBSCRIPTIONS (Auto-renew tiap bulan) ===
    {
        name: "Pro Monthly",
        description: "Langganan bulanan untuk bisnis aktif",
        icon: "diamond",
        iconColor: "bg-purple-100 text-purple-600",
        priceMonthly: "Rp 199.000",
        priceYearly: "Rp 1.990.000",
        dailyLimit: "5.000 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "150.000 Pesan",
        monthlyLimitBadge: false,
        deviceCount: "5 Perangkat",
        deviceIcon: "devices",
        type: "subscription",
        badge: "Hemat 17%",
    },
    {
        name: "Business",
        description: "Untuk perusahaan dengan volume tinggi",
        icon: "business_center",
        iconColor: "bg-indigo-100 text-indigo-600",
        priceMonthly: "Rp 349.000",
        priceYearly: "Rp 3.490.000",
        dailyLimit: "10.000 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "300.000 Pesan",
        monthlyLimitBadge: false,
        deviceCount: "10 Perangkat",
        deviceIcon: "domain",
        type: "subscription",
        badge: "Hemat 17%",
    },
    {
        name: "Enterprise",
        description: "Solusi khusus untuk organisasi besar",
        icon: "apartment",
        iconColor: "bg-gray-100 text-gray-600",
        priceMonthly: "Custom",
        priceYearly: "Custom",
        dailyLimit: "Unlimited",
        dailyLimitBadge: true,
        monthlyLimit: "Unlimited",
        monthlyLimitBadge: true,
        deviceCount: "Unlimited",
        deviceIcon: "domain",
        type: "subscription",
    },
];
