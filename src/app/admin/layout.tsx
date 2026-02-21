"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HardHat,
  LayoutDashboard,
  CalendarCheck,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck, exact: false },
  { href: "/admin/earnings", label: "Earnings", icon: TrendingUp, exact: false },
  { href: "/admin/quotes", label: "Quotes", icon: Mail, exact: false },
  { href: "/admin/content", label: "Site Content", icon: Settings, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function isActive(link: (typeof navLinks)[number]) {
    return link.exact ? pathname === link.href : pathname.startsWith(link.href);
  }

  const Sidebar = () => (
    <aside
      className="flex flex-col h-full"
      style={{ background: "#1B2E5C", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
        >
          <HardHat size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "#FFFFFF" }}>
            Ever<span style={{ color: "#F97316" }}>estics</span>
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? "rgba(249,115,22,0.12)" : "transparent",
                color: active ? "#F97316" : "rgba(255,255,255,0.6)",
                border: active ? "1px solid rgba(249,115,22,0.2)" : "1px solid transparent",
              }}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#F7F8FA" }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-56 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-56 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-56 min-h-screen">
        {/* Mobile topbar */}
        <div
          className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-20"
          style={{ background: "#1B2E5C", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}
            >
              <HardHat size={13} className="text-white" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#FFFFFF" }}>
              Ever<span style={{ color: "#F97316" }}>estics</span>
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
