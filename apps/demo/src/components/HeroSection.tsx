import { DatePicker, DateRange } from "react-datekit";
import React, { useState } from "react";

export const HeroSection: React.FC = () => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 7);
  const [range, setRange] = useState<DateRange | null>([today, nextMonth]);
  const [activePkg, setActivePkg] = useState<"pnpm" | "npm" | "yarn" | "bun">(
    "pnpm",
  );
  const [copied, setCopied] = useState(false);

  const pkgCommands = {
    pnpm: "pnpm add react-datekit",
    npm: "npm install react-datekit",
    yarn: "yarn add react-datekit",
    bun: "bun add react-datekit",
  };

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(pkgCommands[activePkg]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="introduction"
      className="pt-6 pb-16 border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              Zero Dependencies &bull; Production Ready &bull; Native Intl
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6">
            The date & time picker for the modern web.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            A production-ready, framework-first calendar and time picker for
            React. Supports single, range, multiple dates, smart popover input,
            presets, and touch devices — zero configuration required.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
            <a
              href="#playground"
              className="px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 font-semibold text-sm transition shadow-sm"
            >
              Interactive Studio
            </a>
            <a
              href="#installation"
              className="px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition"
            >
              Quick Start
            </a>
            <a
              href="#api-reference"
              className="px-5 py-2.5 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-medium text-sm transition"
            >
              API Reference &rarr;
            </a>
          </div>

          {/* Quick Package Manager Selector Snippet (Tabs on top, command on next line) */}
          <div className="w-full max-w-sm rounded-xl bg-zinc-900 text-zinc-200 font-mono border border-zinc-800 shadow-sm overflow-hidden text-left">
            {/* Top row: tabs */}
            <div className="flex items-center border-b border-zinc-800/80 bg-zinc-950 px-3 py-1.5 gap-1.5">
              {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
                <button
                  key={pkg}
                  type="button"
                  onClick={() => setActivePkg(pkg)}
                  className={`px-2.5 py-0.5 rounded text-xs font-sans font-medium transition cursor-pointer ${
                    activePkg === pkg
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>

            {/* Bottom row: code command + copy */}
            <div className="flex items-center justify-between px-3.5 py-2.5 gap-3">
              <span className="text-zinc-300 select-all font-mono text-xs sm:text-sm">
                <span className="text-zinc-500 select-none mr-2">$</span>
                {pkgCommands[activePkg]}
              </span>
              <button
                type="button"
                onClick={copyInstall}
                className="text-zinc-400 hover:text-white transition cursor-pointer p-1 rounded hover:bg-zinc-800"
                aria-label="Copy install command"
              >
                {copied ? (
                  <span className="text-emerald-400 text-xs font-sans font-semibold">
                    Copied!
                  </span>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Live Hero DatePicker Preview */}
        <div className="flex-1 flex justify-center w-full overflow-x-auto">
          <div className="flex justify-center">
        <DatePicker
            mode="range"
            value={range}
            onChange={setRange}
            numberOfMonths={1}
            presets={["today", "last7Days", "thisMonth", "last30Days"]}
          />
          </div>
        </div>
      </div>

      {/* Feature Grid - PlayerKit Inspired */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800 text-left">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 flex items-center gap-2">
            <span>Zero Dependencies</span>
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Engineered exclusively with native JavaScript Date and cached Intl
            APIs. No heavy date-fns or moment bundle bloat.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 flex items-center gap-2">
            <span>Unified Architecture</span>
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            One unified &lt;DatePicker /&gt; component handles inline views,
            popover triggers, ranges, multiple dates, and time selection.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 flex items-center gap-2">
            <span>Mobile &amp; Responsive First</span>
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Automatic fluid stacking, swipeable preset bars, and 44px touch
            targets that adapt dynamically to any container width.
          </p>
        </div>
      </div>
    </section>
  );
};
