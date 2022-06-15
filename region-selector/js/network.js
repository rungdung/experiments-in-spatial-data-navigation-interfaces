
var LOC_codes = new Array; // complete list of LOC codes unique to each village
var numOfConn = new Array; // Temp var, meant to stand in for data that would be provided by the db

//  Network graph on right click
function drawNetwork(e) {

    networkLayer.clearLayers();
    map.removeLayer(networkLayer); // Clears layer before each zoom

	// Draw line between related features
	// Unable to access layer id from layer obj. Cannot draw network graph
    // https://stackoverflow.com/questions/28618049/accessing-leaflet-js-geojson-features-from-outside
    // I need ids for that!
    // LOC_CODE from KML is randomly generated

    for(let i = 0; i < 5; i++){
        sizeOfIDs = LOC_codes.length;
        randomVillageCode = Math.floor(Math.random() * sizeOfIDs);

        var tempCoords = new Array; //something to hold network eye and node end
        var tempLayer; // something to hold the polyline 
        
        var networkEye = e.target.getBounds().getCenter(); //current village
        var networkNodePoint = dataLayer.getLayer( // center point of related village
                LOC_codes[randomVillageCode]
            ).getBounds().getCenter();
        tempCoords.push(networkEye, networkNodePoint) 
        
        tempLayer = L.polyline(tempCoords, { // leaflet layer on network link
            color: "blue",
            weight: Math.floor(Math.random() * 10),
        });

        tempLayer.addTo(networkLayer); // add templayer to network layer
    }

	// var lineCoords = [
		
	// 	dataLayer.getLayer(LOC_codes[randomVillageCode]).getBounds().getCenter(),
    //     dataLayer.getLayer(LOC_codes[randomVillageCode + 12]).getBounds().getCenter(),
    //     dataLayer.getLayer(LOC_codes[randomVillageCode + 1]).getBounds().getCenter()
       
	// 	//
	// ];

    networkLayer.addTo(map)
    networkLayer.bringToFront();
	
}