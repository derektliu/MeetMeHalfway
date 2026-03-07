import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { geocode } from "@/lib/geocode";
import { calculateCentroid } from "@/lib/halfway";
import { searchPlaces } from "@/lib/places";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const addresses: string[] = body.addresses;

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
    const midpoint = calculateCentroid(locations);
    const venues = await searchPlaces(midpoint);

    const search = await prisma.search.create({
      data: {
        midpointLat: midpoint.lat,
        midpointLng: midpoint.lng,
        participants: {
          create: addresses.map((address) => ({ address })),
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
