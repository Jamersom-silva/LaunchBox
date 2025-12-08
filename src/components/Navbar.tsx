"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LOGO + NAME */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            L
          </div>
          <span className="hidden md:block font-semibold text-gray-900 text-lg">
            LaunchBox
          </span>
        </Link>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">

          {/* SEARCH BAR */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              className="
                w-72 border border-gray-300 rounded-lg pl-10 pr-3 py-2
                text-sm focus:ring-2 focus:ring-red-400 focus:outline-none 
                bg-gray-50 hover:bg-white transition
              "
              placeholder="Search..."
            />
          </div>

          {/* SUBMIT BUTTON → agora é um Link */}
          <Link
            href="/submit"
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition"
          >
            Submit
          </Link>

          {/* USER MENU */}
          <UserMenu />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 pb-4 flex flex-col gap-3">
          
          {/* SEARCH MOBILE */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
            <input
              className="
                w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2
                text-sm focus:ring-2 focus:ring-red-400 focus:outline-none
                bg-gray-50
              "
              placeholder="Search..."
            />
          </div>

          {/* SUBMIT BUTTON MOBILE → agora é Link */}
          <Link
            href="/submit"
            className="w-full text-center px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 active:scale-95 transition"
          >
            Submit
          </Link>

          {/* USER MENU MOBILE */}
          <UserMenu />
        </div>
      )}
    </header>
  );
}
