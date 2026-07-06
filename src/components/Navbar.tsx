import Link from "next/link";
import { Route } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="relative z-20 flex h-[72px] w-full items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md">
      <Link href="/" className="flex w-[180px] items-center gap-3 px-2" aria-label="TourMaster home">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0050cb] text-white">
          <Route size={18} strokeWidth={2.5} />
        </span>
        <span className="flex flex-col">
          <span className="text-[18px] font-bold leading-[22.5px] text-[#191c1e]">TourMaster</span>
          <span className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">Enterprise SaaS</span>
        </span>
      </Link>
      <nav className="flex items-center gap-4" aria-label="Primary navigation">
        <Link href="/dashboard" className="text-[14px] font-medium leading-5 text-[#424656] transition hover:text-[#0050cb]">
          Book A Demo
        </Link>
        <Link href="/dashboard" className="rounded-full bg-[#0050cb] px-6 py-2.5 text-[14px] font-medium leading-5 text-white transition hover:bg-[#003f9f] focus:outline-none focus:ring-2 focus:ring-[#0050cb] focus:ring-offset-2">
          Get Started
        </Link>
      </nav>
    </header>
  );
};
