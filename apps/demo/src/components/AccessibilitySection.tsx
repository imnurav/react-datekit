import React from "react";

export const AccessibilitySection: React.FC = () => {
  const keyboardKeys = [
    {
      key: "Left / Right",
      action: "Move focus by 1 day (reverses in RTL automatically)",
    },
    {
      key: "Up / Down",
      action: "Move focus by 1 week (7 days backward / forward)",
    },
    { key: "Home / End", action: "Jump to start or end of the current week" },
    { key: "PageUp / PageDown", action: "Jump to previous or next month" },
    { key: "Shift + PageUp / Down", action: "Jump to previous or next year" },
    { key: "Enter / Space", action: "Select focused date or complete range" },
    { key: "Escape", action: "Cancel in-progress range selection" },
  ];

  return (
    <section id="accessibility" className="scroll-mt-24 mb-16 pt-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Accessibility (a11y)
          </h2>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            WAI-ARIA Compliant
          </span>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">
          React DateKit is built strictly following the W3C WAI-ARIA authoring
          practices for Date Pickers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
            ARIA Semantics & Screen Readers
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The grid uses <code className="font-mono">role="grid"</code>, column
            headers use <code className="font-mono">role="columnheader"</code>,
            and dates use <code className="font-mono">role="gridcell"</code>.
            Cell buttons provide verbose labels (e.g.{" "}
            <em>"Tuesday, September 15, 2026, Selected"</em>).
          </p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
            Focus Management & Reduced Motion
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Maintains roving <code className="font-mono">tabIndex</code> so Tab
            enters/exits the component naturally. Automatically disables
            animations when{" "}
            <code className="font-mono">prefers-reduced-motion</code> is active.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
        <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 font-semibold text-sm text-zinc-900 dark:text-white">
          Keyboard Navigation Reference
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {keyboardKeys.map((item) => (
                <tr
                  key={item.key}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  <td className="py-2.5 px-5 font-mono font-medium text-zinc-900 dark:text-zinc-200 whitespace-nowrap">
                    <kbd className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs shadow-xs text-zinc-800 dark:text-zinc-200">
                      {item.key}
                    </kbd>
                  </td>
                  <td className="py-2.5 px-5 text-zinc-600 dark:text-zinc-400">
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
