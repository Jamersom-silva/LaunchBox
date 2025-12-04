"use client";

type Product = {
  id: string;
  name: string;
  description: string;
  votes: number;
  category: string;
  image?: string; // opcional, para quando adicionarmos upload
  tags?: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="
        flex items-start gap-4 p-5 bg-white rounded-xl border shadow-sm
        hover:shadow-md hover:-translate-y-[1px] transition-all duration-200
        cursor-pointer
      "
    >
      {/* Thumbnail */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg md:text-xl font-bold text-gray-700">
            {product.name[0]}
          </span>
        )}
      </div>

      {/* Middle section */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-tight">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        <div className="flex gap-2 mt-1 flex-wrap">
          {/* Tags */}
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 border text-gray-600"
            >
              {tag}
            </span>
          ))}

          {/* Category */}
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>
      </div>

      {/* Upvote */}
      <div className="flex flex-col items-center">
        <button
          className="
            border rounded-md px-2 py-1 text-sm hover:bg-gray-100 
            transition active:scale-90
          "
        >
          ▲
        </button>
        <span className="text-sm mt-1 font-medium text-gray-700">{product.votes}</span>
      </div>
    </div>
  );
}
