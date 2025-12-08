import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function MakerPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      products: true,
    },
  });

  if (!user) return <div className="p-10">Maker not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex items-center gap-4">
        <Image
          src={user.image || "/default-avatar.png"}
          alt={user.name || "Maker"}
          width={80}
          height={80}
          className="rounded-full"
        />

        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Products by {user.name}</h2>

      <div className="grid gap-4">
        {user.products.map((p) => (
          <a
            key={p.id}
            href={`/products/${p.id}`}
            className="p-4 border rounded-lg bg-white shadow hover:shadow-md"
          >
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-600 text-sm">{p.slogan}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
