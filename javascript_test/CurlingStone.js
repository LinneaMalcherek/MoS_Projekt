
function CurlingStone()
{
	this.pos = $V([0,0]); <!-- uses vector-notation for position -->
	this.speed = 0;
	this.speedSide = 0; 
	this.directionForward = $V([0,1]); <!-- direction forward-->
	this.directionSide = $V([0,0]); 
	this.angularSpeed = 0;
	this.frictionCoeffC = new Array(0.00001,0.001); <!-- change HERE the constans for the forward and backward friction -->

	this.render = false; <!-- if render or not -->
}

<!-- CurlingStones functions -->
CurlingStone.prototype = {

<!-- Deside the direction of the friction based on the angle -->
	setFrictionDirection: function(angle){
		if (-1 * Math.PI / 2 <= angle && angle <= 0){
			this.frictionCoeffC[1] = -1*this.frictionCoeffC[1];
		}
		else if( 0 < angle && angle <= Math.PI / 2 ){
			this.frictionCoeffC[0] = -1*this.frictionCoeffC[0];
		}
	},


<!--  Calculates the initial direction vector based on input angle.  -->
	setDirectionForward: function(angle) { 
		var rotationMatrix = Matrix.Rotation(angle); <!-- calculate the rotation matrix -->
		var dir = Vector.create([0,1]);
		this.directionForward = rotationMatrix.multiply(dir).toUnitVector(); <!-- multiply and scale to length 1 -->
		return this.directionForward; <!-- to be used in setDirectionSide later.. -->
	},

<!-- set the directionSide 90degrees from the incoming vector-direction -->
	setDirectionSide: function(directionVector, angle){ <!-- directionVector is a vector of 2 elements -->
		<!-- positive or negative based on the angle -->
		var direction = 1;
		if (angle < 0 )
			direction = -1;
		this.directionSide = Matrix.Rotation(direction*Math.PI/2).multiply(directionVector);
	}, 

<!-- initiate everything. set inital speed, render, angularSpeed, speedSide, frictionCoeffC, directionForward, directionSide -->
	init: function(angle,speed){
		this.speed = speed;

		this.render = true;
		
		t = hack_hog / speed; <!-- hack_hog is a global constans that is in dataConstants -->
		this.angularSpeed = Math.PI / (2*t); 

		this.speedSide = this.angularSpeed * rInner; <!-- rInner is in dataConstants -->

		this.setFrictionDirection(angle);

		<!-- Set the initial direction vector based on input angle, side is the orthogonal -->
		dirFor = this.setDirectionForward(angle);
		this.setDirectionSide(dirFor, angle); 

	},

<!-- returns a scalar. v = v + a*dt-->
	newSpeed: function(acceleration,dt){
		this.speed = this.speed + acceleration * dt;
	},

<!-- returns a scalar, -my*g -->
	calcAcceleration: function(gravity, my_constant){
		return -1 * my_constant * gravity; 
	}, 

<!-- MAYBE THIS EQ. SHOULD BE CHANGED !!! LOOK AT-->
	calcAngularAcceleration: function(gravity, c, r){
		theSpeed = this.angularSpeed*r;
		return ( gravity * c ) / Math.sqrt(this.speed);
	}, 

<!-- NEED TO IMPLEMENT -->
	newSpeedSide: function(gravity, c, dt){
		<!-- sjukt svåra modellen... -->
		<!-- this.speedSide = this.speedSide + this.calcAngularAcceleration(gravity, my, c) * dt;  -->

	},

<!-- NEED TO IMPLEMENT -->
	newAngularSpeed: function(){
		<!-- sjukt svåra modellen... -->
	},

<!--returnerar this.speed * this.directionForward + this.speedSide * this.directionSide; det nedan betyder så -->
	calcVelocityResultant: function(){
		var vec1 = this.directionForward.multiply(this.speed); <!-- velocity forward -->
		var vec2 = this.directionSide.multiply(this.speedSide); <!-- velocity side -->

		<!-- return vec1.add(vec2); this should be the actuall return when the newSpeedSide and newAngularSpeed is implemented -->
		return vec1
	},

<!-- Calculates the new position. pos = pos + v*dt; -->
	setNewPos: function(velocity,dt){ 
		var vec1 = velocity.multiply(dt);  
		this.pos = this.pos.add(vec1);

	},

<!-- moves the stone. updates the speed, angularSpeed, speedSide, resultantVelocity and then set the new position. -->
	move: function(dt){ 
		a = this.calcAcceleration(g,my); <!-- calculate the acceleration here, constansts g and my from dataConstants -->
		this.newSpeed(a,dt);
		<!--this.newAngularSpeed();  NEED TO BE IMPLEMENTED FIRST -->
		<!--this.newSpeedSide(); NEED TO BE IMPLEMENTED FIRST -->
		var velocity = this.calcVelocityResultant();
		this.setNewPos(velocity,dt);
	},

<!-- getXPos and getYPos is to easier understand in the code that we get the positions. -->
	getXPos: function(){
		return this.pos.e(1);

	},
	getYPos: function(){
		return this.pos.e(2);

	},

<!-- JUST FUNCTION FOR TESTING, NOT NEEDED LATER -->
	getPosAsString: function(){
		return this.pos.inspect();
	},




}


