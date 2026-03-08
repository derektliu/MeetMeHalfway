import { Coordinates } from "@/types";

export async function geocode(address: string): Promise<Coordinates> {
  const params = new URLSearchParams({
    address,
    key: process.env.GOOGLE_MAPS_API_KEY!,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params}`
  );

  if (!res.ok) {
    throw new Error(`Geocoding failed: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.status !== "OK") {
    throw new Error(
      data.error_message || `Geocoding failed for "${address}": ${data.status}`
    );
  }

  if (!data.results || data.results.length === 0) {
    throw new Error(`No results found for address: "${address}"`);
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}
