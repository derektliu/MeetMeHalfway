export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="text-center">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-72 bg-gray-200 rounded mx-auto mt-2" />
      </div>
      <div className="h-[400px] bg-gray-200 rounded-lg" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-[280px] bg-gray-200 rounded-lg h-64" />
        ))}
      </div>
    </div>
  );
}
