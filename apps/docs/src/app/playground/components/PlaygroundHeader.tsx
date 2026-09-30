import { Sparkles, RefreshCw } from "lucide-react";
import React from "react";

interface PlaygroundHeaderProps {
  onReset: () => void;
}

export const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  onReset,
}) => {
  return (
    <div className="border-b border-border bg-card/40 backdrop-blur-sm px-4 sm:px-6 py-3.5 shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
                Interactive Studio
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
                Live Preview
              </span>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Configure modes, ranges, time pickers, presets, and generate
              ready-to-use React code.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted/40 text-xs font-semibold text-muted-foreground hover:text-foreground transition shadow-xs"
          title="Reset to defaults"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
