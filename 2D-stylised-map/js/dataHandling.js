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

  move(dirX = 0, dirY = 0) {
  
    if (this.x > imageWidth) {
      this.x = 0;
    } else if (this.y > imageHeight) {
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

  displayData() {
    if (this.x != this.prevPosiX && this.y != this.prevPosiY) {
      // Only if position has changed

      var coord = floor((this.x + this.y * 3) / gridSize); //convert x,y indices into list indices

      var obj = db.data[coord]; //JSON has already been parsed? Must understand this.?
      document.getElementById("data").innerHTML =
        "Primary land-use: " +
        obj.landUse +
        "<br>" +
        "Primary owner: " +
        obj.ownership +
        "<br>" +
        "Related laws: " +
        obj.laws;
    }
  }
}
