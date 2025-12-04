import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

const DUMMY = [
  {
    id: "1",
    name: "Taskade",
    description: "Build a second brain for your team.",
    votes: 444,
    category: "Productivity",
    tags: ["AI", "Team"],
    image: "https://via.placeholder.com/200"
  },
  {
    id: "2",
    name: "Framer",
    description: "Design stunning interactive products.",
    votes: 564,
    category: "Design Tools",
    tags: ["Design"],
  },
  {
    id: "3",
    name: "Spotify",
    description: "Discover the latest songs.",
    votes: 4752,
    category: "Music",
    tags: ["Music", "Trending"],
  },
];



export default function Home() {
  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <Navbar />

      {/* CATEGORIES */}
      <Categories />

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE — FEED */}
        <section className="lg:col-span-2 flex flex-col gap-4">

          <h2 className="text-2xl font-bold mb-2">Discover what's launching today on LaunchBox 🚀
</h2>


          {DUMMY.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

        </section>

        {/* RIGHT SIDE — SIDEBAR */}
        <Sidebar />

      </main>

    </div>
  );
}
