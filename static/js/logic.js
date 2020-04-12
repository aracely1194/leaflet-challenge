// Path to countries geoJSON
var geoJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
console.log(geoJSON)

// Creating map object
map = L.map("map", {
    center: [0, 0],
    zoom: 2.8
});

// API key, dont know why i couldnt call it from the config.js file
var API_KEY = "pk.eyJ1IjoiYXJhY2VseTExOTQiLCJhIjoiY2s3MmsyMTFqMDM2OTNrdXU5anh6bmJpYyJ9.NZWat1zkj9hmfgxVxC2Cbw";

// Adding tile layer to map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);


// Get geoJSON data
d3.json(geoJSON, function (data) {
    console.log(data);

    // Set function for circle color accroding to magnitude
    function getColor(magnitude) {
        switch (true) {
            case magnitude > 5:
                return "#FF4600";
            case magnitude > 4:
                return "#FF7B00";
            case magnitude > 3:
                return "#FFAF00";
            case magnitude > 2:
                return "#FFE400";
            case magnitude > 1:
                return "#C2FF00";
            default:
                return "#7CFF00";
        }
    };

    // Set function so radius of circle is according to magnitude
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        else { return magnitude * 3 };
    };

    // Creating a geoJSON layer with the retrieved data
    geojsonLayer = L.geoJson(data, {

        //Set styke
        style: function (feature) {
            return {
                color: "black",
                fillColor: getColor(feature.properties.mag),
                fillOpacity: 0.5,
                weight: 0.5,
                radius: getRadius(feature.properties.mag)
            };
        },

        // Make the circle markers
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        // Add popup with earthquake info, location and magnitude
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Location: " + feature.properties.place + "<br>Magnitude: " + feature.properties.mag)
        }

    });
    geojsonLayer.addTo(map);


    // Create legend to be in bottom right position
    var legend = L.control({
        position: "bottomright"
    });

    // Add legend to the map
    legend.onAdd = function () {
        var div = L
            .DomUtil
            .create("div", "info_legend");

        var magnitude = [0, 1, 2, 3, 4, 5];
        var colors = [
             "#FF4600",
             "#FF7B00",
             "#FFAF00",
             "#FFE400",
             "#C2FF00",
             "#7CFF00"
        ];

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
            magnitude[i] + (magnitude[i + 1] ? "&ndash;" + magnitude[i + 1] + "<br>" : "+");
        }
        return div;
    };
    legend.addTo(map);


});