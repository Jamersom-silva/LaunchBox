import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          votes: true,
          comments: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">

      {/* HEADER DO PERFIL */}
      <div className="flex items-center gap-6 bg-white border rounded-2xl p-6 shadow-sm">
        <Image
          src={user.image || "/default-avatar.png"}
          alt={user.name || "User"}
          width={80}
          height={80}
          className="rounded-full border shadow"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.name || "Unknown User"}
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* LISTA DE PRODUTOS CRIADOS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products by this Maker</h2>

        {user.products.length === 0 && (
          <p className="text-gray-600 text-sm">
            This user hasn't posted any products yet.
          </p>
        )}

        <div className="grid gap-4">
          {user.products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="block bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.slogan}</p>
                </div>

                <span className="text-sm bg-gray-100 px-2 py-1 rounded-lg">
                  👍 {p.votes.length}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
