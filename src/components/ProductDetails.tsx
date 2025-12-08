"use client";

type Product = {
  id: string;
  name: string;
  slogan: string;
  description: string;
  image?: string;
  tags: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
  _count: {
    votes: number;
    comments: number;
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      name: string | null;
    };
  }[];
};

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="container pt-20 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* MAIN COLUMN */}
      <div className="lg:col-span-2 space-y-8">

        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-sm">{product.slogan}</p>
        </div>

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden border bg-white shadow-sm">
          <img
            src={product.image ?? "/placeholder.png"}
            alt={product.name}
            className="w-full h-[380px] object-cover"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <p className="leading-relaxed text-gray-700">
            {product.description}
          </p>

          {/* MAKER */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div>
              <p className="font-medium">{product.user.name}</p>
              <p className="text-xs text-gray-500">Maker</p>
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({product._count.comments})
          </h3>

          <div className="space-y-4">
            {product.comments.map((c) => (
              <div key={c.id} className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm font-medium">{c.user.name}</p>
                <p className="text-sm text-gray-600">{c.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SIDEBAR */}
      <div className="space-y-4 sticky top-24 h-fit">

        {/* UPVOTE BOX */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center">
          <button className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium">
            ▲ Upvote
          </button>
          <p className="text-sm text-gray-600 mt-2">
            {product._count.votes} votes
          </p>
        </div>

        {/* MAKER INFO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="font-semibold text-gray-900 mb-2">
            About the maker
          </h4>
          <p className="text-sm font-medium">
            {product.user.name}
          </p>
        </div>

      </div>

    </div>
  );
}
