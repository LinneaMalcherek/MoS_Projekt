
function Curlingsten()
{
	this.pos = new Array(0,0);
	this.speed = 0;
	this.speedSide = 0; 
	this.direction = new Array(0,1); <!-- direction forward-->
	this.angularSpeed = 0;

	this.in_game = false; <!-- med i spelet eller ej -->
}

<!-- Curlingstenens funktioner -->
Curlingsten.prototype = {
	init: function(angel,speed){
		<!-- gör massor av beräkningar från vinkeln, hastighet osv. sätter direction och ang_speed -->
		this.angular_speed = 0;
	},

	newSpeed: function(acceleration,dt){
		this.speed = this.speed + acceleration * dt;
	},

	calcAcceleration: function(gravity, my){
		return my * gravity; 
	}, 

	calcAngularAcceleration: function(gravity, c){
		return ( gravity * c ) / Math.sqrt(this.speed); 
	}, 

	newSpeedSide: function(gravity, c, dt){
		<!-- sjukt svåra modellen... -->
		this.speedSide = this.speedSide + this.calcAngularAcceleration(gravity, my, c) * dt; 

	},
	newAngularSpeed: function(){
		<!-- sjukt svåra modellen... -->
	},

	calcVelocityForward: function(){

	},

	calcDirectionSide: function(){

	},

	calcVelocityResultant: function(){
		return this.speed * this.direction + this.calcSpeedSide * calcDirectionSide;

		<!-- directionForward, directionSide needs to be calculated, -->
	},

	getPos: function(){
		return this.pos;
	},


	<!-- nedan bara test-funktioner nu i början-->

	move: function(y){
		this.pos[1] += y;
	},

	show: function(){
		console.log("y: %d " , this.pos[1]);
	}

}


