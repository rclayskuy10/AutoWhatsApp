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
        plan: "Pro Plan (Bulanan)",
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
        plan: "Basic (Tahunan)",
        amount: "Rp 990.000",
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
        plan: "Enterprise (Bulanan)",
        amount: "Rp 499.000",
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
        plan: "Pro Plan (Tahunan)",
        amount: "Rp 1.990.000",
        paymentMethod: "Credit Card",
        paymentIcon: "credit_card",
        status: "Sukses",
        statusColor: "bg-green-50 text-green-700 ring-green-600/20",
        date: "11 Okt 2023, 09:15",
    },
];
