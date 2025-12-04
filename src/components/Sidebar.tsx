"use client";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="bg-white p-4 rounded-xl border shadow-sm">

        {/* Top reviewed products */}
        <h3 className="font-semibold mb-3 text-gray-900">Top reviewed products</h3>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
          <li>Notion — 1.2K reviews</li>
          <li>Shopify — 167 reviews</li>
          <li>Doshi — 1.4K reviews</li>
        </ul>

        {/* Top Makers */}
        <h3 className="font-semibold mb-3 text-gray-900">Top Makers</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <span className="text-sm text-gray-700">Jane Doe</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <span className="text-sm text-gray-700">Alex Miller</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <span className="text-sm text-gray-700">Sarah Lee</span>
          </div>
        </div>

      </div>
    </aside>
  );
}
