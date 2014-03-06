
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
		this.updateInfo();
	},

	collision: function(){
		<!-- kolla kollision hela tiden för alla stenar. isf  -->

			for( var i=0; i < this.allStones.length; i++ ){

				if(!this.allStones[i].render)
					continue;

				for ( var j=i+1; j < this.allStones.length; j++ ) {

					if(!this.allStones[j].render)
						continue;

					if( checkCollision( this.allStones[i], this.allStones[j] ) ){
							setAfterCollision(this.allStones[i], this.allStones[j]);
					}

				}
			}
//( this.allStones[i].speed > 0.01 || this.allStones[j].speed > 0.01)
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
		this.collision();
        this.animate();
        //this.outOfBounds(); 
        drawScene(this.players);
        this.sendNewStone();


        // kolla om vi har kört klart alla stenar måste stå still!!!
        if( this.allStones.length == NUMBEROFSTONES*2 ){

        	if (this.players[1].stones[NUMBEROFSTONES-1].speed < 0.01) // räkna ut poängen när den sista stenen har stannat! kanske innte bästa men ändå..
	        	this.countScore();
        }        
	},

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

	resetRound: function(){
		// anroppas när man tryck på knappen ny omgång! 
		// gå igenom båda spelarna och ta bort curlingarrayen
		// sätta thrown till 0 igen! 
		// knapparna ska återställas
		for(var i=0; i<this.players.length; i++){
			delete this.players[i].stones;
			this.players[i].stones = new Array();
			this.players[i].thrown = 0;
		}

		delete this.allStones; 
		this.allStones = new Array();

		this.disableButton(1); 
		this.updateInfo();

		document.getElementById("newRound").style.visibility = "hidden";
	},

	countScore: function(){
		var score = new Array();
		score[0]=this.players[0].score;
		score[1]=this.players[1].score;
		// skriv ut den nya poängen! 

		// räkna ut poängen genom att gå igenom alla stener som är i spel(render=true) och ta dess position
		// till mittpunkten (den vektorn). räkna ut vektorns längd och sen spara alla längder för varje spelare och sten.
		// se vilken spelare som har sten närmast och även om de har fler stenar innan motståndarens första sten.s
		for (var i=0; i < NUMBEROFSTONES*2; i++){ // för varje sten
			this.allStones[i].calculateDistance(); // räknar ut avståndet för varje sten till mitten. 
		}

		this.allStones.sort(function(a,b){return a.distanceFromMiddle-b.distanceFromMiddle}); // sort!!

//		if (this.allStones[0].distanceFromMiddle + R < NEST_RADIUS){
			var sum=1;
			var leader = this.allStones[0].player;
			var i=1;

			while (this.allStones[i].player == this.allStones[i++].player){
				sum = sum + 1;
				if (i >= NUMBEROFSTONES - 1)
					break;
			}

			score[leader] = score[leader] + sum; 

//		}

		this.players[0].score = score[0];
		this.players[1].score = score[1];
		


		document.getElementById("score1").innerHTML=""+score[0] ;
		document.getElementById("score2").innerHTML=""+score[1] ;

		// enable resetRound-knappen lr se till så att den dyker upp! 
		document.getElementById("newRound").style.visibility = "visible";

	},

<!-- Bara en funktion nu för att testa! använder fälten för att skicka nya stenar-->
	kastaStenTest: function(id){
		<!-- hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där -->
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);

		var radians = angle * (Math.PI/180);

		this.throwStone(radians,speed,id);
		this.disableAll();


	},

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

    	dataConstants(); <!-- import global variables and some global constants. -->

	},

	sendNewStone: function(){
		if (this.allStones.length!=0) {
			var id = 0;
			if(this.allStones.length%2 == 0) {
				id=1;
			}

			// man får ej skjuta ut en ny sten förrens den senaste har stannat! 
			if(this.players[id].stones[this.players[id].thrown-1].render && this.players[id].stones[this.players[id].thrown-1].speed < 0.01 && this.allStones.length!=NUMBEROFSTONES*2  ){
				this.disableButton(id);

			}
		}
	},

	concatArrays: function(){
		var c = [];
		for (var i =0; i<this.players.length; i++){
			c = c.concat(this.players[i].stones);
		}
		this.allStones = c; 
	},




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

// to create one player
var onePlayer = function(name){
	this.score = 0;
	this.name=name;
	this.id=null;
	this.stones = new Array();
	this.thrown = 0;
}
