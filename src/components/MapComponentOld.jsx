import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { fetchMedicaidCoverage } from "../apiOld";
import { stateNameToCode } from "../stateMappings";

const MapComponent = ({ onStateClick }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON data for US states
    fetch(
      "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    )
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error fetching GeoJSON data:", error));
  }, []);

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: async () => {
        const stateName = feature.properties?.name;
        const stateCode = stateNameToCode[stateName];
        console.log("Feature properties:", feature.properties); // Debugging statement
        if (stateCode) {
          const message = await fetchMedicaidCoverage(stateCode);
          onStateClick(message);
        } else {
          console.error("State code is undefined for state name:", stateName);
        }
      },
    });
  };

  return (
    <MapContainer
      center={[37.8, -96]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
      className='mt-40'
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
