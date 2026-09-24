"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { TimelinePoint } from "@/lib/analytics";

// Validated palette (dataviz reference instance, light mode, white surface).
const COLORS = {
  visitors: "#2a78d6",
  pageviews: "#eb6834",
  grid: "#e1e0d9",
  axis: "#c3c2b7",
  muted: "#898781",
  ink: "#0b0b0b",
};

function formatDay(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(date);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-sm px-3 py-2 text-xs">
      <p className="font-medium text-gray-950 mb-1">{formatDay(String(label))}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((entry: any) => (
        <p key={entry.dataKey} className="flex items-center gap-2 text-gray-600">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.stroke }}
          />
          {entry.dataKey === "visitors" ? "Pengunjung" : "Pageview"}:{" "}
          <span className="font-semibold text-gray-950 tabular-nums">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export function TimelineChart({ data }: { data: TimelinePoint[] }) {
  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-4">
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className="inline-block w-3 h-[2px]" style={{ backgroundColor: COLORS.visitors }} />
          Pengunjung unik
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <span className="inline-block w-3 h-[2px]" style={{ backgroundColor: COLORS.pageviews }} />
          Pageview
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={COLORS.grid} strokeWidth={1} vertical={false} />
            <XAxis
              dataKey="day"
              tickFormatter={formatDay}
              tick={{ fill: COLORS.muted, fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: COLORS.axis }}
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: COLORS.muted, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: COLORS.axis, strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke={COLORS.visitors}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#ffffff" }}
            />
            <Line
              type="monotone"
              dataKey="pageviews"
              stroke={COLORS.pageviews}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
