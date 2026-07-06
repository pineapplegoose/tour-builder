import Link from "next/link";
import { Route } from "lucide-react";

const footerGroups = [
  { title: "Product", links: ["Features", "Integrations", "Pricing", "Documentation"] },
  { title: "Company", links: ["About", "Blog", "Careers"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
];

export const Footer = () => {
  return (
    <footer className="border-t border-[#f3f4f6] bg-white pb-20 pt-[81px]">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="flex flex-col items-start gap-6 md:col-span-2">
            <Link href="/" className="flex w-[180px] items-center gap-3 px-2" aria-label="TourMaster home">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0050cb] text-white">
                <Route size={18} strokeWidth={2.5} />
              </span>
              <span className="flex flex-col">
                <span className="text-[18px] font-bold leading-[22.5px] text-[#191c1e]">TourMaster</span>
                <span className="text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">Enterprise SaaS</span>
              </span>
            </Link>
            <p className="max-w-80 text-[16px] leading-6 text-[#6b7280]">
              Empowering teams to create world-class onboarding experiences with ease.
            </p>
            <div className="flex gap-4 text-[16px] leading-6 text-[#9ca3af]">
              <a href="https://twitter.com" className="hover:text-[#0050cb]">Twitter</a>
              <a href="https://linkedin.com" className="hover:text-[#0050cb]">LinkedIn</a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-6">
              <h2 className="text-[16px] font-bold leading-6 text-[#0050cb]">{group.title}</h2>
              <ul className="flex flex-col gap-4">
                {group.links.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[16px] leading-6 text-[#6b7280] hover:text-[#0050cb]">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 border-t border-[#f3f4f6] pt-[33px]">
          <p className="text-[14px] leading-5 text-[#9ca3af]">© 2024 Jagora Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
