/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/Faq1";
export default function Demo() {
  return (
    <div className="section-example">
      <Component
        title="A few useful answers."
        description="Choose a topic to explore."
        categories={[
          {
            id: "start",
            name: "Getting started",
            faqs: [
              {
                question: "What is included?",
                answer: "A live example, the source code and everything needed to use it.",
                icon: "Download",
              },
              {
                question: "Can I change the design?",
                answer: "Yes. Adapt the colors, content and layout for your project.",
                icon: "Settings",
              },
            ],
          },
          {
            id: "code",
            name: "Using the code",
            faqs: [
              {
                question: "Which stack is this for?",
                answer: "React and TypeScript, with Tailwind CSS and Motion.",
                icon: "Activity",
              },
              {
                question: "Where is the license?",
                answer: "The source bundle includes the original license and credits.",
                icon: "Scale",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
