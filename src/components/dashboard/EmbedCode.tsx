"use client";

import { BookOpen, ChevronRight, Clipboard, Code2, ExternalLink, Info, Loader, Mail, ShieldCheck, TerminalSquare } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function CodeBlock({ children }: { children: string }) {
  async function copyCode() {
    await navigator.clipboard.writeText(children);
  }

  return (
    <div className="relative rounded-lg bg-[#1e1e1e] p-6 font-mono text-[13px] leading-[21px] text-[#b7c8e1]">
      <button type="button" onClick={copyCode} className="absolute right-4 top-4 text-[#b7c8e1] hover:text-white" aria-label="Copy code">
        <Clipboard size={16} />
      </button>
      <pre className="overflow-auto whitespace-pre-wrap pr-8">{children}</pre>
    </div>
  );
}

export default function EmbedView() {
  const tours = useQuery(api.tour.getTours);
  const firstTour = tours?.[0];
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://your-deployment.convex.cloud";
  const widgetCode = `// 1. Include the SDK
<script src="https://cdn.tourbuilder.pro/v2/widget.js"></script>

// 2. Initialize the widget
const widget = new TourBuilder({
  tourId: '${firstTour?._id ?? "tour_id_here"}',
  apiUrl: '${convexUrl}',
  containerId: '#tour-viewport',
  options: {
    theme: 'light',
    autoplay: true,
    ui: {
      showControls: true,
      accentColor: '#0050cb'
    }
  }
});

widget.mount();`;

  if (tours === undefined) {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <Loader className="size-8 animate-spin text-[#0050cb]" />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 sm:px-10">
      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[12px] font-medium uppercase leading-4 tracking-[0.24px] text-[#0050cb]">
          <BookOpen size={14} />
          Documentation
        </div>
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.64px] text-[#191c1e]">Embed the Widget</h1>
        <p className="max-w-[768px] text-[16px] leading-6 text-[#424656]">
          Seamlessly integrate your virtual tours into any website or application. Use our optimized script to provide high-performance, interactive experiences with minimal latency.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-5">
          <article className="rounded-xl border border-[#fbfbfb] bg-white p-[25px] shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#0050cb1a] text-[#0050cb]">
                <TerminalSquare size={20} />
              </span>
              <h2 className="text-[18px] font-semibold leading-7 text-[#191c1e]">Quick Start</h2>
            </div>
            <p className="mt-4 text-[14px] leading-5 text-[#424656]">
              Install the TourBuilder Pro SDK via your preferred package manager to get started with full TypeScript support.
            </p>
            <div className="mt-4 rounded-lg bg-[#1e1e1e] px-4 py-[18px] font-mono text-[13px] leading-5 text-[#b3c5ff]">
              npm install @tourbuilder/widget
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12px] leading-4 tracking-[0.24px] text-[#424656]">
              <Info size={13} />
              v2.4.1 available. <span className="text-[#0050cb]">View changelog</span>
            </p>
          </article>

          <div>
            <h2 className="mb-6 px-2 text-[18px] font-semibold leading-7 text-[#191c1e]">Developer Resources</h2>
            <div className="flex flex-col gap-6">
              {[
                { title: "API Reference", desc: "Explore complete method signatures and hooks.", icon: BookOpen },
                { title: "Security Guidelines", desc: "Learn about API key rotation and CORS policies.", icon: ShieldCheck },
              ].map((resource) => {
                const Icon = resource.icon;
                return (
                  <a key={resource.title} href="#" className="flex items-center justify-between rounded-xl border border-[#dddddd] bg-white p-[17px] hover:border-[#0050cb]">
                    <span className="flex items-center gap-4">
                      <span className="flex size-12 items-center justify-center rounded-lg bg-[#e7e8ea] text-[#424656]">
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="block text-[18px] font-semibold leading-7 text-[#191c1e]">{resource.title}</span>
                        <span className="block text-[14px] leading-5 text-[#424656]">{resource.desc}</span>
                      </span>
                    </span>
                    <ChevronRight size={16} className="text-[#424656]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <article className="rounded-xl border border-[#fbfbfb] bg-white p-6 shadow-sm xl:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[rgba(204,66,4,0.1)] text-[#cc4204]">
                <Code2 size={22} />
              </span>
              <h2 className="text-[18px] font-semibold leading-7 text-[#191c1e]">Widget Configuration</h2>
            </div>
            <span className="rounded-full bg-[#edeef0] px-3 py-1 text-[12px] font-medium leading-4 tracking-[0.24px] text-[#424656]">HTML / JS</span>
          </div>
          <p className="mb-6 max-w-[540px] text-[14px] leading-5 text-[#424656]">
            Add the script tag to your header and initialize the widget with your unique API key. Customize the theme and behavior using the configuration object.
          </p>
          <CodeBlock>{widgetCode}</CodeBlock>
          <div className="mt-6 flex gap-3 rounded-lg bg-[#f2f4f6] p-4">
            <Info size={22} className="shrink-0 text-[#0050cb]" />
            <div>
              <p className="text-[12px] font-bold leading-4 tracking-[0.24px] text-[#191c1e]">Pro Tip</p>
              <p className="text-[14px] leading-5 text-[#424656]">
                Use the <code className="rounded bg-[#e1e2e4] px-1.5 py-0.5 font-mono text-[#424656]">onLoad</code> callback to trigger custom events in your CRM when a user starts a tour.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-2xl bg-[#0066ff] p-12 text-center text-white">
        <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.24px]">Need help with your integration?</h2>
        <p className="mx-auto mt-2 max-w-[672px] text-[16px] leading-6 text-white/80">
          Our dedicated solutions engineering team is available to assist with complex implementations, custom styling, or platform migration.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-[16px] font-bold leading-6 text-[#0050cb] shadow-lg">
            <Mail size={18} />
            Contact Support
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/30 bg-[#0050cb] px-8 py-3 text-[16px] font-bold leading-6 text-white">
            Book a Demo
            <ExternalLink size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
