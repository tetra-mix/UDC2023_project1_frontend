import React, { useState, useEffect } from 'react';
import { GeoJSON, MapContainer, ScaleControl, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L, { LatLng, Layer, marker } from 'leaflet';
import { Feature, GeoJsonObject, GeometryObject, GeoJsonProperties } from 'geojson';

import "leaflet/dist/leaflet.css";
import '../css/Map.css';

L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

//test
// 'https://api.gtfs-data.jp/v2/organizations/wataraitown/feeds/choeibus/files/stops.geojson';

function Map() {
  const organization_id = 'isecity';
  const feed_id = 'communitybus';
  const baseurl = 'https://api.gtfs-data.jp/v2/organizations/' + organization_id + '/feeds/' + feed_id;
  const busstops = '/files/stops.geojson'
  const routes = '/files/routes.geojson'
  const tracking = '/files/tracking.geojson'

  const [data, setData] = useState<GeoJsonObject>();

  useEffect(() => {
    fetch(baseurl + busstops, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("error"));
    console.log(data);
  }, []);

  /*
  OpenStreetMap
  <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
  国土地理院タイル
  <TileLayer
          attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
          url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
        />
  */
  const position = new LatLng(34.57, 136.53);

  return (
    <MapContainer center={position} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        data && 
        <GeoJSON data={data}
          pointToLayer={(_feature, latlng) => marker(latlng)}
          onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.stop_name)}
        />
      }
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
