import React from "react";

export const DemoFooter: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950 mt-16 text-center text-xs text-zinc-500 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          Released under the{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            MIT License
          </span>
          . Crafted for production React applications.
        </p>
        <p className="flex items-center gap-3">
          <a
            href="#introduction"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            Documentation
          </a>
          <span>&bull;</span>
          <a
            href="#playground"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            Studio
          </a>
          <span>&bull;</span>
          <a
            href="#api-reference"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            API Docs
          </a>
          <span>&bull;</span>
          <a
            href="https://github.com/imnurav/react-datekit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white transition"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};
