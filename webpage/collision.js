<!-- fil som innehåller det som rör krocken för tydligare uppdelning.-->
<!-- the game har en funktion som heter collision som sköter det utifrån och den i sin tur anroppar dessa funktioner under-->

<!-- här ha en funktion som kollar kollision! jämför med arrayen allaStenar -->
<!-- setNewDirection and setNewSpeed will be called if collision is between 2 stones-->
function setAfterCollision(stone1,stone2){ <!-- vilken vinkel som stenen ska åka i efter krock-->
	var collisionDirection = stone1.pos.subtract(stone2.pos); 

	<!-- projektionsformeln -->
	var v2 = collisionDirection.multiply( stone1.calcVelocityResultant().dot(collisionDirection) / collisionDirection.dot(collisionDirection) );
	var v1 = stone1.calcVelocityResultant().subtract(v2);	 <!-- (stone1.velocity - v2) -->

	var s1 = Math.sqrt( Math.pow(v1.e(1),2) + Math.pow(v1.e(2),2) ); <!-- sqrt(v1x^2 + v1y^2) -->
	var s2 = Math.sqrt( Math.pow(v2.e(1),2) + Math.pow(v2.e(2),2) );

	var dirFor1 = v1.toUnitVector();
	var dirFor2 = v2.toUnitVector();

	<!-- set on the stones there new speed and new direction-->
	stone1.speed = s1;
	stone2.speed = s2;
	stone1.directionForward = dirFor1;
	stone2.directionForward = dirFor2; 
}

function checkCollision(stone1,stone2){
	var distance = Math.sqrt ( Math.pow(stone2.getXPos() - stone1.getXPos(),2) + Math.pow(stone2.getYPos() - stone1.getYPos(),2) ); 

	if( distance <= 2*R )
		return true;

	return false;
}

