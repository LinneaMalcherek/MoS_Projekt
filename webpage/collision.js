<!-- fil som innehåller det som rör krocken för tydligare uppdelning.-->
<!-- the game har en funktion som heter collision som sköter det utifrån och den i sin tur anroppar dessa funktioner under-->

<!-- här ha en funktion som kollar kollision! jämför med arrayen allaStenar -->
<!-- setNewDirection and setNewSpeed will be called if collision is between 2 stones-->
function setNewDirection(stone1,stone2){ <!-- vilken vinkel som stenen ska åka i efter krock-->


}

function setNewSpeed(stone1, stone2){ <!-- vilken hastighet som stenen ska ha efter krock. sätts båda två -->

}

function checkCollision(stone1,stone2){
	var distance = Math.sqrt ( Math.pow(stone2.getXPos() - stone1.getXPos(),2) + Math.pow(stone2.getYPos() - stone1.getYPos(),2) ); 

	if( distance <= 2*R )
		return true;

	return false;
}

