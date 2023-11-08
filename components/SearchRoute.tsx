import Leaflet, { LatLngTuple } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

/**
 * ルート表示用のコントール
 */
function RoutingMachine(props: {startpos: LatLngTuple, goalpos: LatLngTuple}) {

  console.log(Leaflet.latLng(props.startpos));

  const createRoutineMachineLayer = (props: any) => {
    console.log(props)
    const instance = Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(34.49121864609085, 136.70860366863462),
        Leaflet.latLng(34.57704058716537, 136.5386831402941)
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 1,
      }
    });
    return instance;
  };
  const Routes = createControlComponent(createRoutineMachineLayer);
  return <Routes />;
}

export default RoutingMachine;