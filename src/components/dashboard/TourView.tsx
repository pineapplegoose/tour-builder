"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { ArrowRight, Calendar, ChevronDown, Filter, Grid2X2, Loader, Plus, Rocket, Users, WalletCards, X } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type Tour = {
  _id: Id<"tours">;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
  stepCount: number;
};

interface ToursViewProps {
  onSelectTour: (tourId: Id<"tours">) => void;
  showCreateTour: boolean;
  onOpenCreateTour: () => void;
  onCloseCreateTour: () => void;
}

const icons = [Rocket, WalletCards, Grid2X2, Users];

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date(timestamp));
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase leading-[16.5px] tracking-[-0.275px] ${active ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#e1e2e4] text-[#424656]"
      }`}>
      {active && <span className="size-1.5 rounded-full bg-[#16a34a]" />}
      {active ? "Active" : "Draft"}
    </span>
  );
}

function TourCard({ tour, index, onSelectTour }: { tour: Tour; index: number; onSelectTour: (tourId: Id<"tours">) => void }) {
  const Icon = icons[index % icons.length];
  return (
    <article onClick={() => onSelectTour(tour._id)} className="min-h-[318px]  cursor-pointer rounded-xl border border-[#fbfbfb] bg-white p-[25px] shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-lg bg-[#d0e1fb] text-[#0050cb]">
          <Icon size={21} />
        </span>
        <StatusPill active={tour.isActive} />
      </div>
      <h2 className="pb-1 text-[18px] font-semibold leading-7 text-[#191c1e]">{tour.name}</h2>
      <p className="min-h-16 pb-6 text-[14px] leading-5 text-[#424656]">
        {tour.description || "No description provided yet."}
      </p>
      <dl className="mb-4 grid grid-cols-2 gap-4 border-y border-[#c2c6d8] py-[17px]">
        <div>
          <dt className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">Steps</dt>
          <dd className="text-[16px] font-semibold leading-6 text-[#191c1e]">{tour.stepCount} Steps</dd>
        </div>
        <div>
          <dt className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">Total Views</dt>
          <dd className="text-[16px] font-semibold leading-6 text-[#191c1e]">0</dd>
        </div>
      </dl>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
          <Calendar size={14} />
          {formatDate(tour.updatedAt || tour.createdAt)}
        </div>
        <button
          type="button"
          onClick={() => onSelectTour(tour._id)}
          className="flex items-center gap-1 text-[14px] font-semibold leading-5 text-[#0050cb] hover:text-[#003f9f]"
        >
          {tour.stepCount > 0 ? "Edit Tour" : "Add Steps"}
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

function CreateTourCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-80 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c2c6d8] bg-[#f2f4f6] px-[50px] py-[62px] text-center transition hover:border-[#0050cb] hover:bg-[#eef4ff]"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-[#e7e8ea] text-[#424656]">
        <Plus size={24} />
      </span>
      <span className="text-[18px] font-semibold leading-7 text-[#424656]">Create New Tour</span>
      <span className="mt-2 max-w-[150px] text-[14px] leading-5 text-[#424656]">
        Build a custom onboarding flow from scratch or use a template.
      </span>
    </button>
  );
}

function CreateTourDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createTour = useMutation(api.tour.createTour);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await createTour({ name: name.trim(), description: description.trim() });
      setName("");
      setDescription("");
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001543]/30 p-6 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl border border-[#c2c6d8] bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[#191c1e]">Create New Tour</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#191c1e] hover:bg-[#f2f4f6]" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <label className="block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
          Tour Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-3 py-2.5 text-[14px] text-[#191c1e] outline-none focus:border-[#0050cb] focus:ring-2 focus:ring-[#0050cb]/15"
            placeholder="e.g. New User Onboarding"
            required
          />
        </label>
        <label className="mt-5 block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 min-h-24 w-full rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-3 py-2.5 text-[14px] leading-5 text-[#191c1e] outline-none focus:border-[#0050cb] focus:ring-2 focus:ring-[#0050cb]/15"
            placeholder="Describe what this tour guides users through..."
          />
        </label>
        <div className="mt-6 flex gap-3 border-t border-[#c2c6d8] pt-6">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-[#c2c6d8] px-4 py-3 text-[12px] font-medium tracking-[0.24px] text-[#191c1e]">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="flex-1 rounded-lg bg-[#0050cb] px-4 py-3 text-[12px] font-medium tracking-[0.24px] text-white disabled:opacity-60">
            {saving ? "Creating..." : "Create Tour"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ToursView({ onSelectTour, showCreateTour, onOpenCreateTour, onCloseCreateTour }: ToursViewProps) {
  const tours = useQuery(api.tour.getTours) as Tour[] | undefined;
  const [filter, setFilter] = useState<"all" | "active" | "draft">("all");

  const filteredTours = useMemo(() => {
    const list = tours ?? [];
    return list.filter((tour) => {
      if (filter === "active") return tour.isActive;
      if (filter === "draft") return !tour.isActive;
      return true;
    });
  }, [tours, filter]);

  if (tours === undefined) {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <Loader className="size-8 animate-spin text-[#0050cb]" />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full max-w-[1440px] flex-col gap-6 px-6 py-10 sm:px-10 sm:py-12">
        <section className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-1.2px] text-[#191c1e] sm:text-[48px] sm:leading-[56px]">Your Tours</h1>
            <p className="max-w-[435px] text-[16px] leading-6 text-[#424656]">Manage and monitor the performance of your onboarding flows.</p>
          </div>
        </section>

        <section className="flex flex-col gap-4 pt-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">

            <span className="mx-2 h-6 w-px bg-[#c2c6d8]" />
            {[
              ["all", "All Tours"],
              ["active", "Active"],
              ["draft", "Drafts"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id as "all" | "active" | "draft")}
                className={`rounded-full px-4 py-2 text-[13px] leading-4 tracking-[0.24px] ${filter === id ? "bg-[#d0e1fb] font-semibold text-[#424656]" : "font-medium text-[#424656] hover:bg-white"
                  }`}
              >
                {label}
              </button>
            ))}
            <button className="rounded-full px-4 py-2 text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656] hover:bg-white">Archived</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] leading-5 text-[#424656]">Sort by:</span>
            <button className="flex min-w-[198px] items-center justify-between py-2 pl-3 pr-2 text-[14px] font-semibold leading-5 text-[#0050cb]">
              Recently Modified
              <ChevronDown size={16} className="text-[#424656]" />
            </button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredTours.map((tour, index) => (
            <TourCard key={tour._id} tour={tour} index={index} onSelectTour={onSelectTour} />
          ))}
          <CreateTourCard onClick={onOpenCreateTour} />
        </section>

        {tours.length === 0 && (
          <section className="rounded-2xl border border-[#fbfbfb] bg-white p-12 text-center shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <h2 className="text-[24px] font-semibold leading-8 text-[#191c1e]">No tours yet</h2>
            <p className="mt-2 text-[14px] leading-5 text-[#424656]">Create your first onboarding tour to start adding guided steps.</p>
          </section>
        )}
      </div>
      <CreateTourDialog open={showCreateTour} onClose={onCloseCreateTour} />
    </>
  );
}
