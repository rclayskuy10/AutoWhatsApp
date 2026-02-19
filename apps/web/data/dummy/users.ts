// ============================
// Manajemen User dummy data
// ============================

export interface UserData {
    id: string;
    name: string;
    role: string;
    roleColor: string;
    email: string;
    username: string;
    initials: string;
    initialsColor: string;
    status: "active" | "inactive";
    createdAt: string;
    lastLogin: string;
}

export const users: UserData[] = [
    {
        id: "usr_001",
        name: "Super Admin",
        role: "Super Admin",
        roleColor: "bg-purple-50 text-purple-700 ring-purple-700/10",
        email: "super@wablast.io",
        username: "@superadmin",
        initials: "SA",
        initialsColor: "bg-wa-green/10 text-wa-green",
        status: "active",
        createdAt: "2025-01-15",
        lastLogin: "2026-02-19",
    },
    {
        id: "usr_002",
        name: "Andi Pratama",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "andi@wablast.io",
        username: "@andipratama",
        initials: "AD",
        initialsColor: "bg-blue-100 text-blue-600",
        status: "active",
        createdAt: "2025-03-10",
        lastLogin: "2026-02-18",
    },
    {
        id: "usr_003",
        name: "Siti Putri",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "siti@wablast.io",
        username: "@sitiputri",
        initials: "SP",
        initialsColor: "bg-green-100 text-green-600",
        status: "active",
        createdAt: "2025-05-22",
        lastLogin: "2026-02-17",
    },
    {
        id: "usr_004",
        name: "Budi Dharma",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "budi@wablast.io",
        username: "@budidharma",
        initials: "BD",
        initialsColor: "bg-yellow-100 text-yellow-600",
        status: "active",
        createdAt: "2025-06-01",
        lastLogin: "2026-02-16",
    },
    {
        id: "usr_005",
        name: "Riko Kurniawan",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "riko@wablast.io",
        username: "@rikokurniawan",
        initials: "RK",
        initialsColor: "bg-gray-100 text-gray-600",
        status: "inactive",
        createdAt: "2025-07-14",
        lastLogin: "2026-01-05",
    },
    {
        id: "usr_006",
        name: "Dewi Anggraini",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "dewi@wablast.io",
        username: "@dewianggraini",
        initials: "DA",
        initialsColor: "bg-orange-100 text-orange-600",
        status: "active",
        createdAt: "2025-08-20",
        lastLogin: "2026-02-15",
    },
    {
        id: "usr_007",
        name: "Fajar Hidayat",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "fajar@wablast.io",
        username: "@fajarhidayat",
        initials: "FH",
        initialsColor: "bg-purple-100 text-purple-600",
        status: "active",
        createdAt: "2025-09-05",
        lastLogin: "2026-02-14",
    },
    {
        id: "usr_008",
        name: "Lina Marlina",
        role: "User",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "lina@wablast.io",
        username: "@linamarlina",
        initials: "LM",
        initialsColor: "bg-pink-100 text-pink-600",
        status: "inactive",
        createdAt: "2025-10-12",
        lastLogin: "2025-12-20",
    },
];
