// src/app/api/products/[id]/vote/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const productId = params.id;

    // Produto existe?
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Já votou?
    const existing = await prisma.vote.findUnique({
      where: {
        productId_userId: { productId, userId },
      },
    });

    // SE JÁ VOTOU → REMOVER voto
    if (existing) {
      await prisma.vote.delete({ where: { id: existing.id } });

      const count = await prisma.vote.count({ where: { productId } });

      return NextResponse.json({
        success: true,
        votesCount: count,
        userHasVoted: false,
      });
    }

    // SE NÃO VOTOU → CRIAR voto
    await prisma.vote.create({
      data: { productId, userId },
    });

    const count = await prisma.vote.count({ where: { productId } });

    return NextResponse.json({
      success: true,
      votesCount: count,
      userHasVoted: true,
    });
  } catch (err) {
    console.error("VOTE ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
