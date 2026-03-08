export interface Coordinates {
  lat: number;
  lng: number;
}

export type VenueType = "restaurant" | "cafe" | "bar" | "park" | "library" | "gym";

export const VENUE_TYPE_LABELS: Record<VenueType, string> = {
  restaurant: "Restaurants",
  cafe: "Cafes",
  bar: "Bars",
  park: "Parks",
  library: "Libraries",
  gym: "Gyms",
};

export type MidpointMode = "geographic" | "travel";
export type TravelMode = "driving" | "transit" | "walking" | "bicycling";

export interface SearchRequest {
  addresses: string[];
  venueType?: VenueType;
  midpointMode?: MidpointMode;
  travelMode?: TravelMode;
}

export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number | null;
  userRatingsTotal: number | null;
  priceLevel: number | null;
  photoUrl: string | null;
  types: string[];
  openNow: boolean | null;
}

export interface VenueData extends PlaceResult {
  id: string;
  voteCount: number;
}

export interface TravelTimeInfo {
  address: string;
  travelTimeSec: number | null;
}

export interface SearchResult {
  id: string;
  addresses: string[];
  midpointLat: number;
  midpointLng: number;
  venueType: VenueType;
  midpointMode: MidpointMode;
  travelMode: TravelMode | null;
  travelTimes: TravelTimeInfo[];
  createdAt: string;
  venues: VenueData[];
}

export interface SearchSummary {
  id: string;
  addresses: string[];
  venueType: VenueType;
  createdAt: string;
  venueCount: number;
}
