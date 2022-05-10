class cursor {
  constructor() {
    this.x = 20; // position of cursor on the grid
    this.y = 30;
    this.prevPosiX = this.x; //previous position of cursor on the grid
    this.prevPosiY = this.y;
  }

  displayCursor() {
    fill(204, 167, 0);
    stroke(0);
    rect(this.x, this.y, 10, 10);
  }

  moveDirection(dirX = 0, dirY = 0) {
  
    if (this.x > imageWidth) { // if beyond x domain
      this.x = 0;
    } else if (this.y > imageHeight) { // if beyond y domain
      this.y = 0;
    } else if (this.x <= 0){ //does not work
      this.x = imageWidth / gridSize;
    } else if (this.y <= 0){ // does not work
      this.y = imageHeight / gridSize;
    } else  {
      this.x = this.x + dirX * gridSize;
      this.y = this.y + dirY * gridSize;
    }
  }

  move(x,y){
    if(x > 0 && y>0 && x<imageWidth && y < imageHeight){ // move coords must be within canvas coords domain
      this.x = floor(x);
      this.y = floor(y);
    }
  }

  displayData() {
    if (this.x != this.prevPosiX && this.y != this.prevPosiY) {
      // Only if position has changed

      var coord = floor((this.x + this.y * 3) / gridSize); //convert x,y indices into list indices

      var obj = db.data[coord]; //JSON has already been parsed? Must understand this.?
      document.getElementById("data").innerHTML =
        "<p>" + "Primary land-use: " + obj.landUse + "</p>"  +
        "<p>" + "Primary owner: " + obj.ownership + "</p>"  +
        "<p>" + "Related laws: " + obj.laws + "</p>"  +
        "<p>" + "Lon/Lat:" + obj.lon + "/ " + obj.lat + "</p>";
    }
  }
}
