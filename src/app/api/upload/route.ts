import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const res = await cloudinary.uploader.upload_stream(
    { folder: "launchbox" },
    (err, result) => {
      if (err) return;
    }
  );

  return NextResponse.json({ url: res.secure_url });
}
