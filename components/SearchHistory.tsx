import Link from "next/link";
import { SearchSummary } from "@/types";

export default function SearchHistory({ searches }: { searches: SearchSummary[] }) {
  if (searches.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No searches yet. Try finding a halfway point!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {searches.map((search) => (
        <Link
          key={search.id}
          href={`/results/${search.id}`}
          className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-800">
                {search.addresses.join(" \u2194 ")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {search.venueCount} venues found
              </p>
            </div>
            <time className="text-xs text-gray-400">
              {new Date(search.createdAt).toLocaleDateString()}
            </time>
          </div>
        </Link>
      ))}
    </div>
  );
}
