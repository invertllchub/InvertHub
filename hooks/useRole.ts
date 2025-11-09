import { useState, useEffect } from "react";

export default function useRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(^| )role=([^;]+)/);
    if (match) setRole(match[2]);
  }, []);

  return role; 
}
