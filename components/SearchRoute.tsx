import Leaflet, { LatLngTuple } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = (props: any) => {
  console.log(props);
  const instance = Leaflet.Routing.control({
    waypoints: [
      Leaflet.latLng(props.startpos),
      Leaflet.latLng(props.goalpos)
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

const RoutingMachine = createControlComponent(createRoutineMachineLayer);
export default RoutingMachine;