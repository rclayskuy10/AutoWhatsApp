"use client";

import { useState, useEffect } from "react";
import { type ChatRule, initialRules } from "@/data/dummy/chatbot";

export default function ChatbotPage() {
    const [userRole, setUserRole] = useState<string>("");
    const [rules, setRules] = useState<ChatRule[]>(initialRules);
    const [showCreator, setShowCreator] = useState(false);
    const [testMessage, setTestMessage] = useState("");
    const [testResult, setTestResult] = useState<string | null>(null);
    const [newRule, setNewRule] = useState({
        name: "",
        trigger: "",
        triggerType: "keyword" as ChatRule["triggerType"],
        response: "",
    });

    // Search & filter for admin rules
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editRule, setEditRule] = useState<ChatRule | null>(null);

    // Delete confirmation
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<ChatRule | null>(null);

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Get user role
    useEffect(() => {
        const role = localStorage.getItem("userRole") || "user";
        setUserRole(role);
    }, []);

    const toggleRule = (id: string) => {
        setRules(rules.map((r) => r.id === id ? { ...r, isActive: !r.isActive } : r));
    };

    const openDeleteModal = (rule: ChatRule) => {
        setDeleteTarget(rule);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setRules(rules.filter((r) => r.id !== deleteTarget.id));
        setShowDeleteModal(false);
        setDeleteTarget(null);
        showToast("Aturan berhasil dihapus");
    };

    // EDIT
    const openEditModal = (rule: ChatRule) => {
        setEditRule({ ...rule });
        setShowEditModal(true);
    };

    const handleEditRule = () => {
        if (!editRule || !editRule.name || !editRule.response) return;
        setRules(rules.map(r => r.id === editRule.id ? { ...editRule } : r));
        setShowEditModal(false);
        setEditRule(null);
        showToast("Aturan berhasil diperbarui");
    };

    // Filter rules for admin view
    const filteredRules = rules.filter((rule) => {
        const matchSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rule.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rule.response.toLowerCase().includes(searchQuery.toLowerCase());
        const matchType = filterType === "all" || rule.triggerType === filterType || (filterType === "all-msg" && rule.triggerType === "all");
        return matchSearch && matchType;
    });

    const handleTestMessage = () => {
        if (!testMessage.trim()) return;
        const lowerMsg = testMessage.toLowerCase();
        const matchedRule = rules
            .filter((r) => r.isActive)
            .sort((a, b) => a.priority - b.priority)
            .find((rule) => {
                if (rule.triggerType === "all") return true;
                const keywords = rule.trigger.split(",").map((k) => k.trim().toLowerCase());
                return keywords.some((kw) => lowerMsg.includes(kw));
            });

        if (matchedRule) {
            setTestResult(matchedRule.response);
        } else {
            setTestResult("❌ Tidak ada aturan yang cocok dengan pesan ini. Pesan akan diteruskan ke inbox manual.");
        }
    };

    const handleCreateRule = () => {
        if (!newRule.name || !newRule.response) return;
        const rule: ChatRule = {
            id: Date.now().toString(),
            ...newRule,
            isActive: true,
            priority: rules.length + 1,
            matchCount: 0,
            lastTriggered: "Belum pernah",
        };
        setRules([...rules, rule]);
        setNewRule({ name: "", trigger: "", triggerType: "keyword", response: "" });
        setShowCreator(false);
        showToast("Aturan baru berhasil dibuat");
    };

    const activeCount = rules.filter((r) => r.isActive).length;
    const totalMatches = rules.reduce((a, b) => a + b.matchCount, 0);
    const isAdmin = userRole === "super_admin";

    // User biasa - hanya bisa chat
    if (!isAdmin) {
        return (
            <div className="p-4 md:p-8 space-y-6">
                {/* Toast */}
                {toast && (
                    <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                        <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                        {toast.message}
                    </div>
                )}

                {/* Title */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Chatbot Assistant</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Tanyakan apapun tentang layanan kami, chatbot akan menjawab secara otomatis
                        </p>
                    </div>
                </div>

                {/* Test Panel untuk User */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-wa-green text-[20px]">smart_toy</span>
                        Chat dengan Bot
                    </h3>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={testMessage}
                            onChange={(e) => {
                                setTestMessage(e.target.value);
                                setTestResult(null);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleTestMessage()}
                            placeholder="Ketik pesan Anda... (contoh: halo, berapa harganya?)"
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 focus:border-wa-green"
                        />
                        <button
                            onClick={handleTestMessage}
                            className="px-4 py-2.5 bg-wa-green hover:bg-wa-dark text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[18px]">send</span>
                            Kirim
                        </button>
                    </div>

                    {testResult && (
                        <div className="bg-wa-light/50 rounded-lg p-4 border border-wa-green/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-wa-green text-[18px]">smart_toy</span>
                                <span className="text-xs font-medium text-wa-green">Bot Response</span>
                            </div>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{testResult}</p>
                        </div>
                    )}
                </div>

                {/* Info untuk User */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 mt-0.5 text-[20px]">info</span>
                    <div className="text-sm text-blue-800">
                        Chatbot ini dapat menjawab pertanyaan umum secara otomatis 24/7. 
                        Jika pertanyaan Anda belum terjawab, tim support kami akan segera membantu Anda.
                    </div>
                </div>
            </div>
        );
    }

    // Admin - full management
    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-wa-green" : "bg-red-500"}`}>
                    <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Chatbot & Auto-Reply</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Atur balasan otomatis berdasarkan kata kunci untuk pesan masuk
                    </p>
                </div>
                <button
                    onClick={() => setShowCreator(!showCreator)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-wa-green hover:bg-wa-dark text-white rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Buat Aturan Baru
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-wa-green text-[20px]">smart_toy</span>
                        <span className="text-xs text-gray-500">Total Aturan</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{rules.length}</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-green-600 text-[20px]">toggle_on</span>
                        <span className="text-xs text-gray-500">Aktif</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-blue-600 text-[20px]">reply</span>
                        <span className="text-xs text-gray-500">Total Auto-Reply</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{totalMatches.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-purple-600 text-[20px]">speed</span>
                        <span className="text-xs text-gray-500">Avg Response</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">&lt;1s</div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-wa-green focus:ring-wa-green sm:text-sm"
                        placeholder="Cari nama aturan, kata kunci, atau respons..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Tipe:</label>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-wa-green focus:border-wa-green sm:text-sm rounded-lg"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">Semua Tipe</option>
                        <option value="keyword">Keyword</option>
                        <option value="exact">Exact Match</option>
                        <option value="regex">Regex</option>
                        <option value="all-msg">Semua Pesan</option>
                    </select>
                </div>
            </div>

            {/* Create Rule Form */}
            {showCreator && (
                <div className="bg-white rounded-xl border border-wa-green/30 shadow-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-wa-green text-[20px]">add_circle</span>
                        Buat Aturan Auto-Reply Baru
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Nama Aturan</label>
                            <input
                                type="text"
                                value={newRule.name}
                                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                                placeholder="contoh: Info Promo"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 focus:border-wa-green"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Tipe Trigger</label>
                            <select
                                value={newRule.triggerType}
                                onChange={(e) => setNewRule({ ...newRule, triggerType: e.target.value as ChatRule["triggerType"] })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 bg-white"
                            >
                                <option value="keyword">Keyword (mengandung kata)</option>
                                <option value="exact">Exact Match (persis sama)</option>
                                <option value="regex">Regex Pattern</option>
                                <option value="all">Semua Pesan (fallback)</option>
                            </select>
                        </div>
                    </div>
                    {newRule.triggerType !== "all" && (
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Kata Kunci (pisahkan dengan koma)
                            </label>
                            <input
                                type="text"
                                value={newRule.trigger}
                                onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
                                placeholder="contoh: promo, diskon, sale, potongan"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 focus:border-wa-green"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Pesan Balasan
                        </label>
                        <textarea
                            value={newRule.response}
                            onChange={(e) => setNewRule({ ...newRule, response: e.target.value })}
                            rows={4}
                            placeholder="Ketik pesan balasan otomatis..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 focus:border-wa-green resize-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCreateRule}
                            className="px-4 py-2 bg-wa-green hover:bg-wa-dark text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Simpan Aturan
                        </button>
                        <button
                            onClick={() => setShowCreator(false)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}

            {/* Rules List */}
            <div className="space-y-3">
                {filteredRules.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">smart_toy</span>
                        <p className="text-gray-500 text-sm">Tidak ada aturan ditemukan.</p>
                    </div>
                )}
                {filteredRules.map((rule) => (
                    <div
                        key={rule.id}
                        className={`bg-white rounded-xl border p-5 transition-all ${rule.isActive ? "border-gray-200" : "border-gray-200 opacity-60"
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-gray-800">{rule.name}</h3>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rule.triggerType === "keyword"
                                        ? "bg-blue-100 text-blue-700"
                                        : rule.triggerType === "exact"
                                            ? "bg-purple-100 text-purple-700"
                                            : rule.triggerType === "regex"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}>
                                        {rule.triggerType}
                                    </span>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rule.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                        {rule.isActive ? "Aktif" : "Nonaktif"}
                                    </span>
                                </div>

                                {rule.trigger && (
                                    <div className="mb-2">
                                        <span className="text-xs text-gray-400">Trigger: </span>
                                        <span className="text-xs text-gray-600">
                                            {rule.trigger.split(",").map((kw, i) => (
                                                <code key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs mr-1">
                                                    {kw.trim()}
                                                </code>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                <div className="bg-gray-50 rounded-lg p-3 mb-2">
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">
                                        {rule.response}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">reply</span>
                                        {rule.matchCount.toLocaleString()} kali digunakan
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        Terakhir: {rule.lastTriggered}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                    onClick={() => toggleRule(rule.id)}
                                    className={`p-2 rounded-lg transition-colors ${rule.isActive
                                        ? "text-green-600 hover:bg-green-50"
                                        : "text-gray-400 hover:bg-gray-100"
                                        }`}
                                    title={rule.isActive ? "Nonaktifkan" : "Aktifkan"}
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {rule.isActive ? "toggle_on" : "toggle_off"}
                                    </span>
                                </button>
                                <button
                                    onClick={() => openEditModal(rule)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-wa-green hover:bg-green-50 transition-colors"
                                    title="Edit"
                                >
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button
                                    onClick={() => openDeleteModal(rule)}
                                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    title="Hapus"
                                >
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Test Panel */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-wa-green">science</span>
                    Test Auto-Reply
                </h3>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={testMessage}
                        onChange={(e) => {
                            setTestMessage(e.target.value);
                            setTestResult(null);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleTestMessage()}
                        placeholder="Ketik pesan test... (contoh: halo, berapa harganya?)"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wa-green/30 focus:border-wa-green"
                    />
                    <button
                        onClick={handleTestMessage}
                        className="px-4 py-2.5 bg-wa-green hover:bg-wa-dark text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        Test
                    </button>
                </div>

                {testResult && (
                    <div className="bg-wa-light/50 rounded-lg p-4 border border-wa-green/20">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-wa-green text-[18px]">smart_toy</span>
                            <span className="text-xs font-medium text-wa-green">Bot Response</span>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{testResult}</p>
                    </div>
                )}
            </div>

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-500 mt-0.5">tips_and_updates</span>
                <div className="text-sm text-amber-800">
                    <strong>Tips:</strong> Aturan diproses berdasarkan prioritas (dari atas ke bawah).
                    Aturan pertama yang cocok akan digunakan. Gunakan aturan &quot;Semua Pesan&quot; sebagai
                    fallback untuk menangani pesan yang tidak cocok dengan aturan lainnya.
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && editRule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Edit Aturan</h3>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Aturan *</label>
                                    <input
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                        value={editRule.name}
                                        onChange={(e) => setEditRule({ ...editRule, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Trigger</label>
                                    <select
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm bg-white"
                                        value={editRule.triggerType}
                                        onChange={(e) => setEditRule({ ...editRule, triggerType: e.target.value as ChatRule["triggerType"] })}
                                    >
                                        <option value="keyword">Keyword (mengandung kata)</option>
                                        <option value="exact">Exact Match (persis sama)</option>
                                        <option value="regex">Regex Pattern</option>
                                        <option value="all">Semua Pesan (fallback)</option>
                                    </select>
                                </div>
                            </div>
                            {editRule.triggerType !== "all" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kata Kunci (pisahkan dengan koma)</label>
                                    <input
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                        value={editRule.trigger}
                                        onChange={(e) => setEditRule({ ...editRule, trigger: e.target.value })}
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan Balasan *</label>
                                <textarea
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm resize-none"
                                    rows={5}
                                    value={editRule.response}
                                    onChange={(e) => setEditRule({ ...editRule, response: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prioritas</label>
                                <input
                                    type="number"
                                    className="block w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    value={editRule.priority}
                                    onChange={(e) => setEditRule({ ...editRule, priority: parseInt(e.target.value) || 1 })}
                                    min={1}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button
                                onClick={handleEditRule}
                                disabled={!editRule.name.trim() || !editRule.response.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Aturan?</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus aturan <strong>{deleteTarget.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button onClick={confirmDelete} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
