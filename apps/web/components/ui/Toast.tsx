"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    addToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}

const typeConfig: Record<ToastType, { icon: string; bg: string; border: string; text: string }> = {
    success: {
        icon: "check_circle",
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
    },
    error: {
        icon: "error",
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
    },
    warning: {
        icon: "warning",
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-800",
    },
    info: {
        icon: "info",
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
    },
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
    const [isExiting, setIsExiting] = useState(false);
    const config = typeConfig[toast.type];

    useEffect(() => {
        const duration = toast.duration || 4000;
        const exitTimer = setTimeout(() => setIsExiting(true), duration - 300);
        const removeTimer = setTimeout(() => onDismiss(toast.id), duration);
        return () => {
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, [toast.id, toast.duration, onDismiss]);

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm w-full transition-all duration-300 ${config.bg} ${config.border} ${isExiting ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
                }`}
            style={{ animation: "toast-in 0.3s ease-out" }}
        >
            <span className={`material-symbols-outlined text-xl flex-shrink-0 ${config.text}`}>
                {config.icon}
            </span>
            <p className={`text-sm font-medium flex-1 ${config.text}`}>{toast.message}</p>
            <button
                onClick={() => {
                    setIsExiting(true);
                    setTimeout(() => onDismiss(toast.id), 300);
                }}
                className={`flex-shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors ${config.text}`}
            >
                <span className="material-symbols-outlined text-lg">close</span>
            </button>
        </div>
    );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
        setToasts((prev) => [...prev, { id, type, message, duration }]);
    }, []);

    const dismissToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} onDismiss={dismissToast} />
                    </div>
                ))}
            </div>
            <style jsx global>{`
                @keyframes toast-in {
                    from {
                        opacity: 0;
                        transform: translateX(100%) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }
            `}</style>
        </ToastContext.Provider>
    );
}
