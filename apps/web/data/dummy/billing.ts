// ============================
// Tagihan (Billing) dummy data
// ============================

export interface PricingPlan {
    name: string;
    description: string;
    priceMonthly: string;
    priceYearly: string;
    features: string[];
    popular?: boolean;
    badge?: string;
    badgeColor?: string;
    type?: "topup" | "subscription";
}

// ============================
// ANALISIS PASAR & STRATEGI MVP
// Kompetitor: Fonnte (150k-500k), Wablas (100k-300k), Woowa (200k-400k)
// Strategi: Entry barrier rendah + repeat purchase model
// Target: User beli 2-3x per bulan dengan paket top-up
// ============================

export const billingPlans: PricingPlan[] = [
    // === TOP-UP PACKS (Strategi repeat purchase) ===
    {
        name: "Starter Pack",
        description: "Entry point rendah untuk coba fitur",
        priceMonthly: "Rp 54.900",
        priceYearly: "Rp 49.900",
        badge: "Habis ~10 hari",
        badgeColor: "bg-yellow-100 text-yellow-600",
        type: "topup",
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
        description: "Pilihan terbaik untuk pemula & bisnis kecil",
        priceMonthly: "Rp 74.900",
        priceYearly: "Rp 69.900",
        popular: true,
        badge: "Paling Laku 🔥",
        badgeColor: "bg-blue-100 text-blue-600",
        type: "topup",
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
        description: "Lebih banyak pesan, lebih hemat per pesan",
        priceMonthly: "Rp 125.900",
        priceYearly: "Rp 119.900",
        badge: "Best Value",
        badgeColor: "bg-orange-100 text-orange-600",
        type: "topup",
        features: [
            "2.000 pesan/hari",
            "Total 20.000 pesan (one-time)",
            "Unlimited Perangkat",
            "Template unlimited",
            "Auto-reply advanced",
            "Webhook integration",
        ],
    },

    // === MONTHLY SUBSCRIPTIONS (Auto-renew) ===
    {
        name: "Pro Monthly",
        description: "Langganan bulanan untuk bisnis stabil",
        priceMonthly: "Rp 199.000",
        priceYearly: "Rp 1.990.000",
        badge: "Hemat 17%",
        badgeColor: "bg-purple-100 text-purple-600",
        type: "subscription",
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
        priceMonthly: "Rp 349.000",
        priceYearly: "Rp 3.490.000",
        badge: "Hemat 17%",
        badgeColor: "bg-indigo-100 text-indigo-600",
        type: "subscription",
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
        description: "Solusi custom untuk organisasi besar",
        priceMonthly: "Custom",
        priceYearly: "Custom",
        badge: "Hubungi Sales",
        badgeColor: "bg-gray-100 text-gray-800",
        type: "subscription",
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
