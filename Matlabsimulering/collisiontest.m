function [ speed1, direction_forw1, speed2, direction_forw2 ] = collision( stone_pos1,stone_pos2, velocity )
% Calculate the new directions and speed after a collision between two
% stones, stone 1 is the approaching stone.
% velocity = velocity of stone 1 before collision
        
        e=0.9;
        
        direction_forw2=stone_pos2-stone_pos1;
        
        velocity2=((velocity'*direction_forw2)/(direction_forw2'*direction_forw2))*direction_forw2;
        velocity1=velocity-velocity2;
        
        speed2=(velocity-e*(velocity))/2;
        
        speed1=speed2-e*velocity;
        
        speed1= sqrt( power(speed(1,1),2) + power(speed1(2,1),2));
        speed1a= sqrt( power(velocity1(1,1),2) + power(velocity1(2,1),2));
        direction_forw1 = velocity1 / speed1a;
        
        speed2= sqrt( power(speed2(1,1),2) + power(speed2(2,1),2));
        speed2a= sqrt( power(velocity2(1,1),2) + power(velocity2(2,1),2));
        direction_forw2 = direction_forw2 / speed2a;

end

