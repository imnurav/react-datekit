import { DemoCard } from "./DemoCard";
import React from "react";

export const ThemingSection: React.FC = () => {
  const cssVariablesCode = `/* Override React DateKit design tokens in your CSS */
:root {
  --rdk-primary: #1677ff;
  --rdk-primary-hover: #4096ff;
  --rdk-background: #ffffff;
  --rdk-surface: #ffffff;
  --rdk-surface-alt: #f8fafc;
  --rdk-text: #1f2937;
  --rdk-text-secondary: #6b7280;
  --rdk-border: #e5e7eb;
  --rdk-hover: #f3f4f6;
  --rdk-selected: #1677ff;
  --rdk-range: #eaf2ff;
  --rdk-disabled: #d1d5db;
  --rdk-radius: 12px;
  --rdk-cell-size: 40px;
}

/* Dark Theme */
.dark, [data-theme="dark"] {
  --rdk-primary: #3b82f6;
  --rdk-primary-hover: #60a5fa;
  --rdk-background: #0f172a;
  --rdk-surface: #1e293b;
  --rdk-text: #f8fafc;
  --rdk-border: #334155;
  --rdk-range: #1e3a8a;
}`;

  const tokens = [
    {
      name: "--rdk-primary",
      desc: "Primary highlight & active selection color",
    },
    {
      name: "--rdk-primary-hover",
      desc: "Hover background for primary button elements",
    },
    { name: "--rdk-background", desc: "Main DatePicker root background" },
    {
      name: "--rdk-surface-alt",
      desc: "Background color for presets sidebar and time columns",
    },
    {
      name: "--rdk-text",
      desc: "Primary text color for dates, headers, buttons",
    },
    {
      name: "--rdk-text-secondary",
      desc: "Muted text color for weekdays and subtitles",
    },
    {
      name: "--rdk-border",
      desc: "Divider and container outline border color",
    },
    {
      name: "--rdk-range",
      desc: "Connector background for selected range intervals",
    },
    { name: "--rdk-radius", desc: "Container border-radius (default 12px)" },
    {
      name: "--rdk-cell-size",
      desc: "Width and height of date cells (default 40px)",
    },
  ];

  return (
    <section id="theming" className="scroll-mt-24 mb-16 pt-8">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Theming & CSS Variables
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          All styles are driven by standard{" "}
          <code className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
            --rdk-*
          </code>{" "}
          CSS variables. Customize colors, radii, or fonts without touching
          JavaScript.
        </p>
      </div>

      <div className="space-y-6">
        <DemoCard
          id="tokens"
          title="Theme Tokens Definition"
          description="React DateKit responds to both .dark class and [data-theme='dark'] attribute natively."
          code={cssVariablesCode}
          language="css"
        >
          <div className="w-full max-w-2xl overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-2.5 px-4">CSS Variable</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                {tokens.map((t) => (
                  <tr
                    key={t.name}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
                  >
                    <td className="py-2.5 px-4 text-zinc-900 dark:text-white font-semibold">
                      {t.name}
                    </td>
                    <td className="py-2.5 px-4 font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                      {t.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DemoCard>
      </div>
    </section>
  );
};
