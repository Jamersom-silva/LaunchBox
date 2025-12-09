"use client";

import Link from "next/link";

type Maker = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  products: {
    id: string;
    name: string;
    slogan: string;
    image: string;
    votes: number;
  }[];
};

export default function MakerProfile({ maker }: { maker: Maker }) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <img
          src={maker.avatar}
          alt={maker.name}
          className="w-28 h-28 rounded-full border shadow"
        />

        <div>
          <h1 className="text-3xl font-bold">{maker.name}</h1>
          <p className="text-gray-600 mt-1">{maker.bio}</p>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Products launched</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {maker.products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h3 className="mt-3 font-bold text-lg">{prod.name}</h3>
              <p className="text-gray-600 text-sm">{prod.slogan}</p>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                👍 {prod.votes} votes
              </div>

              <Link
                href={`/products/${prod.id}`}
                className="mt-3 inline-block text-red-500 hover:underline text-sm"
              >
                View product →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
