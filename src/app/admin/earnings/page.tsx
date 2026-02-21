import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import { DollarSign, CalendarCheck, TrendingUp, ExternalLink } from "lucide-react";
import { EarningsExport } from "./EarningsExport";

export const dynamic = "force-dynamic";

type Period = "today" | "week" | "month" | "year" | "all";

function periodLabel(p: Period) {
  return { today: "Today", week: "This Week", month: "This Month", year: "This Year", all: "All Time" }[p];
}

function getRange(period: Period): { from: number; to: number } {
  const now = new Date();
  const to = Math.floor(now.getTime() / 1000);
  if (period === "today") {
    const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return { from: Math.floor(from.getTime() / 1000), to };
  }
  if (period === "week") {
    return { from: to - 7 * 24 * 3600, to };
  }
  if (period === "month") {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: Math.floor(from.getTime() / 1000), to };
  }
  if (period === "year") {
    const from = new Date(now.getFullYear(), 0, 1);
    return { from: Math.floor(from.getTime() / 1000), to };
  }
  return { from: 0, to };
}

async function getEarnings(period: Period) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover" });
    const { from, to } = getRange(period);

    // Fetch up to 100 most recent succeeded intents
    const intents = await stripe.paymentIntents.list({
      limit: 100,
      ...(period !== "all" ? { created: { gte: from, lte: to } } : {}),
    });

    const succeeded = intents.data.filter((p) => p.status === "succeeded");

    // Transactions table rows
    const rows = succeeded
      .sort((a, b) => b.created - a.created)
      .map((p) => ({
        id: p.id,
        date: new Date(p.created * 1000).toLocaleDateString("en-AU"),
        customer: p.metadata.name ?? "Unknown",
        email: p.metadata.email ?? "",
        service: p.metadata.service ?? "Unknown",
        address: p.metadata.address ?? "—",
        amount: p.amount / 100,
      }));

    // Per-service breakdown
    const serviceMap: Record<string, { count: number; total: number }> = {};
    for (const row of rows) {
      if (!serviceMap[row.service]) serviceMap[row.service] = { count: 0, total: 0 };
      serviceMap[row.service].count++;
      serviceMap[row.service].total += row.amount;
    }
    const byService = Object.entries(serviceMap)
      .map(([name, s]) => ({ name, ...s }))
      .sort((a, b) => b.total - a.total);

    const totalRevenue = rows.reduce((s, r) => s + r.amount, 0);
    const avgBooking = rows.length > 0 ? totalRevenue / rows.length : 0;

    return { rows, byService, totalRevenue, avgBooking, count: rows.length };
  } catch {
    return { rows: [], byService: [], totalRevenue: 0, avgBooking: 0, count: 0 };
  }
}

const PERIODS: Period[] = ["today", "week", "month", "year", "all"];

export default async function EarningsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  if (!session || session.value !== process.env.ADMIN_SESSION_TOKEN) redirect("/admin/login");

  const params = await searchParams;
  const period = (PERIODS.includes(params.period as Period) ? params.period : "month") as Period;
  const { rows, byService, totalRevenue, avgBooking, count } = await getEarnings(period);

  const summaryCards = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "#16A34A",
    },
    {
      label: "Bookings",
      value: count,
      icon: CalendarCheck,
      color: "#F97316",
    },
    {
      label: "Average Booking",
      value: `$${avgBooking.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "#2563EB",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>Earnings</h1>
          <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
            Revenue breakdown · {periodLabel(period)}
          </p>
        </div>
        <EarningsExport rows={rows} period={period} />
      </div>

      {/* Period filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {PERIODS.map((p) => (
          <Link
            key={p}
            href={`/admin/earnings?period=${p}`}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={
              period === p
                ? { background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#FFFFFF" }
                : { background: "#FFFFFF", border: "1px solid #E8EAED", color: "#6B7280" }
            }
          >
            {periodLabel(p)}
          </Link>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl p-5"
              style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${card.color}12` }}
              >
                <Icon size={18} style={{ color: card.color }} />
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: "#111827" }}>{card.value}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Per-service breakdown */}
      {byService.length > 0 && (
        <div
          className="rounded-2xl mb-6 overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
        >
          <div className="px-6 py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
            <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>By Service</h2>
          </div>
          <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
            {byService.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-6 py-3 gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#111827" }}>{s.name}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{s.count} booking{s.count !== 1 ? "s" : ""}</p>
                </div>
                <p className="text-sm font-semibold flex-shrink-0" style={{ color: "#16A34A" }}>
                  ${s.total.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transactions table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
      >
        <div className="px-6 py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
          <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>All Transactions</h2>
        </div>

        {rows.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm" style={{ color: "#9CA3AF" }}>No transactions in this period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                  {["Date", "Customer", "Service", "Address", "Amount"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#9CA3AF" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#F3F4F6" }}>
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs" style={{ color: "#6B7280" }}>
                      {row.date}
                    </td>
                    <td className="px-6 py-4 min-w-0">
                      <p className="font-medium truncate max-w-[140px]" style={{ color: "#111827" }}>{row.customer}</p>
                      <p className="text-xs truncate max-w-[140px]" style={{ color: "#9CA3AF" }}>{row.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs" style={{ color: "#6B7280" }}>
                      {row.service}
                    </td>
                    <td className="px-6 py-4 min-w-0">
                      <p className="text-xs truncate max-w-[160px]" style={{ color: "#6B7280" }}>{row.address}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold" style={{ color: "#16A34A" }}>
                          ${row.amount.toFixed(2)}
                        </span>
                        <a
                          href={`https://dashboard.stripe.com/payments/${row.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View in Stripe"
                        >
                          <ExternalLink size={12} style={{ color: "#9CA3AF" }} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
