import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { CalendarDays, User, MapPin, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

async function getBookings() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-01-28.clover" });
  const intents = await stripe.paymentIntents.list({ limit: 100 });
  return intents.data.filter((p) => p.status === "succeeded").sort((a, b) => b.created - a.created);
}

function statusBadge(status: string) {
  if (status === "succeeded")
    return { label: "Paid", color: "#16A34A", bg: "rgba(22,163,74,0.08)" };
  return { label: status, color: "#9CA3AF", bg: "#F3F4F6" };
}

// Very simple calendar: show days of current month that have bookings
function MiniCalendar({ bookings }: { bookings: Stripe.PaymentIntent[] }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun

  // Days with bookings (based on preferred_date metadata)
  const bookedDays = new Set(
    bookings
      .map((b) => b.metadata?.preferred_date)
      .filter(Boolean)
      .map((d) => {
        const parsed = new Date(d!);
        if (parsed.getFullYear() === year && parsed.getMonth() === month)
          return parsed.getDate();
        return null;
      })
      .filter((d): d is number => d !== null)
  );

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthName = now.toLocaleString("en-AU", { month: "long", year: "numeric" });

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: "#111827" }}>
        Calendar — {monthName}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-xs font-medium" style={{ color: "#9CA3AF" }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const isToday = day === now.getDate();
          const hasBooking = bookedDays.has(day);
          return (
            <div
              key={day}
              className="relative h-8 w-8 mx-auto flex items-center justify-center rounded-full text-xs font-medium"
              style={{
                background: hasBooking ? "rgba(249,115,22,0.12)" : isToday ? "#F3F4F6" : "transparent",
                color: hasBooking ? "#F97316" : isToday ? "#111827" : "#374151",
                fontWeight: hasBooking || isToday ? 700 : 400,
                border: isToday ? "1px solid #E8EAED" : "none",
              }}
            >
              {day}
              {hasBooking && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: "#F97316" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs mt-4" style={{ color: "#9CA3AF" }}>
        Orange dots indicate booked inspection dates (based on customer preferred dates).
      </p>
    </div>
  );
}

export default async function BookingsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("everestics_admin");
  if (!session || session.value !== process.env.ADMIN_SESSION_TOKEN) redirect("/admin/login");

  let bookings: Stripe.PaymentIntent[] = [];
  let fetchError = "";
  try {
    bookings = await getBookings();
  } catch {
    fetchError = "Could not fetch bookings. Check your Stripe API key.";
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>Bookings</h1>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
          All confirmed bookings with completed payment.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: booking list */}
        <div className="lg:col-span-2">
          {fetchError ? (
            <div
              className="rounded-2xl p-6"
              style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}
            >
              <p className="text-sm" style={{ color: "#DC2626" }}>{fetchError}</p>
            </div>
          ) : bookings.length === 0 ? (
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
            >
              <p className="text-sm" style={{ color: "#9CA3AF" }}>No bookings found yet.</p>
            </div>
          ) : (
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #E8EAED" }}
            >
              <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
                {bookings.map((intent) => {
                  const meta = intent.metadata;
                  const badge = statusBadge(intent.status);
                  return (
                    <div key={intent.id} className="p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                            {meta.service ?? "Inspection"}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                            #{intent.id.slice(-8)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: badge.bg, color: badge.color }}
                          >
                            {badge.label}
                          </span>
                          <span className="text-base font-bold" style={{ color: "#16A34A" }}>
                            ${(intent.amount / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {meta.name && (
                          <div className="flex items-center gap-1.5">
                            <User size={12} style={{ color: "#9CA3AF" }} />
                            <span className="text-xs" style={{ color: "#6B7280" }}>{meta.name}</span>
                          </div>
                        )}
                        {meta.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone size={12} style={{ color: "#9CA3AF" }} />
                            <span className="text-xs" style={{ color: "#6B7280" }}>{meta.phone}</span>
                          </div>
                        )}
                        {meta.address && (
                          <div className="flex items-center gap-1.5 sm:col-span-2">
                            <MapPin size={12} style={{ color: "#9CA3AF" }} />
                            <span className="text-xs" style={{ color: "#6B7280" }}>{meta.address}</span>
                          </div>
                        )}
                        {meta.preferred_date && (
                          <div className="flex items-center gap-1.5">
                            <CalendarDays size={12} style={{ color: "#9CA3AF" }} />
                            <span className="text-xs" style={{ color: "#6B7280" }}>
                              Preferred: {meta.preferred_date}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs" style={{ color: "#D1D5DB" }}>
                        Paid {new Date(intent.created * 1000).toLocaleString("en-AU", {
                          day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: calendar */}
        <div>
          <MiniCalendar bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
