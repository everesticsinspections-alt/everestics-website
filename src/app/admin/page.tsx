import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import { CalendarCheck, Mail, DollarSign, ArrowRight, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover" });
    const intents = await stripe.paymentIntents.list({ limit: 100 });
    const succeeded = intents.data.filter((p) => p.status === "succeeded");
    const totalRevenue = succeeded.reduce((sum, p) => sum + p.amount, 0) / 100;
    const now = new Date();

    const thisMonth = succeeded.filter((p) => {
      const d = new Date(p.created * 1000);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthRevenue = thisMonth.reduce((s, p) => s + p.amount, 0) / 100;

    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const thisWeek = succeeded.filter((p) => p.created * 1000 >= weekAgo);
    const weekRevenue = thisWeek.reduce((s, p) => s + p.amount, 0) / 100;

    const serviceMap: Record<string, { count: number; total: number }> = {};
    for (const p of succeeded) {
      const svc = p.metadata.service ?? "Unknown";
      if (!serviceMap[svc]) serviceMap[svc] = { count: 0, total: 0 };
      serviceMap[svc].count++;
      serviceMap[svc].total += p.amount / 100;
    }
    const topServices = Object.entries(serviceMap)
      .map(([name, s]) => ({ name, ...s }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);

    return {
      totalBookings: succeeded.length,
      totalRevenue,
      monthlyBookings: thisMonth.length,
      monthRevenue,
      weekRevenue,
      topServices,
    };
  } catch {
    return { totalBookings: 0, totalRevenue: 0, monthlyBookings: 0, monthRevenue: 0, weekRevenue: 0, topServices: [] };
  }
}

async function getRecentBookings() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover" });
    const intents = await stripe.paymentIntents.list({ limit: 5 });
    return intents.data.filter((p) => p.status === "succeeded");
  } catch {
    return [];
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  if (!session || session.value !== process.env.ADMIN_SESSION_TOKEN) redirect("/admin/login");

  const [stats, recent] = await Promise.all([getStats(), getRecentBookings()]);

  const fmt = (n: number) =>
    `$${n.toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const statCards = [
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck, color: "#F97316" },
    { label: "This Month", value: stats.monthlyBookings, icon: TrendingUp, color: "#2563EB" },
    { label: "Week Revenue", value: fmt(stats.weekRevenue), icon: DollarSign, color: "#16A34A" },
    { label: "Month Revenue", value: fmt(stats.monthRevenue), icon: DollarSign, color: "#2563EB" },
    { label: "Total Revenue", value: fmt(stats.totalRevenue), icon: DollarSign, color: "#16A34A" },
    { label: "Quote Requests", value: "Via Email", icon: Mail, color: "#9CA3AF" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#1B2E5C" }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Welcome back. Here&apos;s your business at a glance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl p-5" style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${card.color}12` }}>
                <Icon size={18} style={{ color: card.color }} />
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: "#1B2E5C" }}>{card.value}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
            <h2 className="text-sm font-semibold" style={{ color: "#1B2E5C" }}>Recent Bookings</h2>
            <Link href="/admin/bookings" className="flex items-center gap-1 text-xs font-medium" style={{ color: "#F97316" }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm" style={{ color: "#9CA3AF" }}>No bookings yet.</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
              {recent.map((intent) => {
                const meta = intent.metadata;
                return (
                  <div key={intent.id} className="flex items-center justify-between px-6 py-4 gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "#1B2E5C" }}>{meta.name ?? "Unknown"}</p>
                      <p className="text-xs truncate" style={{ color: "#6B7280" }}>{meta.service ?? "—"} · {meta.address ?? "—"}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-semibold" style={{ color: "#16A34A" }}>${(intent.amount / 100).toFixed(2)}</p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>{new Date(intent.created * 1000).toLocaleDateString("en-AU")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
            <h2 className="text-sm font-semibold" style={{ color: "#1B2E5C" }}>Top Services</h2>
            <Link href="/admin/earnings" className="flex items-center gap-1 text-xs font-medium" style={{ color: "#F97316" }}>
              Full report <ArrowRight size={12} />
            </Link>
          </div>
          {stats.topServices.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm" style={{ color: "#9CA3AF" }}>No data yet.</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
              {stats.topServices.map((svc, i) => (
                <div key={svc.name} className="flex items-center gap-3 px-6 py-4">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: i === 0 ? "rgba(249,115,22,0.1)" : "#F3F4F6", color: i === 0 ? "#F97316" : "#9CA3AF" }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate" style={{ color: "#1B2E5C" }}>{svc.name}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{svc.count} booking{svc.count !== 1 ? "s" : ""}</p>
                  </div>
                  <p className="text-xs font-semibold flex-shrink-0" style={{ color: "#16A34A" }}>
                    ${svc.total.toLocaleString("en-AU", { minimumFractionDigits: 0 })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
