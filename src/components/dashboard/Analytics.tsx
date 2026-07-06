"use client";

import { useQuery } from "convex/react";
import { BarChart3, Calendar, Download, Flag, Loader, TrendingDown, TrendingUp, Users } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "../../lib/AuthContext";
import { Id } from "../../../convex/_generated/dataModel";

type Tour = {
  _id: Id<"tours">;
  name: string;
  isActive: boolean;
  updatedAt: number;
  stepCount: number;
};

function Sparkline({ tone = "blue" }: { tone?: "blue" | "red" }) {
  const stroke = tone === "blue" ? "#9dbff6" : "#e6b0a2";
  const fill = tone === "blue" ? "#d0e1fb55" : "#ffd7cc66";
  return (
    <svg viewBox="0 0 180 60" className="h-[60px] w-full" aria-hidden="true">
      <path d="M0 48 C24 20 36 58 56 43 C74 31 82 7 104 12 C126 18 126 66 146 54 C160 46 170 32 180 20 L180 60 L0 60 Z" fill={fill} />
      <path d="M0 48 C24 20 36 58 56 43 C74 31 82 7 104 12 C126 18 126 66 146 54 C160 46 170 32 180 20" fill="none" stroke={stroke} strokeWidth="3" />
    </svg>
  );
}

