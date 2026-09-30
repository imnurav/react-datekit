import { CopyButton } from "./CopyButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background font-sans relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="flex flex-col flex-1 w-full max-w-6xl mx-auto px-6 pt-32 pb-16 z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-8 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            v0.0.2 is now available
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground">
            The date &amp; time picker for the <br />
            <span className="rdk-hero-gradient">modern web</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A production-ready, zero-dependency date and time picker built
            exclusively for React 18 &amp; 19. Single date, range, presets, time
            columns, and pure keyboard navigation.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/docs/getting-started/installation"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-8 text-background font-medium transition-transform hover:scale-105"
            >
              Get Started
            </Link>

            <Link
              href="/playground"
              className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card/60 hover:bg-card px-8 text-foreground font-medium transition-transform hover:scale-105"
            >
              Live Playground
            </Link>

            <div className="flex h-12 w-full sm:w-auto items-center justify-between gap-4 rounded-full border border-border bg-muted/30 px-6 font-mono text-sm text-muted-foreground">
              <span>npm i react-datekit</span>
              <CopyButton text="npm i react-datekit" />
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {features.map((f, i) => (
            <div
              key={i}
              className="rdk-card-hover flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Code Snippets Section */}
        <section className="flex flex-col gap-12 w-full max-w-4xl mx-auto border border-border rounded-3xl overflow-hidden bg-zinc-950 shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-zinc-400">
              App.tsx
            </span>
          </div>
          <div className="p-6 md:p-8 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed text-zinc-100">
              <span className="text-pink-400">import</span> {"{"} DatePicker{" "}
              {"}"} <span className="text-pink-400">from</span>{" "}
              <span className="text-green-300">&quot;react-datekit&quot;</span>;
              {"\n"}
              <span className="text-pink-400">import</span>{" "}
              <span className="text-green-300">
                &quot;react-datekit/style.css&quot;
              </span>
              ;{"\n"}
              <span className="text-pink-400">import</span> {"{"} useState {"}"}{" "}
              <span className="text-pink-400">from</span>{" "}
              <span className="text-green-300">&quot;react&quot;</span>;{"\n\n"}
              <span className="text-pink-400">
                export default function
              </span>{" "}
              <span className="text-blue-300">App</span>() {"{"}
              {"\n"}
              {"  "}
              <span className="text-pink-400">const</span> [range, setRange] ={" "}
              <span className="text-yellow-300">useState</span>(
              {`{ start: null, end: null }`});
              {"\n\n"}
              {"  "}
              <span className="text-pink-400">return</span> ({"\n"}
              {"    "}&lt;<span className="text-blue-300">DatePicker</span>
              {"\n"}
              {"      "}
              <span className="text-blue-200">mode</span>=
              <span className="text-green-300">&quot;range&quot;</span>
              {"\n"}
              {"      "}
              <span className="text-blue-200">value</span>={"{range}"}
              {"\n"}
              {"      "}
              <span className="text-blue-200">onChange</span>={"{setRange}"}
              {"\n"}
              {"      "}
              <span className="text-blue-200">presets</span>=
              {"{['today', 'last7Days', 'thisMonth']}"}
              {"\n"}
              {"      "}
              <span className="text-blue-200">numberOfMonths</span>={"{2}"}
              {"\n"}
              {"    "}/&gt;
              {"\n"}
              {"  "});
              {"\n"}
              {"}"}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Zero Dependencies",
    desc: "0 external runtime date arithmetic packages. Built purely on native JavaScript Date and cached Intl instances.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    title: "Unified Component API",
    desc: "Single, range, multiple, month, and year selection handled effortlessly via one clean <DatePicker /> component.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    title: "Time Picker Columns",
    desc: "Integrated scrollable 12h/24h time picker with optional seconds (:ss) selector and customizable minute stepping.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Quick-Select Presets",
    desc: "15+ built-in presets (today, last 7 days, this month) or supply custom date generators with docking placements.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
  {
    title: "Full WAI-ARIA & Keyboard",
    desc: "Grid navigation with Arrow keys, PageUp/PageDown month leaping, Home/End, and screen-reader announcements.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="6" x2="6.01" y1="9" y2="9" />
        <line x1="10" x2="10.01" y1="9" y2="9" />
        <line x1="14" x2="14.01" y1="9" y2="9" />
        <line x1="18" x2="18.01" y1="9" y2="9" />
        <line x1="8" x2="16" y1="13" y2="13" />
      </svg>
    ),
  },
  {
    title: "Design Tokens & Theming",
    desc: "Styled completely with pure CSS variables. Instant light/dark support, responsive sheets on mobile, and smooth transitions.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
];
