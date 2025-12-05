import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
      _count: {
        select: { votes: true, comments: true },
      },
    },
  });

  return NextResponse.json(products);
}

// CREATE product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slogan, description, image, url, tags, userId } = body;

    if (!name || !slogan || !description || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slogan,
        description,
        image,
        url,
        tags, // deve ser string
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(product, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
