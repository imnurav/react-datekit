import { RootProvider } from "fumadocs-ui/provider/next";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "React DateKit — Modern React Date & Time Picker",
    template: "%s | React DateKit Docs",
  },
  description:
    "A modern, responsive, zero-dependency date and time picker for React 18 & 19. Single date, range, presets, time picker, responsive popovers, and full keyboard accessibility.",
  keywords: [
    "react date picker",
    "date-picker",
    "react-datekit",
    "calendar",
    "date range picker",
    "datetime picker",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <RootProvider
          theme={{ defaultTheme: "system", enableSystem: true }}
          search={{
            options: {
              type: "static",
            },
            links: [
              ["Documentation", "/docs/getting-started/introduction"],
              ["Playground", "/playground"],
              ["Installation", "/docs/getting-started/installation"],
              ["Single Date", "/docs/components/single-date"],
              ["Date Range", "/docs/components/date-range"],
              ["Date & Time", "/docs/components/date-time"],
              ["API Reference", "/docs/reference/props"],
              ["Changelog", "/changelog/v0.0.1"],
            ],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
