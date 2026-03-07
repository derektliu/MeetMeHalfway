"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { VenueData } from "@/types";

// Fix Leaflet default marker icons (broken by Webpack bundling)
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const midpointIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [49, 49],
  className: "midpoint-marker",
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapViewProps {
  midpoint: { lat: number; lng: number };
  venues: VenueData[];
}

export default function MapView({ midpoint, venues }: MapViewProps) {
  return (
    <MapContainer
      center={[midpoint.lat, midpoint.lng]}
      zoom={14}
      className="h-[400px] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[midpoint.lat, midpoint.lng]} icon={midpointIcon}>
        <Popup>Halfway Point</Popup>
      </Marker>
      {venues.map((venue) => (
        <Marker key={venue.placeId} position={[venue.lat, venue.lng]}>
          <Popup>
            <strong>{venue.name}</strong>
            <br />
            {venue.address}
            {venue.rating && (
              <>
                <br />
                Rating: {venue.rating}/5
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
