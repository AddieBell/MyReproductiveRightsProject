import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "../data/us-states.json";

import PropTypes from "prop-types";

const MapComponent = ({ onStateClick }) => {
  // ...
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        console.log("Feature properties:", feature.properties);
        if (onStateClick) {
          onStateClick(feature.properties.name);
        }
      },
    });
  };

  return (
    <MapContainer
      center={[37.8, -96]}
      zoom={4}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geoData} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

MapComponent.propTypes = {
  onStateClick: PropTypes.func.isRequired,
};

export default MapComponent;
