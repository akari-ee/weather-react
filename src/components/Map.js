import React, { useEffect } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const APIKEY = "9f5e42842d269c898ad63d79ed4afc01"; // API KEY

let map = null; // Map

// Api : Weather Maps 2.0 3-hour step (OpenWeatherMap)
function Map({ x, y }) {

  function initMap() {
    // Basic map layer
    let osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
      }
    );

    // add Basic Layer(osm) to map
    map = L.map("map", { center: new L.latLng(x, y), zoom: 13, layers: [osm] });
  }

  // const position = [x, y];
  useEffect(() => {
    console.log(map); // should output the object that represents instance of Leaflet
    if (map !== undefined && map !== null) {
      map.remove(); // should remove the map from UI and clean the inner children of DOM element
      console.log(map); // nothing should actually happen to the value of mymap
    }

    initMap(); // init Map

    // Start TileLayer
    let Temp = L.tileLayer(
        `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${APIKEY}`,
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://owm.io">VANE</a>',
          id: "temp",
        }
      ),
      Precipitation = L.tileLayer(
        `http://maps.openweathermap.org/maps/2.0/weather/PA0/{z}/{x}/{y}?appid=${APIKEY}`,
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
      ),
      Wind = L.tileLayer(
        `http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?appid=${APIKEY}`,
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
      ),
      Pressure = L.tileLayer(
        `http://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?appid=${APIKEY}`,
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
      ),
      Clouds = L.tileLayer(
        `http://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?appid=${APIKEY}`,
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://owm.io">VANE</a>',
        }
      );
    // End

    Temp.addTo(map); // Essential code

    // Overlays to add to map 
    let overlays = {
      Temperature: Temp,
      Precipitation: Precipitation,
      Clouds: Clouds,
      Pressure: Pressure,
      Wind: Wind,
    };

    L.control.layers(overlays, null, { collapsed: false }).addTo(map);
  });

  return (
    <div id="map" style={{ height: "100%", borderRadius: "15px" }}></div>
  );
}

export default Map;
