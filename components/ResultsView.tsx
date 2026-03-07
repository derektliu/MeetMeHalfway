"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import FilterControls, { Filters } from "./FilterControls";
import VenueList from "./VenueList";
import { VenueData } from "@/types";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface ResultsViewProps {
  midpoint: { lat: number; lng: number };
  venues: VenueData[];
  searchId: string;
}

export default function ResultsView({ midpoint, venues, searchId }: ResultsViewProps) {
  const [filters, setFilters] = useState<Filters>({
    priceLevel: null,
    openNow: false,
    minRating: 0,
  });
  const [voterName, setVoterName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mmh-voter-name");
    if (saved) {
      setVoterName(saved);
      setNameSet(true);
    }
  }, []);

  function saveName() {
    if (voterName.trim()) {
      localStorage.setItem("mmh-voter-name", voterName.trim());
      setVoterName(voterName.trim());
      setNameSet(true);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sorted = useMemo(() => {
    return [...venues].sort((a, b) => b.voteCount - a.voteCount);
  }, [venues]);

  const filtered = useMemo(() => {
    return sorted.filter((v) => {
      if (filters.priceLevel !== null && v.priceLevel !== filters.priceLevel)
        return false;
      if (filters.openNow && v.openNow !== true) return false;
      if (filters.minRating > 0 && (v.rating === null || v.rating < filters.minRating))
        return false;
      return true;
    });
  }, [sorted, filters]);

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          onClick={copyLink}
          className="px-3 py-1.5 text-sm bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-600"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <MapView midpoint={midpoint} venues={filtered} />
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Nearby Restaurants
          </h3>
          <span className="text-sm text-gray-400">
            {filtered.length} of {venues.length}
          </span>
        </div>
        <FilterControls filters={filters} onChange={setFilters} />

        <div className="mt-4 mb-4">
          {!nameSet ? (
            <div className="flex gap-2 items-center bg-white rounded-lg shadow-sm p-3">
              <span className="text-sm text-gray-600">Vote as:</span>
              <input
                type="text"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                placeholder="Enter your name"
                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                onClick={saveName}
                className="px-3 py-1 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600"
              >
                Set
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Voting as <strong>{voterName}</strong>{" "}
              <button
                onClick={() => setNameSet(false)}
                className="text-amber-600 hover:underline"
              >
                change
              </button>
            </p>
          )}
        </div>

        <VenueList venues={filtered} voterName={nameSet ? voterName : ""} />
      </div>
    </>
  );
}
