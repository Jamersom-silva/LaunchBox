"use client";

import { useState } from "react";

type ImageUploaderProps = {
  onUploaded: (url: string) => void; // retorna a URL da imagem enviada
};

export default function ImageUploader({ onUploaded }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview da imagem
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

    // Upload ao backend
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    const data = await res.json();

    if (data.url) {
      onUploaded(data.url); // envia URL real ao formulário
    } else {
      alert("Upload failed");
    }
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Preview da imagem */}
      {preview ? (
        <img
          src={preview}
          className="w-full max-h-64 object-cover rounded-lg border shadow-sm"
        />
      ) : (
        <div className="w-full h-32 border rounded-lg flex items-center justify-center text-gray-500 bg-gray-50">
          No image selected
        </div>
      )}

      {/* Input de arquivo */}
      <label className="cursor-pointer px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 transition text-sm w-fit">
        {uploading ? "Uploading..." : "Select Image"}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
