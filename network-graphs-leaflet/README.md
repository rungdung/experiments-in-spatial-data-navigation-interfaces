## "region-selector"
- [Link to live site](https://rungdung.github.io/experiments-in-spatial-data-navigation-interfaces/region-selector/)
- Network graph visualisation on interactive Leaflet maps

# Completed roadmap
## Map
- Working [interactive Chloropeth map](https://en.wikipedia.org/wiki/Choropleth_map) via [leaflet.js](leafletjs.com)

- Mouse Over, Mouse Out, click event listener functions work
- UI created
- Algorithm for accessing other village centres to draw network graphs

- Do not have the time to implement an actual network, a proof of concept draws polylines between multiple village centres. 
  - Update: 16/6/22: Separate polylines used to create networks with random data.

## Data

- A 95000 line KML file of Kodagu Village boundaries and census data extracted from a 90 Mb geoJSON file from [Data{Meet}](http://projects.datameet.org/indian_village_boundaries/).
- Why could I not use the geoJSON file directly? I do not know, leaflet threw an error even after I corrected it to match for geoJSON specifications. I suspect it has something to do with my limited understanding of handling js objects

# incomplete roadmap
- Draw network graph between similar villages
	- Did not have time to analyse data and document relationships between villages
	- Need to parse the entire KML lib and write related villages for that. Can't parse and summarise every time a click event happens 
		- https://stackoverflow.com/questions/39623094/adding-a-tag-in-kml-file-using-r
		- https://www.tutorialspoint.com/r/r_xml_files.htm
	- Do not have the time to wrangle the data set. What do I do? Can I randomly access other layers?
	- Can I do it in R? No time.

# pitfalls
-  Leaflet layer access took me the longest time to understand. When Leaflet loads in geoJSON, I need to assign IDs, otherwise I cannot access them.


# Libraries and guidance used
- Villages Maps Provided by[ Indian Village Boundaries Project](http://projects.datameet.org/indian_village_boundaries/) by Data{Meet}. Its made available under the Open Database License [ODbL](http://opendatacommons.org/licenses/odbl/).
- Example being studied to enable interactivity in leaflet maps https://leafletjs.com/examples/choropleth/
- for geoJSON verification and KML conversion, because the geoJSON file from data{Meet} just refused to work. But the KML file does! https://geojson.io/#map=9/12.3950/75.7507