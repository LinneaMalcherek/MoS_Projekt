%% Curlingvisualisering MoS-projekt 2014
%  Grupp 3

%  Linnéa Nåbo, linna887
%  Linnéa Mellblom, linme882
%  Linnea Malcherek, linma793
%  Michael Nilsson, micni487
%  Julia Nilsson, julni454
%  Copyright 2014

% Programmet klarar endast av att simulera två curling stenar, sten 1
% skjuter man iväg och sten 2 ligger i bot. 
% Alla variabler med en 1a innebär att de tillhör sten 1, och vice versa.

clear all; 

% For outputs
VecTime = zeros(1,1);
VecSpeed = zeros(1,1);
VecAngSpeed = zeros(1,1); 
VecSpeedSide = zeros(1,1); 

% Input / initial states
speed1 = 2.3; % 1.44-1.58 rimligt enligt vissa artiklar
speed2 = 0;


speed_side1=0;
speed_side2=0;

angle1 = (3)*pi/180;
angle2 = 2.6;

stone_pos1 = [0; 0];
stone_pos2 = [-5; 25];
stone_angle1 = -pi/2;   %Måste ändras beroende på inhand/outhand
stone_angle2 = 0;

time=0;
t = 0; 

initiateDataConstants;

% Calculates the initial direction vector based on input angle. 
[direction_forw1, direction_side1 ] = calculateDirectionVectors(angle1,ortDir);
[direction_forw2, direction_side2 ] = calculateDirectionVectors(angle2,ortDir);

dt = 0;

% Draw function, will end when speed for both stones are 0 or when either
% stone goes out of bounds.
while checkSpeed(speed1, speed2) && checkBoundaries(stone_pos1,stone_pos2, field_length, field_width)
    

    %verkar göra så animeringen är mer "korrekt"
    %start_time = cputime;
    tic;

    %updates the speed according to friction
    speed1 = calculateSpeed(speed1,a_friction,dt);
    speed2 = calculateSpeed(speed2,a_friction,dt);

    % uddates the "curl" speed and angular velocity
    [angular_speed1, speed_side1] = calculateSpeedSide(speed1,angular_speed1,speed_side1,g,c1,c2,dt,r_inner);
    [angular_speed2, speed_side2] = calculateSpeedSide(speed2,angular_speed2,speed_side2,g,c1,c2,dt,r_inner);

    % Resultant velocity in both directions
    velocity1 = speed1*direction_forw1 + speed_side1*direction_side1;
    velocity2 = speed2*direction_forw2 + speed_side2*direction_side2;
    
    %Check if there is a collision. If true, update velocity accordingly.
    %time = time + dt;
    if(checkCollision(stone_pos1,stone_pos2,r,velocity1,velocity2, dt))
        [speed1, direction_forw1, speed2, direction_forw2] = inelastic_collision(stone_pos1,stone_pos2, velocity1, velocity2);
        time;
    end
    
    % Calculates the new position for both stones
    [stone_pos1, stone_angle1] = calculateNewPosition(stone_pos1,stone_angle1,velocity1,angular_speed1,dt);
    [stone_pos2, stone_angle2] = calculateNewPosition(stone_pos2,stone_angle2,velocity2,angular_speed1,dt);
    %stone_pos1
    t = t + dt; 
    VecSpeed(end+1)= speed1; 
    VecTime(end+1) = t;
    VecAngSpeed(end+1) = angular_speed1; 
    VecSpeedSide(end+1)  = speed_side1; 
    
    %Render function, plots both curling stones.
    render;
    dt = toc;
   % dt = cputime - start_time;

end

% figure; 
% plot(VecTime,VecAngSpeed,'-');
% legend('Vinkelhastighet');
% title('Vinkelhastighet');
% xlabel('tid (s)');
% ylabel('hastighet (rad/s)');
% 
% figure;
% plot(VecTime,VecSpeed,'-');
% title('Hastigheter');
% xlabel('tid (s)');
% ylabel('hastighet (m/s)');
% hold on;
% plot(VecTime,VecSpeedSide,'--');
% legend('Hastighet, rörelseriktning','Hastighet, sidled');