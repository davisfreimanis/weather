import fetch from "node-fetch";
import * as L from "leaflet";

const temperature = document.querySelector(".currentTemperature");
const location = document.querySelector(".location");

if (navigator.geolocation) {
  // Get position using Geolocation API
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    console.log(`${lat}, ${long}`);

    let mymap = L.map('mapid').setView([lat, long], 15);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoiemVicmExMjMiLCJhIjoiY2tidjU0eHp0MDJwMDJybGRwZWN0NmNkOSJ9.44qj3sFxmp5mTgLGs8rmgg",
      }
    ).addTo(mymap);

    const marker = L.marker([lat, long]).addTo(mymap);
    const circle = L.circle([lat, long], {
      color: 'red',
      radius: accuracy,
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(mymap);
    

    const rectangle = L.polygon([
      [52.500440, 2.250475],
      [52.547483, 27.348870],
      [70.740996, 37.848053],
      [70.655722, -8.541278]
    ]).addTo(mymap);

    if(location) {
      location.textContent = `${lat.toFixed(6)}, ${long.toFixed(6)}, Accuracy ${accuracy} meters`;
    }

    mymap.on('click', (e: L.LeafletMouseEvent) => {
      console.log(`${e.latlng.lat}, ${e.latlng.lng}`);
    });

    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long.toFixed(6)}/lat/${lat.toFixed(6)}/data.json`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { timeSeries } = json;

        const parameters = timeSeries[0].parameters;

        const temperatureParameter = parameters.find(
          ({ name }: { name: string }) => {
            return name === 't'
          }
        );

        if(temperature) {
          temperature.textContent = `${temperatureParameter.values[0]} °C`;
        }
        
      });
  });
}
