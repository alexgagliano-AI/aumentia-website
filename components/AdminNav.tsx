"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AdminNav({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const links = [
    { href: "/admin/dashboard", label: "Diagnostics" },
  ];

  return (
    <nav style={{
      background: "var(--dark-card)", borderBottom: "1px solid var(--dark-border)",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", height: 60, gap: 24,
      }}>
        <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="Aumentia" width={32} height={32} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Admin
          </span>
        </Link>

        <div style={{ display: "flex", gap: 4, flex: 1 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                color: pathname.startsWith(l.href) ? "var(--cyan)" : "var(--gray-light)",
                background: pathname.startsWith(l.href) ? "var(--cyan-dim)" : "transparent",
                textDecoration: "none", transition: "all 0.2s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "var(--gray)", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user.email}
          </span>
          <button
            onClick={signOut}
            style={{
              padding: "6px 14px", background: "transparent", border: "1px solid var(--dark-border)",
              borderRadius: 6, color: "var(--gray-light)", fontSize: 12, cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
