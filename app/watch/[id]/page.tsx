import { getMovieDetails, getImageUrl, type Movie } from "@/lib/tmdb";
import { VideoPlayer } from "@/components/VideoPlayer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  let movie: Movie | null = null;
  
  try {
    movie = await getMovieDetails(id);
  } catch (e) {
    console.error("Failed to fetch movie:", e);
  }

  if (!movie) {
    notFound();
  }

  const primaryUrl = process.env.NEXT_PUBLIC_PRIMARY_CDN_URL 
    ? `${process.env.NEXT_PUBLIC_PRIMARY_CDN_URL}/${id}/master.m3u8`
    : undefined;
    
  const backupUrl = process.env.NEXT_PUBLIC_BACKUP_CDN_URL
    ? `${process.env.NEXT_PUBLIC_BACKUP_CDN_URL}/${id}/master.m3u8`
    : undefined;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            luminaa2
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/browse" className="hover:text-purple-400 transition">Browse</Link>
            <Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <VideoPlayer
          mediaId={id}
          mediaType="movie"
          poster={getImageUrl(movie.backdrop_path, "w1280") || undefined}
          title={movie.title}
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-gray-400">
            <span>{movie.release_date?.split("-")[0]}</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          
          <p className="mt-4 text-gray-300 leading-relaxed">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>
    </main>
  );
}