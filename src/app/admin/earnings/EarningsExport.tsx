"use client";

import { Download } from "lucide-react";

type Row = {
  date: string;
  customer: string;
  service: string;
  amount: number;
};

export function EarningsExport({ rows, period }: { rows: Row[]; period: string }) {
  function exportCSV() {
    const header = ["Date", "Customer", "Service", "Amount (AUD)"];
    const lines = rows.map((r) =>
      [r.date, `"${r.customer}"`, `"${r.service}"`, r.amount.toFixed(2)].join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `everestics-earnings-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportCSV}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
      style={{ background: "#F3F4F6", border: "1px solid #E8EAED", color: "#374151" }}
    >
      <Download size={14} style={{ color: "#F97316" }} />
      Export CSV
    </button>
  );
}
