function [ bool ] = checkBoundaries( pos1, pos2, field_length, field_width )
% Returns false (0) if either stone is out of bounds. Returns true (1) if not

 if pos1(2,1) > field_length || pos2(2,1) > field_length || abs(pos1(1,1))>(field_width/2) || abs(pos2(1,1))>(field_width/2)
     bool = false;
 else
     bool = true;
 end    

end

