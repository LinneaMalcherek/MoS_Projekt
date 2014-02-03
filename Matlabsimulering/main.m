%% Curlingvisualisering MoS-projekt 2014
%  Grupp 3
%  Linnéa Nåbo, linna
%  Linnéa Mellblom, linme
%  Linnea Malcherek, linma
%  Michael Nilsson, micni487
%  Julia Nilsson, julni454
%  Copyright 2014

% Programmet klarar endast av att simulera två curling stenar, sten 1
% skjuter man iväg och sten 2 ligger i bot. 
% Alla variabler med en 1a innebär att de tillhör sten 1, och vice versa.

clear all; 

% Input / initial states
speed1 = 3;
speed2 = 0;

speed_side1=0;
speed_side2=0;

angle1 = -pi/150;
angle2 = 0;

stone_pos1 = [0; 0];
stone_pos2 = [-1; 25];

initiateDataConstants;

% Calculates the initial direction vector based on input angle. 
[direction_forw1, direction_side1 ] = calculateDirectionVectors(angle1);
[direction_forw2, direction_side2 ] = calculateDirectionVectors(angle2);

% Draw function, will end when speed for both stones are 0 or when either
% stone goes out of bounds.
while checkSpeed(speed1, speed2) && checkBoundaries(stone_pos1,stone_pos2, field_length, field_width)
    
    %updates the speed according to friction
    speed1 = calculateSpeed(speed1,a_friction,dt);
    speed2 = calculateSpeed(speed2,a_friction,dt);
    
    % uddates the "curl" speed and angular velocity
    [angular_speed1, speed_side1] = calculateSpeedSide(speed1, angular_speed1,speed_side1, J, m,g,c1,c2,r, dt);
    [angular_speed2, speed_side2] = calculateSpeedSide(speed2, angular_speed2,speed_side2 , J, m,g,c1,c2,r,dt);
    
    % Resultant velocity in both directions
    velocity1 = speed1*direction_forw1 + speed_side1*direction_side1;
    velocity2 = speed2*direction_forw2 + speed_side2*direction_side2;
    
    % Calculates the new position for both stones
    stone_pos1 = stone_pos1 + velocity1*dt;
    stone_pos2 = stone_pos2 + velocity2*dt;
    
    %Check if there is a collision. If true, update velocity accordingly.
    if(checkCollision(stone_pos1,stone_pos2,r))
        [speed1, direction_forw1, speed2, direction_forw2] = collision(stone_pos1,stone_pos2, velocity1);
    end
    
    %Render function, plots both curling stones.
    render;
end

%close all;

