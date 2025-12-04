"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
            LB
          </div>
          <span className="hidden md:block font-semibold text-gray-800">
             LaunchBox
          </span>
        </Link>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <input
            className="w-72 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
            placeholder="Search..."
          />

          <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition font-medium">
            Submit
          </button>

          <div className="w-9 h-9 rounded-full bg-gray-200 border" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 pb-4 flex flex-col gap-3">

          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
            placeholder="Search..."
          />

          <button className="w-full px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition font-medium">
            Submit
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-200 border" />

        </div>
      )}
    </header>
  );
}
