import Link from "next/link";
import { ArrowUpRight, Circle, Star } from "lucide-react";

export const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-24 overflow-hidden pb-32 pt-[79px]">
      <div className="flex w-full max-w-[896px] flex-col items-center gap-8 px-6 text-center">
        <h1 className="max-w-[760px] text-[44px] font-bold leading-[0.98] tracking-[-1.2px] text-black sm:text-[60px] sm:leading-[56px]">
          Simplify your first-time experience. <span className="text-[#001543]">Instantly.</span>
        </h1>
        <p className="max-w-[672px] text-[18px] font-normal leading-[30px] text-[#424656] sm:text-[20px] sm:leading-[32.5px]">
          Build, manage, and optimize interactive user tours with precision. Deliver the perfect onboarding experience without a single line of code.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
          <Link href="/dashboard" className="rounded-full bg-[#0050cb] px-10 py-4 text-[18px] font-medium leading-7 text-white transition hover:bg-[#003f9f] focus:outline-none focus:ring-2 focus:ring-[#0050cb] focus:ring-offset-2">
            Get Started Free
          </Link>
          <Link href="/dashboard" className="rounded-full border border-[#d1d5db] bg-white px-[41px] py-[17px] text-[18px] font-medium leading-7 text-black transition hover:border-[#0050cb] hover:text-[#0050cb] focus:outline-none focus:ring-2 focus:ring-[#0050cb] focus:ring-offset-2">
            Watch Demo
          </Link>
        </div>
      </div>

      <div className="relative flex h-[650px] w-full max-w-[1152px] items-start justify-center">
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f3f4f6]" />
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f3f4f6]" />

        <div className="absolute bottom-20 left-10 hidden w-48 rounded-2xl bg-[#d0e1fb] p-6 shadow-xl lg:block">
          <div className="mb-4 flex h-12 items-end gap-1">
            <span className="h-4 w-3 rounded-sm bg-[#001543]" />
            <span className="h-8 w-3 rounded-sm bg-[#001543]" />
            <span className="h-6 w-3 rounded-sm bg-[#001543]" />
          </div>
          <p className="pt-3 text-[10px] font-normal uppercase leading-[15px] tracking-[0.5px] text-[#424656]">Engagement</p>
          <div className="flex items-center gap-2">
            <p className="text-[24px] font-bold leading-8 text-[#001543]">40%</p>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#001543] text-white">
              <Circle size={8} fill="currentColor" />
            </span>
          </div>
        </div>

        <div className="absolute right-10 top-20 hidden w-56 rounded-3xl bg-[#679eff] p-6 text-white shadow-xl lg:block">
          <div className="flex items-center justify-between">
            <p className="text-[30px] font-bold leading-9">87%</p>
            <div className="flex size-12 items-center justify-center rounded-lg bg-[#001543]">
              <div className="size-6 rounded bg-white/90 shadow-inner" />
            </div>
          </div>
          <p className="pt-2 text-[14px] font-medium leading-5">Tour Completion</p>
          <p className="pb-4 text-[10px] leading-[15px]">Up from 62% last week</p>
          <span className="rounded-full bg-white/50 px-3 py-1 text-[10px] font-bold leading-[15px]">OPTIMIZED</span>
        </div>

        <div className="relative h-[650px] w-[320px] shrink-0 rounded-[48px] border-4 border-[#001543] bg-[#001543] p-4 shadow-2xl">
          <div className="relative h-full overflow-hidden rounded-[40px] bg-white">
            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-[radial-gradient(circle_at_30%_25%,#6ee7f9,#0050cb_45%,#001543)]" />
                <div>
                  <p className="text-[12px] font-bold leading-4 text-[#0050cb]">Wade Warren</p>
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-[#ef4444]" />
                    <span className="text-[10px] leading-[15px] text-[#424656]">Live</span>
                  </div>
                </div>
              </div>
              <div className="h-80 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,#14536b,transparent_24%),linear-gradient(135deg,#01070a_0%,#061313_40%,#0b2d35_56%,#020608_100%)]">
                <div className="h-full rounded-2xl bg-[linear-gradient(135deg,transparent_15%,rgba(103,158,255,0.35)_35%,transparent_42%,transparent_58%,rgba(103,158,255,0.2)_72%,transparent_78%)]" />
              </div>
            </div>
            <div className="absolute bottom-10 left-4 right-4 rounded-xl border border-[#f3f4f6] bg-white/90 p-[17px] shadow-lg backdrop-blur">
              <p className="text-[12px] font-medium leading-4 text-[#0050cb]">Visual Tour Builder</p>
              <p className="mt-1 text-[10px] leading-[12.5px] text-[#424656]">Drag and drop to create interactive guides in seconds.</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-56 left-64 hidden rounded-full bg-[#fce7f3] px-4 py-3 shadow-lg md:flex">
          {[0, 1, 2, 3, 4].map((item) => (
            <Star key={item} size={12} fill="#001543" strokeWidth={0} className="text-[#001543]" />
          ))}
        </div>

        <div className="absolute bottom-10 right-40 hidden md:block">
          <span className="absolute -left-4 bottom-10 z-10 rounded-full bg-[#001543] px-3 py-1 text-[10px] leading-[15px] text-white">Developer Snippet</span>
          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-[9px] shadow-2xl">
            <div className="flex h-40 w-32 flex-col justify-center rounded-xl bg-[radial-gradient(circle_at_50%_10%,#3ec3e5,#0d2438_38%,#04111d)] p-4 text-white">
              <div className="mb-4 size-7 rounded-full bg-[#f7b179]" />
              <div className="space-y-1">
                <span className="block h-2 w-16 rounded bg-white/70" />
                <span className="block h-1.5 w-20 rounded bg-white/35" />
                <span className="block h-1.5 w-14 rounded bg-white/35" />
              </div>
            </div>
          </div>
        </div>

        <ArrowUpRight className="absolute bottom-[70px] right-[285px] hidden text-white lg:block" size={14} />
      </div>
    </section>
  );
};
