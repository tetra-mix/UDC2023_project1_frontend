import { useMap } from "react-leaflet";
import L from "leaflet";

function MapSearch() {
  const map = useMap();
  let position = new L.LatLng(0, 0);
  let circle = L.circle(position, {});

  const customButton = L.Control.extend({
    options: {
        position: "topleft",
    },
    onAdd: function () {
      const button = L.DomUtil.create(
        "button",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      button.innerHTML = "<img src='/location.svg' class='currentPosition' />";
      button.className = "customButton";

      button.onclick = function () {
        map.removeLayer(circle);
        position = map.getCenter();
        circle = L.circle(position, {
            radius: 500,
            color: "bule",
            fillColor: "#00f",
            fillOpacity: 0.2,
        });
        map.addLayer(circle);
      };

      return button;
    },
  });

  map.addControl(new customButton());
}
export default MapSearch;