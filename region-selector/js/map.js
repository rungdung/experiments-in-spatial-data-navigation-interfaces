var mapboxAccessToken =
	"pk.eyJ1IjoicnVuZ2R1bmciLCJhIjoiY2tqeWh6cXF4MDgzMjJvbWVmbGQzYjAwMyJ9.U-aJyoqyKvTXlhVk43jV1A";

var map, customLayer, runLayer, networkLayer, legend;
var LOC_codes = new Array;

function initMap() {
	map = L.map("map").setView([12.35315, 75.960846], 10);

    //  Map tiling
	L.tileLayer(
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
		mapboxAccessToken, {
			id: "mapbox/outdoors-v9",
			attribution: 'Villages Maps Provided by <a href="http://projects.datameet.org/indian_village_boundaries/">Indian Village Boundaries Project</a> by Data{Meet}, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://  www.mapbox.com/">Mapbox</a>',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: mapboxAccessToken,
		}
	).addTo(map);

	//  Villages data from http://projects.datameet.org/indian_village_boundaries/
	//  --------------
	//  Omnivore plugin for leaflet, https://github.com/mapbox/leaflet-omnivore
	customLayer = L.geoJson(null, {
		//  http://leafletjs.com/reference.html#geojson-style
		style: function(feature) {
			return {
				fillColor: getColor(feature.properties.AREA_UN_CU),
				weight: 2,
				opacity: 1,
				color: "white",
				dashArray: "3",
				fillOpacity: 0.7,
			};
		},
		onEachFeature: onEachFeature,
	});

    // Legend
    legend = L.control({position: 'bottomright'});



	//  Omnivore KML to geoJSON function
	runLayer = omnivore.kml("assets/kodagu_villages.kml", null, customLayer);
	runLayer.addTo(map);

    networkLayer = L.layerGroup();
    networkLayer.addTo(map);

    legend.addTo(map);
}

// -----------------------------------------
// Leaflet methods
// -----------------------------------------

//  Ref https://leafletjs.com/examples/choropleth/
//  Iterate over each layer
function onEachFeature(feature, layer) {
	// Assign interactions
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature,
		contextmenu: drawNetwork,
	}),

    // Assign IDs to leaflet layers from the KML file
    layer._leaflet_id = feature.properties.LOC_CODE;
    LOC_codes.push(layer._leaflet_id); // global array of IDs
}

//  Highlight on hover
function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: "#666",
		dashArray: "",
		fillOpacity: 0.1,
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

    // Display data of village
	var infoDiv = document.getElementById("info");
	infoDiv.innerHTML = infoUpdate(layer.feature.properties);
}

//  Remove highlight on hover out
function resetHighlight(e) {
	customLayer.resetStyle(e.target);
}

//  Network graph on right click
function drawNetwork(e) {
	// Clears layer before each zoom
    map.removeLayer(networkLayer);

	// Draw line between related features
	// Unable to access layer id from layer obj. Cannot draw network graph
    // https://stackoverflow.com/questions/28618049/accessing-leaflet-js-geojson-features-from-outside
    // I need ids for that!
    sizeOfIDs = LOC_codes.length;
    randomVillageCode = Math.floor(Math.random() * sizeOfIDs); // LOC_CODE from KML is randomly generated
    targetVillageCode = e.target.feature.properties.LOC_CODE; // current village LOC_CODE
    console.log(randomVillageCode);

	var lineCoords = [
		e.target.getBounds().getCenter(),
		runLayer.getLayer(LOC_codes[randomVillageCode]).getBounds().getCenter(),
        runLayer.getLayer(LOC_codes[randomVillageCode + 12]).getBounds().getCenter(),
        runLayer.getLayer(LOC_codes[randomVillageCode + 1]).getBounds().getCenter()
       
		//
	];

	networkLayer =  L.polyline(lineCoords, {
		color: "blue"
	})
    
    networkLayer.addTo(map);
	map.fitBounds(networkLayer.getBounds());
}

// Zoom on click
function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds()); // to zoom to village bounds
}

// -----------------------------------------
// Info display
// -----------------------------------------

// Update data inside info
function infoUpdate(props) {
	return (
		"<h4>Area under cultivation of Kodagu Villages: </h4>" +
		(props ?
			"<b>" + props.VILL_NAME + "</b><br />" + props.AREA_UN_CU + " Acres?" :
			"Hover over a village") + "<br>" +
        "<b>Total Population: </b>" +
		(props ?
			  props.T_POPLN + "<br />" + 
        "<b>Total Households: </b>" + props.HOUSEHOLDS  : "Hover over a village")
	);
}

// Colour scale from leaflet example
function getColor(d) {
	return d > 1000 ?
		"#800026" :
		d > 500 ?
		"#BD0026" :
		d > 200 ?
		"#E31A1C" :
		d > 100 ?
		"#FC4E2A" :
		d > 50 ?
		"#FD8D3C" :
		d > 20 ?
		"#FEB24C" :
		d > 10 ?
		"#FED976" :
		"#FFEDA0";
}



legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

