%Velocity vector for the rock that is incomming 
velocityIN_A=[2;5];

%Positionvector for incoming rock A
positionA=[0;0];

%Positionvector for stable rock B
positionB=[2;8];   

%Radius
radius=0.1454676;

%% Collision

%Distance to check if colision of rock A and B
distance=sqrt((power(positionB(1,1)-positionA(1,1),2)) + (power(positionB(2,1)-positionA(2,1),2)));

%Check if collision
if (distance==(radius+radius))
    % Direction after collision
    %Directionvector of B
    directionB=positionB-positionA;
    %Directionvector of A
    directionA=[-positionB(2,1) ; positionB(1,1)];
    
    % Projection 
    %Velocityvector for rock B after collision
    velocityB=((velocityIN_A(1,1)*directionB(1,1)+velocityIN_A(2,1)*directionB(2,1))/(directionB(1,1)*directionB(1,1)+directionB(2,1)*directionB(2,1)))*directionB;
    %Velocityvector for rock A after collision
    velocityA=velocityIN_A-velocityB;
end
