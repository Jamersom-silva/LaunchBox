"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

// -------------------------------
// TYPES
// -------------------------------
type Comment = {
  id: string;
  content: string;
  createdAt: Date;  // Prisma retorna Date, não string!
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type Maker = {
  id: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type Product = {
  id: string;
  name: string;
  slogan: string;
  description: string;
  image: string | null;
  url: string | null;
  votes: { id: string }[];
  comments: Comment[];
  makers: Maker[];
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  userHasVoted?: boolean;
};

// -------------------------------
// COMPONENT
// -------------------------------
export default function ProductClient({ product }: { product: Product }) {
  const { data: session } = useSession();

  // -----------------------------
  // UPVOTES
  // -----------------------------
  const [votesCount, setVotesCount] = useState(product.votes.length);
  const [userHasVoted, setUserHasVoted] = useState(product.userHasVoted ?? false);
  const [loadingVote, setLoadingVote] = useState(false);

  async function handleVote() {
    if (!session) return alert("You must be logged in to vote!");

    setLoadingVote(true);

    const res = await fetch(`/api/products/${product.id}/vote`, {
      method: "POST",
    });

    const data = await res.json();
    setLoadingVote(false);

    if (data.success) {
      setVotesCount(data.votesCount);
      setUserHasVoted(data.userHasVoted);
    }
  }

  // -----------------------------
  // COMMENTS
  // -----------------------------
  const [comments, setComments] = useState<Comment[]>(product.comments);

  function handleNewComment(comment: Comment) {
    setComments((prev) => [comment, ...prev]);
  }

  async function handleDeleteComment(commentId: string) {
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  async function handleEditComment(commentId: string, content: string) {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, content: data.comment.content } : c
      )
    );
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">

      {/* LEFT COLUMN */}
      <div className="space-y-6">

        {/* HERO */}
        <section>
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-full max-h-80 object-cover rounded-lg shadow"
          />

          <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.slogan}</p>
        </section>

        {/* DESCRIPTION */}
        <section>
          <h2 className="text-xl font-semibold mb-2">About this product</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </section>

        {/* COMMENTS */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Comments</h2>

          {session ? (
            <CommentForm 
              productId={product.id}
              onCommentPosted={handleNewComment}
            />
          ) : (
            <p className="text-sm text-gray-500">
              You must be logged in to comment.
            </p>
          )}

          <CommentsList
            comments={comments}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        </section>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="md:sticky md:top-24 h-fit flex flex-col gap-6">

        {/* UPVOTE BUTTON */}
        <button
          onClick={handleVote}
          disabled={loadingVote}
          className={`
            flex items-center gap-3 px-5 py-3 rounded-full border transition-all bg-white shadow-sm
            ${userHasVoted ? "border-red-500 text-red-600" : "border-gray-300 text-gray-700"}
            ${loadingVote ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <span className="text-2xl">👍</span>
          <span className="text-lg font-bold">
            {loadingVote ? "..." : votesCount}
          </span>
        </button>

        {/* VISIT BUTTON */}
        <a
          href={product.url || "#"}
          target="_blank"
          className="w-full text-center px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
        >
          Visit
        </a>

        {/* MAKERS SECTION */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Makers</h3>

          <div className="flex flex-col gap-3">
            {product.makers.length === 0 && (
              <p className="text-sm text-gray-500">No makers assigned.</p>
            )}

            {product.makers.map((maker) => (
              <div key={maker.id} className="flex items-center gap-3">
                <img
                  src={maker.user.image || "/default-avatar.png"}
                  alt={maker.user.name || "Maker"}
                  className="w-10 h-10 rounded-full border shadow-sm"
                />

                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {maker.user.name}
                  </span>

                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full w-fit">
                    Maker
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
