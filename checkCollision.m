function [ collision ] = checkCollision( positionA, positionB, radius )

    %Distance to check if colision of rock A and B
    distance=sqrt((power(positionB(1,1)-positionA(1,1),2)) + (power(positionB(2,1)-positionA(2,1),2)));

    %Check if collision
    if (distance<=(2*radius))
        collision=1; %True
    else
        collision=0; %False
    end

end

