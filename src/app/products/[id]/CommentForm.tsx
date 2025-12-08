"use client";

import { useState } from "react";

export default function CommentForm({
  productId,
  onCommentPosted,
}: {
  productId: string;
  onCommentPosted: (comment: any) => void;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch(`/api/products/${productId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content: text }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      onCommentPosted(data.comment);
      setText("");
    }
  }

  return (
    <form onSubmit={submit} className="mb-4 flex gap-2">
      <input
        className="flex-1 border px-3 py-2 rounded-lg"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        {loading ? "..." : "Post"}
      </button>
    </form>
  );
}
