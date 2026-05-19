const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function getTrendingMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB_API_KEY not set, returning mock data");
    return getMockMovies();
  }

  const res = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  
  const data: MovieResponse = await res.json();
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    return getMockMovies().filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${ encodeURIComponent(query)}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) throw new Error("Failed to search movies");
  
  const data: MovieResponse = await res.json();
  return data.results;
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  if (!TMDB_API_KEY) {
    return getMockMovies()[0] || null;
  }

  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) return null;
  
  return res.json();
}

export function getImageUrl(path: string | null, size: string = "w500"): string {
  if (!path) return "/placeholder.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

function getMockMovies(): Movie[] {
  return [
    {
      id: 1,
      title: "Sample Movie",
      overview: "An exhilarating streaming experience with the best content.",
      poster_path: null,
      backdrop_path: null,
      release_date: "2024-01-01",
      vote_average: 8.5,
      genre_ids: [28, 12]
    }
  ];
}