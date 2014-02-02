function [ bool ] = checkSpeed( speed1,speed2 )
% Returns false (0) if both stones has stopped, true(1) if they have speed
    
if(speed1<=0 && speed2<=0)
    bool=0;
else
    bool=1;
end


end

