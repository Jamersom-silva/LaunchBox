"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-2 text-sm bg-gray-100 border rounded-lg hover:bg-gray-200 transition"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <Image
          src={session.user?.image ?? "/default-avatar.png"}
          alt="User"
          width={40}
          height={40}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50 text-sm">
          <p className="px-4 py-2 text-gray-700 border-b">
            {session.user?.name}
          </p>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
