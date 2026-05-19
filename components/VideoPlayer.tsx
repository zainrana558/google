"use client";

import { useState } from "react";

interface VideoPlayerProps {
  mediaId: string; // TMDB or IMDB ID
  mediaType?: "movie" | "tv";
  title?: string;
  poster?: string;
}

// Video providers ordered exactly as specified
const providers = [
  { name: "VidSrc", id: "vidsrc", embedUrl: (id: string) => `https://vidsrc.pro/embed/${id}` },
  { name: "NexStream", id: "nexstream", embedUrl: (id: string) => `https://nexstream.io/embed/${id}` },
  { name: "AutoEmbed", id: "autoembed", embedUrl: (id: string) => `https://autoembed.co/embed/${id}` },
  { name: "VidPhantom", id: "vidphantom", embedUrl: (id: string) => `https://vidphantom.net/embed/${id}` },
  { name: "2Embed", id: "2embed", embedUrl: (id: string) => `https://2embed.org/embed/${id}` },
];

export function VideoPlayer({ 
  mediaId,
  mediaType = "movie",
  title,
  poster
}: VideoPlayerProps) {
  const [activeProvider, setActiveProvider] = useState(providers[0]); // Default: VidSrc
  const [isLoading, setIsLoading] = useState(true);

  // Build the embed URL based on media type and provider
  const embedId = mediaType === "tv" ? `tv/${mediaId}` : mediaId;
  const embedUrl = activeProvider.embedUrl(embedId);

  return (
    <div className="video-player-container relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* Provider Selection Dropdown */}
      <div className="absolute top-4 right-4 z-20">
        <select
          value={activeProvider.id}
          onChange={(e) => {
            const provider = providers.find(p => p.id === e.target.value);
            if (provider) {
              setActiveProvider(provider);
              setIsLoading(true);
            }
          }}
          className="bg-gray-900/90 text-white text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
        >
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-white flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm">Loading {activeProvider.name}...</span>
          </div>
        </div>
      )}

      {/* Video Iframe */}
      <iframe
        src={embedUrl}
        title={title || "Video Player"}
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-0"
      />

      {/* Title Overlay */}
      {title && !isLoading && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <h2 className="text-white font-semibold text-lg truncate">{title}</h2>
        </div>
      )}
    </div>
  );
}