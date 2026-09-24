import type { Metadata } from "next";
import entries from "@/data/entries.json";

export const metadata: Metadata = {
  title: { default: "Elements — a little UI goes a long way", template: "%s · Elements" },
  description: `${entries.length} thoughtfully selected React components. Try them live, explore the source, and make them yours. No sign-up required.`,
  applicationName: "Elements for Kitty",
};
const themeScript = `try{var p=localStorage.getItem("kitty-theme")||"system";var d=p==="dark"||(p==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var t=new URLSearchParams(location.search).get("theme");if(location.pathname.startsWith("/preview/")&&t)d=t==="dark";document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
