"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.677-2.691-1.954-3.72-.562L4 12.268c-.771 1.392-2.691 1.954-3.72.562L.268 4c-.771-1.667.19-3 1.732-3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>

        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-500 mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <button
          onClick={() => reset()}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
        >
          Try Again
        </button>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <a
            href="/"
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            ← Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}