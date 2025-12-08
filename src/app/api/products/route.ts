// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        votes: true,
        comments: true,
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slogan: body.slogan,
        description: body.description,
        image: body.image ?? null,
        url: body.url ?? null,
        tags: body.tags ?? "",
        userId: session.user.id,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("POST /products error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
