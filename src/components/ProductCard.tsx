"use client";

type Product = {
  id: string;
  name: string;
  description: string;
  votes: number;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-xl border hover:shadow-md shadow-sm transition cursor-pointer">

      {/* LOGO */}
      <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-800">
        {product.name[0]}
      </div>

      {/* TEXTOS */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <span className="text-xs text-gray-400">{product.category}</span>
      </div>

      {/* VOTOS */}
      <div className="flex flex-col items-center">
        <button className="border rounded-md px-2 py-1 text-sm hover:bg-gray-100 transition">
          ▲
        </button>
        <span className="text-sm mt-1 text-gray-700">{product.votes}</span>
      </div>
    </div>
  );
}
