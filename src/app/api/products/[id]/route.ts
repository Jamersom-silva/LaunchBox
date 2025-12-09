// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        votes: true,
        comments: { include: { user: true } },
      },
    });

    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // try read session to compute userHasVoted (optional)
    let userHasVoted = false;
    try {
      const session = await auth();
      if (session?.user?.id) {
        userHasVoted = product.votes.some((v) => v.userId === session.user.id);
      }
    } catch (e) {
      // ignore session errors; userHasVoted stays false
    }

    // normalize dates to strings for client
    const normalized = {
      ...product,
      createdAt: product.createdAt.toISOString(),
      comments: product.comments.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() })),
    };

    return NextResponse.json({ product: normalized, userHasVoted });
  } catch (err) {
    console.error("GET /products/[id] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
