// ============================
// Top-Up Quick Buy dummy data
// ============================

interface TopUpOption {
    id: string;
    name: string;
    price: number;
    priceFormatted: string;
    dailyQuota: number;
    totalQuota: number;
    estimatedDays: string;
    pricePerMessage: string;
    badge?: string;
    badgeColor?: string;
    savings?: string;
    popular?: boolean;
}

// ============================
// STRATEGI REPEAT PURCHASE
// Model: Kuota habis → User langsung top-up tanpa keluar platform
// Conversion: Mudah, cepat, harga pas di kantong
// ============================

export const topUpOptions: TopUpOption[] = [
    {
        id: "topup_mini",
        name: "Mini Top-Up",
        price: 25000,
        priceFormatted: "Rp 25.000",
        dailyQuota: 250,
        totalQuota: 2500,
        estimatedDays: "~10 hari",
        pricePerMessage: "Rp 10/pesan",
        badge: "Coba Dulu",
        badgeColor: "bg-gray-100 text-gray-600",
    },
    {
        id: "topup_starter",
        name: "Starter Top-Up",
        price: 50000,
        priceFormatted: "Rp 50.000",
        dailyQuota: 500,
        totalQuota: 5000,
        estimatedDays: "~10 hari",
        pricePerMessage: "Rp 10/pesan",
        badge: "Pemula",
        badgeColor: "bg-yellow-100 text-yellow-600",
    },
    {
        id: "topup_basic",
        name: "Basic Top-Up",
        price: 70000,
        priceFormatted: "Rp 70.000",
        dailyQuota: 1000,
        totalQuota: 10000,
        estimatedDays: "~10-14 hari",
        pricePerMessage: "Rp 7/pesan",
        badge: "Paling Laku 🔥",
        badgeColor: "bg-blue-100 text-blue-600",
        savings: "Hemat 30%",
        popular: true,
    },
    {
        id: "topup_power",
        name: "Power Top-Up",
        price: 120000,
        priceFormatted: "Rp 120.000",
        dailyQuota: 2000,
        totalQuota: 20000,
        estimatedDays: "~10-15 hari",
        pricePerMessage: "Rp 6/pesan",
        badge: "Best Value 💎",
        badgeColor: "bg-orange-100 text-orange-600",
        savings: "Hemat 40%",
    },
    {
        id: "topup_mega",
        name: "Mega Top-Up",
        price: 200000,
        priceFormatted: "Rp 200.000",
        dailyQuota: 4000,
        totalQuota: 40000,
        estimatedDays: "~10-20 hari",
        pricePerMessage: "Rp 5/pesan",
        badge: "Super Hemat",
        badgeColor: "bg-purple-100 text-purple-600",
        savings: "Hemat 50%",
    },
];

// ============================
// USAGE ALERTS (Trigger point untuk top-up reminder)
// ============================

interface UsageAlert {
    threshold: number; // Percentage
    message: string;
    urgency: "info" | "warning" | "critical";
    cta: string;
}

export const usageAlerts: UsageAlert[] = [
    {
        threshold: 70,
        message: "Kuota Anda sudah 70% terpakai. Siapkan top-up sebelum habis!",
        urgency: "info",
        cta: "Lihat Paket Top-Up",
    },
    {
        threshold: 85,
        message: "Kuota hampir habis! Hanya tersisa 15%. Top-up sekarang untuk tetap aktif.",
        urgency: "warning",
        cta: "Top-Up Sekarang",
    },
    {
        threshold: 95,
        message: "KUOTA KRITIS! Hanya 5% tersisa. Segera top-up agar tidak terputus.",
        urgency: "critical",
        cta: "Top-Up Darurat",
    },
];

// ============================
// PRICING PSYCHOLOGY TIPS
// ============================

export const pricingTips = {
    targetRepeatPurchase: 2.5, // Target user beli 2-3x per bulan
    averageBusinessDays: 22, // Hari kerja per bulan
    optimalQuotaDuration: 10, // Kuota habis dalam 10 hari optimal
    
    // Analisis kompetitor
    competitors: [
        { name: "Fonnte", priceRange: "150k-500k/bulan" },
        { name: "Wablas", priceRange: "100k-300k/bulan" },
        { name: "Woowa", priceRange: "200k-400k/bulan" },
        { name: "Qontak", priceRange: "500k+/bulan" },
    ],
    
    // Our competitive advantage
    advantages: [
        "Entry price 50% lebih murah (Rp50k vs kompetitor Rp100k+)",
        "No commitment - beli sesuai kebutuhan",
        "Kuota tidak expired dalam 1 bulan (fleksibel)",
        "Top-up mudah & instan",
    ],
    
    // Revenue projection
    revenueModel: {
        scenario1: {
            desc: "Conservative: User beli 2x/bulan @ Rp70k",
            monthlyRevenue: 140000,
            yearlyRevenue: 1680000,
        },
        scenario2: {
            desc: "Moderate: User beli 2.5x/bulan @ Rp70k",
            monthlyRevenue: 175000,
            yearlyRevenue: 2100000,
        },
        scenario3: {
            desc: "Optimistic: User beli 3x/bulan @ Rp70k",
            monthlyRevenue: 210000,
            yearlyRevenue: 2520000,
        },
    },
    
    // Conversion strategy
    conversionFunnel: [
        "Fase 1: Gratis trial (100 pesan) → Hook user",
        "Fase 2: Mini top-up Rp25k → Low barrier entry",
        "Fase 3: Basic Rp70k → Sweet spot repeat purchase",
        "Fase 4: Upgrade ke subscription Rp199k → Loyal customer",
    ],
};

// ============================
// PROMO & MARKETING TRIGGERS
// ============================

interface PromoTrigger {
    trigger: string;
    offer: string;
    discount: string;
    cta: string;
}

export const promoTriggers: PromoTrigger[] = [
    {
        trigger: "First purchase",
        offer: "Diskon 20% untuk pembelian pertama",
        discount: "20%",
        cta: "Klaim Diskon Sekarang",
    },
    {
        trigger: "Kuota < 10%",
        offer: "Top-up sekarang dapat bonus 500 pesan!",
        discount: "Bonus 500",
        cta: "Ambil Bonus",
    },
    {
        trigger: "Weekend promo",
        offer: "Weekend Sale! Beli Basic dapat Power harga special",
        discount: "30%",
        cta: "Lihat Promo",
    },
    {
        trigger: "Repeat customer (3x+)",
        offer: "Loyal customer? Upgrade ke Pro cuma Rp149k (dari 199k)",
        discount: "Rp50k OFF", 
        cta: "Upgrade Hemat",
    },
];
