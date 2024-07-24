import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { fetchMedicaidCoverage } from "../api";

const MapComponent = ({ onStateClick }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON data for US states
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: async () => {
        const stateCode = feature.properties.postal;
        const message = await fetchMedicaidCoverage(stateCode);
        onStateClick(message);
      },
    });
  };

  return (
    <MapContainer
      center={[37.8, -96]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoJsonData && (
        <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
};

MapComponent.propTypes = {
  onStateClick: PropTypes.func.isRequired,
};

export default MapComponent;
