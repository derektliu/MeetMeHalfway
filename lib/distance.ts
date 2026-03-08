import { Coordinates, TravelMode } from "@/types";

interface DistanceResult {
  originIndex: number;
  durationSec: number | null;
}

export async function getDistances(
  origins: Coordinates[],
  destination: Coordinates,
  mode: TravelMode
): Promise<DistanceResult[]> {
  const originsParam = origins
    .map((o) => `${o.lat},${o.lng}`)
    .join("|");

  const params = new URLSearchParams({
    origins: originsParam,
    destinations: `${destination.lat},${destination.lng}`,
    mode,
    key: process.env.GOOGLE_MAPS_API_KEY!,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`
  );

  if (!res.ok) {
    throw new Error(`Distance Matrix API failed: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.status !== "OK") {
    throw new Error(`Distance Matrix API error: ${data.status}`);
  }

  return data.rows.map(
    (row: { elements: Array<{ status: string; duration?: { value: number } }> }, i: number) => {
      const element = row.elements[0];
      return {
        originIndex: i,
        durationSec: element.status === "OK" ? element.duration!.value : null,
      };
    }
  );
}
