// src/components/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet"; // Import the type
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface Location {
  // Define the shape of each location
  id: number;
  position: [number, number]; // LatLng tuple
  status: string;
}

const center: LatLngExpression = [26.1224, -80.1373]; // Reykjavik coordinates

const Map = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Sample data, replace this with your API call
    const data: Location[] = [
      { id: 1, position: [26.2117, -80.2536], status: "Full" }, // Tamarac City Hall
      { id: 2, position: [26.2129, -80.27], status: "Empty" }, // Tamarac Sports Complex
      // Add more markers
    ];
    setLocations(data);
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      {locations.map((location) => (
        <Marker key={location.id} position={location.position}>
          <Popup>Status: {location.status}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
