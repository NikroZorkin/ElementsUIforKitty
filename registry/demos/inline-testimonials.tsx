/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/InlineTestimonials";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  return (
    <DemoFrame hint="Select an avatar to read the story.">
      <Component
        className="max-w-lg text-center text-3xl font-medium leading-relaxed tracking-tight"
        avatarSize={34}
        text="A little studio, making a big difference for {{alex}}, {{sam}}, and people like you."
        testimonials={[
          {
            id: "alex",
            name: "Alex Morgan",
            role: "Designer",
            quote: "The little details made all the difference.",
            avatar: "/media/art-01.svg",
            rating: 5,
          },
          {
            id: "sam",
            name: "Sam Rivera",
            role: "Developer",
            quote: "Thoughtful, simple, and a joy to build with.",
            avatar: "/media/art-03.svg",
            rating: 5,
          },
        ]}
      />
    </DemoFrame>
  );
}
