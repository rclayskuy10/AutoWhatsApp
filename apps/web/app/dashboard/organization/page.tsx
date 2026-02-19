"use client";

import { useState } from "react";
import { type TeamMember, initialMembers, roleOptions, defaultOrgProfile } from "@/data/dummy/organization";
import { getInitials } from "@/data/helpers";

export default function OrganisasiPage() {
    // Organization form state
    const [orgName, setOrgName] = useState(defaultOrgProfile.name);
    const [orgEmail, setOrgEmail] = useState(defaultOrgProfile.email);
    const [orgAddress, setOrgAddress] = useState(defaultOrgProfile.address);

    // Team members state
    const [members, setMembers] = useState<TeamMember[]>(initialMembers);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal states
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showEditMemberModal, setShowEditMemberModal] = useState(false);
    const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    // Invite form
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("Staf");

    // Actions menu
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    // Toast
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Save org profile
    const handleSaveOrg = (e: React.FormEvent) => {
        e.preventDefault();
        showToast("Profil organisasi berhasil disimpan");
    };

    // Invite member
    const handleInvite = () => {
        if (!inviteName.trim() || !inviteEmail.trim()) return;
        const roleOpt = roleOptions.find(r => r.label === inviteRole);
        const newMember: TeamMember = {
            id: Date.now(),
            name: inviteName.trim(),
            initials: getInitials(inviteName),
            email: inviteEmail.trim(),
            role: inviteRole,
            roleColor: roleOpt?.color || "bg-gray-100 text-gray-800",
            status: "Pending",
            statusColor: "bg-yellow-100 text-yellow-800",
        };
        setMembers([...members, newMember]);
        setShowInviteModal(false);
        setInviteName("");
        setInviteEmail("");
        setInviteRole("Staf");
        showToast(`Undangan berhasil dikirim ke ${newMember.email}`);
    };

    // Edit member role
    const openEditMember = (member: TeamMember) => {
        setSelectedMember(member);
        setInviteRole(member.role);
        setShowEditMemberModal(true);
        setOpenMenuId(null);
    };

    const handleEditMember = () => {
        if (!selectedMember) return;
        const roleOpt = roleOptions.find(r => r.label === inviteRole);
        setMembers(members.map(m =>
            m.id === selectedMember.id
                ? { ...m, role: inviteRole, roleColor: roleOpt?.color || m.roleColor }
                : m
        ));
        setShowEditMemberModal(false);
        setSelectedMember(null);
        showToast("Role anggota berhasil diperbarui");
    };

    // Remove member
    const openDeleteMember = (member: TeamMember) => {
        setSelectedMember(member);
        setShowDeleteMemberModal(true);
        setOpenMenuId(null);
    };

    const handleRemoveMember = () => {
        if (!selectedMember) return;
        setMembers(members.filter(m => m.id !== selectedMember.id));
        setShowDeleteMemberModal(false);
        setSelectedMember(null);
        showToast("Anggota berhasil dihapus dari organisasi");
    };

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
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Pengaturan Organisasi</h1>
                <p className="text-sm text-gray-500 mt-1">Kelola profil dan anggota organisasi Anda</p>
            </div>

            {/* Profil Organisasi */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Profil Organisasi</h2>
                    <p className="text-sm text-gray-500">Kelola detail informasi bisnis Anda</p>
                </div>
                <div className="p-6">
                    <form className="space-y-6 max-w-2xl" onSubmit={handleSaveOrg}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="org-name">Nama Organisasi</label>
                                <input
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-wa-green focus:ring focus:ring-wa-green focus:ring-opacity-50"
                                    id="org-name"
                                    type="text"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="org-email">Email Bisnis</label>
                                <input
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-wa-green focus:ring focus:ring-wa-green focus:ring-opacity-50"
                                    id="org-email"
                                    type="email"
                                    value={orgEmail}
                                    onChange={(e) => setOrgEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="org-address">Alamat</label>
                                <textarea
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-wa-green focus:ring focus:ring-wa-green focus:ring-opacity-50"
                                    id="org-address"
                                    rows={3}
                                    value={orgAddress}
                                    onChange={(e) => setOrgAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-wa-green text-white font-medium rounded-lg hover:bg-wa-dark transition-colors shadow-sm text-sm"
                                type="submit"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Manajemen Tim */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Manajemen Tim</h2>
                        <p className="text-sm text-gray-500">Undang dan kelola anggota tim Anda</p>
                    </div>
                    <button
                        onClick={() => { setInviteName(""); setInviteEmail(""); setInviteRole("Staf"); setShowInviteModal(true); }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-wa-green text-white font-medium rounded-lg hover:bg-wa-dark transition-colors shadow-sm text-sm"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Undang Anggota
                    </button>
                </div>

                {/* Search for members */}
                <div className="px-6 py-3 border-b border-gray-100">
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-wa-green focus:ring-wa-green sm:text-sm"
                            placeholder="Cari anggota..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Status</th>
                                <th className="relative px-6 py-3" scope="col"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                                                    {member.initials}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.roleColor}`}>{member.role}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.statusColor}`}>{member.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {member.role !== "Pemilik" && (
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                                {openMenuId === member.id && (
                                                    <div className="absolute right-0 top-8 z-10 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                                                        <button
                                                            onClick={() => openEditMember(member)}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                            Ubah Role
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteMember(member)}
                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">person_remove</span>
                                                            Hapus Anggota
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length === 0 && (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-gray-300 text-5xl mb-4 block">group</span>
                        <p className="text-gray-500 text-sm">Tidak ada anggota ditemukan.</p>
                    </div>
                )}

                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Menampilkan <span className="font-medium">{filteredMembers.length}</span> dari{" "}
                        <span className="font-medium">{members.length}</span> anggota
                    </div>
                </div>
            </div>

            {/* Invite Member Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Undang Anggota Baru</h3>
                            <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                <input
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    placeholder="Contoh: Sarah Smith"
                                    value={inviteName}
                                    onChange={(e) => setInviteName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    placeholder="Contoh: sarah@devhouse.com"
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                >
                                    {roleOptions.map(r => (
                                        <option key={r.label} value={r.label}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowInviteModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button
                                onClick={handleInvite}
                                disabled={!inviteName.trim() || !inviteEmail.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Kirim Undangan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Member Role Modal */}
            {showEditMemberModal && selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Ubah Role</h3>
                            <button onClick={() => setShowEditMemberModal(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600">Ubah role untuk <strong>{selectedMember.name}</strong></p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-wa-green focus:border-wa-green sm:text-sm"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                >
                                    {roleOptions.map(r => (
                                        <option key={r.label} value={r.label}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowEditMemberModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button onClick={handleEditMember} className="px-4 py-2 text-sm font-medium text-white bg-wa-green rounded-lg hover:bg-wa-dark">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Member Modal */}
            {showDeleteMemberModal && selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-red-600 text-3xl">warning</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Anggota?</h3>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus <strong>{selectedMember.name}</strong> dari organisasi?
                            </p>
                        </div>
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button onClick={() => setShowDeleteMemberModal(false)} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button onClick={handleRemoveMember} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
