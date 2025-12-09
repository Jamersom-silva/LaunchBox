"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "All",
  "AI",
  "Developer Tools",
  "Design",
  "Productivity",
  "Marketing",
  "Education",
];

export default function Categories() {
  const router = useRouter();
  const params = useSearchParams();

  const active = params.get("category") || "All";

  function selectCategory(cat: string) {
    const value = cat === "All" ? "" : `?category=${cat}`;
    router.push("/" + value);
  }

  return (
    <div className="flex items-center gap-3 justify-center mt-8 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => selectCategory(cat)}
          className={`
            px-4 py-2 rounded-full text-sm border transition
            ${
              active === cat
                ? "bg-red-500 text-white border-red-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-white"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
