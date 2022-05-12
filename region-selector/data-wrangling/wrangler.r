library(XML)
library(methods)

path<-"../assets/kodagu_villages.kml"
result <- xmlParse()

rootNode<- xmlRoot(result)

xmlSize(rootNode)
print(rootNode)

resultsDF <- xmlToDataFrame(rootNode)

scheme <- xmlElementSummary(path)
