"use client"
import { useEffect } from "react";
import { useLogout } from "@/hooks/logout/useLogout";

export default function AutoLogout() {
    const { mutate } = useLogout();

    useEffect(() => {

        const cookies = document.cookie.split("; ").reduce((acc, curr) => {
            const [name, value] = curr.split("=");
            acc[name] = value;
            return acc;
        }, {} as Record<string, string>);

        const expiration = cookies["expirationDate"];
        if (!expiration) return;

        const decodedExpiration = decodeURIComponent(expiration); 
        const expireTime = new Date(decodedExpiration).getTime();

        if (isNaN(expireTime)) {
            console.warn("Invalid expiration date:", decodedExpiration);
            return;
        }

        const timeout = expireTime - Date.now();


        if (timeout <= 0) {
            mutate();
            return;
        }

        const timer = setTimeout(() => {
            mutate();  
        }, timeout);

        return () => clearTimeout(timer);
    }, [mutate]);

    return null;
}
