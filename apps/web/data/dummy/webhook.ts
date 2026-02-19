// ============================
// Webhook Log dummy data
// ============================

interface WebhookLog {
    id: string;
    event: string;
    url: string;
    status: number;
    timestamp: string;
    duration: number;
    payload: string;
}

export const webhookLogs: WebhookLog[] = [
    {
        id: "wh_evt_001",
        event: "message.sent",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 14:25:03",
        duration: 124,
        payload: '{"messageId":"msg_abc123","status":"sent","to":"628123..."}',
    },
    {
        id: "wh_evt_002",
        event: "message.delivered",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 14:25:08",
        duration: 89,
        payload: '{"messageId":"msg_abc123","status":"delivered","to":"628123..."}',
    },
    {
        id: "wh_evt_003",
        event: "message.read",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 14:26:45",
        duration: 102,
        payload: '{"messageId":"msg_abc123","status":"read","to":"628123..."}',
    },
    {
        id: "wh_evt_004",
        event: "message.incoming",
        url: "https://example.com/webhook/whatsapp",
        status: 500,
        timestamp: "18 Feb 2026, 14:28:12",
        duration: 5023,
        payload: '{"from":"628987...","message":"Halo, saya mau tanya..."}',
    },
    {
        id: "wh_evt_005",
        event: "device.disconnected",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 13:50:00",
        duration: 156,
        payload: '{"deviceId":"dev_001","reason":"connection_lost"}',
    },
    {
        id: "wh_evt_006",
        event: "campaign.completed",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 12:00:15",
        duration: 201,
        payload: '{"campaignId":"camp_005","totalSent":1200,"delivered":1190}',
    },
    {
        id: "wh_evt_007",
        event: "message.failed",
        url: "https://example.com/webhook/whatsapp",
        status: 408,
        timestamp: "18 Feb 2026, 11:45:30",
        duration: 30000,
        payload: '{"messageId":"msg_xyz789","error":"timeout","to":"628555..."}',
    },
    {
        id: "wh_evt_008",
        event: "message.sent",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 11:30:00",
        duration: 95,
        payload: '{"messageId":"msg_def456","status":"sent","to":"628777..."}',
    },
    {
        id: "wh_evt_009",
        event: "contact.updated",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 10:15:22",
        duration: 78,
        payload: '{"contactId":"con_123","action":"tag_added","tag":"vip"}',
    },
    {
        id: "wh_evt_010",
        event: "message.incoming",
        url: "https://example.com/webhook/whatsapp",
        status: 200,
        timestamp: "18 Feb 2026, 09:40:11",
        duration: 110,
        payload: '{"from":"628444...","message":"Terima kasih!"}',
    },
];

export const eventTypes = [
    "Semua Event",
    "message.sent",
    "message.delivered",
    "message.read",
    "message.incoming",
    "message.failed",
    "device.disconnected",
    "campaign.completed",
    "contact.updated",
];
