import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Converte File → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload como Promise
    const uploadResult: any = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: "launchbox",
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );

      upload.end(buffer); // Envia o buffer para o stream
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { error: "Failed to upload" },
      { status: 500 }
    );
  }
}
