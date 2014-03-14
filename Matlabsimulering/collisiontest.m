function [ speed1, direction_forw1, speed2, direction_forw2 ] = collisiontest( stone_pos1,stone_pos2, velocity)
% Calculate the new directions and speed after a collision between two
% stones, stone 1 is the approaching stone.
% velocity = velocity of stone 1 before collision
   
        collision_direction=stone_pos2-stone_pos1;
        
        %Projecering %velocity hastighetsvektorer (hastighet i tv� riktningar)
        velocity2=((velocity'*collision_direction)/(collision_direction'*collision_direction))*collision_direction;
        velocity1=velocity-velocity2;
        
        %Speed - skal�r, EN hastighet i EN riktning
        speed=sqrt( power(velocity(1,1),2) + power(velocity(2,1),2)); %Inkommande stenens speed
        
        speed2=(speed-k*speed); 
        speed1=speed2-k*speed;

        %speed1= sqrt( power(velocity1(1,1),2) + power(velocity1(2,1),2));
        %detta hade vi innan vid elastisk
        direction_forw1 = velocity1 / speed1;
       
        %speed2= sqrt( power(velocity2(1,1),2) + power(velocity2(2,1),2));
        %detta hade vi innan vi elastisk
        %direction_forw2 = direction_forw2 / speed2; Hur kunde vi ha detta innan?
        direction_forw2 = velocity2 / speed2;

end

