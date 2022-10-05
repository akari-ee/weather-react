import React, { Component, useEffect } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

let lat, lng, pos;
function Map({x, y}) {
    const position = [x, y];
    useEffect(() => {
        console.log(position);
    }, [])
  return (
    <MapContainer
      style={{ borderRadius: "15px", height: "100%" }}
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker> */}
    </MapContainer>
  );
}

export default Map;
