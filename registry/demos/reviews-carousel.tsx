/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ReviewsCarousel";
import { DemoFrame } from "../shared/DemoFrame";
export default function Demo() {
  return (
    <DemoFrame hint={"Example reviews · Use the arrows to browse."}>
      <Component
        className="w-full max-w-md"
        height="250px"
        reviews={[
          {
            id: "mira",
            author: "Mira Chen · Product designer",
            title: "The details made the difference.",
            body: "The interaction feels considered. I could try it, read the code, and adapt it in the same afternoon.",
          },
          {
            id: "elias",
            author: "Elias Moreno · Developer",
            title: "A good place to start.",
            body: "Small, focused components that leave room for the rest of my project.",
          },
          {
            id: "noor",
            author: "Noor Haddad · Designer",
            title: "Motion with a purpose.",
            body: "The transitions explain what changed without getting in the way.",
          },
        ]}
        autoPlay={false}
      />
    </DemoFrame>
  );
}
