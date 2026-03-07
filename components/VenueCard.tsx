"use client";

import { useState } from "react";
import { VenueData } from "@/types";

function priceLabel(level: number | null) {
  if (level === null) return null;
  return "$".repeat(level);
}

interface VenueCardProps {
  venue: VenueData;
  voterName: string;
}

export default function VenueCard({ venue, voterName }: VenueCardProps) {
  const [votes, setVotes] = useState(venue.voteCount);
  const [voted, setVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleVote() {
    if (!voterName || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId: venue.id, voterName }),
      });
      const data = await res.json();
      if (res.ok) {
        setVotes(data.count);
        setVoted(data.voted);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-w-[280px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0">
      {venue.photoUrl ? (
        <img
          src={venue.photoUrl}
          alt={venue.name}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
          No photo
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{venue.name}</h3>
        <p className="text-sm text-gray-500 truncate">{venue.address}</p>
        <div className="flex items-center gap-3 mt-2 text-sm">
          {venue.rating !== null && (
            <span className="text-amber-600 font-medium">
              {venue.rating} / 5
            </span>
          )}
          {venue.userRatingsTotal !== null && (
            <span className="text-gray-400">({venue.userRatingsTotal})</span>
          )}
          {venue.priceLevel !== null && (
            <span className="text-green-700 font-medium">
              {priceLabel(venue.priceLevel)}
            </span>
          )}
        </div>
        {venue.openNow !== null && (
          <p
            className={`text-xs mt-1 ${venue.openNow ? "text-green-600" : "text-red-500"}`}
          >
            {venue.openNow ? "Open now" : "Closed"}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={handleVote}
            disabled={!voterName || submitting}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
              voted
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span>{voted ? "\u{1F44D}" : "\u{1F44D}\u{1F3FB}"}</span>
            <span>{votes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
