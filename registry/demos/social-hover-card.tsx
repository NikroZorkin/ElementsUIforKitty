/** Original example: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import { useState } from "react";
import SocialHoverCard from "../smoothui/SocialHoverCard";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [following, setFollowing] = useState(false);
  return (
    <DemoFrame
      className="gap-3"
      hint={
        following
          ? "Following the studio in this example."
          : "Hover or focus on the name to open the profile."
      }
    >
      <div className="flex h-72 w-full items-start justify-center pt-1">
        <SocialHoverCard
          defaultOpen
          placement="bottom"
          following={following}
          onFollowChange={setFollowing}
          profile={{
            id: "kitty-studio",
            name: "Kitty Studio",
            handle: "kitty.studio",
            avatar: "/media/art-03.svg",
            banner: "/media/art-01.svg",
            bio: "Small interfaces, useful details, and a little room to play.",
            stats: [
              { label: "Studies", value: 124 },
              { label: "Collections", value: 18 },
            ],
          }}
        />
      </div>
    </DemoFrame>
  );
}
