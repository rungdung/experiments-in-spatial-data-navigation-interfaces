function preload(){
    mapImage = loadImage('./assets/map.png');
    db = loadJSON("./assets/data.json"); // db of data in JSON
}


const gridSize = 8; //in px, fits with the map
let me; //var to hold the cursor obj

var widthDiv;
var heightDiv;  

var imageWidth;
var imageHeight;

function setup() {
    var canvasDiv = document.getElementById('map'); // parent div
    widthDiv = canvasDiv.offsetWidth; // width of parent div
    heightDiv = canvasDiv.offsetHeight; // height of parent div

    imageWidth = widthDiv;
    imageHeight = mapImage.height * (widthDiv/mapImage.width) ; //scale proportionally 
    
    createCanvas(imageWidth, imageHeight).parent("map");
    me = new cursor(); //initialising the cursor obj
    timedText();
}
  
function draw() {
    background(255);
    image(mapImage, 0, 0, imageWidth, imageHeight ); // draw to canvas dimensions

    me.displayCursor();
    me.displayData(); 
}

function keyPressed() { //keyboard input
    if (keyCode === LEFT_ARROW || keyCode ===65) {
        me.moveDirection(-1)
    } else if (keyCode === RIGHT_ARROW || keyCode ===68) {
        me.moveDirection(1)
    } else if (keyCode === UP_ARROW || keyCode ===87) {
        me.moveDirection(0,-1)
    } else if (keyCode === DOWN_ARROW || keyCode ===83) {
        me.moveDirection(0,1)
    }
  }

function mouseClicked(){
    me.move(mouseX, mouseY);
    console.log(mouseX, mouseY);
}
function windowResized() { // resize the canvas if window is resized
    resizeCanvas(widthDiv, imageWidth, imageHeight);
  }