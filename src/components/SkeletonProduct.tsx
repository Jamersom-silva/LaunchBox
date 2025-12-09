export default function SkeletonProduct() {
  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm animate-pulse">
      <div className="h-5 w-40 bg-gray-300 rounded mb-3" />

      <div className="h-4 w-60 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-52 bg-gray-200 rounded mb-4" />

      <div className="flex items-center gap-3 mt-4">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <div className="h-3 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
