// ============================
// Transaksi (Transactions) dummy data
// ============================

export interface TransactionData {
    id: string;
    userName: string;
    userEmail: string;
    userInitials: string;
    userInitialsColor: string;
    plan: string;
    amount: string;
    paymentMethod: string;
    paymentIcon: string;
    status: string;
    statusColor: string;
    date: string;
}

export const transactions: TransactionData[] = [
    {
        id: "#TRX-82910",
        userName: "Ahmad Hidayat",
        userEmail: "ahmad.h@example.com",
        userInitials: "AH",
        userInitialsColor: "bg-blue-100 text-blue-600",
        plan: "Pro Monthly",
        amount: "Rp 199.000",
        paymentMethod: "Credit Card",
        paymentIcon: "credit_card",
        status: "Sukses",
        statusColor: "bg-green-50 text-green-700 ring-green-600/20",
        date: "12 Okt 2023, 14:30",
    },
    {
        id: "#TRX-82911",
        userName: "Siti Rahma",
        userEmail: "siti.rahma@biz.id",
        userInitials: "SR",
        userInitialsColor: "bg-purple-100 text-purple-600",
        plan: "Basic Pack",
        amount: "Rp 74.900",
        paymentMethod: "Bank Transfer",
        paymentIcon: "account_balance",
        status: "Pending",
        statusColor: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        date: "12 Okt 2023, 14:45",
    },
    {
        id: "#TRX-82909",
        userName: "Budi Pratama",
        userEmail: "budi.p@tech.co",
        userInitials: "BP",
        userInitialsColor: "bg-orange-100 text-orange-600",
        plan: "Business",
        amount: "Rp 349.000",
        paymentMethod: "E-Wallet",
        paymentIcon: "wallet",
        status: "Gagal",
        statusColor: "bg-red-50 text-red-700 ring-red-600/20",
        date: "12 Okt 2023, 12:10",
    },
    {
        id: "#TRX-82908",
        userName: "Dewi Nuraini",
        userEmail: "dewi.n@store.id",
        userInitials: "DN",
        userInitialsColor: "bg-teal-100 text-teal-600",
        plan: "Pro Monthly (Tahunan)",
        amount: "Rp 1.990.000",
        paymentMethod: "Credit Card",
        paymentIcon: "credit_card",
        status: "Sukses",
        statusColor: "bg-green-50 text-green-700 ring-green-600/20",
        date: "11 Okt 2023, 09:15",
    },
    {
        id: "#TRX-82907",
        userName: "Rina Susanti",
        userEmail: "rina.s@startup.id",
        userInitials: "RS",
        userInitialsColor: "bg-pink-100 text-pink-600",
        plan: "Starter Pack",
        amount: "Rp 54.900",
        paymentMethod: "E-Wallet",
        paymentIcon: "wallet",
        status: "Sukses",
        statusColor: "bg-green-50 text-green-700 ring-green-600/20",
        date: "11 Okt 2023, 08:30",
    },
    {
        id: "#TRX-82906",
        userName: "Hendra Wijaya",
        userEmail: "hendra.w@corp.com",
        userInitials: "HW",
        userInitialsColor: "bg-indigo-100 text-indigo-600",
        plan: "Business (Tahunan)",
        amount: "Rp 3.490.000",
        paymentMethod: "Bank Transfer",
        paymentIcon: "account_balance",
        status: "Sukses",
        statusColor: "bg-green-50 text-green-700 ring-green-600/20",
        date: "10 Okt 2023, 16:20",
    },
    {
        id: "#TRX-82905",
        userName: "Linda Kartika",
        userEmail: "linda.k@online.shop",
        userInitials: "LK",
        userInitialsColor: "bg-green-100 text-green-600",
        plan: "Power Pack",
        amount: "Rp 125.900",
        paymentMethod: "Credit Card",
        paymentIcon: "credit_card",
        status: "Sukses",
        statusColor: "bg-green-50 text-green-700 ring-green-600/20",
        date: "10 Okt 2023, 14:55",
    },
];
