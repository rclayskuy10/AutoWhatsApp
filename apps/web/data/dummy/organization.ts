// ============================
// Organisasi (Organization) dummy data
// ============================

export interface TeamMember {
    id: number;
    name: string;
    initials: string;
    email: string;
    role: string;
    roleColor: string;
    status: string;
    statusColor: string;
}

export const roleOptions = [
    { label: "Admin", color: "bg-blue-100 text-blue-800" },
    { label: "Staf", color: "bg-gray-100 text-gray-800" },
];

export const initialMembers: TeamMember[] = [
    {
        id: 1,
        name: "John Developer",
        initials: "JD",
        email: "john@devhouse.com",
        role: "Pemilik",
        roleColor: "bg-purple-100 text-purple-800",
        status: "Aktif",
        statusColor: "bg-green-100 text-green-800",
    },
    {
        id: 2,
        name: "Sarah Smith",
        initials: "SS",
        email: "sarah@devhouse.com",
        role: "Admin",
        roleColor: "bg-blue-100 text-blue-800",
        status: "Aktif",
        statusColor: "bg-green-100 text-green-800",
    },
    {
        id: 3,
        name: "Mike Ross",
        initials: "MR",
        email: "mike@devhouse.com",
        role: "Staf",
        roleColor: "bg-gray-100 text-gray-800",
        status: "Pending",
        statusColor: "bg-yellow-100 text-yellow-800",
    },
];

/** Default organization profile values */
export const defaultOrgProfile = {
    name: "Dev House Ltd.",
    email: "contact@devhouse.com",
    address: "Jl. Jendral Sudirman No. 1, Jakarta Pusat, Indonesia",
};
