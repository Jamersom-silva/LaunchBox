"use client";

import { useState } from "react";

export default function Categories() {
  const categories = [
    "All",
    "AI",
    "No Code",
    "Social Media",
    "Ecommerce",
    "Web3",
  ];

  const [active, setActive] = useState("All");

  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-3">

        {/* Scroll container */}
        <div className="relative">

          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-none" />

          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pr-4">

            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`
                  px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200
                  border
                  ${
                    active === c
                      ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {c}
              </button>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
