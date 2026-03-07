import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-quicksand font-bold text-gray-800">
          MeetMeHalfway
        </Link>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Search
          </Link>
          <Link
            href="/history"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            History
          </Link>
        </div>
      </nav>
    </header>
  );
}
