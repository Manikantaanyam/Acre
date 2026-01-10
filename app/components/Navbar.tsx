import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-10 py-8 max-w-7xl mx-auto">
      <Link href="/" className="flex gap-1 ">
        <div className="w-8 h-8 rounded-lg bg-[#8cff2e] flex items-center justify-center">
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </div>
        <p className="text-white text-xl font-bold">Acre</p>
      </Link>
    </nav>
  );
}
