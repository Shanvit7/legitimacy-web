// COMPONENTS
import { MapContainer, TileLayer, FeatureGroup, type GeoJSONProps } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
// TYPES
import type { LatLngTuple } from 'leaflet';
// CONSTANTS
import { MAP_URL } from "@/utils/constants";

interface DrawCreatedEvent {
  layer: {
    toGeoJSON: () => GeoJSONProps;
  };
}

const GeoPicker = ({ onChange }: { onChange: (geojson: GeoJSONProps | null) => void }) => {
  const center: LatLngTuple = [20, 78];

  const handleCreated = (e: DrawCreatedEvent) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();
    onChange(geojson);
  };

  return (
    <MapContainer center={center} zoom={5} style={{ height: 300 }}>
      <TileLayer url={MAP_URL}/>
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{ polygon: true, rectangle: true, circle: true, marker: false }}
          onCreated={handleCreated}
          onEdited={e => onChange(e.layers.toGeoJSON())}
          onDeleted={() => onChange(null)}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default GeoPicker;
