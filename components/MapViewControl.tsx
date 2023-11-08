import { useMap } from "react-leaflet";
import { useLayoutEffect } from "react";
import { LatLngTuple } from "leaflet";

function MapViewControl(prop: {position: LatLngTuple}) {
  const map = useMap()
  useLayoutEffect(() => {
    map.setView(prop.position)
  }, [prop.position])
  return (null)
}


export default MapViewControl;