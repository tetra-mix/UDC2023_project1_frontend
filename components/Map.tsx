import React, { useState, useEffect } from 'react';
import { Circle, GeoJSON, MapContainer, ScaleControl, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L, { LatLng, LatLngTuple, Layer, marker } from 'leaflet';
import { Feature, GeoJsonObject, GeometryObject, GeoJsonProperties } from 'geojson';

import RoutingMachine from './SearchRoute';
import MapClick from './MapClick';
import MapViewControl from './MapViewControl';


import "leaflet/dist/leaflet.css";
import '../css/Map.css';

L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

//test
// 'https://api.gtfs-data.jp/v2/organizations/isecity/feeds/communitybus/files/routes.geojson';

function Map() {
  const organization_id = 'isecity';
  const feed_id = 'communitybus';
  const baseurl = 'https://api.gtfs-data.jp/v2/organizations/' + organization_id + '/feeds/' + feed_id;
  const busstops = '/files/stops.geojson'
  const routes = '/files/routes.geojson'
  const tracking = '/files/tracking.geojson'

  const [position, setPosition] = useState<LatLngTuple>([34.49121864609085, 136.70860366863462])
  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<GeoJsonObject>();


  useEffect(() => {
    fetch(baseurl + busstops, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("error"));
    console.log(data);
  }, []);

  const onSearch = async () => {
    console.log("ok");
    //「国土地理院API」でキーワードから緯度・経度を含む住所情報を取得
    const url = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(address)}`
    const response = await fetch(url);
    const results = await response.json();

    if (Array.isArray(results) && results.length > 0) {
      //見つかった住所（施設）の位置を表示
      const coordinates = results[0].geometry.coordinates;
      setPosition([coordinates[1], coordinates[0]]);
      alert(position);
    } else {
      alert("Not Found");
    }
  }

  const goal :LatLngTuple = [34.57704058716537, 136.5386831402941];
  return (
    <React.Fragment>
      <div>
        <input
          type="text"
          style={{ width: "30rem" }}
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button onClick={onSearch}>住所検索</button>
      </div>
      <MapContainer center={position} zoom={15} >
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

        <MapClick />
        <MapViewControl position={position}/>
        <RoutingMachine startpos={position} goalpos={goal} />
      </MapContainer>
    </React.Fragment>
  );
}

export default Map;


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
