"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Bell, CircleHelp, Menu, Search } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import AnalyticsView from "@/components/dashboard/Analytics";
import EmbedView from "@/components/dashboard/EmbedCode";
import Sidebar, { DashboardView } from "@/components/dashboard/SideBar";
import StepEditor from "@/components/dashboard/StepEditor";
import ToursView from "@/components/dashboard/TourView";
import { Id } from "../../../convex/_generated/dataModel";

function TopBar({ view, selectedTour }: { view: DashboardView; selectedTour: boolean }) {
  const label = selectedTour ? "Tours > Selected Tour" : view === "dashboard" ? "Dashboard" : view === "integrations" ? "Integration" : "Tours";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#c2c6d8] bg-[#f8f9fb]/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2 text-[#424656] hover:bg-white lg:hidden" aria-label="Open navigation">
          <Menu size={20} />
        </button>
        <span className="text-[14px] font-medium leading-4 tracking-[0.24px] text-[#424656]">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <label className="relative hidden sm:block">
          <span className="sr-only">Search steps</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-[14px] -translate-y-1/2 text-[#6b7280]" />
          <input
            className="h-8 w-64 rounded-full border border-[#c2c6d8] bg-[#f2f4f6] pb-[9px] pl-[41px] pr-[17px] pt-2 text-[14px] text-[#191c1e] outline-none placeholder:text-[#6b7280] focus:border-[#0050cb] focus:ring-2 focus:ring-[#0050cb]/20"
            placeholder="Search steps..."
          />
        </label>
        <div className="flex items-center gap-2 justify-between">
          <button className="rounded-lg px-2 py-2  text-[#424656] hover:bg-white" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className="rounded-lg px-2 py-2  text-[#424656] hover:bg-white" aria-label="Help">
            <CircleHelp size={20} />
          </button>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "size-8 border border-[#c2c6d8]",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default function DashboardPage() {
  const { isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<DashboardView>("tours");
  const [selectedTourId, setSelectedTourId] = useState<Id<"tours"> | null>(null);
  const [showCreateTour, setShowCreateTour] = useState(false);

  function handleViewChange(view: DashboardView) {
    setCurrentView(view);
    setSelectedTourId(null);
  }

  return (
    <>
      <SignedOut>
        <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] p-4">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#0050cb] text-2xl font-bold text-white">TM</div>
              <h1 className="text-3xl font-bold text-[#191c1e]">TourMaster</h1>
              <p className="mt-2 text-[#424656]">Sign in to manage your tours</p>
            </div>
            <SignIn
              routing="hash"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-2xl border border-[#fbfbfb]",
                },
              }}
            />
          </div>
        </main>
      </SignedOut>

      <SignedIn>
        {isLoading ? (
          <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
            <div className="text-center">
              <div className="mx-auto mb-4 size-16 animate-spin rounded-full border-4 border-[#0050cb] border-t-transparent" />
              <p className="text-[#424656]">Loading dashboard...</p>
            </div>
          </main>
        ) : (
          <div className="min-h-screen bg-[#f8f9fb] lg:pl-64">
            <Sidebar currentView={currentView} onViewChange={handleViewChange} onCreateTour={() => setShowCreateTour(true)} />
            <TopBar view={currentView} selectedTour={Boolean(selectedTourId)} />
            <main>
              {selectedTourId ? (
                <StepEditor tourId={selectedTourId} onBack={() => setSelectedTourId(null)} />
              ) : currentView === "dashboard" ? (
                <AnalyticsView />
              ) : currentView === "integrations" ? (
                <EmbedView />
              ) : (
                <ToursView
                  onSelectTour={setSelectedTourId}
                  showCreateTour={showCreateTour}
                  onOpenCreateTour={() => setShowCreateTour(true)}
                  onCloseCreateTour={() => setShowCreateTour(false)}
                />
              )}
            </main>
          </div>
        )}
      </SignedIn>
    </>
  );
}
