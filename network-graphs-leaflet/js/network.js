
var LOC_codes = new Array; // complete list of LOC codes unique to each village
var numOfConn = new Array; // Temp var, meant to stand in for data that would be provided by the db

//  Network graph on right click
function drawNetwork(e) {

    networkLayer.clearLayers();
    map.removeLayer(networkLayer); // Clears layer before each zoom

	// Draw line between related features
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

        tempLayer.addTo(networkLayer,{
            pane: 'network',
        }); // add templayer to network layer
    }
    networkLayer.addTo(map)	
}