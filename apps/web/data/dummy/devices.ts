// ============================
// Perangkat (Devices) dummy data
// ============================

export interface Device {
    id: number;
    name: string;
    phone: string;
    status: "connected" | "disconnected";
    battery: string;
    batteryIcon: string;
    lastSync: string;
}

export const initialDevices: Device[] = [
    {
        id: 1,
        name: "Sales WA 01",
        phone: "+62 812-3456-7890",
        status: "connected",
        battery: "85%",
        batteryIcon: "battery_5_bar",
        lastSync: "Sinkronisasi: 2 menit lalu",
    },
    {
        id: 2,
        name: "Support Center",
        phone: "+62 819-8765-4321",
        status: "connected",
        battery: "92%",
        batteryIcon: "battery_full_alt",
        lastSync: "Sinkronisasi: Baru saja",
    },
    {
        id: 3,
        name: "Marketing Blast #3",
        phone: "+62 857-1122-3344",
        status: "disconnected",
        battery: "--%",
        batteryIcon: "battery_unknown",
        lastSync: "Sinkronisasi: 2 hari lalu",
    },
    {
        id: 4,
        name: "Bot Notifikasi",
        phone: "+62 813-5566-7788",
        status: "connected",
        battery: "60%",
        batteryIcon: "battery_4_bar",
        lastSync: "Sinkronisasi: 15 menit lalu",
    },
    {
        id: 5,
        name: "Backup Number",
        phone: "+62 858-9900-1122",
        status: "disconnected",
        battery: "10%",
        batteryIcon: "battery_alert",
        lastSync: "Sinkronisasi: 5 jam lalu",
    },
];
