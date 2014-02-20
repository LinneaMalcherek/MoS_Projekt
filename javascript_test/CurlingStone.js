
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
		var direction = -1;
		if (angle <= 0 )
			direction = 1;
		this.directionSide = Matrix.Rotation(direction*Math.PI/2).multiply(directionVector);
	}, 

<!-- initiate everything. set inital speed, render, angularSpeed, speedSide, frictionCoeffC, directionForward, directionSide -->
	init: function(angle,speed){
		this.speed = speed;

		this.render = true;
		
		t = hack_hog / speed; <!-- Time from hack to hog. hack_hog is a global constans that is in dataConstants -->
		this.angularSpeed = Math.PI / (2*t); 

		this.speedSide = this.angularSpeed * rInner; <!-- rInner is in dataConstants -->

		<!-- Set the initial direction vector based on input angle, side is the orthogonal -->
		dirFor = this.setDirectionForward(angle);
		this.setDirectionSide(dirFor, angle); 

	},

<!-- returns a scalar. v = v + a*dt-->
	newSpeed: function(acceleration,dt){
		this.speed = this.speed + acceleration * dt;
	},

<!-- returns a scalar, -my*g  KAN ÄNDRAS OM vi vill ha beroende av hastighet-->
	calcAcceleration: function(gravity, my_constant){
		return -1 * my_constant * gravity; 
	}, 

<!-- Returns total acceleration sideways (difference between front and back)-->
	calcAngularAcceleration: function(gravity, my_f, my_b, r){ 		<!-- my_f and my_b frictioncoeff for front and back of the stone --> 
		theSpeed = this.angularSpeed*r;								<!-- Calculates speed in point of circle with radius r -->

		if(this.speed <0.5){										<!-- Look out for division with zero -->
			return gravity*(my_b-my_f);							
		} else{
			return gravity*(my_b-my_f) / Math.sqrt(this.speed); 		<!-- Total acceleration from difference between acc front and back, dependant on speed -->
		}
	}, 

<!-- Calculates new speedSide from calcAngularAcceleration -->
	newSpeedSide: function(gravity, my_f, my_b, dt){
		if (this.speedSide <= 0) <!-- If stone is not moving -->
			this.speedSide = 0; 
		else
			this.speedSide = this.speedSide + this.calcAngularAcceleration(gravity, my_f, my_b, rInner) * dt;
	},

<!-- Calculates angular speed from speed side -->
	newAngularSpeed: function(new_speed_side){
		if (this.angularSpeed <= 0)
			this.angularSpeed =  0;
		else
			this.angularSpeed = new_speed_side/rInner; 
	},

<!--Calculates resultant of the speeds forward and sideways -->
	calcVelocityResultant: function(){
		var vec1 = this.directionForward.multiply(this.speed); 		<!-- velocity forward -->
		var vec2 = this.directionSide.multiply(this.speedSide); 	<!-- velocity side -->

		return vec1.add(vec2); 
	},

<!-- Calculates the new position. pos = pos + v*dt; -->
	setNewPos: function(velocity,dt){ 
		var vec1 = velocity.multiply(dt);  
		this.pos = this.pos.add(vec1);
	},

<!-- moves the stone. updates the speed, angularSpeed, speedSide, resultantVelocity and then set the new position. -->
	move: function(dt){ 
		<!-- calculate the acceleration here, constansts g and my from dataConstants -->
		a = this.calcAcceleration(g,my); 

		this.newSpeed(a,dt);														<!-- Updates speed forward-->
		this.newSpeedSide(g,this.frictionCoeffC[0],this.frictionCoeffC[1],rInner); 	<!-- Updates speedSide -->
		this.newAngularSpeed(this.speedSide);										<!-- Updates angularSpeed -->
		
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
