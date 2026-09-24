import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
