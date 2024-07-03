import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, GeoJSON } from "react-leaflet";
import CONSTITUENCES_GEO from "./assets/constituency-boundaries.geo.json";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";

const bngprojection = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";

const convertBngToLatLong = (c) => {
    const latlon = proj4(bngprojection).inverse(c);
    c[0] = latlon[0];
    c[1] = latlon[1];
}

const isCoord = (a) => a.length === 2 && a.every(x => Number.isFinite(x));

CONSTITUENCES_GEO.features.forEach(f => {
    f.geometry.coordinates[0].forEach(c => {
        if (isCoord(c)) {
            convertBngToLatLong(c);
        } else {
            console.log(c);
            c.forEach(convertBngToLatLong);
        }

    });
})

function Fit() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([
      [52, -4.5],
      [57, -1.5],
    ]);
  }, [map]);
}

export default function ReactControlExample() {
  return (
    <MapContainer
      style={{ position: "absolute", width: 1000, height: 1500 }}
      center={[54.5, -2.5]}
      zoom={6}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={CONSTITUENCES_GEO}
        style={{
          color: "#ff55dd",
          weight: 3,
          opacity: 0.65,
        }}
      />
      <Fit />
    </MapContainer>
  );
}
