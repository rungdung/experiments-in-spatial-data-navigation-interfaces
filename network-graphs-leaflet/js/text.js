function timedText() { //https://www.bitdegree.org/learn/best-code-editor/8qYidoo7
    // I dont really need to use ES 6 syntax for this, why am i following this page blindly..... hmm.
    //https://www.w3schools.com/js/js_arrow_function.asp
    var x = document.getElementById("intro-text");

    setTimeout(() => { x.innerHTML="These are village boundaries coloured according to area under cultivation. Red being the most and yellow the least." }, 3000);
    setTimeout(() => { x.innerHTML="Hover or click on a village to see data" }, 10000);
    setTimeout(() => { x.innerHTML="Right click to see related and similar context of villages" }, 15000);
    setTimeout(() => { x.innerHTML="" }, 21000);
}


