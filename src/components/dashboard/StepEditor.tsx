"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, ChevronDown, Crosshair, Eye, GripVertical, Info, Loader, Plus, Send, Trash2, Upload, X } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface StepEditorProps {
  tourId: Id<"tours">;
  onBack: () => void;
}

type Step = {
  _id: Id<"steps">;
  stepId: string;
  title: string;
  description: string;
  targetElement: string;
  position: string;
  order: number;
};

type Tour = {
  _id: Id<"tours">;
  name: string;
  description: string;
  isActive: boolean;
};

function StepIcon({ index }: { index: number }) {
  const colors = ["#b7c8e1", "#b3c5ff", "#ffb59d", "#d0e1fb"];
  const icons = [GripVertical, Info, Send, Crosshair];
  const Icon = icons[index % icons.length];
  return (
    <span className="flex size-12 items-center justify-center rounded-lg border border-[#c2c6d84d]" style={{ backgroundColor: colors[index % colors.length] }}>
      <Icon size={20} className="text-[#001543]" />
    </span>
  );
}

function AddStepDrawer({
  open,
  tourId,
  order,
  onClose,
}: {
  open: boolean;
  tourId: Id<"tours">;
  order: number;
  onClose: () => void;
}) {
  const createStep = useMutation(api.steps.createStep);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interaction, setInteraction] = useState("Click");
  const [position, setPosition] = useState("bottom");
  const [targetElement, setTargetElement] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      const normalizedTitle = title.trim();
      await createStep({
        tourId,
        stepId: normalizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `step-${order + 1}`,
        title: normalizedTitle,
        description: description.trim(),
        targetElement: targetElement.trim() || "#main-cta-button",
        position,
        order,
      });
      setTitle("");
      setDescription("");
      setTargetElement("");
      setInteraction("Click");
      setPosition("bottom");
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#001543]/20 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="h-full w-full max-w-[400px] border-l border-[#c2c6d8] bg-white p-6 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.24px] text-[#191c1e]">Add New Step</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#191c1e] hover:bg-[#f2f4f6]" aria-label="Close add step">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <label className="block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
            Step Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-3 py-2.5 text-[14px] text-[#191c1e] outline-none focus:border-[#0050cb] focus:ring-2 focus:ring-[#0050cb]/15"
              placeholder="e.g. Profile Setup Intro"
              required
            />
          </label>

          <label className="block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
            Body Text / Content
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-3 py-2.5 text-[14px] leading-5 text-[#191c1e] outline-none focus:border-[#0050cb] focus:ring-2 focus:ring-[#0050cb]/15"
              placeholder="Describe what the user should do in this step..."
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
              Interaction Type
              <span className="mt-2 flex items-center justify-between rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-3 py-2.5 text-[14px] text-[#191c1e]">
                <select value={interaction} onChange={(event) => setInteraction(event.target.value)} className="w-full appearance-none bg-transparent outline-none">
                  <option>Click</option>
                  <option>Hover</option>
                  <option>Focus</option>
                </select>
                <ChevronDown size={16} />
              </span>
            </label>
            <label className="block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
              Placement
              <span className="mt-2 flex items-center justify-between rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-3 py-2.5 text-[14px] text-[#191c1e]">
                <select value={position} onChange={(event) => setPosition(event.target.value)} className="w-full appearance-none bg-transparent capitalize outline-none">
                  <option value="bottom">Bottom</option>
                  <option value="top">Top</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
                <ChevronDown size={16} />
              </span>
            </label>
          </div>

          <label className="block text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
            CSS Selector Target
            <span className="mt-2 flex items-center rounded-lg border border-[#c2c6d8] bg-[#f2f4f6] px-3 py-2.5">
              <input
                value={targetElement}
                onChange={(event) => setTargetElement(event.target.value)}
                className="w-full bg-transparent font-mono text-[13px] text-[#191c1e] outline-none placeholder:text-[#6b7280]"
                placeholder="#main-cta-button"
              />
              <Crosshair size={16} className="text-[#0050cb]" />
            </span>
            <span className="mt-1.5 block text-[11px] italic leading-[16.5px] text-[#424656]">Enter a unique identifier to anchor the tooltip.</span>
          </label>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#c2c6d8] pt-6">
          <button type="button" onClick={onClose} className="rounded-lg border border-[#c2c6d8] px-4 py-3 text-[12px] font-medium tracking-[0.24px] text-[#191c1e]">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="rounded-lg bg-[#0050cb] px-4 py-3 text-[12px] font-medium tracking-[0.24px] text-white disabled:opacity-60">
            {saving ? "Saving..." : "Save Step"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function StepEditor({ tourId, onBack }: StepEditorProps) {
  const tour = useQuery(api.tour.getTour, { tourId }) as Tour | undefined;
  const steps = useQuery(api.steps.getSteps, { tourId }) as Step[] | undefined;
  const deleteStep = useMutation(api.steps.deleteStep);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!tour || !steps) {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <Loader className="size-8 animate-spin text-[#0050cb]" />
      </div>
    );
  }

  return (
    <>
      <div className="px-6 py-8 sm:px-10">
        <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-5 flex items-center gap-2 text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656] hover:text-[#0050cb]">
              <ArrowLeft size={14} />
              Back to Tours
            </button>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.8px] text-[#424656]">{tour.name}</h1>
              <span className="flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11px] font-bold uppercase leading-[16.5px] tracking-[-0.275px] text-[#15803d]">
                <span className="size-1.5 rounded-full bg-[#16a34a]" />
                {tour.isActive ? "Active" : "Draft"}
              </span>
            </div>
            <p className="mt-1 text-[14px] leading-5 text-[#424656]">{tour.description || "Guided tour steps and targeting."}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-[#c2c6d8] bg-[#f8f9fb] px-[17px] py-[9px] text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">
              <Eye size={16} />
              Preview
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-[#0050cb] px-4 py-2 text-[12px] font-medium leading-4 tracking-[0.24px] text-white shadow-sm">
              <Upload size={14} />
              Publish Changes
            </button>
          </div>
        </header>

        <section className="flex max-w-[800px] flex-col gap-3">
          {steps.map((step, index) => (
            <article key={step._id} className="group flex items-center gap-4 rounded-xl border border-[#c2c6d8] bg-white p-[17px]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f6] text-[16px] font-bold leading-6 text-[#424656]">{index + 1}</span>
              <StepIcon index={index} />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[16px] leading-6 text-[#424656]">{step.title}</h2>
                <p className="truncate text-[14px] leading-5 text-[#424656]">{step.description || step.targetElement}</p>
              </div>
              <button
                type="button"
                onClick={() => deleteStep({ id: step._id })}
                className="rounded-lg p-2 text-[#424656] opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                aria-label={`Delete ${step.title}`}
              >
                <Trash2 size={16} />
              </button>
            </article>
          ))}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#c2c6d8] p-[26px] text-center transition hover:border-[#0050cb] hover:bg-[#eef4ff]"
          >
            <Plus size={28} className="text-[#424656]" />
            <span className="text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[#424656]">Add New Step</span>
          </button>
        </section>
      </div>
      <AddStepDrawer open={drawerOpen} tourId={tourId} order={steps.length} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
