function timedText() {
    var x = document.getElementById("main-text");
    setTimeout(() => { x.innerHTML="Welcome to Kodagu's repository of ecological data" }, 4000);
    setTimeout(() => { x.innerHTML="Use your arrow keys to navigate the map" }, 9000);
    setTimeout(() => { x.innerHTML="Data pertaining to that grid will show up as you stay in that grid" }, 12000);
    setTimeout(() => { x.innerHTML="" }, 19000)
}