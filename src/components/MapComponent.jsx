import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import usStatesGeoJson from "../data/us-states.json"; // Ensure you have this file
import PropTypes from "prop-types";

const MapComponent = ({ onStateClick }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Check if the map has already been initialized
    if (mapRef.current !== null) {
      return;
    }

    // Initialize the map
    mapRef.current = L.map(mapContainerRef.current, {
      minZoom: 4,
      maxZoom: 10,
      maxBounds: [
        [24.396308, -125.0], // Southwest coordinates
        [49.384358, -66.93457], // Northeast coordinates
      ],
      maxBoundsViscosity: 1.0,
    }).setView([37.8, -96], 4); // Center of the continental US

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Add GeoJSON data
    L.geoJSON(usStatesGeoJson, {
      style: () => ({
        color: "#555",
        weight: 2,
        fillColor: "#fff",
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layer) => {
        layer.on({
          click: () => onStateClick(feature.properties.name),
        });
      },
    }).addTo(mapRef.current);

    return () => {
      // Cleanup the map instance on component unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onStateClick]);

  return (
    <div className='mt-4'>
      <div
        id='map'
        ref={mapContainerRef}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
};

MapComponent.propTypes = {
  onStateClick: PropTypes.func.isRequired,
};

export default MapComponent;
