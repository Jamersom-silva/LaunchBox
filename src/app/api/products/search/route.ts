// src/app/api/products/search/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";

    if (!q) return NextResponse.json([], { status: 200 });

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { slogan: { contains: q, mode: "insensitive" } },
        ],
      },
      include: { user: true, votes: true, comments: true },
      take: 50,
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
