import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
export const metadata: Metadata = { title: { default: "NEXUS — Moderation, support, and leveling. One bot.", template: "%s · NEXUS" }, description: "Practical Discord server moderation, private support tickets, member leveling, and a verified web dashboard in one bot." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html lang="en"><body className="min-h-screen antialiased"><Providers>{children}</Providers></body></html>;
}
