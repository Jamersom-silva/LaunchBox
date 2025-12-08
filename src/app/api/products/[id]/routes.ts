// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        votes: true,
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("GET /products/[id] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
