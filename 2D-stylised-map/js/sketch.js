function preload(){
    mapImage = loadImage('./assets/map.png');
    db1880 = loadJSON("./assets/1880.json");
    db1930 = loadJSON("./assets/1930.json"); // db of data in JSON
    db1980 = loadJSON("./assets/1980.json");
    db2030 = loadJSON("./assets/2030.json");
}


const gridSize = 8; //in px, fits with the map
let me; //var to hold the cursor obj

var activeDB;
activeDB = Object.assign({}, db1880, {}); // obj to hold active db selected from slider, ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
//does not work.

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
    slider();
}
  
function draw() {
    background(255);
    image(mapImage, 0, 0, imageWidth, imageHeight ); // draw to canvas dimensions

    me.displayCursor();
    me.displayData(); 
}

function keyPressed() { //keyboard input for arrow and WASD keys
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