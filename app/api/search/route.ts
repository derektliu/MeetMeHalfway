import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { geocode } from "@/lib/geocode";
import { calculateCentroid } from "@/lib/halfway";
import { calculateTravelMidpoint } from "@/lib/travel-midpoint";
import { searchPlaces } from "@/lib/places";
import { VenueType, VENUE_TYPE_LABELS, MidpointMode, TravelMode } from "@/types";

const VALID_VENUE_TYPES = Object.keys(VENUE_TYPE_LABELS) as VenueType[];
const VALID_TRAVEL_MODES: TravelMode[] = ["driving", "transit", "walking", "bicycling"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const addresses: string[] = body.addresses;
    const venueType: VenueType = VALID_VENUE_TYPES.includes(body.venueType)
      ? body.venueType
      : "restaurant";
    const midpointMode: MidpointMode =
      body.midpointMode === "travel" ? "travel" : "geographic";
    const travelMode: TravelMode | null =
      midpointMode === "travel" && VALID_TRAVEL_MODES.includes(body.travelMode)
        ? body.travelMode
        : midpointMode === "travel"
          ? "driving"
          : null;

    if (!addresses || addresses.length < 2) {
      return NextResponse.json(
        { error: "At least two addresses are required" },
        { status: 400 }
      );
    }

    if (addresses.some((a) => !a.trim())) {
      return NextResponse.json(
        { error: "All address fields must be filled" },
        { status: 400 }
      );
    }

    const locations = await Promise.all(addresses.map(geocode));

    let midpoint;
    let travelTimes: (number | null)[] = [];

    if (midpointMode === "travel" && travelMode) {
      try {
        const result = await calculateTravelMidpoint(locations, travelMode);
        midpoint = result.midpoint;
        travelTimes = result.travelTimes;
      } catch (err) {
        console.warn("Travel midpoint failed, falling back to geographic:", err);
        midpoint = calculateCentroid(locations);
      }
    } else {
      midpoint = calculateCentroid(locations);
    }

    const venues = await searchPlaces(midpoint, 1500, venueType);

    const search = await prisma.search.create({
      data: {
        midpointLat: midpoint.lat,
        midpointLng: midpoint.lng,
        venueType,
        midpointMode,
        travelMode,
        participants: {
          create: addresses.map((address, i) => ({
            address,
            lat: locations[i].lat,
            lng: locations[i].lng,
            travelTimeSec: travelTimes[i] ?? null,
          })),
        },
        venues: {
          create: venues.map((v) => ({
            placeId: v.placeId,
            name: v.name,
            address: v.address,
            lat: v.lat,
            lng: v.lng,
            rating: v.rating,
            userRatingsTotal: v.userRatingsTotal,
            priceLevel: v.priceLevel,
            photoUrl: v.photoUrl,
            types: JSON.stringify(v.types),
            openNow: v.openNow,
          })),
        },
      },
    });

    return NextResponse.json({ id: search.id });
  } catch (error) {
    console.error("Search error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
