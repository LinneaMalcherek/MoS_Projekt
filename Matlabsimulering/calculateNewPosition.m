function [ newStonePos, newStoneAngle ] = calculateNewPosition(prevStonePos,prevStoneAngle,velocity,angleSpeed,dt)
%Calculates both coordinates and direction in radians of one stone
        newStonePos = prevStonePos + velocity*dt;
        newStoneAngle = prevStoneAngle + angleSpeed*dt;
        if (newStoneAngle >= 2*pi)
            newStoneAngle = 0; 
        end
end