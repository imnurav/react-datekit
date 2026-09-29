import { ConstraintsDemosSection } from "./components/ConstraintsDemosSection";
import { DateTimeDemosSection } from "./components/DateTimeDemosSection";
import { MobilePreviewSection } from "./components/MobilePreviewSection";
import { AccessibilitySection } from "./components/AccessibilitySection";
import { InstallationSection } from "./components/InstallationSection";
import { ApiReferenceSection } from "./components/ApiReferenceSection";
import { InputDemosSection } from "./components/InputDemosSection";
import { CustomDemosSection } from "./components/CustomDemosSection";
import { BasicDemosSection } from "./components/BasicDemosSection";
import { RangeDemosSection } from "./components/RangeDemosSection";
import { PlaygroundSection } from "./components/PlaygroundSection";
import { ThemingSection } from "./components/ThemingSection";
import { DemoSidebar } from "./components/DemoSidebar";
import { HeroSection } from "./components/HeroSection";
import { DemoHeader } from "./components/DemoHeader";
import { DemoFooter } from "./components/DemoFooter";
import { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [theme]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <DemoHeader
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        onToggleMobileMenu={() => setMobileMenuOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 lg:flex">
        <DemoSidebar
          activeId={activeSection}
          onSelectSection={scrollToSection}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0 py-6 lg:py-8 lg:pl-10">
          <HeroSection />
          <PlaygroundSection />
          <InstallationSection />
          <BasicDemosSection />
          <InputDemosSection />
          <RangeDemosSection />
          <DateTimeDemosSection />
          <ConstraintsDemosSection />
          <CustomDemosSection />
          <MobilePreviewSection />
          <ThemingSection />
          <AccessibilitySection />
          <ApiReferenceSection />
        </main>
      </div>

      <DemoFooter />
    </div>
  );
}
