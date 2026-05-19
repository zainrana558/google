const NEXSTREAM_API_KEY = process.env.NEXSTREAM_API_KEY;
const NEXSTREAM_BASE_URL = "https://api.nexstream.io/v1";

export interface NexStreamVideo {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  stream_url: string;
  quality: string;
  duration: number;
}

export async function getVideoById(id: string): Promise<NexStreamVideo | null> {
  if (!NEXSTREAM_API_KEY) {
    console.warn("NEXSTREAM_API_KEY not set");
    return null;
  }

  try {
    const res = await fetch(`${NEXSTREAM_BASE_URL}/videos/${id}`, {
      headers: {
        "Authorization": `Bearer ${NEXSTREAM_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`NexStream API error: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (e) {
    console.error("Failed to fetch video from NexStream:", e);
    return null;
  }
}

export async function listVideos(): Promise<NexStreamVideo[]> {
  if (!NEXSTREAM_API_KEY) {
    return [];
  }

  try {
    const res = await fetch(`${NEXSTREAM_BASE_URL}/videos`, {
      headers: {
        "Authorization": `Bearer ${NEXSTREAM_API_KEY}`,
      },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.videos || [];
  } catch (e) {
    console.error("Failed to list videos:", e);
    return [];
  }
}