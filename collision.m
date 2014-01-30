function [ velocityA, velocityB ] = collision( velocityIN_A, positionA, positionB, radius )

    %Distance to check if colision of rock A and B
    distance=sqrt((power(positionB(1,1)-positionA(1,1),2)) + (power(positionB(2,1)-positionA(2,1),2)));

    %Check if collision
    if (distance<=(radius+radius))
        disp('kollision!');
        %Directionvector of B
        directionB=positionB-positionA;
        %Directionvector of A
        %directionA=[-positionB(2,1) ; positionB(1,1)]; BEHÖVER EJ??

        % Projection 
        %Velocityvector for rock B after collision
        velocityB=((velocityIN_A(1,1)*directionB(1,1)+velocityIN_A(2,1)*directionB(2,1))/(directionB(1,1)*directionB(1,1)+directionB(2,1)*directionB(2,1)))*directionB;
        %Velocityvector for rock A after collision
        velocityA=velocityIN_A-velocityB;
    else
        disp('ingen kollision!');
        velocityA=0;
        velocityB=0;    
    end
end