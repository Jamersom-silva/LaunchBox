// src/app/api/products/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// =====================================================
// GET — LIST PRODUCTS (WITH CATEGORY FILTER SUPPORT)
// =====================================================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const products = await prisma.product.findMany({
      where:
        category && category !== "All"
          ? {
              tags: {
                contains: category,
                mode: "insensitive",
              },
            }
          : {},

      orderBy: { createdAt: "desc" },

      include: {
        user: true,
        votes: true,
        comments: true,
      },
    });

    return NextResponse.json(products); // SEMPRE ARRAY
  } catch (err) {
    console.error("GET /products error:", err);

    // **IMPORTANTE: Nunca retornar objeto → apenas array**
    return NextResponse.json([], { status: 200 });
  }
}

// =====================================================
// POST — CREATE NEW PRODUCT
// =====================================================
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slogan: body.slogan,
        description: body.description,
        image: body.image ?? null,
        url: body.url ?? null,
        tags: Array.isArray(body.tags)
          ? body.tags.join(",")
          : body.tags ?? "",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("POST /products error:", err);

    return NextResponse.json(
      { error: "Could not create product" },
      { status: 500 }
    );
  }
}
