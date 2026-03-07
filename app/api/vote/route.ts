import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { venueId, voterName } = await request.json();

    if (!venueId || !voterName?.trim()) {
      return NextResponse.json(
        { error: "venueId and voterName are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.vote.findFirst({
      where: { venueId, voterName: voterName.trim() },
    });

    if (existing) {
      await prisma.vote.delete({ where: { id: existing.id } });
      const count = await prisma.vote.count({ where: { venueId } });
      return NextResponse.json({ voted: false, count });
    }

    await prisma.vote.create({
      data: { venueId, voterName: voterName.trim() },
    });

    const count = await prisma.vote.count({ where: { venueId } });
    return NextResponse.json({ voted: true, count });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}
