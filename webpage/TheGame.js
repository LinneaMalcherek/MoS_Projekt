
function theGame() {
	thisturn=1;
	turn=1;
	this.players = []; // holds all the players
	this.allStones = new Array();
	this.thrownStone = 0;  // how many stones have been thrown in total by all playerss

	this.outofbounds = false; // ugly. but cant come up with something better.. to know if out of bounds or not. 
}

// theGames all functions
theGame.prototype = {

	addPlayer: function(p){
		this.players.push(p);
		p.id=this.players.length; 
		return this;
	},

	// Function that creates a new stone and throws it. 
	throwStone: function(angle, speed){
		if (this.thrownStone % 2 == 0)
			var playerid = 0;
		else
			var playerid = 1; 

		this.outofbounds = false; 

		this.players[playerid].thrown = this.players[playerid].thrown + 1 ;
		this.thrownStone = this.thrownStone + 1 ;
		
		var stone = new CurlingStone();

		stone.init(angle, speed, playerid);

		this.allStones.push(new Struct(stone,playerid));
		
		this.updateInfo();
	},

	// check for collision between all the stones that are in the game. 
	collision: function(){
		for( var i=0; i < this.allStones.length; i++ ){
			for ( var j=i+1; j < this.allStones.length; j++ ) {
				if( checkCollision( this.allStones[i].stone, this.allStones[j].stone ) ){
						setAfterCollision(this.allStones[i].stone, this.allStones[j].stone);
				}

			}
		}
	},


	// all handle-functions handle the actions on the keyboard. to be able to navigate in space. 
	handleKeyDown: function(event) {
	    currentlyPressedKeys[event.keyCode] = true;
	},
	handleKeyUp: function(event) {
	    currentlyPressedKeys[event.keyCode] = false;
	},
	handleKeys: function(event) {
		if (currentlyPressedKeys[83]) { // s
        	return true;
    	}
    	else {
    		return false;

    	}
	},
	handleMove: function(event) {

    	if (currentlyPressedKeys[69]) { // e , look up in the world
            pitchRate = 60;
        } else if (currentlyPressedKeys[68]) { // d, look down in the world
            pitchRate = -60;
        } else {
            pitchRate = 0;
        }

        // move left/right
        if (currentlyPressedKeys[37]) { // Left cursor key
            yawRate = 60;
        } else if (currentlyPressedKeys[39]) { // Right cursor key
            yawRate = -60;
        } else {
            yawRate = 0;
        }

        // move forward / back
        if (currentlyPressedKeys[38]) { // Up cursor key
            speed = 3;
        } else if (currentlyPressedKeys[40] ) { // Down cursor key
            speed = -3;
        } else {
            speed = 0;
        }
	},

	// moves the stone and also the "view"
	animate: function() { 
		var timeNow = new Date().getTime();
		
		if (LASTTIME != 0) {
	    	dt = (timeNow - LASTTIME)/1000; // dt in seconds.

	   		for (var i=0; i<this.allStones.length; i++){
	        	if (this.allStones[i].stone.speed > 0.01) {
	        		if (i == this.allStones.length-1 ){ // onle be able to sweep on the stone that is being throwed
	        			this.allStones[i].stone.move(this.handleKeys(), dt);
	        		}
	        		else {
	        			this.allStones[i].stone.move(false, dt);
	        		}
	        	}
	        	
	   		}

	   		// update the "camera-view"
	   		if (speed != 0) {
                xCam -= Math.sin(yaw*Math.PI/180) * speed * dt;
                zCam -= Math.cos(yaw*Math.PI/180) * speed * dt;
                yCam = Math.sin(Math.PI/180) / 20 + 0.4;
	        }

   		    yaw += yawRate * dt;
            pitch += pitchRate * dt;

   		}

   		LASTTIME = timeNow;
	},


// BUGGAR NÄR DEN TAR BORT VID 3:E KASTET ibland... BYTER EJ TILL RÄTT SPELARE DÅ!!!
	// check if the stone is out of the bounds, out of the field or being throwed to short. 
	outOfBounds: function() {
		for (var i =0; i<this.allStones.length; i++) {
			var theStone = this.allStones[i].stone; 

			// check if out of the side, only check if the stone is moving
			if (theStone.speed > 0.01 && ( Math.abs(theStone.getXPos()) > FIELDWIDTH/2 || theStone.getYPos() > HACK_BACK + R )){
				var id = this.allStones[i].player;
				this.allStones.splice(i,1);

				if (this.thrownStone != NUMBEROFSTONES*2) { // only change buttons if not end of game
					this.disableButton(id);
					this.outofbounds = true; 
				}

			}
			// delete stone if it has stoped before the hog-line
			if (theStone.speed < 0.01 && theStone.getYPos() < HACK_HOG_2){
				var id = this.allStones[i].player;
				this.allStones.splice(i,1);

				if (this.thrownStone != NUMBEROFSTONES*2) { // only change buttons if not end of game 
					this.disableButton(id);
					this.outofbounds = true;
				}
			}

		}
	},

	// the function that is the "render"-loop
	tick: function(){
		window.requestAnimationFrame(this.tick.bind(this));
		this.handleMove();
		this.collision();
        this.animate();
        this.outOfBounds(); 
        drawScene(this.allStones);
        this.sendNewStone(); // so that you can't send a new stone when one is already moving. 

        // to check if the game has ended (aka all stone being throwed.) 
        // only calulate the score when the last stone has stoped. 
        if( this.thrownStone == NUMBEROFSTONES*2 ){
        	if(thisturn==turn){
        		if(this.allStones.length==0)
	        		document.getElementById("newRound").style.visibility = "visible";
        		else if (this.allStones[this.allStones.length-1].stone.speed < 0.01) 
	        		this.countScore();						
	        	
	    	}
        }  


	},

	// to get the input from the user from the webpage, to send a stone. 
	throwStoneFromUser: function(){
		// hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);

		var radians = angle * (Math.PI/180);

		this.throwStone(radians,speed);
		this.disableAll();


	},

	// to set-up a game and everything in webGL, shaders, textures. 
	starting: function(){
		var canvas = document.getElementById("curlingbana");
	    initGL(canvas);
	    initShaders();

	    stoneTextureP1 = new Texture();
	    stoneTextureP2 = new Texture();
		fieldTexture = new Texture();
		skyboxTexture = new Texture();
		console.log("up: %s",stoneTextureP1.i);
		stoneTextureP1.i = "changedup";
	    stoneTextureP1.initTextures("objects/textures/curlingstone_texture.png");
	    stoneTextureP2.initTextures("objects/textures/curlingstone_texture_2.png");
	    fieldTexture.initTextures("objects/textures/curlingbanan12.png");
	    skyboxTexture.initTextures("objects/textures/skydome_nebulosa.jpg");

		stoneBuffers = new BufferObject();
		stoneBuffers.loadObject("objects/stone_2.json");
        skyboxBuffers = new BufferObject();
        skyboxBuffers.loadObject("objects/skybox.json");
        fieldBuffers = new BufferObject(); 
        fieldBuffers.loadObject("objects/bana.json");

	    currentlyPressedKeys = {};   

    	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    	gl.enable(gl.DEPTH_TEST);

    	dataConstants(); // to import all the data constats that we need. 

	},

	// so you can't send a new stone while the last has stoped. change the buttons in the webpage. 
	sendNewStone: function(){
		if (this.thrownStone!=0 && this.allStones.length>0 && !this.outofbounds ) {
			var id = this.allStones[this.allStones.length-1].player;

			// change button. FEL! går in här även ifall vi ändrat redan.. hmmm
			if(this.allStones[this.allStones.length-1].stone.speed < 0.01 && this.thrownStone!=NUMBEROFSTONES*2){
				this.disableButton(id);
			}
		}
	},

	// in the game-functionallity. to switch between which buttons that should be disabled.
	disableButton: function(button){
		if (button == 1) {
			document.getElementById("spelare").disabled=false;
			document.getElementById("spelare").innerHTML = "Spelare 1";
		}
		else if (button == 0){ // betyder att spelare 0 har spelat och ska därför byta till spelare 2
			document.getElementById("spelare").disabled=false;
			document.getElementById("spelare").innerHTML = "Spelare 2";
		}

	},
	disableAll: function(){
		document.getElementById("spelare").disabled=true;
	},

	// is being called when you press the button "ny omgång"
	// reset everything for a new round. 
	resetRound: function(){
		turn=turn+1; 
		for(var i=0; i<this.players.length; i++){

			this.players[i].thrown = 0;
		}

		delete this.allStones; 
		this.allStones = new Array();

		this.thrownStone = 0;
		this.disableButton(1); 
		this.updateInfo();

		this.outofbounds = false;

		document.getElementById("newRound").style.visibility = "hidden";
	},

	// calculates the score of a round. 
	countScore: function(){
		thisturn = thisturn + 1; 
		var score = new Array();
		score[0]=this.players[0].score;
		score[1]=this.players[1].score;

		// räkna ut poängen genom att gå igenom alla stener som är i spel(render=true) och ta dess position
		// till mittpunkten (den vektorn). räkna ut vektorns längd och sen spara alla längder för varje spelare och sten.
		// se vilken spelare som har sten närmast och även om de har fler stenar innan motståndarens första sten.s
		for (var i=0; i<this.allStones.length; i++){
			this.allStones[i].distanceFromMiddle =  this.allStones[i].stone.pos.distanceFrom(TEE);
		}

		this.allStones.sort(function(a,b){return a.distanceFromMiddle-b.distanceFromMiddle}); // sort!!

		// see how many point the leader gets
		if (this.allStones.length > 0 && this.allStones[0].distanceFromMiddle + R < NEST_RADIUS){
			var sum=1;
			var leader = this.allStones[0].player;
			
			for (var i=0; i < this.allStones.length - 1; i++){
				if (this.allStones[i].player == this.allStones[i+1].player && i <= NUMBEROFSTONES - 1) {
					sum = sum + 1;
				}
				else{
					break;
				}
			}

			score[leader] = score[leader] + sum; 

		}

		this.players[0].score = score[0];
		this.players[1].score = score[1];
		
		// write the new score on the webpage
		document.getElementById("score1").innerHTML=""+score[0] ;
		document.getElementById("score2").innerHTML=""+score[1] ;

		// enable resetRound-knappen lr se till så att den dyker upp! 
		document.getElementById("newRound").style.visibility = "visible";

	},

	// update the info on webpage, the score and how many stones that has been thrown. 
	updateInfo: function(){
		var score1 = this.players[0].score;
		var score2 = this.players[1].score;
		var stones1 = this.players[0].thrown;
		var stones2 = this.players[1].thrown;
		document.getElementById("score1").innerHTML=""+score1 ;
		document.getElementById("score2").innerHTML=""+score2 ;
		document.getElementById("stone1").innerHTML=" "+stones1 ;
		document.getElementById("stone2").innerHTML=" "+stones2 ;
	},

}

// a function to create a player
var onePlayer = function(){
	this.score = 0;
	this.id=null;
	this.thrown = 0;
}

// a struct to hold a stone, player and distance to the tee. 
var Struct = function (stone, id){
	this.stone = stone;
	this.player = id;
	this.distanceFromMiddle = -1; // bara för att den ska sättas senare

}
