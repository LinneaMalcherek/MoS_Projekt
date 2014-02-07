function [ direction, direction_ort ] = calculateDirectionVectors(angle,ortDir)
% Calculate normalized direction vector based on angle input


% Utslagsriktning ber�knas
rotationmatrix = [cos(angle) -sin(angle);
                  sin(angle) cos(angle)];
direction = rotationmatrix*[0;1];
direction = direction/(sqrt(direction(1,1)*direction(1,1)+direction(2,1)*direction(2,1)));

% Ortogonal riktning ber�knas
% Multipliceras med +1 eller -1 beroende p� vilket h�ll curlen ska g� �t. 
direction_ort = [cos(pi/2) -sin(pi/2);sin(pi/2) cos(pi/2)]*direction.*ortDir;


end