export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-white/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}