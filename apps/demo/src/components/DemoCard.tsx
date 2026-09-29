import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";

export interface DemoCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  badge?: string;
  note?: string;
  language?: string;
}

export const DemoCard: React.FC<DemoCardProps> = ({
  id,
  title,
  description,
  code,
  children,
  badge,
  note,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <section id={id} className="scroll-mt-24 mb-14">
      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm overflow-hidden">
        {/* Card Tabs Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/50">
          <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-800/80 p-0.5 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeTab === "preview"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeTab === "code"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Code
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Interactive</span>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "preview" ? (
          <div className="p-4 sm:p-8 flex flex-col items-center justify-center min-h-[260px] bg-zinc-50/30 dark:bg-zinc-900/30 overflow-x-auto max-w-full">
            {children}
          </div>
        ) : (
          <div className="p-4 sm:p-5 bg-zinc-950">
            <CodeBlock code={code} language={language} />
          </div>
        )}

        {note && (
          <div className="px-4 py-2.5 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/50 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-zinc-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{note}</span>
          </div>
        )}
      </div>
    </section>
  );
};
