function sakerSomEjFunkarRiktigt() { <!-- ANVÄNDS EJ!!! bara kvar ifall att -->
    var timeNow = new Date().getTime();
    
    if (lastTime != 0 && sten.speed > 0.01) {
        var dt = timeNow - lastTime;
        sten.move(dt);
        xPos = sten.getXPos()/10;
        yPos = sten.getYPos()/10;

    }
    lastTime = timeNow; 
}

<!-- handle the movement for every stone in the scene. -->
function animate() { 
    dt = 0.1;

   for (var i=0; i<allStones.length; i++){ <!-- allStones en global variabel-->
        if (allStones[i].speed > 0.01) {
            allStones[i].move(dt);
        }

        <!-- kanske här kolla kollision. iaf så ändra de stenar som kolliderat. behöver gå igenom alla!!! -->
        <!-- behöver skapa funktioner för krock, dvs de funktioner som ger de nya hastigheterna och riktning på stenarna. -->
        <!-- skalet för dessa kanske implementerade om det ska ligga i theGame?-->
        <!-- kanske även kolla om kolliderat med väggen, då ska den stenens render kanske sättas till false? -->

   }
}

<!-- recursive function that starts when the 'class' theGame is called. render the scene all the time -->
function tick() { 
        window.requestAnimationFrame(tick);
        drawScene(); 
        animate();
}

<!-- initiate the canvas, shaders, buffers etc. creates a new game by calling theGame. -->
function webGLStart() {
    var canvas = document.getElementById("curlingbana");
    initGL(canvas);
    initShaders();
    initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    dataConstants(); <!-- import global variables and some global constants. -->

<!-- start a game -->
    game = new theGame; <!-- does not throw a stone directly. a function needs to be called -->

  }