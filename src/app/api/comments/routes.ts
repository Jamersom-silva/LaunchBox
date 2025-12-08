// src/app/api/comments/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { content, productId } = await req.json();

    // Validations
    if (!content || typeof content !== "string" || content.trim().length < 2) {
      return NextResponse.json(
        { error: "Invalid comment content" },
        { status: 400 }
      );
    }

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "Invalid productId" },
        { status: 400 }
      );
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        productId,
        userId: session.user.id,
      },
      include: {
        user: true, // Return user info
      },
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
