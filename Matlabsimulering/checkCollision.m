function [ collision] = checkCollision( positionA, positionB, radius, velocity1, velocity2 ,dt)

    %We have to check collision BEFORE we move the stones to the  new
    %position.
    predictedStonePos1 = positionA + velocity1*dt;
    predictedStonePos2 = positionB + velocity2*dt;
    %Distance to check if colision of rock A and B
    distance=sqrt((power(predictedStonePos2(1,1)-predictedStonePos1(1,1),2)) + (power(predictedStonePos2(2,1)-predictedStonePos1(2,1),2)));

    %Check if collision 
    if (distance<=(2*radius))
        collision=true; %True
    else
        collision=false; %False
    end

end

