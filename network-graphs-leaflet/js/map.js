var mapboxAccessToken =
	"pk.eyJ1IjoicnVuZ2R1bmciLCJhIjoiY2tqeWh6cXF4MDgzMjJvbWVmbGQzYjAwMyJ9.U-aJyoqyKvTXlhVk43jV1A";

var map, customLayer, runLayer, networkLayer, legend;


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

	//  Omnivore KML to geoJSON function
	dataLayer = omnivore.kml("assets/kodagu_villages.kml", null, customLayer);
	dataLayer.addTo(map);


	//https://leafletjs.com/examples/map-panes/
	// panes to handle z indices for networks
	map.createPane('network');
	map.getPane('network').style.zIndex = 10000000;
	map.getPane('network').style.pointerEvents = 'none';

    networkLayer = L.layerGroup({
		pane: 'network',
	});
    networkLayer.addTo(map);

	//https://stackoverflow.com/a/26504907/15299576
	polyLine.on('mouseover', function(e) {
		var layer = e.target;
	
		layer.setStyle({
			color: 'blue',
			opacity: 1,
			weight: 5
		});
	});
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
	numOfConn.push(Math.floor(Math.random() * 10));
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





