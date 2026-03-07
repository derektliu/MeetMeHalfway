export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SearchRequest {
  addresses: string[];
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

export interface SearchResult {
  id: string;
  addresses: string[];
  midpointLat: number;
  midpointLng: number;
  createdAt: string;
  venues: VenueData[];
}

export interface SearchSummary {
  id: string;
  addresses: string[];
  createdAt: string;
  venueCount: number;
}
