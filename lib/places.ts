import { Coordinates, PlaceResult } from "@/types";

export async function searchPlaces(
  location: Coordinates,
  radius = 1500
): Promise<PlaceResult[]> {
  const params = new URLSearchParams({
    location: `${location.lat},${location.lng}`,
    radius: radius.toString(),
    type: "restaurant",
    key: process.env.GOOGLE_MAPS_API_KEY!,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`
  );

  if (!res.ok) {
    throw new Error(`Places search failed: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(`Places API error: ${data.status}`);
  }

  const results = data.results || [];

  return results.map((place: Record<string, unknown>): PlaceResult => {
    const geometry = place.geometry as { location: { lat: number; lng: number } };
    const photos = place.photos as Array<{ photo_reference: string }> | undefined;

    let photoUrl: string | null = null;
    if (photos && photos.length > 0) {
      const photoParams = new URLSearchParams({
        maxwidth: "400",
        photo_reference: photos[0].photo_reference,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      });
      photoUrl = `https://maps.googleapis.com/maps/api/place/photo?${photoParams}`;
    }

    return {
      placeId: place.place_id as string,
      name: place.name as string,
      address: (place.vicinity as string) || "",
      lat: geometry.location.lat,
      lng: geometry.location.lng,
      rating: (place.rating as number) ?? null,
      userRatingsTotal: (place.user_ratings_total as number) ?? null,
      priceLevel: (place.price_level as number) ?? null,
      photoUrl,
      types: (place.types as string[]) || [],
      openNow: (place.opening_hours as { open_now?: boolean })?.open_now ?? null,
    };
  });
}
