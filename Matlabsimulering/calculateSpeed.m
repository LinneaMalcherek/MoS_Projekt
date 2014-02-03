function [ new_speed ] = calculateSpeed( speed ,a_friction ,dt )
% Returns the new speed after friction. if stone has no speed, it will
% remain the same

    if(speed>0)
        new_speed= speed - (a_friction * dt);
    else
        new_speed=0;
    end

end

