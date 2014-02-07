
function main()
{

	dataConstants();

	sten = new Array();

	<!-- hur många curlingstenar vi vill ha-->
	for (var i=0; i<2; i++)
	{
		sten.push(new Curlingsten);
	} 

	sten[0].init(-1*Math.PI / 40, 3); <!-- sätter fart på en sten -->


	<!-- anroppa initierng! tex vilken hastighet osv-->

	<!-- är sten i spel? har den ngn hasighet. räkna ut nya på de som uppfyller -->

	<!-- har den kolliderat med ngn sten? kolla alla stenar om kolliderat-->

	<!-- rita ut nya positioner osv! rendera nytt -->

	dt = 0.1;
	for(var i =0; i<4; i+=dt) {
		sten[0].move(dt);
		console.log('Position: %s',sten[0].getPosAsString());
	}

}