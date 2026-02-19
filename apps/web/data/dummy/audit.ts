// ============================
// Keamanan & Audit dummy data
// ============================

export interface AuditLogEntry {
    date: string;
    time: string;
    adminName: string;
    adminInitials: string;
    adminInitialsColor: string;
    module: string;
    moduleColor: string;
    action: string;
    actionCode?: string;
    ip: string;
    status: "Sukses" | "Gagal";
}

export const auditLogs: AuditLogEntry[] = [
    {
        date: "24 Okt 2023",
        time: "14:32:10 WIB",
        adminName: "Super Admin",
        adminInitials: "SA",
        adminInitialsColor: "bg-blue-100 text-blue-600",
        module: "User",
        moduleColor: "bg-purple-50 text-purple-700 ring-purple-700/10",
        action: "Hapus User",
        actionCode: "#USR-8821",
        ip: "192.168.1.104",
        status: "Sukses",
    },
    {
        date: "24 Okt 2023",
        time: "11:20:45 WIB",
        adminName: "Admin Finance",
        adminInitials: "AD",
        adminInitialsColor: "bg-orange-100 text-orange-600",
        module: "Tagihan",
        moduleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        action: "Ubah Harga Paket",
        actionCode: "Pro Monthly",
        ip: "182.44.21.09",
        status: "Sukses",
    },
    {
        date: "23 Okt 2023",
        time: "09:15:22 WIB",
        adminName: "Unknown",
        adminInitials: "UK",
        adminInitialsColor: "bg-gray-200 text-gray-600",
        module: "Sistem",
        moduleColor: "bg-gray-100 text-gray-600 ring-gray-500/10",
        action: "Percobaan Login",
        ip: "112.55.89.21",
        status: "Gagal",
    },
    {
        date: "23 Okt 2023",
        time: "08:00:01 WIB",
        adminName: "Super Admin",
        adminInitials: "SA",
        adminInitialsColor: "bg-blue-100 text-blue-600",
        module: "Sistem",
        moduleColor: "bg-gray-100 text-gray-600 ring-gray-500/10",
        action: "Backup Database Harian",
        ip: "System Auto",
        status: "Sukses",
    },
    {
        date: "22 Okt 2023",
        time: "16:45:12 WIB",
        adminName: "Super Admin",
        adminInitials: "SA",
        adminInitialsColor: "bg-blue-100 text-blue-600",
        module: "Konfigurasi",
        moduleColor: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        action: "Update API Key Payment Gateway",
        ip: "192.168.1.104",
        status: "Sukses",
    },
];