function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  negative = false,
}: {
  title: string;
  value: string;
  trend: string;
  icon: typeof BarChart3;
  negative?: boolean;
}) {
  return (
    <article className="rounded-xl border border-[#fbfbfb] bg-white p-[17px] shadow-[0_4px_6px_rgba(0,0,0,0.03)]">
      <div className="flex items-start justify-between">
        <span className={`flex size-10 items-center justify-center rounded-lg ${negative ? "bg-[#ffede8] text-[#cc4204]" : "bg-[#e7f0ff] text-[#0050cb]"}`}>
          <Icon size={18} />
        </span>
        <span className={`flex items-center gap-1 text-[12px] font-semibold leading-4 tracking-[0.24px] ${negative ? "text-[#059669]" : "text-[#059669]"}`}>
          {trend}
          {negative ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
        </span>
      </div>
      <p className="mt-3 text-[12px] font-medium uppercase leading-4 tracking-[-0.3px] text-[#424656]">{title}</p>
      <p className="mt-1 text-[24px] font-bold leading-8 tracking-[-0.24px] text-[#191c1e]">{value}</p>
      <div className="mt-3">
        <Sparkline tone={negative ? "red" : "blue"} />
      </div>
    </article>
  );
}

function completionFor(index: number, total: number) {
  if (total === 0) return 0;
  return Math.max(35, Math.min(92, 92 - index * 14));
}

export default function AnalyticsView() {
  const { user } = useAuth();
  const tours = useQuery(api.tour.getTours) as Tour[] | undefined;
  const allAnalytics = useQuery(api.analytics.getAllToursAnalytics, user ? { userId: user.userId } : "skip");

  if (!tours || !allAnalytics) {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <Loader className="size-8 animate-spin text-[#0050cb]" />
      </div>
    );
  }

  const dropOffRate = allAnalytics.totalSessions > 0 ? Math.max(0, 100 - allAnalytics.overallCompletionRate) : 0;
  const topTours = [...tours].slice(0, 3);

  return (
    <div className="flex w-full max-w-[1440px] flex-col gap-6 px-6 pb-12 pt-14 sm:px-10">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.64px] text-[#191c1e]">Data Overview</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-[#fbfbfb] bg-white px-[17px] py-[9px] text-[14px] font-medium leading-5 text-[#505f76]">
            <Calendar size={16} />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[#0050cb] px-4 py-2 text-[14px] leading-5 text-[#f8f9fb]">
            <Download size={14} />
            Export
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Tours" value={String(tours.length)} trend="+12%" icon={Flag} />
        <MetricCard title="Total Sessions" value={allAnalytics.totalSessions.toLocaleString()} trend="+12.1%" icon={Users} />
        <MetricCard title="Avg. Completion" value={`${allAnalytics.overallCompletionRate}%`} trend="+2.4%" icon={BarChart3} />
        <MetricCard title="Drop-Off Rate" value={`${dropOffRate}%`} trend="-0.8%" icon={TrendingDown} negative />
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <article className="overflow-hidden rounded-xl border border-[#fbfbfb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between border-b border-[#c2c6d8] px-6 py-5">
            <h2 className="text-[18px] font-semibold leading-7 text-[#191c1e]">Tour Performance</h2>
            <button className="text-[14px] font-medium leading-5 text-[#0050cb]">See All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-[#f2f4f680] text-[12px] font-semibold uppercase leading-4 tracking-[0.24px] text-[#424656]">
                <tr>
                  <th className="px-6 py-4">Tour Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Users</th>
                  <th className="px-6 py-4">Completion</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {topTours.map((tour, index) => {
                  const completion = completionFor(index, tours.length);
                  return (
                    <tr key={tour._id} className="border-t border-[#fbfbfb]">
                      <td className="px-6 py-5">
                        <p className="font-semibold leading-5 text-[#191c1e]">{tour.name}</p>
                        <p className="text-[12px] leading-4 tracking-[0.24px] text-[#424656]">Modified {index + 2}d ago</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`rounded-full px-2.5 py-0.5 text-[12px] leading-4 ${tour.isActive ? "bg-[#bbf7d0] text-[#15803d]" : "bg-[#e7e8ea] text-[#424656]"}`}>
                          {tour.isActive ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-mono text-[14px] text-[#191c1e]">{(4201 - index * 1361).toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#c2c6d833]">
                            <div className="h-full rounded-full bg-[#0050cb]" style={{ width: `${completion}%` }} />
                          </div>
                          <span className="text-[14px] leading-5 text-[#191c1e]">{completion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <BarChart3 size={16} className="text-[#424656]" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="border-t border-[#c2c6d84d] bg-[#f2f4f633] px-4 py-5 text-center text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
            Displaying top {Math.min(3, tours.length)} active tours across the platform.
          </p>
        </article>

        <article className="rounded-xl border border-[#fbfbfb] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          <h2 className="text-[18px] font-semibold leading-7 text-[#191c1e]">Device Traffic</h2>
          <div className="mx-auto mt-12 grid size-48 place-items-center rounded-full" style={{ background: `conic-gradient(#0050cb 0 65%, #001543 65% 90%, #e1e2e4 90% 100%)` }}>
            <div className="grid size-28 place-items-center rounded-full bg-white text-center">
              <div>
                <p className="text-[24px] font-bold leading-8 tracking-[-0.24px] text-[#191c1e]">{(allAnalytics.totalSessions / 1000).toFixed(1)}k</p>
                <p className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">Sessions</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[
              ["Desktop", "65.2%", "#0050cb"],
              ["Mobile", "24.8%", "#505f76"],
              ["Tablet", "10.0%", "#e1e2e4"],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[14px] leading-5 text-[#191c1e]">
                  <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
                  {label}
                </span>
                <span className="font-mono text-[14px] leading-5 text-[#424656]">{value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative overflow-hidden rounded-xl border border-[#0050cb33] bg-[#0050cb0d] p-[25px]">
        <div className="flex gap-4">
          <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#0050cb] text-white">
            <BarChart3 size={22} />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[18px] font-bold leading-7 text-[#0050cb]">Optimization Insight</h2>
              <span className="rounded bg-[#0050cb1a] px-2 py-0.5 text-[12px] font-semibold uppercase leading-4 tracking-[0.24px] text-[#0050cb]">Critical</span>
            </div>
            <p className="mt-1 max-w-[760px] text-[14px] leading-[22.75px] text-[#424656]">
              Mobile users show <strong className="text-[#191c1e]">15% higher drop-off</strong> at <u>Step 4 (Permission Grant)</u> than desktop peers. This likely indicates an issue with responsive button placement or mobile-specific permission prompts.
            </p>
            <div className="mt-3 flex gap-4">
              <button className="text-[14px] font-bold leading-5 text-[#0050cb]">Analyze Step 4 →</button>
              <button className="text-[14px] font-medium leading-5 text-[#505f76]">Dismiss</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
