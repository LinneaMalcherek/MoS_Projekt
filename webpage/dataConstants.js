// everything had big letters just to seperate that this is global and accesable. 
function dataConstants() { 
	// friction constants
	MY = 0.0168;
	MY_ROT = 0.0068; <!-- CHECK -->
	
	// the curling stone 
	M = 18; // mass
	R = 0.1454676; // radius
	R_INNER = 0.06;

	G = 9.82; // gravity

	ZPOS = 0; // zpos is the same for all curling stones.

	LASTTIME=0; // to be able to animate and take the right dt. 

	// constanst for the field
	FIELDLENGTH = 36.59;
	FIELDWIDTH = 5;
	HACK_HOG = 6.40;
	TEE = $V([0,34.76]); <!-- the position of the middle-->
	NEST_RADIUS = 1.829;

	// how many stones a player should be able to throw
	NUMBEROFSTONES = 2;

	// these variables has to do with the camera-view. 
	pitch = 0;
	yaw=0;
	xCam=-0.2;
	yCam=0.4;
	zCam=3;
	speed=0;
	yawRate =0;
	pitchRate=0;
}
