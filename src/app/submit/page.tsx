"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function SubmitProduct() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="p-10 text-center text-gray-600">
        You must be logged in to submit a product.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        slogan,
        description,
        url,
        tags,
        image: imageUrl,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push(`/products/${data.product.id}`);
    } else {
      alert(data.error || "Failed to create product");
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white border rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6">Submit a New Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* IMAGE UPLOAD */}
        <div>
          <label className="font-semibold block mb-1">Product Image</label>
          <ImageUploader onUploaded={(url) => setImageUrl(url)} />
        </div>

        {/* NAME */}
        <div>
          <label className="font-semibold block mb-1">Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* SLOGAN */}
        <div>
          <label className="font-semibold block mb-1">Slogan</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold block mb-1">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* URL */}
        <div>
          <label className="font-semibold block mb-1">Website URL</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="font-semibold block mb-1">Tags (comma separated)</label>
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="ai, productivity, tools"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}
