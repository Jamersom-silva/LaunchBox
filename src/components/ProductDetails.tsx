"use client";
import { useState } from "react";

export default function ProductDetails({ productId }: { productId: string }) {
  const [comments] = useState([
    { id: "c1", author: "Jane Doe", text: "Nice product!" },
  ]);

  const product = {
    id: productId,
    name: "Taskade",
    description:
      "Taskade is the ultimate productivity tool to build a second brain for your team. Organize projects, collaborate, and automate workflows with ease. Long description here to simulate content and spacing...",
    votes: 444,
    category: "Productivity",
    image: "https://via.placeholder.com/1200x600",
    maker: {
      name: "John Maker",
      avatar: "",
      bio: "Founder • Builder",
    },
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main column */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>

            {/* Image */}
            <div className="mt-6 rounded-xl overflow-hidden border">
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
            </div>

            {/* Description */}
            <div className="mt-6 text-gray-700 leading-relaxed">
              <p>{product.description}</p>
              <p className="mt-4">{product.description}</p>
            </div>

            {/* Maker */}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium">{product.maker.name}</p>
                <p className="text-xs text-gray-500">{product.maker.bio}</p>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Comments</h3>
              <div className="mt-4 space-y-4">
                {comments.map(c => (
                  <div key={c.id} className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm"><strong>{c.author}</strong></p>
                    <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column — sticky upvote + info */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-4">
            <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col items-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">▲ Upvote</button>
              <div className="mt-2 text-sm font-medium">{product.votes} votes</div>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h4 className="font-semibold mb-2">About the maker</h4>
              <p className="text-sm text-gray-600">{product.maker.name}</p>
              <p className="text-xs text-gray-500">{product.maker.bio}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
