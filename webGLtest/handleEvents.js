var lastTime = 0;

var xPos = 0;
var xSpeed = 0;
var yPos = 0;
var ySpeed = 0;
var zSpeed=0;
var zPos=-10;
var currentlyPressedKeys = {};


function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}


function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
    if (currentlyPressedKeys[73]) { <!-- i -->
        zSpeed = -1;

    }
    else if (currentlyPressedKeys[79]) { <!-- o -->
        zSpeed = 1;
    }
    else{
        zSpeed = 0;
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        xSpeed = -1;
    }
    else if (currentlyPressedKeys[39]) {
        // Right cursor key
        xSpeed = 1;
    }
    else {
    	xSpeed=0;
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        ySpeed = 1;
    }
    else if (currentlyPressedKeys[40]) {
        // Down cursor key
        ySpeed = -1;
    }
    else {
    	ySpeed=0;
    }
}