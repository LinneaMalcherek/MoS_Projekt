
function CurlingStone()
{
	this.pos = $V([0,0]);
	this.speed = 0;
	this.speedSide = 0; 
	this.directionForward = $V([0,1]);
	this.directionSide = $V([0,0]); 
	this.angularSpeed = 0;
	this.frictionCoeffC = new Array(0.000001,0.0001); // constans for the forward and backward friction
	cb = this.frictionCoeffC[1];
	cf = this.frictionCoeffC[0];
	this.angle = 0; 
}

// CurlingStones functions
CurlingStone.prototype = {

	//Calculates the initial direction vector based on input angle.
	setDirectionForward: function(angle) { 
		var rotationMatrix = Matrix.Rotation(angle); //calculate the rotation matrix
		var dir = Vector.create([0,1]);
		this.directionForward = rotationMatrix.multiply(dir).toUnitVector(); //multiply and scale to length 1
		return this.directionForward; //to be used in setDirectionSide later
	},

	// set the directionSide 90degrees from the incoming vector-direction
	setDirectionSide: function(directionVector, angle){ //directionVector is a vector of 2 elements
		// positive or negative based on the angle
		var direction = -1;
		if (angle <= 0 )
			direction = 1;
		this.directionSide = Matrix.Rotation(direction*Math.PI/2).multiply(directionVector);
	}, 

	// initiate everything. set inital speed, render, angularSpeed, speedSide, frictionCoeffC, directionForward, directionSide
	init: function(angle,speed){
		this.speed = speed;
		
		t = HACK_HOG / speed; // time from hack to hog
		this.angularSpeed = Math.PI / (2*t); 

		//this.speedSide = this.angularSpeed * R_INNER;
		this.speedSide = 0;

		// set the initial direction vector based on input angle, side is the orthogonal
		dirFor = this.setDirectionForward(angle);
		this.setDirectionSide(dirFor, angle); 
	},

	// returns acceleration for speed forward at vel v
	a_speed: function(v,friction){
		return -friction*G;
	},
	// returns acceleration for speedSide at vel v
	a_speedSide: function(v,friction){
		return (cb - cf)*G/Math.sqrt(v);
	},
	// returns acceleration for angularSpeed at vel v
	a_angSpeed: function(v,friction){
		return -((cb + cf)*G)/(Math.sqrt(v)*R_INNER);
	},
	// returns next step according to the runge-kutta method
	rungekutta: function(v_n,v,h,a,friction){
		
		var k_1 = a(v,friction);
		var k_2 = a(v+0.5*h*k_1,friction);
		var k_3 = a(v+0.5*h*k_2,friction);
		var k_4 = a(v+h*k_3,friction);
		var v2  = v_n + (1/6)*((k_1+2*k_2+2*k_3+k_4)*h);

		if (0 < v2)
    		return v2;  
    	else
    		return 0;
	},

	// returns a scalar by runge kutta
	newSpeed: function(speed,friction,dt){
		return this.rungekutta(speed,speed,dt,this.a_speed,friction);
	},

	// Returns total acceleration sideways (difference between front and back)
	calcAngularAcceleration: function(gravity, my_f, my_b, r){ //my_f and my_b frictioncoeff for front and back of the stone
		if(this.speed <0.01){// Look out for division with zero
			return gravity*(my_b-my_f);							
		} else{
			return gravity*(my_b-my_f) / Math.sqrt(this.speed);// Total acceleration from difference between acc front and back, dependant on speed 
		}
	},

	// Calculates new speedSide from calcAngularAcceleration
	newSpeedSide: function(gravity, my_f, my_b, dt){
		if (this.speedSide < 0) //If stone is not moving
			this.speedSide = 0; 
		else
			this.speedSide = this.rungekutta(this.speedSide,this.speed,dt,this.a_speedSide,1);
		
	},

	// Calculates angular speed from speed side
	newAngularSpeed: function(new_speed_side){
		if (this.angularSpeed <= 0 || this.speed <= 0)
			this.angularSpeed =  0;
		else
			this.angularSpeed = this.rungekutta(this.angularSpeed,this.speed,dt,this.a_angSpeed,1);
	},

	// Calculates resultant of the speeds forward and sideways 
	calcVelocityResultant: function(){
		var vec1 = this.directionForward.multiply(this.speed); // velocity forward 
		var vec2 = this.directionSide.multiply(this.speedSide); // velocity side 

		return vec1.add(vec2); 

	},

	updateSpeeds: function(friction){

		// add the vector forward (direction, utslagsvinkel) and sidevector
		v = this.calcVelocityResultant();

		// Dela upp hastighetsvektorn i speed(riktig) och direction(riktig)
		vSpeed = Math.sqrt(Math.pow(v.e(1),2) + Math.pow(v.e(2),2));
		vDir = v.toUnitVector();

		//Lägg friktion på speed(riktig)
		vSpeed = this.newSpeed(vSpeed,friction,dt);	// Accelerationen i färdriktningen (friktionen)

		// Återskapa den nya hastighetsvektorn (riktiga)
		v = vDir.multiply(vSpeed);

		// Projicera den nya hastighetsvektorn(riktig) på utslagsriktningen (uppdatera endast speed krävs)
		this.speed = (v.dot(this.directionForward))/(this.directionForward.dot(this.directionForward));

		// Projicera den nya sidhastighetsvektorn på sidoriktningen (uppdatera endast speed krävs)
		this.speedSide = (v.dot(this.directionSide))/(this.directionSide.dot(this.directionSide));

	},

	// Calculates the new position. pos = pos + v*dt;
	setNewPos: function(velocity,dt){ 
		var vec1 = velocity.multiply(dt);  
		this.pos = this.pos.add(vec1);
	},

	// Calculates the new angle. ang = ang + angSpeed*dt; 
	setNewAngle: function(dt){ 
		this.angle = this.angle + this.angularSpeed*dt;
		if (this.angle >= 2*Math.PI) // If the stone has rotated a complete spin, subtract 2pi 
			this.angle = this.angle-2*Math.PI;
	},

	// moves the stone. updates the speed, angularSpeed, speedSide, resultantVelocity and then set the new position.
	move: function(sweep,dt){ 		
		// if we have sweeped or not
		var friction = MY; 
		if (sweep){
			friction = MY * 0.8; 
		}

		// update speedSide, angularSpeed, etc. 
		this.newSpeedSide(G,this.frictionCoeffC[0],this.frictionCoeffC[1],R_INNER); 
		this.newAngularSpeed(this.speedSide);	
		this.updateSpeeds(friction);				

		var velocity = this.calcVelocityResultant();
		this.setNewPos(velocity,dt);
		this.setNewAngle(dt);
	},

	getXPos: function(){
		return this.pos.e(1);

	},
	getYPos: function(){
		return this.pos.e(2);
	},
	getAngle: function(){
	// check which direction the stone is rotation. if scalare product negativ it is the other way against the side we checking from.
		var side = $V([-1,0]);
		var dots = side.dot(this.directionSide);

		if( dots<=0 )
			return -1*this.angle;

		return this.angle; 
	},

	// help-function to easily be able to print the position of the stone in the webconsole. 
	getPosAsString: function(){
		return this.pos.inspect();
	},

}
