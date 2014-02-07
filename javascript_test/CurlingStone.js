
function Curlingsten()
{
	this.pos = $V([0,0]); <!-- använder vector-form för position -->
	this.speed = 0;
	this.speedSide = 0; 
	this.directionForward = $V([0,1]); <!-- direction forward-->
	this.directionSide = $V([0,0]); 
	this.angularSpeed = 0;
	this.frictionCoeffC = new Array(0.00001,0.001); <!-- HÄR ändras för resten av koden c1 & c2. måste vara för varje sten? -->

	this.in_game = false; <!-- med i spelet eller ej -->
}

<!-- Curlingstenens funktioner -->
Curlingsten.prototype = {

	setFrictionDirection: function(angle){

		<!-- bestämmer om negativ/positivt, friktionsriktningar beroende på sikte -->
		if (-1 * Math.PI / 2 <= angle && angle <= 0){
			this.frictionCoeffC[1] = -this.frictionCoeffC[1];
		}
		else if( 0 < angle && angle <= Math.PI / 2 ){
			this.frictionCoeffC[0] = -this.frictionCoeffC[0];
		}
	},


<!--  Calculates the initial direction vector based on input angle.  -->
	setDirectionForward: function(angle) { 
		<!-- räkna ut rotationsmatrisen -->
		var rotationMatrix = Matrix.Rotation(angle);
		var dir = Vector.create([0,1]);
		this.directionForward = rotationMatrix.multiply(dir).toUnitVector(); <!-- multiplikation & skalar till längd 1-->
		return this.directionForward; <!-- för att kunna använda i setDirectionSide senare.. -->
	},

<!-- set the directionSide 90degrees from the incoming vector-direction -->
	setDirectionSide: function(directionVector, angle){ <!-- direction is a vector of 2 elements -->
		<!-- minus eller plus beroende på vinkeln-->
		var direction = 1;
		if (angle < 0 )
			direction = -1;
		this.directionSide = Matrix.Rotation(direction*Math.PI/2).multiply(directionVector);
	}, 

	init: function(angle,speed){
		<!-- gör massor av beräkningar från vinkeln, hastighet osv. sätter direction och ang_speed -->
		this.speed = speed;
		
		t = hack_hog / speed; <!-- hack_hog finns i dataConstants -->
		this.angularSpeed = Math.PI / (2*t); 

		this.speedSide = this.angularSpeed * rInner; <!-- rInner finns i dataConstants -->

		this.setFrictionDirection(angle);

		<!-- Set the initial direction vector based on input angle, side är den ortogonala till  -->
		dirFor = this.setDirectionForward(angle);
		this.setDirectionSide(dirFor, angle); 

	},

<!-- är bara en skalär -->
	newSpeed: function(acceleration,dt){
		this.speed = this.speed + acceleration * dt;
	},

<!-- skalär -->
	calcAcceleration: function(gravity, my_constant){
		return -1 * my_constant * gravity; 
	}, 

	calcAngularAcceleration: function(gravity, c, r){
		theSpeed = this.angularSpeed*r;
		return ( gravity * c ) / Math.sqrt(this.speed); <!-- kanske inte är this.speed,eftersom är inre radien ist -->
	}, 

	newSpeedSide: function(gravity, c, dt){
		<!-- sjukt svåra modellen... -->
		<!-- this.speedSide = this.speedSide + this.calcAngularAcceleration(gravity, my, c) * dt;  -->

	},
	newAngularSpeed: function(){
		<!-- sjukt svåra modellen... -->
	},

	calcVelocityResultant: function(){
		<!-- this.speed * this.directionForward + this.speedSide * this.directionSide; det nedan betyder så -->
		var vec1 = this.directionForward.multiply(this.speed); <!-- velocity forward -->
		var vec2 = this.directionSide.multiply(this.speedSide); <!-- velocity side -->

		<!-- return vec1.add(vec2); -->
		return vec1;
	},

	setNewPos: function(velocity,dt){ 
		<!-- same ass stone_pos1 = stone_pos1 + velocity1*dt; -->
		var vec1 = velocity.multiply(dt);  
		this.pos = this.pos.add(vec1);

	},

	move: function(dt){ <!-- anropar allt för ett varv? -->
<!-- uppdatera speed, angularSpeed, speedSide, resultantVelocity, och sen nya positionen -->
		a = this.calcAcceleration(g,my); <!-- calculate the acceleration here, constanst from dataConstants -->
		this.newSpeed(a,dt);
		<!--this.newAngularSpeed();  skriv funktionen  -->
		<!--this.newSpeedSide(); skriv funktionen -->
		var velocity = this.calcVelocityResultant();
		this.setNewPos(velocity,dt);
	},

	getPosAsString: function(){
		return this.pos.inspect();
	},




}


