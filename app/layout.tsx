import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://luminaa2.com"),
  title: {
    default: "Luminaa2 - Stream Movies & TV Shows Online",
    template: "%s | Luminaa2",
  },
  description: "Stream unlimited movies and TV shows in HD quality. Watch the latest releases without ads or interruptions.",
  keywords: ["streaming", "movies", "tv shows", "hd video", "entertainment"],
  authors: [{ name: "Luminaa2" }],
  creator: "Luminaa2",
  publisher: "Luminaa2",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://luminaa2.com",
    siteName: "Luminaa2",
    title: "Luminaa2 - Stream Movies & TV Shows Online",
    description: "Stream unlimited movies and TV shows in HD quality.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luminaa2 Streaming Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminaa2 - Stream Movies & TV Shows Online",
    description: "Stream unlimited movies and TV shows in HD quality.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": 0,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}