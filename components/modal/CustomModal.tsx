"use client";

import { useState, useEffect } from "react";

type CustomModalProps = {
    isOpen: boolean;
    title?: string;
    description?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function CustomModal({
    isOpen,
    title,
    description,
    loading = false,
    onConfirm,
    onCancel,
}: CustomModalProps) {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        if (isOpen) setShow(true);
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* OverLay */}
            <div
            className={`fixed inset-0 bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"}`}
            />
        
            {/* Modal */}
            <div
            onTransitionEnd={handleAnimationEnd}
            className={`bg-white rounded-2xl p-6 md:p-12 max-w-md w-full shadow-lg flex flex-col gap-6
            transform transition-all duration-300
            ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            >
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-500">{description}</p>

                <div className="flex justify-end gap-4">
                    <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="cursor-pointer px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all active:scale-95"
                    >
                        Delete
                    </button>
                    <button
                    onClick={onCancel}
                    className="cursor-pointer px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
