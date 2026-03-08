import { VenueData } from "@/types";
import VenueCard from "./VenueCard";

interface VenueListProps {
  venues: VenueData[];
  voterName: string;
  liveVotes?: Record<string, number>;
}

export default function VenueList({ venues, voterName, liveVotes = {} }: VenueListProps) {
  if (venues.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No venues found matching your filters.
      </p>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
      {venues.map((venue) => (
        <div key={venue.placeId} className="snap-start">
          <VenueCard
            venue={venue}
            voterName={voterName}
            liveVoteCount={liveVotes[venue.id]}
          />
        </div>
      ))}
    </div>
  );
}
