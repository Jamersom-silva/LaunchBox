"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slogan: "",
    description: "",
    url: "",
    tags: "",
    image: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(",").map(t => t.trim()),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/products/${data.product.id}`);
    } else {
      alert(data.error || "Error creating product");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Submit a new product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" name="name" placeholder="Product Name" onChange={handleChange} />
        <input className="input" name="slogan" placeholder="Short slogan" onChange={handleChange} />
        <textarea className="input" name="description" placeholder="Description" rows={4} onChange={handleChange} />
        <input className="input" name="url" placeholder="Website URL" onChange={handleChange} />
        <input className="input" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
        <input className="input" name="image" placeholder="Image URL" onChange={handleChange} />

        <button className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">
          Submit Product
        </button>
      </form>
    </div>
  );
}
