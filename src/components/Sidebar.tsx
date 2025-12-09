"use client";

export default function Sidebar() {
  // MOCKADO — depois substituímos por dados reais vindos do banco
  const topMakers = [
    {
      id: "1",
      name: "Jane Doe",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
      name: "Alex Miller",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: "3",
      name: "Sarah Lee",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const reviewedProducts = [
    { id: "p1", name: "Notion", reviews: "1.2K" },
    { id: "p2", name: "Shopify", reviews: "167" },
    { id: "p3", name: "Doshi", reviews: "1.4K" },
  ];

  return (
    <aside className="space-y-8">

      {/* TOP REVIEWED PRODUCTS */}
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Top reviewed products</h2>

        <ul className="space-y-3">
          {reviewedProducts.map((p) => (
            <li key={p.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{p.name}</span>
              <span className="text-gray-500">{p.reviews} reviews</span>
            </li>
          ))}
        </ul>
      </div>

      {/* TOP MAKERS */}
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">Top Makers</h2>

        <ul className="space-y-4">
          {topMakers.map((m) => (
            <li key={m.id} className="flex items-center gap-3">
              <img
                src={m.image}
                alt={m.name}
                className="w-10 h-10 rounded-full shadow-sm border"
              />
              <span className="text-gray-700 text-sm">{m.name}</span>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}
