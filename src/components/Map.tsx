
import React from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing
// This is needed because Leaflet's assets get messed up in bundlers
const fixLeafletMarker = () => {
  // Get the images from leaflet's assets
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

// Initialize the fix
fixLeafletMarker();

// Re-export necessary components
export { TileLayer, Marker, Popup, useMapEvents };

// Wrapper for MapContainer
export const MapContainer: typeof LeafletMapContainer = (props) => {
  return <LeafletMapContainer {...props} />;
};

// LocationMarker component (used in ProfileForm)
interface LocationMarkerProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} />;
};
