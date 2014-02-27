function theGame() {
	allStones = new Array(); <!-- global variable that will be created when theGame starts. does not lie under the 'class' theGame. GLOBAL -->

}

<!-- theGames all functions -->
theGame.prototype = {

<!-- creates a new stone and throws it -->
	throwStone: function(angle, speed){
		var stone = new CurlingStone;
		stone.init(angle, speed);
		allStones.push(stone);
	},

	collision: function(){
		<!-- kolla kollision hela tiden för alla stenar. isf  -->
		for( var i=0; i < allStones.length; i++ ){
			for ( var j=i; j < allStones.length; j++ ) {
				if(i==j)
					continue;
				<!-- only check if one of the stones is moving.  -->
				if(allStones[i].speed > 0.01 || allStones[j].speed > 0.01) {
					if( checkCollision( allStones[i], allStones[j] ) ){
						setAfterCollision(allStones[i], allStones[j]);
						<!-- behöver kolla med radie oliteså för är lite knas -->

					}	
				}

			}

		}

	},

	handleKeyDown: function(event) {
	    currentlyPressedKeys[event.keyCode] = true;
	},


	handleKeyUp: function(event) {
	    currentlyPressedKeys[event.keyCode] = false;
	},

	handleKeys: function(event) {
		if (currentlyPressedKeys[83]) { <!-- s -->
        	return true;
    	}
    	else {
    		return false;

    	}
	},

	handleMove: function(event) {

    	if (currentlyPressedKeys[33]) {
            // Page Up
            pitchRate = 60;
        } else if (currentlyPressedKeys[34]) {
            // Page Down
            pitchRate = -60;
        } else {
            pitchRate = 0;
        }

        if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
            // Left cursor key or A
            yawRate = 60;
        } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
            // Right cursor key or D
            yawRate = -60;
        } else {
            yawRate = 0;
        }

        if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
            // Up cursor key or W
            speed = 3;
        } else if (currentlyPressedKeys[40] ) {
            // Down cursor key
            speed = -3;
        } else {
            speed = 0;
        }


	},

	animate: function() { 
		var timeNow = new Date().getTime();
		if (LASTTIME != 0) {
    	//dt = 0.1;
    	dt = (timeNow - LASTTIME)/1000; <!-- to get in seconds --> 

   		for (var i=0; i<allStones.length; i++){ <!-- allStones en global variabel-->
        	if (allStones[i].speed > 0.01) {
        		if (i == allStones.length-1 ){ <!-- ful lösning!!! om den sten vi skickade ut senast får sopa! -->
        			allStones[i].move(this.handleKeys(), dt);
        		}
        		else {
        			allStones[i].move(false, dt);
        		}
        	}
        	
   		}

   		if (speed != 0) {

                xCam -= Math.sin(yaw*Math.PI/180) * speed * dt;
                zCam -= Math.cos(yaw*Math.PI/180) * speed * dt;
               // joggingAngle += dt * 0.6; // 0.6 "fiddle factor" - makes it feel more realistic :-)
                yCam = Math.sin(Math.PI/180) / 20 + 0.4;
            }

   		    yaw += yawRate * dt;
            pitch += pitchRate * dt;

   	}
   	LASTTIME = timeNow;


	},

	tick: function(){
		window.requestAnimationFrame(this.tick.bind(this));
		this.handleMove();
        drawScene(); 
        this.animate();
        this.collision();
        <!-- anropa en funktion som kollar om stenen åkt utanför banan tex. eller kanske ligga i animate den-->
        
	},

<!-- Bara en funktion nu för att testa! använder fälten för att skicka nya stenar-->
	kastaStenTest: function(){
		<!-- hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där -->
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);

		var radians = angle * (Math.PI/180);

		this.throwStone(radians,speed);
	},

	starting: function(){
		var canvas = document.getElementById("curlingbana");
	    initGL(canvas);
	    initShaders();
	    initTextures();
	    initTextures2();
	    loadObject();
	    loadObject2();

	    currentlyPressedKeys = {};
	    

    	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    	gl.enable(gl.DEPTH_TEST);

    	dataConstants(); <!-- import global variables and some global constants. -->

	},

}