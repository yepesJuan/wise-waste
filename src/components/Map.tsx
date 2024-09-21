"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface Location {
  id: number;
  position: [number, number];
  percentage: number;
}

const center: LatLngExpression = [26.21, -80.225]; // Center coordinates for the map

const createCustomIcon = (color: string) => {
  return new Icon({
    iconUrl: `/icons/marker-icon-${color}.png`,
    iconSize: [20, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // shadowUrl: "/icons/marker-shadow.png",
    shadowSize: [41, 41],
  });
};

const redIcon = createCustomIcon("red");
const orangeIcon = createCustomIcon("orange");
const yellowIcon = createCustomIcon("yellow");
const greenIcon = createCustomIcon("green");

const Map = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Sample data, replace this w/ API call
    const data: Location[] = [
      { id: 1, position: [26.2117, -80.2536], percentage: 70 },
      { id: 2, position: [26.2129, -80.27], percentage: 55 },
      { id: 3, position: [26.2009, -80.24], percentage: 40 },
      { id: 4, position: [26.2109, -80.26], percentage: 5 },
    ];
    setLocations(data);
  }, []);

  // Determine the icon color
  const getIcon = (percentage: number) => {
    if (percentage >= 70) return redIcon; // High percentage
    if (percentage >= 55) return orangeIcon; // Medium-high percentage
    if (percentage >= 40) return yellowIcon; // Medium-low percentage
    return greenIcon; // Low percentage
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
        border: "1px solid green",
        borderRadius: "3px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          icon={getIcon(location.percentage)}
        >
          <Popup>Status: {location.percentage}%</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
