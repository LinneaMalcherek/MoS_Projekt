function [ direction, direction_ort ] = calculateDirectionVectors( angle )
% Calculate normalized direction vector based on angle input


% Utslagsriktning beräknas
rotationmatrix = [cos(angle) -sin(angle);
                  sin(angle) cos(angle)];
direction = rotationmatrix*[0;1];
direction = direction/(sqrt(direction(1,1)*direction(1,1)+direction(2,1)*direction(2,1)));

% Ortogonal riktning beräknas
direction_ort = [cos(pi/2) -sin(pi/2);sin(pi/2) cos(pi/2)]*direction;


end

