// ============================
// Manajemen User dummy data
// ============================

export interface UserData {
    name: string;
    role: string;
    roleColor: string;
    email: string;
    username: string;
    initials: string;
    initialsColor: string;
}

export const users: UserData[] = [
    {
        name: "Super Admin",
        role: "Super Admin",
        roleColor: "bg-purple-50 text-purple-700 ring-purple-700/10",
        email: "super@wablast.io",
        username: "@superadmin",
        initials: "SA",
        initialsColor: "bg-wa-green/10 text-wa-green",
    },
    {
        name: "Andi Pratama",
        role: "Admin",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "andi@wablast.io",
        username: "@andipratama",
        initials: "AD",
        initialsColor: "bg-blue-100 text-blue-600",
    },
    {
        name: "Siti Putri",
        role: "Support",
        roleColor: "bg-green-50 text-green-700 ring-green-600/20",
        email: "siti@wablast.io",
        username: "@sitiputri",
        initials: "SP",
        initialsColor: "bg-green-100 text-green-600",
    },
    {
        name: "Budi Dharma",
        role: "Admin",
        roleColor: "bg-blue-50 text-blue-700 ring-blue-700/10",
        email: "budi@wablast.io",
        username: "@budidharma",
        initials: "BD",
        initialsColor: "bg-yellow-100 text-yellow-600",
    },
    {
        name: "Riko Kurniawan",
        role: "Support",
        roleColor: "bg-green-50 text-green-700 ring-green-600/20",
        email: "riko@wablast.io",
        username: "@rikokurniawan",
        initials: "RK",
        initialsColor: "bg-gray-100 text-gray-600",
    },
];
