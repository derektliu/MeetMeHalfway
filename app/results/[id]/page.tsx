import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ResultsView from "@/components/ResultsView";
import { VenueData } from "@/types";

export default async function ResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const search = await prisma.search.findUnique({
    where: { id: params.id },
    include: {
      participants: true,
      venues: {
        include: { _count: { select: { votes: true } } },
      },
    },
  });

  if (!search) {
    notFound();
  }

  const venues: VenueData[] = search.venues.map((v) => ({
    id: v.id,
    placeId: v.placeId,
    name: v.name,
    address: v.address,
    lat: v.lat,
    lng: v.lng,
    rating: v.rating,
    userRatingsTotal: v.userRatingsTotal,
    priceLevel: v.priceLevel,
    photoUrl: v.photoUrl,
    types: JSON.parse(v.types),
    openNow: v.openNow,
    voteCount: v._count.votes,
  }));

  const midpoint = { lat: search.midpointLat, lng: search.midpointLng };
  const addresses = search.participants.map((p) => p.address);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Results</h2>
        <p className="text-gray-500 mt-1">{addresses.join(" \u2194 ")}</p>
      </div>
      <ResultsView midpoint={midpoint} venues={venues} searchId={search.id} />
    </div>
  );
}
