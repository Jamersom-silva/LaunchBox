import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";

export default function Home() {
  // 🔥 MOCK DATA — será removido quando a API estiver 100% pronta
  const MOCK_PRODUCTS = [
    {
      id: "p1",
      name: "Taskade",
      slogan: "Your team's second brain.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      votes: 241,
      comments: 12,
      user: {
        id: "u1",
        name: "Alex Johnson",
        image: "https://i.pravatar.cc/150?img=32",
      },
    },
    {
      id: "p2",
      name: "Framer",
      slogan: "Create beautiful websites visually.",
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67",
      votes: 532,
      comments: 48,
      user: {
        id: "u2",
        name: "Sarah Lee",
        image: "https://i.pravatar.cc/150?img=12",
      },
    },
    {
      id: "p3",
      name: "Notion AI",
      slogan: "Supercharge your notes with AI.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      votes: 923,
      comments: 87,
      user: {
        id: "u3",
        name: "Michael Brown",
        image: "https://i.pravatar.cc/150?img=52",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Navbar />

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* FEED */}
        <section className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">
            Discover what's launching today 🚀
          </h1>

          <CategoryFilter />

          {/* MOCK PRODUCT LIST */}
          <div className="flex flex-col gap-6 mt-6">
            {MOCK_PRODUCTS.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex gap-4">
                  {/* IMAGE */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  {/* INFO */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="font-bold text-lg">{p.name}</h2>
                      <p className="text-sm text-gray-600">{p.slogan}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm mt-2">
                      <span>👍 {p.votes}</span>
                      <span>💬 {p.comments}</span>
                    </div>

                    {/* MAKER */}
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={p.user.image}
                        className="w-7 h-7 rounded-full border"
                      />
                      <span className="text-xs text-gray-600">
                        {p.user.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* SIDEBAR */}
        <Sidebar />
      </main>
    </div>
  );
}
