"use client";
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';
import { useLogout } from "@/hooks/logout/useLogout";
import { showToast } from "@/components/toast/Toast";

export default function LogoutButton({ id }: { id?: string }) {
    const router = useRouter();
    const { mutate} = useLogout();


    function handleLogout() {
        const toastId = showToast("loading", {
            message: "Please wait a few seconds to logout...",
        });
        mutate(undefined, {
            onSuccess: () => {
            router.push("/dashboard"); 
            showToast("success", {
                message: "Logout Successfuly!",
                toastId,
            });
            },
            onError: (err: any) => {
                showToast("error", {
                    message: err.message || "Logout Failed",
                    toastId,
                });
            },
        });
    }

    return (
        <button
            id={id}
            onClick={handleLogout}
            className="flex items-center gap-3 py-4 px-4 cursor-pointer"
        >
            <LogOut size={20}/>
            <span className="whitespace-nowrap">Log out</span>
        </button>
    );
}
