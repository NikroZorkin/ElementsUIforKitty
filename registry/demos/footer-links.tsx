/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Footer4";
import { useState } from "react";
export default function Demo() {
  const [page, setPage] = useState("Studio notes");
  return (
    <>
      <div
        className="w-full"
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest("a");
          if (link?.getAttribute("href")?.startsWith("#")) {
            event.preventDefault();
            setPage(link.textContent ?? "Studio");
          }
        }}
      >
        <div className="px-8 py-12">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            The closing chapter
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Good things are better shared.</h2>
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            {page}
          </p>
        </div>
        <Component
          logo={<span className="font-semibold text-xl">Kitty Studio</span>}
          copyright="© 2026 Kitty Studio"
          links={[
            { label: "Studio", href: "#studio" },
            { label: "Journal", href: "#journal" },
            { label: "Contact", href: "#contact" },
          ]}
          socialLinks={[]}
        />
      </div>
    </>
  );
}
