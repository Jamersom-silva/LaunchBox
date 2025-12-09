"use client";

import { categories } from "@/data/categories";
import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryFilter() {
  const params = useSearchParams();
  const router = useRouter();

  const active = params.get("category") || "All";

  function selectCategory(cat: string) {
    const query = cat === "All" ? "" : `?category=${cat}`;
    router.push("/" + query);
  }

  return (
    <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
      <button
        onClick={() => selectCategory("All")}
        className={`px-4 py-2 rounded-full text-sm border 
          ${active === "All" ? "bg-red-500 text-white" : "bg-white"}`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => selectCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm border whitespace-nowrap
            ${active === cat ? "bg-red-500 text-white" : "bg-white"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
