function theGame() {
	allStones = new Array(); <!-- global variable that will be created when theGame starts. does not lie under the 'class' theGame. GLOBAL -->
}

<!-- theGames all functions -->
theGame.prototype = {

<!-- creates a new stone -->
	throwStone: function(angle, speed){
		var stone = new CurlingStone;
		stone.init(angle, speed);
		allStones.push(stone);
	},

<!-- här ha en funktion som kollar kollision! jämför med arrayen allaStenar -->
<!-- setNewAngle and setNewSpeed will be called if collision is between 2 stones-->
	setNewAngle: function(stone1,stone2){

	},

	setNewSpeed: function(stone1, stone2){

	}, 


	checkCollision: function(stone1,stone2){
		var distance = Math.sqrt ( Math.pow(stone2.getXPos() - stone1.getXPos(),2) + Math.pow(stone2.getYPos() - stone1.getYPos(),2) ); 

		if( distance <= 2*r )
			return true;

		return false;
	},

	collision: function(){
		<!-- kolla kollision hela tiden för alla stenar. isf  -->
		for( var i=0; i < allStones.length; i++ ){
			for ( var j=i; j < allStones.length; j++ ) {
				if(i==j)
					continue;
				<!-- only check if one of the stones is moving.  -->
				if(allStones[i].speed > 0.01 || allStones[j].speed > 0.01) {
					if( this.checkCollision( allStones[i], allStones[j] ) ){
						console.log('sten %s och %s kolliderade!!', i, j);
						<!-- behöver kolla med radie oliteså för är lite knas -->

					}	
				}

			}

		}

	},


	animate: function() { 
    	dt = 0.1;

   		for (var i=0; i<allStones.length; i++){ <!-- allStones en global variabel-->
        	if (allStones[i].speed > 0.01) {
            	allStones[i].move(dt);
        	}
   		}
	},

	tick: function(){
		window.requestAnimationFrame(this.tick.bind(this));
        drawScene(); 
        this.animate();
        this.collision();
	},

<!-- Bara en funktion nu för att testa! använder fälten för att skicka nya stenar-->
	kastaStenTest: function(){
		<!-- hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där -->
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);
		this.throwStone(angle,speed);
	},

	starting: function(){
		var canvas = document.getElementById("curlingbana");
    	initGL(canvas);
    	initShaders();
   		initBuffers();

    	gl.clearColor(0.0, 0.0, 0.0, 1.0);
    	gl.enable(gl.DEPTH_TEST);

    	dataConstants(); <!-- import global variables and some global constants. -->

	},

}

<!-- ingår ej i klassen theGame. för att starta när sidan laddas om -->
function start(){
	game = new theGame();
	game.starting();
	game.tick();

	console.log('jippe, startade!');

}
