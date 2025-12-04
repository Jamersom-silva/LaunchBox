"use client";

type Product = {
  id: string;
  name: string;
  description: string;
  votes: number;
  category: string;
  image?: string;
  tags?: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="
        flex items-start justify-between gap-4 p-5
        bg-white rounded-xl border border-gray-200
        shadow-[0_2px_4px_rgba(0,0,0,0.04)]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        hover:-translate-y-[2px]
        transition-all duration-200 cursor-pointer
      "
    >
      {/* LEFT SECTION */}
      <div className="flex items-start gap-4">

        {/* THUMBNAIL */}
        <div className="
          w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center 
          overflow-hidden border border-gray-200
        ">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-gray-700">
              {product.name[0]}
            </span>
          )}
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-0.5">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {product.description}
          </p>

          {/* TAGS + CATEGORY */}
          <div className="flex gap-2 flex-wrap">
            {product.tags?.map(tag => (
              <span
                key={tag}
                className="
                  px-2 py-[2px] text-xs rounded-full border
                  bg-gray-50 text-gray-700 border-gray-200
                "
              >
                {tag}
              </span>
            ))}

            <span className="text-xs text-gray-400">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION — UPVOTE BUTTON */}
      <div className="flex flex-col items-center">
        <button
          className="
            border border-gray-300 rounded-lg px-3 py-1.5 text-sm
            hover:bg-gray-100 active:scale-90 transition
            shadow-sm
          "
        >
          ▲
        </button>

        <span className="text-sm mt-1 font-medium text-gray-700">
          {product.votes}
        </span>
      </div>
    </div>
  );
}
