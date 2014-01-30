%Velocity vector
vA=[2 5];

%Mass of both rocks
m=18;

%Position for incoming rock
pA=[0 0];

%Position for stable rock
pB=[2,8];

%Radius
r=0.1454676;

%% Collision

%Position to check colision
pZ=sqrt((power(pB(1,1)-pA(1,1),2)) + (power(pB(1,2)-pA(1,2),2)));

%Check for collision
if (pZ==(r+r))
    disp('En kollision har skett!');
else
    disp('Ingen kollision!');
end
%% Direction after collision

%Direction of B
dB=(pB(1,2)-pA(1,2))/(pB(1,1)-pA(1,1));

%Direction of A
dA=-1/dB;

%Angle of B
aB=atan(dB)

%Angle of A
aA=atan(dA)

%% Velocity vector for A and B

%A
AAfter=(cos(aA)*vA(1,2)-vA(1,1)*sin(aB))/(cos(aA)*(sin(aA)-sin(aB)));

%B
BAfter=vA(1,1)/cos(aB)-(cos(aA)*vA(1,2)-vA(1,1)*sin(aB))/(cos(aB)*(sin(aA)-sin(aB)));

%Divide into velocity vectors
vAAfter = [AAfter*cos(aA) AAfter*sin(aA)]

vBAfter = [BAfter*cos(aB) BAfter*sin(aB)]

%här är vi nu
