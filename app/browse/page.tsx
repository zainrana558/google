import { getTrendingMovies, getImageUrl, type Movie } from "@/lib/tmdb";
import Link from "next/link";
import Image from "next/image";

export default async function BrowsePage() {
  let movies: Movie[] = [];
  
  try {
    movies = await getTrendingMovies();
  } catch (e) {
    console.error("Failed to fetch movies:", e);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            luminaa2
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/browse" className="text-purple-400 font-medium">Browse</Link>
            <Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Trending Movies</h1>
        <p className="text-gray-400 mb-8">Popular this week</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link 
              key={movie.id} 
              href={`/watch/${movie.id}`}
              className="group"
            >
              <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-gray-800 mb-2">
                {movie.poster_path ? (
                  <Image
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-sm font-medium">
                  ★ {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <h3 className="font-medium text-sm truncate group-hover:text-purple-400 transition">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500">{movie.release_date?.split("-")[0]}</p>
            </Link>
          ))}
        </div>

        {movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No movies found</p>
            <p className="text-sm text-gray-600">Set TMDB_API_KEY in environment to enable movie data</p>
          </div>
        )}
      </div>
    </main>
  );
}