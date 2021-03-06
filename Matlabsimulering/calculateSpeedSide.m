function [ new_angular_speed, new_speed_side ] = calculateSpeedSide(speed,angular_speed, speed_side,g,c1,c2,dt,r_inner)
% Calculatates the speed to the side based on rotational speed.
% Returns new angular speed

    if( angular_speed > 0 && speed > 0)
        
    % Translate the angular speed to translation speed in the 
    % points on the inner circle of the stone with radius r_inner
    % (the ring which touches the ice) 
    %v_inner = r_inner*angular_speed;
    
    % Acceleration is calculated for two points, front and back 
    % of the inner circle. 
    % The friction is different on the two points. 
    %a_front = (c1/sqrt(speed))*g;
    %a_back = (c2/sqrt(speed))*g;
    
    
    
    % New side speed 
    % Acceleration is the difference between acceleration front and back
    new_speed_side = rungekutta(speed_side,speed,dt,@a_speedSide);% speed_side + (a_back-a_front)*dt;
    
    % New angular speed
    %new_angular_speed = new_speed_side/r_inner;
    %new_angular_speed = angular_speed - (a_front+a_back)*dt/r_inner;
    new_angular_speed = rungekutta(angular_speed,speed,dt,@a_angSpeed);
    
    % If the stone is still 
    else
        new_speed_side=0;
        new_angular_speed=0;
    end
    
end

