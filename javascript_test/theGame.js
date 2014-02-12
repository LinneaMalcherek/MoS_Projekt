function theGame() {
	allStones = new Array(); <!-- global variable that will be created when theGame starts. does not lie under the 'class' theGame. GLOBAL -->
	tick(); <!-- start to render! -->
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

	collision: function(){
		<!-- kolla kollision hela tiden för alla stenar. isf  -->

	},

<!-- Bara en funktion nu för att testa! använder fälten för att skicka nya stenar-->
	kastaStenTest: function(){
		<!-- hämtar värdet ur två stycken fält, skrivit in vinkel och hastighet där -->
		var angle = parseFloat(document.getElementById('vinkel').value);
		var speed = parseFloat(document.getElementById('hastighet').value);
		this.throwStone(angle,speed);
	},
}
