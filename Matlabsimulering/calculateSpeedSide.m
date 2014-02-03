function [ new_angular_speed, new_speed_side ] = calculateSpeedSide( speed, angular_speed, speed_side, J, m,g,c1,c2,r,dt )
% Calculatates the speed to the side based on rotational speed.
    
    alpha = 0.002;                   % Tokh�ftat!
    if( angular_speed > 0 && speed>0)
        new_angular_speed = angular_speed - J*alpha*dt;
    
    
    % Kraft och hastighet i sidled
    F_side = (m*g*(c1+c2))/sqrt(angular_speed*r);
    %H�r har jag �ndrat \/
    new_speed_side = speed_side + (F_side/m)*dt;
    else
        new_speed_side=0;
        new_angular_speed=0;
    end
    
end

