import { Code2, Star } from "lucide-react";

const codeLines = [
  "module.exports = {",
  "  theme: {",
  "    primary: '#4299E1',",
  "    radius: '8px',",
  "    shadows: 'ambient-soft'",
  "  },",
  "  steps: [",
  "    { target: '#nav-01', content: '...' }",
  "  ]",
  "};",
];

function OpenSourceSection() {
  return (
    <section className="bg-[#001543] px-8 py-32">
      <div className="mx-auto flex w-full max-w-[1216px] flex-col items-center justify-center gap-16 lg:flex-row lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
          <div className="flex items-center gap-2 rounded-full bg-[#4299e133] px-3 py-1">
            <Code2 size={14} className="text-[#2374ff]" />
            <span className="text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-[#2374ff]">Open Source</span>
          </div>
          <h2 className="max-w-[596px] pt-0.5 text-[40px] font-bold leading-[1.08] tracking-[-0.96px] text-white sm:text-[48px] sm:leading-[56px]">
            Built by developers, for developers.
          </h2>
          <p className="max-w-[576px] text-[18px] leading-7 text-[#86a0cd]">
            Jagora is fully open-source and extensible. Contribute to the core, build your own plugins, or self-host for complete data sovereignty. Join our growing community of 10,000+ contributors.
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <a href="https://github.com" className="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-[14px] font-medium leading-5 text-[#001543] transition hover:bg-[#eef4ff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#001543]">
              <Star size={18} />
              Star on GitHub
            </a>
            <a href="/documentation" className="rounded-lg border-2 border-white/30 px-[34px] py-[18px] text-center text-[14px] font-medium leading-5 text-white transition hover:border-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#001543]">
              Read the Manifest
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 justify-center">
          <div className="w-full max-w-[448px] rounded-2xl border border-white/10 bg-white/5 p-[33px] backdrop-blur-md">
            <div className="mb-6 flex items-center gap-3">
              <span className="size-3 rounded-full bg-[#ba1a1a]" />
              <span className="size-3 rounded-full bg-[#424656]" />
              <span className="size-3 rounded-full bg-[#d0e1fb]" />
              <span className="ml-auto text-[12px] leading-4 text-white/50">jagora.config.js</span>
            </div>
            <pre className="overflow-auto whitespace-pre-wrap font-mono text-[14px] leading-5 text-white">
              {codeLines.map((line, index) => (
                <span key={line} className="block">
                  <span className="mr-3 text-white/40">{index + 1}</span>
                  <span className={line.includes("'") ? "text-[#d0e1fb]" : "text-white"}>{line}</span>
                </span>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenSourceSection;
