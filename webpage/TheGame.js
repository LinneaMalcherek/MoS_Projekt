
function theGame() {
	thisturn=1;
	turn=1;

	this.players = [];
	this.allStones = new Array(); 
}

<!-- theGames all functions -->
theGame.prototype = {

	addPlayer: function(p){
		this.players.push(p);
		p.id=this.players.length; 
		console.log("created player: %s", p.id);
		return this;
	},

	// Function that creates a new stone and throws it. 
	// add the stone to the players stone-array 
	throwStone: function(angle, speed, playerid){
		this.players[playerid].thrown = this.players[playerid].thrown + 1 ;
		
		var stone = new CurlingStone;

		stone.init(angle, speed, playerid);
		this.allStones.push(stone);
		
		this.updateInfo();
	},

	// check for collision between all the stones that are in the game. 
	collision: function(){
			for( var i=0; i < this.allStones.length; i++ ){
				for ( var j=i+1; j < this.allStones.length; j++ ) {
					if( checkCollision( this.allStones[i], this.allStones[j] ) ){
							setAfterCollision(this.allStones[i], this.allStones[j]);
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
	        	if (this.allStones[i].speed > 0.01) {
	        		if (i == this.allStones.length-1 ){ // onle be able to sweep on the stone that is being throwed
	        			this.allStones[i].move(this.handleKeys(), dt);
	        		}
	        		else {
	        			this.allStones[i].move(false, dt);
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

	// check if the stone is out of the bounds, out of the field or being throwed to short. 
	outOfBounds: function() {
		for (var i =0; i<this.allStones.length; i++) {
			var theStone = this.allStones[i]; 

			// check if out of the side, only check if the stone is moving
			if (this.allStones[i].speed > 0.01 && ( Math.abs(this.allStones[i].getXPos()) > FIELDWIDTH/2 || this.allStones[i].getYPos() > FIELDLENGTH )){
				this.allStones.splice(i,1);
			}
			// delete stone if it has stoped before the hog-line
			if (this.allStones[i].speed < 0.01 && this.allStones[i].getYPos() < FIELDLENGTH - HACK_HOG){
				this.allStones.splice(i,1);
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
        //if( this.allStones.length == NUMBEROFSTONES*2 ){
        if( this.players[0].thrown+this.players[1].thrown == NUMBEROFSTONES*2 ){
        	if(thisturn==turn){
        		if (this.allStones[this.allStones.length-1].speed < 0.01)
	        		this.countScore();
	    	}
        }        
	},

	// to get the input from the user from the webpage, to send a stone. 
	throwStoneFromUser: function(id){
		<!-- hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där -->
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);

		var radians = angle * (Math.PI/180);

		this.throwStone(radians,speed,id);
		this.disableAll();


	},

	// to set-up a game and everything in webGL, shaders, textures. 
	starting: function(){
		var canvas = document.getElementById("curlingbana");
	    initGL(canvas);
	    initShaders();
	    initTextures();
	    initTextures2();
        initTextures3();
        initTextures4();
	    loadObject();
	    loadObject2();
        loadObject3();

	    currentlyPressedKeys = {};   

    	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    	gl.enable(gl.DEPTH_TEST);

    	dataConstants(); // to import all the data constats that we need. 

	},

	// so you can't send a new stone while the last has stoped. change the buttons in the webpage. 
	sendNewStone: function(){
		var thrownStones = this.players[0].thrown+this.players[1].thrown; 
		if (thrownStones!=0) {
			if(thrownStones%2 != 0)
				var id = 0;
			if(thrownStones%2 == 0) {
				id=1;
			}

			// bugg här, blir knas om första stenen försvinner. kan inte byta knapp då..
			if(this.allStones.length-1 >= 0  && this.allStones[this.allStones.length-1].speed < 0.01 && thrownStones!=NUMBEROFSTONES*2){
				this.disableButton(id);
			}
		}
	},

	// in the game-functionallity. to switch between which buttons that should be disabled.
	disableButton: function(button){
		if (button) {
			document.getElementById("spelare1").disabled=false;
			document.getElementById("spelare2").disabled=true;
		}
		else {
			document.getElementById("spelare1").disabled=true;
			document.getElementById("spelare2").disabled=false;
		}

	},
	disableAll: function(){
		document.getElementById("spelare1").disabled=true;
		document.getElementById("spelare2").disabled=true;
	},

	// is being calle when you press the button "ny omgång"
	// go trought the players and reset the array of all the curling stones. 
	// reset everything for a new round. 
	resetRound: function(){
		turn=turn+1; 
		for(var i=0; i<this.players.length; i++){

			this.players[i].thrown = 0;
		}

		delete this.allStones; 
		this.allStones = new Array();

		this.disableButton(1); 
		this.updateInfo();

		document.getElementById("newRound").style.visibility = "hidden";
	},

	// calculates the score of a round. 
	countScore: function(){
		console.log("räkna poäng");
		thisturn = thisturn + 1; 
		var score = new Array();
		score[0]=this.players[0].score;
		score[1]=this.players[1].score;

		// räkna ut poängen genom att gå igenom alla stener som är i spel(render=true) och ta dess position
		// till mittpunkten (den vektorn). räkna ut vektorns längd och sen spara alla längder för varje spelare och sten.
		// se vilken spelare som har sten närmast och även om de har fler stenar innan motståndarens första sten.s
		for (var i=0; i<this.allStones.length; i++){
			this.allStones[i].calculateDistance(); // räknar ut avståndet för varje sten till mitten. 
		}

		this.allStones.sort(function(a,b){return a.distanceFromMiddle-b.distanceFromMiddle}); // sort!!

		if (this.allStones[0].distanceFromMiddle + R < NEST_RADIUS ){
			var sum=1;
			var leader = this.allStones[0].player;
			var i=1;

			while (this.allStones[i].player == leader && this.allStones[i].player == this.allStones[i++].player){
					sum = sum + 1;
					if (i >= NUMBEROFSTONES - 1)
						break;
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
	this.stones = new Array();
	this.thrown = 0;
}
