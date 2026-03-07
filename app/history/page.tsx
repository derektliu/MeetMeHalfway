export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import SearchHistory from "@/components/SearchHistory";

export default async function HistoryPage() {
  const searches = await prisma.search.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      participants: { select: { address: true } },
      _count: { select: { venues: true } },
    },
  });

  const summaries = searches.map((s) => ({
    id: s.id,
    addresses: s.participants.map((p) => p.address),
    createdAt: s.createdAt.toISOString(),
    venueCount: s._count.venues,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Search History
      </h2>
      <SearchHistory searches={summaries} />
    </div>
  );
}
