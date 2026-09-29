import { NAV_GROUPS } from "../types/demo";
import React from "react";

export interface DemoSidebarProps {
  activeId: string;
  onSelectSection: (id: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const DemoSidebar: React.FC<DemoSidebarProps> = ({
  activeId,
  onSelectSection,
  mobileOpen,
  onCloseMobile,
}) => {
  const content = (
    <nav className="space-y-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2.5 px-3">
            {group.title}
          </h3>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSection(item.id);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition cursor-pointer text-left ${
                      isActive
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-52 shrink-0 py-8 pr-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-zinc-900 h-full p-6 shadow-xl flex flex-col justify-between overflow-y-auto z-10 border-r border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-base text-zinc-900 dark:text-white">
                  Documentation
                </span>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
