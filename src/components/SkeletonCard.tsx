export default function SkeletonCard() {
  return (
    <div className="p-4 bg-white rounded-lg border shadow-sm animate-pulse">
      {/* Linha do título */}
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-3" />

      {/* Linha do slogan */}
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />

      {/* Linha das métricas */}
      <div className="flex gap-4 mt-3">
        <div className="h-3 bg-gray-300 rounded w-10" />
        <div className="h-3 bg-gray-300 rounded w-10" />
      </div>

      {/* Maker info */}
      <div className="flex items-center gap-2 mt-4">
        <div className="w-6 h-6 rounded-full bg-gray-300" />
        <div className="h-3 w-20 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
