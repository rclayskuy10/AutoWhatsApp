"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
    label: string;
    icon: string;
    href: string;
}

// Menu for regular User
const userMainNav: NavItem[] = [
    { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
    { label: "Devices", icon: "devices", href: "/dashboard/devices" },
    { label: "Contacts", icon: "contacts", href: "/dashboard/contacts" },
    { label: "Templates", icon: "description", href: "/dashboard/templates" },
    { label: "Campaigns", icon: "campaign", href: "/dashboard/campaigns" },
    { label: "Chatbot", icon: "smart_toy", href: "/dashboard/chatbot" },
    { label: "Reports", icon: "analytics", href: "/dashboard/reports" },
    { label: "API Keys", icon: "key", href: "/dashboard/api-keys" },
    { label: "Webhook Logs", icon: "webhook", href: "/dashboard/webhook-log" },
    { label: "Billing", icon: "credit_card", href: "/dashboard/billing" },
    { label: "Upgrade Package", icon: "upgrade", href: "/dashboard/choose-package" },
];

const userSettingsNav: NavItem[] = [
    { label: "Organization", icon: "settings", href: "/dashboard/organization" },
    { label: "Help Center", icon: "help", href: "/dashboard/help" },
];

// Menu for Super Admin
const adminMainNav: NavItem[] = [
    { label: "Main Dashboard", icon: "dashboard", href: "/dashboard" },
    { label: "User Management", icon: "group", href: "/dashboard/user-management" },
    { label: "Subscription Plans", icon: "credit_card", href: "/dashboard/subscription-plans" },
    { label: "Transactions", icon: "receipt_long", href: "/dashboard/transactions" },
];

const adminSettingsNav: NavItem[] = [
    { label: "System Settings", icon: "settings", href: "/dashboard/system-settings" },
    { label: "Security & Audit", icon: "security", href: "/dashboard/security-audit" },
];

interface SidebarProps {
    mobileOpen?: boolean;
    onMobileClose?: () => void;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

export default function Sidebar({
    mobileOpen = false,
    onMobileClose,
    collapsed = false,
    onToggleCollapse,
}: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string>("");
    const [userName, setUserName] = useState("John Developer");
    const [userOrg, setUserOrg] = useState("Dev House Ltd.");
    const [userInitials, setUserInitials] = useState("JD");

    useEffect(() => {
        const role = localStorage.getItem("userRole") || "user";
        const name = localStorage.getItem("userName") || "John Developer";

        setUserRole(role);
        setUserName(name);

        if (role === "super_admin") {
            setUserOrg("AutoWhatsApp Admin");
            setUserInitials("SA");
        } else {
            setUserOrg("Dev House Ltd.");
            setUserInitials(
                name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
            );
        }
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        onMobileClose?.();
    }, [pathname, onMobileClose]);

    // Close mobile drawer on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onMobileClose?.();
        };
        if (mobileOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [mobileOpen, onMobileClose]);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        router.push("/masuk");
    };

    const isActive = (href: string) => {
        if (href === "/dashboard") return pathname === "/dashboard";
        return pathname.startsWith(href);
    };

    const mainNav = userRole === "super_admin" ? adminMainNav : userMainNav;
    const settingsNav =
        userRole === "super_admin" ? adminSettingsNav : userSettingsNav;

    // --- Nav item renderer for both expanded/collapsed ---
    const renderNavItem = (item: NavItem) => (
        <a
            key={item.href}
            className={`nav-item group relative flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${collapsed ? "justify-center px-0" : "px-3"}
                ${isActive(item.href)
                    ? "active"
                    : "text-gray-600 hover:text-gray-900"
                }`}
            href={item.href}
            title={collapsed ? item.label : undefined}
        >
            <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                {item.icon}
            </span>
            {!collapsed && <span className="truncate">{item.label}</span>}
            {/* Tooltip when collapsed */}
            {collapsed && (
                <span className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-[100] shadow-lg">
                    {item.label}
                </span>
            )}
        </a>
    );

    // --- Mobile nav item renderer (always expanded) ---
    const renderMobileNavItem = (item: NavItem) => (
        <a
            key={item.href}
            className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(item.href)
                    ? "active"
                    : "text-gray-600 hover:text-gray-900"
                }`}
            href={item.href}
        >
            <span className="material-symbols-outlined text-[20px]">
                {item.icon}
            </span>
            {item.label}
        </a>
    );

    return (
        <>
            {/* ========== DESKTOP SIDEBAR ========== */}
            <aside
                className={`hidden lg:flex bg-white border-r border-gray-200 flex-col fixed h-full z-10 transition-all duration-300 ease-in-out ${collapsed ? "w-[72px]" : "w-64"
                    }`}
            >
                {/* Brand Header */}
                <div className="h-16 flex items-center border-b border-gray-100 flex-shrink-0 overflow-hidden">
                    <div className={`flex items-center w-full ${collapsed ? "justify-center px-0" : "gap-3 px-6"}`}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wa-green text-white flex-shrink-0">
                            <span className="material-symbols-outlined text-2xl">
                                chat_bubble
                            </span>
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <div className="text-base font-bold tracking-tight text-gray-800 leading-tight whitespace-nowrap">
                                    AutoWhatsApp
                                    <span className="text-wa-green">.web.id</span>
                                </div>
                                {userRole === "super_admin" && (
                                    <p className="text-xs font-medium text-gray-400">Superadmin Panel</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Toggle Button */}
                <div className={`flex items-center border-b border-gray-100 flex-shrink-0 ${collapsed ? "justify-center py-2" : "px-3 py-2"}`}>
                    <button
                        onClick={onToggleCollapse}
                        className={`flex items-center gap-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors ${collapsed ? "p-2" : "px-3 py-2 w-full"
                            }`}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {collapsed ? "menu_open" : "menu"}
                        </span>
                        {!collapsed && <span className="text-xs font-medium">Collapse</span>}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={`flex-1 overflow-y-auto py-4 space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
                    {mainNav.map(renderNavItem)}

                    {settingsNav.length > 0 && (
                        <div className="pt-4 mt-4 border-t border-gray-100">
                            {!collapsed && (
                                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    {userRole === "super_admin" ? "Configuration" : "Settings"}
                                </p>
                            )}
                            {collapsed && (
                                <div className="flex justify-center mb-2">
                                    <span className="block w-4 h-px bg-gray-300"></span>
                                </div>
                            )}
                            {settingsNav.map(renderNavItem)}
                        </div>
                    )}
                </nav>

                {/* User Profile */}
                <div className={`border-t border-gray-100 flex-shrink-0 ${collapsed ? "p-2" : "p-4"}`}>
                    {collapsed ? (
                        <div className="flex flex-col items-center gap-2">
                            <a
                                href="/dashboard/profile"
                                className="group relative w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm hover:ring-2 hover:ring-wa-green transition-all"
                                title={userName}
                            >
                                {userInitials}
                                <span className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-[100] shadow-lg">
                                    {userName}
                                </span>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="group relative text-gray-400 hover:text-red-500 transition-colors p-1"
                                title="Logout"
                            >
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                                <span className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-[100] shadow-lg">
                                    Logout
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <a
                                href="/dashboard/profile"
                                className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm flex-shrink-0">
                                    {userInitials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {userName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {userOrg}
                                    </p>
                                </div>
                            </a>
                            <button
                                onClick={handleLogout}
                                className="text-gray-400 hover:text-red-500 flex-shrink-0 transition-colors"
                                title="Logout"
                            >
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* ========== MOBILE DRAWER ========== */}
            {/* Overlay */}
            <div
                className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onMobileClose}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <aside
                className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Mobile Brand Header */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wa-green text-white flex-shrink-0">
                            <span className="material-symbols-outlined text-2xl">
                                chat_bubble
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-base font-bold tracking-tight text-gray-800 leading-tight">
                                AutoWhatsApp
                                <span className="text-wa-green">.web.id</span>
                            </div>
                            {userRole === "super_admin" && (
                                <p className="text-xs font-medium text-gray-400">Superadmin Panel</p>
                            )}
                        </div>
                        <button
                            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                            onClick={onMobileClose}
                            aria-label="Close menu"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {mainNav.map(renderMobileNavItem)}

                    {settingsNav.length > 0 && (
                        <div className="pt-4 mt-4 border-t border-gray-100">
                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                {userRole === "super_admin" ? "Configuration" : "Settings"}
                            </p>
                            {settingsNav.map(renderMobileNavItem)}
                        </div>
                    )}
                </nav>

                {/* Mobile User Profile */}
                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <a
                            href="/dashboard/profile"
                            className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm flex-shrink-0">
                                {userInitials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {userName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {userOrg}
                                </p>
                            </div>
                        </a>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 flex-shrink-0 transition-colors"
                            title="Logout"
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
