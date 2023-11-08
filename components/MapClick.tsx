import { useMapEvent, useMapEvents } from "react-leaflet";
import L, { LatLng, setOptions } from 'leaflet';

function MapClick() {
    let position = new LatLng(0, 0);

    let mappin = L.marker(position);

    const map = useMapEvent("click", (location) => {
        map.removeLayer(mappin);
        position = location.latlng;
        map.flyTo(position, map.getZoom());
        mappin = L.marker(position);
        map.addLayer(mappin);
    });

    return null;
}

export default MapClick;
