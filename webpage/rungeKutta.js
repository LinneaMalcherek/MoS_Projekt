function a(x_t,v_t) {
	var my = 0.0168;
	var g = 9.82;
	return -1*my*g;
}

function a_y(){
	var g = 9.82;
	var c =0.0001-0.00001;

	return (g * c) / Math.sqrt(v);
}

var x = 0 ;
var v = 2 ;
var h = 1;
var t = 0;
var y = 0;

function rk4_fram(x,v) {
	var k1_x = v;
	var k1_v = a(x,v);

	var k2_x = v + 0.5*h*k1_v;
	var k2_v = a(x+0.5*k1_x, v+0.5*h*k1_v);

	var k3_x = v + 0.5*h*k2_v;
	var k3_v = a(x+0.5*h*k2_x, v+0.5*h*k2_v);

	var k4_x = v + h * k3_v;
	var k4_v = a(x + h*k3_x, v+h*k3_v);

	x_n = x + (h/6) * (k1_x + 2*k2_x + 2*k3_x + k4_x);
	v_n = v + (h/6) * (k1_v + 2*k2_v + 2*k3_v + k4_v);

	return [x_n, v_n];
} 

function rk4_side(x,v) {
	var k1_x = v;
	var k1_v = a_y(x,v);

	var k2_x = v + 0.5*h*k1_v;
	var k2_v = a_y(x+0.5*k1_x, v+0.5*h*k1_v);

	var k3_x = v + 0.5*h*k2_v;
	var k3_v = a_y(x+0.5*h*k2_x, v+0.5*h*k2_v);

	var k4_x = v + h * k3_v;
	var k4_v = a_y(x + h*k3_x, v+h*k3_v);

	x_n = x + (h/6) * (k1_x + 2*k2_x + 2*k3_x + k4_x);
	v_n = v + (h/6) * (k1_v + 2*k2_v + 2*k3_v + k4_v);

	return [x_n, v_n];
} 

y = 0;
v_side = 0;

forward = [x, v];
side = [y, v_side];



//for (var i = 0; i < 10; i+=h ){
var i =0;
while( forward[1] > 0.01 ){	
	forward = rk4_fram(forward[0],forward[1]);
	console.log("posx: %s, vfram: %s", forward[0], forward[1]);
	v = forward[1];
	side = rk4_side(side[0], side[1]);
	console.log("posy: %s, vside: %s", side[0], side[1]);
	i+=h;



}
