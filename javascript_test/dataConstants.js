function dataConstants()
{
	<!-- All of the Friction coefficiants shouldnt be constant if we want broom-action -->
	my = 0.0168;	

	<!-- Values for the stone (allways constant) -->
	m = 18;
	r = 1; 			<!-- just testin in openGL, accurate is 0.1454m -->
	rInner = 0.5;	<!-- radius to band, accurate value missing -->

	g = 9.82;	

	zPos = -10; <!-- zPos is the same for all the stones, thats why it is here -->

	lastTime=0; <!-- needed or not? for the animation maybe -->


	<!-- Values for the court -->
	fieldLength = 36.59;	<!-- From hack to tee -->
	fieldWidth = 20;		<!-- Needs to change to accurate value -->
	hack_hog = 6.40;		<!-- Distance from hack to hog -->
	tee = $V([0,34.76]); <!-- the position of the middle-->


}
