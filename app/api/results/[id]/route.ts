import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const search = await prisma.search.findUnique({
    where: { id: params.id },
    include: {
      participants: true,
      venues: { include: { _count: { select: { votes: true } } } },
    },
  });

  if (!search) {
    return NextResponse.json({ error: "Search not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: search.id,
    addresses: search.participants.map((p) => p.address),
    midpointLat: search.midpointLat,
    midpointLng: search.midpointLng,
    createdAt: search.createdAt,
    venues: search.venues.map((v) => ({
      ...v,
      types: JSON.parse(v.types),
      voteCount: v._count.votes,
    })),
  });
}
