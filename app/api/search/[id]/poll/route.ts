import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STALE_THRESHOLD_MS = 30_000; // 30 seconds

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const viewer = searchParams.get("viewer");

  const search = await prisma.search.findUnique({
    where: { id: params.id },
    select: { id: true },
  });

  if (!search) {
    return NextResponse.json({ error: "Search not found" }, { status: 404 });
  }

  // Upsert viewer heartbeat if name provided
  if (viewer) {
    await prisma.viewer.upsert({
      where: {
        searchId_name: { searchId: params.id, name: viewer },
      },
      update: { lastSeen: new Date() },
      create: { searchId: params.id, name: viewer, lastSeen: new Date() },
    });
  }

  // Clean stale viewers
  await prisma.viewer.deleteMany({
    where: {
      searchId: params.id,
      lastSeen: { lt: new Date(Date.now() - STALE_THRESHOLD_MS) },
    },
  });

  // Get current vote counts and active viewers
  const [venues, viewers] = await Promise.all([
    prisma.venue.findMany({
      where: { searchId: params.id },
      select: {
        id: true,
        _count: { select: { votes: true } },
      },
    }),
    prisma.viewer.findMany({
      where: { searchId: params.id },
      select: { name: true },
    }),
  ]);

  const votes: Record<string, number> = {};
  for (const v of venues) {
    votes[v.id] = v._count.votes;
  }

  return NextResponse.json({
    votes,
    viewers: viewers.map((v) => v.name),
  });
}
