"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { ToastProvider } from "@/components/ui/Toast";

const SIDEBAR_COLLAPSED_KEY = "sidebar_collapsed";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Load collapsed state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
        if (saved === "true") {
            setCollapsed(true);
        }
        setMounted(true);
    }, []);

    const handleMobileClose = useCallback(() => {
        setMobileOpen(false);
    }, []);

    const handleToggleCollapse = useCallback(() => {
        setCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
            return next;
        });
    }, []);

    return (
        <ToastProvider>
        <div className="h-screen flex overflow-hidden">
            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={handleMobileClose}
                collapsed={collapsed}
                onToggleCollapse={handleToggleCollapse}
            />

            {/* Main content area */}
            <main
                className={`flex-1 flex flex-col h-full overflow-y-auto bg-[#f0f2f5] transition-[margin] duration-300 ease-in-out ${mounted
                    ? collapsed
                        ? "lg:ml-[72px]"
                        : "lg:ml-64"
                    : "lg:ml-64"
                    }`}
            >
                {/* Mobile top bar with hamburger */}
                <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-3 flex-shrink-0">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label="Open menu"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                    <div className="text-sm font-bold tracking-tight text-gray-800">
                        AutoWhatsApp<span className="text-wa-green">.web.id</span>
                    </div>
                </div>

                <DashboardHeader />
                {children}
            </main>
        </div>
        </ToastProvider>
    );
}
