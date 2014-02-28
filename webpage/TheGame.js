
function theGame() {
	this.players = [];
	this.allStones = new Array(); <!-- global variable that will be created when theGame starts. does not lie under the 'class' theGame. GLOBAL -->
}

<!-- theGames all functions -->
theGame.prototype = {

	addPlayer: function(p){
		this.players.push(p);
		p.id=this.players.length; 
		console.log("created player: %s, %s", p.id, p.name);
		return this;
	},

<!-- creates a new stone and throws it -->
	throwStone: function(angle, speed, playerid){
		this.players[playerid].thrown = this.players[playerid].thrown + 1 ;
		var stone = new CurlingStone;
		var stoneid = this.players[playerid].thrown; // vilken sten man kastat. 
		stone.init(angle, speed, stoneid,playerid);
		this.players[playerid].stones.push(stone);
		this.concatArrays(); // lägger till alla stenar tillsammans för beräkningar med collision och allt. 
	},

	collision: function(){
		<!-- kolla kollision hela tiden för alla stenar. isf  -->
		for( var i=0; i < this.allStones.length; i++ ){
			for ( var j=i; j < this.allStones.length; j++ ) {
				if(i==j)
					continue;
				<!-- only check if one of the stones is moving.  -->
				if(this.allStones[i].render && this.allStones[j].render && ( this.allStones[i].speed > 0.01 || this.allStones[j].speed > 0.01) ) {
					if( checkCollision( this.allStones[i], this.allStones[j] ) ){
						setAfterCollision(this.allStones[i], this.allStones[j]);
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

    	if (currentlyPressedKeys[69]) {
            // e
            pitchRate = 60;
        } else if (currentlyPressedKeys[68]) {
            // d
            pitchRate = -60;
        } else {
            pitchRate = 0;
        }

        if (currentlyPressedKeys[37]) {
            // Left cursor key
            yawRate = 60;
        } else if (currentlyPressedKeys[39]) {
            // Right cursor key
            yawRate = -60;
        } else {
            yawRate = 0;
        }

        if (currentlyPressedKeys[38]) {
            // Up cursor key
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
   		for (var i=0; i<this.allStones.length; i++){ <!-- allStones en global variabel-->
        	if (this.allStones[i].speed > 0.01) {
        		if (i == this.allStones.length-1 ){ <!-- ful lösning!!! om den sten vi skickade ut senast får sopa! -->
        			this.allStones[i].move(this.handleKeys(), dt);
        		}
        		else {
        			this.allStones[i].move(false, dt);
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

// check if the stone is out of the bounds
	outOfBounds: function() {
		for (var i =0; i<this.allStones.length; i++) {
			// check if out of the side, only check if the stone is moving
			var theStone = this.allStones[i]; 
			if (this.allStones[i].speed > 0.01 && ( Math.abs(this.allStones[i].getXPos()) > FIELDWIDTH/2 || this.allStones[i].getYPos() > FIELDLENGTH )){
				var stoneId= this.allStones[i].stoneId;
				var playerId=this.allStones[i].player;
				this.players[playerId].stones[stoneId].render = false;
				//this.players[playerId].stones.splice(stoneId,1); 
			}
			// delete stone if it has stoped before the hog-line
			if (this.allStones[i].speed < 0.01 && this.allStones[i].getYPos() < FIELDLENGTH - HACK_HOG){
				var stoneId= this.allStones[i].stoneId;
				var playerId=this.allStones[i].player;
				this.players[playerId].stones[stoneId].render = false;
				//this.players[playerId].stones.splice(stoneId,1);
			}
		}


	},

	tick: function(){
		window.requestAnimationFrame(this.tick.bind(this));
		this.handleMove();
		this.outOfBounds(); 
        drawScene(this.players); 
        this.animate();
        this.collision();
        <!-- anropa en funktion som kollar om stenen åkt utanför banan tex. eller kanske ligga i animate den-->
        
	},

	disableButton: function(button){
		if (!button) {
			document.getElementById("spelare1").disabled=true;
			document.getElementById("spelare2").disabled=false;
		}
		else {
			document.getElementById("spelare1").disabled=false;
			document.getElementById("spelare2").disabled=true;
		}

	},

<!-- Bara en funktion nu för att testa! använder fälten för att skicka nya stenar-->
	kastaStenTest: function(id){
		<!-- hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där -->
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);

		var radians = angle * (Math.PI/180);

		this.throwStone(radians,speed,id);

		this.disableButton(id);
	},

	starting: function(){
		var canvas = document.getElementById("curlingbana");
	    initGL(canvas);
	    initShaders();
	    initTextures();
	    initTextures2();
        initTextures3();
	    loadObject();
	    loadObject2();
        loadObject3();
	    currentlyPressedKeys = {};
	    

    	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    	gl.enable(gl.DEPTH_TEST);

    	dataConstants(); <!-- import global variables and some global constants. -->

	},

	concatArrays: function(){
		var c = [];
		for (var i =0; i<this.players.length; i++){
			c = c.concat(this.players[i].stones);
		}
		this.allStones = c; 
	},



}

// to create one player
var onePlayer = function(name){
	this.score = 0;
	this.name=name;
	this.id=null;
	this.stones = new Array();
	this.thrown = 0;
}
