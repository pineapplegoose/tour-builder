"use client";

import Link from "next/link";
import { BarChart3, CircleHelp, Plus, Puzzle, Route, Settings } from "lucide-react";

export type DashboardView = "dashboard" | "tours" | "integrations";

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onCreateTour: () => void;
}

const navItems = [
  { id: "tours" as const, label: "Tours", icon: Route },
  { id: "dashboard" as const, label: "Analytics", icon: BarChart3 },
  { id: "integrations" as const, label: "Integrations", icon: Puzzle },
];

export default function Sidebar({ currentView, onViewChange, onCreateTour }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-64 flex-col justify-between border-r border-[#c2c6d8] bg-[#f2f4f6] px-4 py-6 lg:flex">
      <div>
        <Link href="/" className="mb-10 flex items-center gap-3 px-2" aria-label="TourMaster home">
          <span className="flex size-10 items-center justify-center rounded-lg bg-[#0050cb] text-white">
            <Route size={18} strokeWidth={2.5} />
          </span>
          <span className="flex flex-col">
            <span className="text-[18px] font-bold leading-[22.5px] text-[#424656]">TourMaster</span>
            <span className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">Enterprise SaaS</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-[5px]" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={`flex h-[38px] w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-[14px] font-medium leading-4 tracking-[0.24px] transition ${active ? "text-[#0050cb]" : "text-[#424656] hover:bg-white/70 hover:text-[#0050cb]"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={onCreateTour}
          className="flex w-full items-center justify-center cursor-pointer gap-2 rounded-lg bg-[#0050cb] px-4 py-3.5 text-[14px] font-medium leading-4 tracking-[0.24px] text-white shadow-sm transition hover:bg-[#003f9f]"
        >
          <Plus size={14} />
          Create Tour
        </button>
        <button className="mt-[26px] flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-[14px] font-medium leading-4 tracking-[0.24px] text-[#424656] transition hover:bg-white/70">
          <Settings size={20} />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-[14px] font-medium leading-4 tracking-[0.24px] text-[#424656] transition hover:bg-white/70">
          <CircleHelp size={20} />
          Support
        </button>
      </div>
    </aside>
  );
}
