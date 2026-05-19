import { signIn } from "@/auth";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            luminaa2
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/browse" className="hover:text-purple-400 transition">Browse</Link>
            <Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Stream Without Limits
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          The ultimate streaming platform with 4K HDR, multi-device support, and intelligent failover
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/browse" });
            }}
          >
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
            >
              Sign in with Google
            </button>
          </form>
          <Link
            href="/browse"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    </main>
  );
}