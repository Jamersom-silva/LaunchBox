// src/app/api/votes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { productId } = body;

  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  // encontra o usuário
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // tenta criar voto (a constraint @@unique previne duplicados)
  try {
    const vote = await prisma.vote.create({
      data: {
        userId: user.id,
        productId,
      },
    });
    return NextResponse.json(vote);
  } catch (err) {
    // se já votou, retorna conflito ou pega o existente
    return NextResponse.json({ error: "You already voted" }, { status: 409 });
  }
}
