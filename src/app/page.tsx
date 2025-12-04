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
    image: "https://via.placeholder.com/200"
  },
  {
    id: "3",
    name: "Spotify",
    description: "Discover the latest songs.",
    votes: 4752,
    category: "Music",
    tags: ["Trending", "Audio"],
    image: "https://via.placeholder.com/200"
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
      <main className="container py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FEED */}
        <section className="lg:col-span-2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Discover what's launching today on LaunchBox 🚀
          </h1>

          {DUMMY.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        {/* SIDEBAR */}
        <Sidebar />
      </main>
    </div>
  );
}
