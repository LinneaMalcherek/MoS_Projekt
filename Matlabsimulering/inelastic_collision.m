function [ velocity1_after, velocity2_after ] = inelastic_collision( stone_pos1, stone_pos2, velocity1, velocity2 )

%Söta stötkoeficienten 
e=0.8;

collision_normal=stone_pos2-stone_pos1;

velocity1_normal=((velocity1'*collision_normal)/(collision_normal'*collision_normal))*collision_normal;
velocity1_tangent=velocity1-velocity1_normal;

velocity2_normal=((velocity2'*collision_normal)/(collision_normal'*collision_normal))*collision_normal;
velocity2_tangent=velocity2-velocity2_normal;

velocity1_after_normal=(velocity1_normal+velocity2_normal-e*(velocity1_normal-velocity2_normal))/2;
velocity2_after_normal=(velocity1_normal+velocity2_normal+e*(velocity1_normal-velocity2_normal))/2;

velocity1_after=velocity1_after_normal+velocity1_tangent;
velocity2_after=velocity2_after_normal+velocity2_tangent;

end

