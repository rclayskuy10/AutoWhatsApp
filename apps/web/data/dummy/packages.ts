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
    features?: string[]; // Add features array
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
        priceMonthly: "Rp 54.900",
        priceYearly: "Rp 49.900",
        dailyLimit: "500 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "5.000 Total Pesan",
        monthlyLimitBadge: false,
        deviceCount: "Unlimited Perangkat",
        deviceIcon: "smartphone",
        type: "topup",
        badge: "Habis ~10 hari",
        features: [
            "500 pesan/hari",
            "Total 5.000 pesan (one-time)",
            "Unlimited Perangkat",
            "Support email",
            "Dashboard analytics",
        ],
    },
    {
        name: "Basic Pack",
        description: "Untuk bisnis kecil yang baru mulai",
        icon: "rocket_launch",
        iconColor: "bg-blue-100 text-blue-600",
        priceMonthly: "Rp 74.900",
        priceYearly: "Rp 69.900",
        dailyLimit: "1.000 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "10.000 Total Pesan",
        monthlyLimitBadge: false,
        deviceCount: "Unlimited Perangkat",
        deviceIcon: "smartphone",
        type: "topup",
        badge: "Paling Laku 🔥",
        features: [
            "1.000 pesan/hari",
            "Total 10.000 pesan (one-time)",
            "Unlimited Perangkat",
            "Template message",
            "Auto-reply basic",
            "Laporan lengkap",
        ],
    },
    {
        name: "Power Pack",
        description: "Lebih hemat untuk volume menengah",
        icon: "flash_on",
        iconColor: "bg-orange-100 text-orange-600",
        priceMonthly: "Rp 125.900",
        priceYearly: "Rp 119.900",
        dailyLimit: "2.000 Pesan",
        dailyLimitBadge: false,
        monthlyLimit: "20.000 Total Pesan",
        monthlyLimitBadge: false,
        deviceCount: "Unlimited Perangkat",
        deviceIcon: "devices",
        type: "topup",
        badge: "Best Value",
        features: [
            "2.000 pesan/hari",
            "Total 20.000 pesan (one-time)",
            "Unlimited Perangkat",
            "Template unlimited",
            "Auto-reply advanced",
            "Webhook integration",
        ],
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
        deviceCount: "Unlimited Perangkat",
        deviceIcon: "devices",
        type: "subscription",
        badge: "Hemat 17%",
        features: [
            "5.000 pesan/hari",
            "150.000 pesan/bulan (reset tiap bulan)",
            "Unlimited Perangkat",
            "API access penuh",
            "Chatbot builder",
            "Priority support",
        ],
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
        deviceCount: "Unlimited Perangkat",
        deviceIcon: "domain",
        type: "subscription",
        badge: "Hemat 17%",
        features: [
            "10.000 pesan/hari",
            "300.000 pesan/bulan",
            "Unlimited Perangkat",
            "API & Webhook lengkap",
            "Multi-admin dashboard",
            "Account manager dedicated",
            "SLA 99.9% uptime",
        ],
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
        badge: "Hubungi Sales",
        features: [
            "Unlimited pesan & perangkat",
            "Custom integration",
            "White-label option",
            "On-premise deployment",
            "24/7 dedicated support",
            "Custom SLA",
            "Training & onboarding",
        ],
    },
];
