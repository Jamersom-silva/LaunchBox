"use client";

import SkeletonProduct from "./SkeletonProduct";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Tipagem correta considerando makers
type Product = {
  id: string;
  name: string;
  slogan: string;
  image: string | null;
  votes: { id: string; userId: string }[];
  comments: { id: string }[];
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export default function ProductList() {
  const { data: session } = useSession();
  const params = useSearchParams();
  const category = params.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------------
  //  LOAD PRODUCTS WITH CATEGORY FILTER
  // -----------------------------------
  useEffect(() => {
    async function load() {
      setLoading(true);

      const url = "/api/products" + (category ? `?category=${category}` : "");

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data);
      setLoading(false);
    }

    load();
  }, [category]);

  // -----------------------------------
  // Toggle Upvote
  // -----------------------------------
  async function toggleVote(productId: string) {
    if (!session) {
      alert("You must be logged in to vote.");
      return;
    }

    const res = await fetch(`/api/products/${productId}/vote`, {
      method: "POST",
    });

    const data = await res.json();
    if (!data.success) return;

    // Atualização otimista
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              votes: Array.from({ length: data.votesCount }).map((_, i) => ({
                id: `${p.id}-v${i}`,
                userId: i === 0 ? session.user.id : "other",
              })),
            }
          : p
      )
    );
  }

  // -----------------------------------
  // LOADING SKELETON
  // -----------------------------------
  if (loading)
    return (
      <div className="grid gap-4 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonProduct key={i} />
        ))}
      </div>
    );

  // -----------------------------------
  // RENDER PRODUCTS
  // -----------------------------------
  return (
    <div className="grid gap-4 mt-6">
      {products.map((p) => {
        const userHasVoted = p.votes.some(
          (v) => v.userId === session?.user?.id
        );

        return (
          <div
            key={p.id}
            className="p-4 bg-white rounded shadow hover:shadow-md transition border"
          >
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.slogan}</p>

            {/* MAKER INFO */}
            <div className="flex items-center gap-2 mt-3">
              <Link href={`/user/${p.user.id}`}>
                <img
                  src={p.user.image || "/default-avatar.png"}
                  alt={p.user.name || "Maker"}
                  className="w-6 h-6 rounded-full border cursor-pointer hover:opacity-80"
                />
              </Link>

              <Link
                href={`/user/${p.user.id}`}
                className="text-xs text-gray-600 hover:underline"
              >
                {p.user.name || "Unknown"}
              </Link>
            </div>

            {/* UPVOTE BUTTON */}
            <button
              onClick={() => toggleVote(p.id)}
              className={`px-3 py-1 rounded-lg border font-medium transition
                ${
                  userHasVoted
                    ? "bg-red-500 text-white border-red-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
              `}
            >
              👍 {p.votes.length}
            </button>

            <span className="ml-3 text-gray-500">💬 {p.comments.length}</span>
          </div>
        );
      })}
    </div>
  );
}
