"use client";

export default function CommentsList({
  comments,
  onDelete,
  onEdit,
}: {
  comments: any[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex gap-3">
            <img
              src={comment.user.image || "/default-avatar.png"}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
              <p className="font-semibold">{comment.user.name}</p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
