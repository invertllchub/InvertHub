"use client";
import { useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';

export default function LogoutButton({ id }: { id?: string }) {
    const router = useRouter();

    function handleLogout() {
        document.cookie = "token=; path=/; max-age=0;";
        router.push("/Login");
    }

    return (
        <button
        id={id}
        onClick={handleLogout}
        className="text-white px-4 py-2 cursor-pointer"
        >
            <LogOut size={20}/>
        </button>
    );
}
