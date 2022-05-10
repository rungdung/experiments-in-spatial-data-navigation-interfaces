function timedText() { //https://www.bitdegree.org/learn/best-code-editor/8qYidoo7
    // I dont really need to use ES 6 syntax for this, why am i following this page blindly..... hmm.
    //https://www.w3schools.com/js/js_arrow_function.asp
    var x = document.getElementById("main-text");
    setTimeout(() => { x.innerHTML="Welcome to Kodagu's repository of ecological data" }, 1000);
    setTimeout(() => { x.innerHTML="Use your arrow keys to navigate the map" }, 4000);
    setTimeout(() => { x.innerHTML="Data pertaining to that grid will show up as you stay in that grid" }, 8000);
    setTimeout(() => { x.innerHTML=" Use the time slider to move across data from previous years and predictions" }, 12000);
    setTimeout(() => { x.innerHTML="" }, 19000);
}

// for year slider
// slider value determines JSON file to use
async function slider() {
    var sliderElement = document.getElementById("slider");
    setTimeout(() => { sliderElement.innerHTML='<input type="range" min="1880" step="50" max="2050" value="2000" orient="vertical" onchange="sliderChange(this.value);">'}, 12000);

    
}

async function sliderChange(activeYear) {
    var sliderText = document.getElementById("active-year");
    sliderText.innerHTML = activeYear;

    activeDB = window["db"+ activeYear]; //https://stackoverflow.com/a/5613859/15299576


}