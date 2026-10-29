import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PwaManager } from "@/components/PwaManager";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F5F5F7"
};

export const metadata: Metadata = {
  title: "TITAN Recomp — Home Body Transformation Companion",
  description: "Night-shift optimized 10-week home body transformation program, live workout coach, posture guide, and nutrition planner.",
  keywords: ["workout tracker", "calisthenics", "home workout", "night shift fitness", "10 week body transformation"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TITAN"
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PwaManager />
        {children}
      </body>
    </html>
  );
}

