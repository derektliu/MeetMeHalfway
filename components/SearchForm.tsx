"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoadScript } from "@react-google-maps/api";
import AddressInput from "./AddressInput";
import { VenueType, VENUE_TYPE_LABELS, MidpointMode, TravelMode } from "@/types";

const libraries: ("places")[] = ["places"];

const VENUE_TYPES = Object.entries(VENUE_TYPE_LABELS) as [VenueType, string][];

export default function SearchForm() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(["", ""]);
  const [venueType, setVenueType] = useState<VenueType>("restaurant");
  const [midpointMode, setMidpointMode] = useState<MidpointMode>("geographic");
  const [travelMode, setTravelMode] = useState<TravelMode>("driving");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  function updateAddress(index: number, value: string) {
    setAddresses((prev) => prev.map((a, i) => (i === index ? value : a)));
  }

  function addPerson() {
    setAddresses((prev) => [...prev, ""]);
  }

  function removePerson(index: number) {
    if (addresses.length <= 2) return;
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addresses,
          venueType,
          midpointMode,
          ...(midpointMode === "travel" && { travelMode }),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Search failed");
      }

      router.push(`/results/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const labels = ["Your Address", "Friend's Address"];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      {addresses.map((address, i) => (
        <div key={i} className="relative">
          {isLoaded ? (
            <AddressInput
              id={`address-${i}`}
              label={i < 2 ? labels[i] : `Person ${i + 1}`}
              value={address}
              onChange={(v) => updateAddress(i, v)}
              placeholder="e.g. Arcadia, CA"
            />
          ) : (
            <div>
              <label
                htmlFor={`address-${i}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {i < 2 ? labels[i] : `Person ${i + 1}`}
              </label>
              <input
                id={`address-${i}`}
                type="text"
                value={address}
                onChange={(e) => updateAddress(i, e.target.value)}
                placeholder="e.g. Arcadia, CA"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-shadow"
              />
            </div>
          )}
          {i >= 2 && (
            <button
              type="button"
              onClick={() => removePerson(i)}
              className="absolute top-0 right-0 text-gray-400 hover:text-red-500 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addPerson}
        className="text-sm text-amber-600 hover:text-amber-700 font-medium"
      >
        + Add another person
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are you looking for?
        </label>
        <div className="flex flex-wrap gap-2">
          {VENUE_TYPES.map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => setVenueType(type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                venueType === type
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Midpoint calculation
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMidpointMode("geographic")}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              midpointMode === "geographic"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}
          >
            Geographic
          </button>
          <button
            type="button"
            onClick={() => setMidpointMode("travel")}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              midpointMode === "travel"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
            }`}
          >
            Travel-Time
          </button>
        </div>
        {midpointMode === "travel" && (
          <div className="flex gap-2 mt-2">
            {(
              [
                ["driving", "Drive"],
                ["transit", "Transit"],
                ["walking", "Walk"],
                ["bicycling", "Bike"],
              ] as [TravelMode, string][]
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTravelMode(mode)}
                className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  travelMode === mode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-lg transition-colors"
      >
        {loading ? "Searching..." : "Find the Halfway Point"}
      </button>
    </form>
  );
}
