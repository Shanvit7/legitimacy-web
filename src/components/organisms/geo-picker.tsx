import { MapContainer, TileLayer, FeatureGroup, type GeoJSONProps } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import type { LatLngTuple } from 'leaflet';

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
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
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
