import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";

export const InstallationSection: React.FC = () => {
  const [activePkg, setActivePkg] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const pkgCommands: Record<"pnpm" | "npm" | "yarn" | "bun", string> = {
    pnpm: "pnpm add react-datekit",
    npm: "npm install react-datekit",
    yarn: "yarn add react-datekit",
    bun: "bun add react-datekit",
  };

  const importCode = `// Import component and CSS stylesheet
import { DatePicker } from 'react-datekit';
import 'react-datekit/style.css';

export function MyComponent() {
  return <DatePicker placeholder="Select date..." />;
}`;

  const nextJsCode = `'use client';

import { useState } from 'react';
import { DatePicker, DateRange } from 'react-datekit';
import 'react-datekit/style.css';

export default function BookingPage() {
  const [range, setRange] = useState<DateRange | null>(null);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Select Stay Dates</h1>
      <DatePicker
        mode="range"
        value={range}
        onChange={setRange}
        presets={['today', 'thisWeek', 'last7Days', 'last30Days']}
      />
    </main>
  );
}`;

  return (
    <section id="installation" className="scroll-mt-24 mb-16 pt-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Installation & Setup
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Install{" "}
          <code className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
            react-datekit
          </code>{" "}
          into your React 18 or React 19 project.
        </p>
      </div>

      <div className="space-y-8">
        {/* Package Manager Tabs */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            {(["pnpm", "npm", "yarn", "bun"] as const).map((pkg) => (
              <button
                key={pkg}
                type="button"
                onClick={() => setActivePkg(pkg)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                  activePkg === pkg
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {pkg}
              </button>
            ))}
          </div>
          <CodeBlock code={pkgCommands[activePkg]} language="bash" />
        </div>

        {/* Basic Import */}
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
            Import Component & Styles
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            Import <code className="font-mono font-semibold">DatePicker</code>{" "}
            and the bundled CSS stylesheet once in your application entry or layout.
          </p>
          <CodeBlock code={importCode} title="App.tsx" />
        </div>

        {/* Next.js Documentation */}
        <div id="nextjs" className="scroll-mt-24 pt-2">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Next.js (App Router & Pages)
            </h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              SSR Compatible
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            In Next.js App Router, specify the{" "}
            <code className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
              'use client'
            </code>{" "}
            directive since the component handles rich DOM interactions, touch events, and keyboard navigation.
          </p>
          <CodeBlock code={nextJsCode} title="app/booking/page.tsx" />
        </div>
      </div>
    </section>
  );
};
