'use client';

export const dynamic = 'force-dynamic';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "token=; Max-Age=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  }, [router]);

  return <p>Saindo...</p>;
}