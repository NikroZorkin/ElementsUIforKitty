/** Example and adapters: Copyright (c) 2026 NikroZorkin. MIT; licenses/elements.txt. */
"use client";
import Component from "../smoothui/ProductCard";
import { useState } from "react";
import { DemoFrame } from "../shared/DemoFrame";

export default function Demo() {
  const [message, setMessage] = useState("");
  return (
    <DemoFrame hint={message} className="p-4 gap-2">
      <Component
        className="w-52"
        image="/media/art-02.svg"
        title="Terra — Art print"
        price={48}
        originalPrice={65}
        rating={4.9}
        badge="Edition 02"
        onAddToCart={() => setMessage("Art print added to your demo cart.")}
        onWishlist={() => setMessage("Saved to your demo wishlist.")}
      />
    </DemoFrame>
  );
}
