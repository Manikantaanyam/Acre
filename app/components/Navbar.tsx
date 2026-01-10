import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import User from "../../public/user.jpg";

export default function Navbar() {
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
        <button className="text-white flex items-center justify-center bg-[#2F2F2F] hover:bg-[#86ff2e] hover:text-black w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden">
          <Image src={User} alt="M" />
        </button>
      </div>
    </nav>
  );
}
