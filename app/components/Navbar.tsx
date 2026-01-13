"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [showSignOut, setShowSignOut] = useState(false);

  return (
    <nav className="px-6 md:px-16 py-4 max-w-7xl mx-auto flex justify-between sticky top-0 z-50 bg-black/50 backdrop:blur-md">
      <Link href="/" className="flex gap-1 items-center justify-center">
        <div className="w-4 h-4 md:w-8 md:h-8 rounded-md md:rounded-lg bg-[#8cff2e] flex items-center justify-center">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-black rounded-full"></div>
        </div>
        <p className="text-white text-sm md:text-xl font-bold">Acre</p>
      </Link>

      <div className="flex gap-4">
        <div className="text-white hidden md:flex items-center justify-center gap-2 border border-[#2F2F2F] px-4 rounded-md w-80">
          <Search className="w-3 h-3 hover:text-[#8cff2e]" />
          <input
            type="text"
            placeholder="search your land..."
            className="outline-none text-xs flex-1"
          />

          <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-[#2F2F2F] bg-[#1A1A1A] px-1.5 font-mono text-[12px] font-medium text-gray-400">
            <span className="text-base">⌘ </span>+ K
          </kbd>
        </div>
        <div className="relative group">
          <button
            onClick={() => setShowSignOut((p) => !p)}
            className=" text-white text-xs flex items-center justify-center bg-[#2F2F2F] hover:bg-[#86ff2e] hover:text-black w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden"
          >
            <img src={session?.user?.image || " "} alt={"M"} />
          </button>
          {showSignOut && (
            <button
              onClick={() => signOut()}
              className="absolute -bottom-8.5 rounded-md border border-[#86ff2e]/50 -left-1/3 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1a1a1a] text-white text-xs font-semibold px-4 py-2 cursor-pointer flex items-center justify-center"
            >
              Signout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
