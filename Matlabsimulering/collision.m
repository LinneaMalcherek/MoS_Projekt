function [ speed1, direction_forw1, speed2, direction_forw2 ] = collision( stone_pos1,stone_pos2, velocity )
% Calculate the new directions and speed after a collision between two
% stones, stone 1 is the approaching stone.
% velocity = velocity of stone 1 before collision

  
        direction_forw2=stone_pos2-stone_pos1;
        velocity2=((velocity'*direction_forw2)/(direction_forw2'*direction_forw2))*direction_forw2;
        velocity1=velocity-velocity2;
        
        speed1= sqrt( power(velocity1(1,1),2) + power(velocity1(2,1),2));
        direction_forw1 = velocity1 / speed1;
        
        speed2= sqrt( power(velocity2(1,1),2) + power(velocity2(2,1),2));
        direction_forw2 = direction_forw2 / speed2;

end

