import fetch from "node-fetch";

console.log("hello world!");

const url =
  "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/16/lat/58/data.json";
fetch(url)
  .then((res) => res.json())
  .then((json) => console.log(json));
