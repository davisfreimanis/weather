import fetch from "node-fetch";

console.log("hello world!!");

if (navigator.geolocation) {
  // Get position using Geolocation API
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude.toFixed(6);
    const long = position.coords.longitude.toFixed(6);
    console.log(`${lat}, ${long}`);

    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const { timeSeries } = json;
        console.log(timeSeries);
      });
  });
}
