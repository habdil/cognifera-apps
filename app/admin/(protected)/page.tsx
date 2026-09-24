import Link from "next/link";
import {
  getAnalyticsStats,
  getDailyTimeline,
  getFunnel,
  getTopPages,
  getTopReferrers,
} from "@/lib/analytics";
import { getSql } from "@/lib/neon";
import { TimelineChart } from "@/components/admin/TimelineChart";

export const dynamic = "force-dynamic";

// Ordinal blue ramp (validated) for the funnel stages, light→dark.
const FUNNEL_COLORS = ["#86b6ef", "#5598e7", "#2a78d6", "#1c5cab"];

const numberFormat = new Intl.NumberFormat("id-ID");

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-gray-200 p-5">
      <p className="text-[11px] uppercase tracking-[0.1em] text-gray-400 mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-950">{numberFormat.format(value)}</p>
    </div>
  );
}

function percent(part: number, whole: number): string {
  if (whole === 0) return "0%";
  return `${Math.round((part / whole) * 1000) / 10}%`;
}

type LeadRow = {
  id: string;
  name: string;
  layanan_interest: string | null;
  status: string;
  created_at: string;
};

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const funnelDays = params.range === "7d" ? 7 : 30;

  const sql = getSql();
  const [stats, timeline, funnel, topPages, topReferrers, leadRows] =
    await Promise.all([
      getAnalyticsStats(),
      getDailyTimeline(30),
      getFunnel(funnelDays),
      getTopPages(30, 10),
      getTopReferrers(30, 10),
      sql`
        SELECT id, name, layanan_interest, status, created_at
        FROM contact_leads ORDER BY created_at DESC LIMIT 5;
      `,
    ]);
  const latestLeads = leadRows as LeadRow[];

  const funnelStages = [
    { label: "Pengunjung", value: funnel.visitors },
    { label: "Melihat layanan/buku/artikel", value: funnel.keyViewers },
    { label: "Intent (WhatsApp / kontak)", value: funnel.intent },
    { label: "Kirim form konsultasi", value: funnel.submits },
  ];
  const funnelMax = Math.max(funnel.visitors, 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Analytics pengunjung situs — data pihak pertama, tanpa third-party.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Pengunjung Hari Ini" value={stats.visitorsToday} />
        <StatTile label="Pengunjung 7 Hari" value={stats.visitors7d} />
        <StatTile label="Pengunjung 30 Hari" value={stats.visitors30d} />
        <StatTile label="Pageview 30 Hari" value={stats.pageviews30d} />
      </div>

      {/* Timeline */}
      <section className="bg-white border border-gray-200 p-6">
        <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide mb-5">
          Trafik 30 Hari Terakhir
        </h2>
        <TimelineChart data={timeline} />
      </section>

      {/* Funnel */}
      <section className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
            Funnel Konversi
          </h2>
          <div className="flex gap-1">
            <Link
              href="/admin?range=7d"
              className={`text-xs px-3 py-1.5 border transition-colors ${
                funnelDays === 7
                  ? "bg-gray-950 text-white border-gray-950"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              7 hari
            </Link>
            <Link
              href="/admin?range=30d"
              className={`text-xs px-3 py-1.5 border transition-colors ${
                funnelDays === 30
                  ? "bg-gray-950 text-white border-gray-950"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              30 hari
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {funnelStages.map((stage, index) => {
            const previous = index > 0 ? funnelStages[index - 1].value : null;
            return (
              <div key={stage.label}>
                {previous !== null && (
                  <p className="text-[11px] text-gray-400 mb-1 ml-1">
                    ↓ {percent(stage.value, previous)} dari tahap sebelumnya
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-50 h-9 relative">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${Math.max((stage.value / funnelMax) * 100, stage.value > 0 ? 2 : 0)}%`,
                        backgroundColor: FUNNEL_COLORS[index],
                      }}
                    />
                    <span className="absolute inset-y-0 left-3 flex items-center text-xs font-medium text-gray-950">
                      {stage.label}
                    </span>
                  </div>
                  <span className="w-16 text-right text-sm font-bold text-gray-950 tabular-nums">
                    {numberFormat.format(stage.value)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-gray-400 mt-5">
          Konversi total: {percent(funnel.submits, funnel.visitors)} pengunjung mengirim
          form konsultasi dalam {funnelDays} hari terakhir.
        </p>
      </section>

      {/* Top pages & referrers */}
      <div className="grid lg:grid-cols-2 gap-4">
        <section className="bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide mb-4">
            Halaman Terpopuler (30 hari)
          </h2>
          {topPages.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada data.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="py-2 font-medium">Halaman</th>
                  <th className="py-2 font-medium text-right">Views</th>
                  <th className="py-2 font-medium text-right">Pengunjung</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.path} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 text-gray-700 font-mono text-xs truncate max-w-[220px]">
                      {page.path}
                    </td>
                    <td className="py-2 text-right tabular-nums text-gray-950">
                      {numberFormat.format(page.views)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-gray-500">
                      {numberFormat.format(page.visitors)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide mb-4">
            Sumber Trafik (30 hari)
          </h2>
          {topReferrers.length === 0 ? (
            <p className="text-sm text-gray-400">
              Belum ada data referrer (kunjungan langsung tidak dihitung).
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="py-2 font-medium">Referrer</th>
                  <th className="py-2 font-medium text-right">Pengunjung</th>
                </tr>
              </thead>
              <tbody>
                {topReferrers.map((ref) => (
                  <tr key={ref.referrer} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 text-gray-700 text-xs truncate max-w-[260px]">
                      {ref.referrer}
                    </td>
                    <td className="py-2 text-right tabular-nums text-gray-950">
                      {numberFormat.format(ref.visitors)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* Latest leads */}
      <section className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
            Leads Terbaru
          </h2>
          <Link href="/admin/leads" className="text-xs text-primary hover:underline">
            Lihat semua →
          </Link>
        </div>
        {latestLeads.length === 0 ? (
          <p className="text-sm text-gray-400">Belum ada pesan masuk.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {latestLeads.map((lead) => (
              <li key={lead.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-950 truncate">{lead.name}</p>
                  {lead.layanan_interest && (
                    <p className="text-[11px] uppercase tracking-wide text-primary">
                      {lead.layanan_interest}
                    </p>
                  )}
                </div>
                <span className="text-[11px] text-gray-400 shrink-0">
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(lead.created_at))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
