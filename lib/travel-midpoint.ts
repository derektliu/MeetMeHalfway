import { Coordinates, TravelMode } from "@/types";
import { getDistances } from "./distance";
import { calculateCentroid } from "./halfway";

interface TravelMidpointResult {
  midpoint: Coordinates;
  travelTimes: (number | null)[];
}

export async function calculateTravelMidpoint(
  locations: Coordinates[],
  mode: TravelMode,
  maxIter = 3
): Promise<TravelMidpointResult> {
  let midpoint = calculateCentroid(locations);

  for (let iter = 0; iter < maxIter; iter++) {
    const distances = await getDistances(locations, midpoint, mode);
    const validTimes = distances
      .map((d) => d.durationSec)
      .filter((t): t is number => t !== null);

    if (validTimes.length === 0) {
      return {
        midpoint,
        travelTimes: distances.map((d) => d.durationSec),
      };
    }

    const maxTime = Math.max(...validTimes);
    const minTime = Math.min(...validTimes);

    // Stop early if times are close enough (within 15%)
    if (minTime > 0 && maxTime / minTime < 1.15) {
      return {
        midpoint,
        travelTimes: distances.map((d) => d.durationSec),
      };
    }

    // Find the participant with the longest travel time and shift toward them
    const longestIdx = distances.reduce((maxIdx, d, i) =>
      (d.durationSec ?? 0) > (distances[maxIdx].durationSec ?? 0) ? i : maxIdx,
      0
    );

    const shiftFactor = 0.3;
    midpoint = {
      lat: midpoint.lat + (locations[longestIdx].lat - midpoint.lat) * shiftFactor,
      lng: midpoint.lng + (locations[longestIdx].lng - midpoint.lng) * shiftFactor,
    };
  }

  // Final distance check after last iteration
  const finalDistances = await getDistances(locations, midpoint, mode);
  return {
    midpoint,
    travelTimes: finalDistances.map((d) => d.durationSec),
  };
}
