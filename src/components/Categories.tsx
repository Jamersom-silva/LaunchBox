"use client";

import { useState } from "react";

export default function Categories() {
  const categories = ["All", "AI", "No Code", "Social Media", "Ecommerce", "Web3"];
  const [active, setActive] = useState("All");

  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`
                px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition
                border
                ${active === c ? "bg-black text-white border-black" : "bg-white hover:bg-gray-100"}
              `}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
