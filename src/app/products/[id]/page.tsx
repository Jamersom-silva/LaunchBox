import { prisma } from "@/lib/prisma";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      makers: { include: { user: true } },
      votes: true,
      comments: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">
      <ProductClient product={product} />
    </div>
  );
}
