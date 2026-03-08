export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const searches = await prisma.search.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      participants: { select: { address: true } },
      _count: { select: { venues: true } },
    },
  });

  return NextResponse.json(
    searches.map((s) => ({
      id: s.id,
      addresses: s.participants.map((p) => p.address),
      venueType: s.venueType,
      createdAt: s.createdAt,
      venueCount: s._count.venues,
    }))
  );
}
