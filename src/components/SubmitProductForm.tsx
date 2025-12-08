"use client";

import { useState } from "react";

type FormState = {
  name: string;
  slogan: string;
  description: string;
  url: string;
  image: string;
  tags: string; // comma separated input for simplicity
};

export default function SubmitProductForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    slogan: "",
    description: "",
    url: "",
    image: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const payload = {
        ...form,
        // tags can be sent as CSV string (the API accepts CSV or array)
        tags: form.tags,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Unexpected error");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setForm({
        name: "",
        slogan: "",
        description: "",
        url: "",
        image: "",
        tags: "",
      });
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Submit Product</h3>

      <label className="block mb-2">
        <span className="text-sm">Name</span>
        <input required name="name" value={form.name} onChange={onChange} className="w-full border rounded px-3 py-2 mt-1" />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Slogan</span>
        <input name="slogan" value={form.slogan} onChange={onChange} className="w-full border rounded px-3 py-2 mt-1" />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Description</span>
        <textarea required name="description" value={form.description} onChange={onChange} className="w-full border rounded px-3 py-2 mt-1" rows={5} />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Product URL</span>
        <input name="url" value={form.url} onChange={onChange} className="w-full border rounded px-3 py-2 mt-1" />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Image URL</span>
        <input name="image" value={form.image} onChange={onChange} className="w-full border rounded px-3 py-2 mt-1" />
      </label>

      <label className="block mb-4">
        <span className="text-sm">Tags (comma separated)</span>
        <input name="tags" value={form.tags} onChange={onChange} className="w-full border rounded px-3 py-2 mt-1" />
      </label>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Product created!</div>}

      <button type="submit" disabled={loading} className="px-4 py-2 bg-red-500 text-white rounded">
        {loading ? "Saving..." : "Create Product"}
      </button>
    </form>
  );
}
