// ============================
// Kontak (Contacts) dummy data
// ============================

export interface Contact {
    id: number;
    name: string;
    company: string;
    phone: string;
    group: string;
    groupColor: string;
    status: "Aktif" | "Non-aktif";
    initials: string;
    initialsColor: string;
}

export const groupOptions = [
    { label: "Pelanggan VIP", color: "bg-purple-100 text-purple-800" },
    { label: "Prospek Baru", color: "bg-yellow-100 text-yellow-800" },
    { label: "Karyawan", color: "bg-blue-100 text-blue-800" },
    { label: "Umum", color: "bg-gray-100 text-gray-800" },
];

export const initialsColors = [
    "bg-blue-100 text-blue-600",
    "bg-pink-100 text-pink-600",
    "bg-orange-100 text-orange-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-red-100 text-red-600",
];

export const initialContacts: Contact[] = [
    {
        id: 1,
        name: "Andi Darmawan",
        company: "PT. Maju Mundur",
        phone: "+62 812-3456-7890",
        group: "Pelanggan VIP",
        groupColor: "bg-purple-100 text-purple-800",
        status: "Aktif",
        initials: "AD",
        initialsColor: "bg-blue-100 text-blue-600",
    },
    {
        id: 2,
        name: "Budi Santoso",
        company: "Freelancer",
        phone: "+62 813-9876-5432",
        group: "Prospek Baru",
        groupColor: "bg-yellow-100 text-yellow-800",
        status: "Aktif",
        initials: "BS",
        initialsColor: "bg-pink-100 text-pink-600",
    },
    {
        id: 3,
        name: "Citra Melati",
        company: "",
        phone: "+62 815-5555-6666",
        group: "Umum",
        groupColor: "bg-gray-100 text-gray-800",
        status: "Non-aktif",
        initials: "CM",
        initialsColor: "bg-pink-100 text-pink-600",
    },
    {
        id: 4,
        name: "Dani Saputra",
        company: "Toko Sebelah",
        phone: "+62 857-7788-9900",
        group: "Karyawan",
        groupColor: "bg-blue-100 text-blue-800",
        status: "Aktif",
        initials: "DS",
        initialsColor: "bg-orange-100 text-orange-600",
    },
    {
        id: 5,
        name: "Eka Wijaya",
        company: "",
        phone: "+62 811-2233-4455",
        group: "Pelanggan VIP",
        groupColor: "bg-purple-100 text-purple-800",
        status: "Aktif",
        initials: "EW",
        initialsColor: "bg-orange-100 text-orange-600",
    },
];
