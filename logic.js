// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([39.8283, -98.5795], 5);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Create a red circle over Dallas
var dallas = [32.7767, -96.7970];
L.marker(dallas).addTo(myMap);

L.circle(dallas, {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.6,
  radius: 100000
}).addTo(myMap);

// Connect a black line from NYC to Toronto
var nyc = [40.7128, -74.0060];
var toronto = [43.6532, -79.3832];

L.marker(nyc).addTo(myMap);
L.marker(toronto).addTo(myMap);
L.polyline([nyc, toronto], {
  color: "black"
}).addTo(myMap)

// Create a purple polygon that covers the area in Atlanta, Savannah, Jacksonville and Montgomery
var atlanta = [33.7490, -84.3880];
var savannah = [32.0809, -81.0912];
var jacksonville = [30.3322, -81.6557];
var montgomery = [32.3792, -86.3077];

L.marker(atlanta).addTo(myMap);
L.marker(savannah).addTo(myMap);
L.marker(jacksonville).addTo(myMap);
L.marker(montgomery).addTo(myMap);

L.polygon([atlanta, savannah, jacksonville, montgomery], {
  color: "orange",
  fill: "orange",
  fillOpacity: 0.5
}).addTo(myMap);


// var cities = [
//   {
//     name: "atlanta",
//     loc: [33.7490, -84.3880]
//   },
//   {
//     name: "savannah",
//     loc: [32.0809, -81.0912]
//   },
//   {
//     name: "jacksonville",
//     loc: [30.3322, -81.6557]
//   },
//   {
//     name: "montgomery",
//     loc: [32.3792, -86.3077]
//   }];

// for (var i = 0; i < cities.lenght; i++){
//   // city = cities[i];
//   L.marker(cities[i].loc).addTo(myMap);
// }