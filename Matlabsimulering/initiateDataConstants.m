%% Fasta data
g = 9.82;

% Sten
m = 18;
r = 0.6; %0.1454676 är korrekt, men inte så bra att testa med. 
r_inner = 0.1; %inte taget från verkliga data

% Isen
my = 0.01; %0.0168;
F_friktion = my*m*g;
a_friction= F_friktion/m;

% Friktionscoefficienter för curlen, tecken beror på startvinkel 
% och beräknas längre ner. (för nu är det enklare att testa olika värden)
c1 = 0.00001;
c2 = 0.001;

% Banan
field_length = 36.59;                 % Från hack till banans slut
field_width = 20;                     % Banans bredd
hackhog = 6.40;                       % Från hack till hog
tee = [0;34.76];                      % Koordinater för mitten av bot
                                      % Origo är i hack

% Tid och startposition och startvinkelhastighet(abs)
%dt = 0.1; Beror på tiden i while-loopen i main istället
position = [0;0];

% Beräknar tid mellan hack och hogg
t0 = hackhog/speed1;

% Initierar angular speed, beror på utslagshastigheten. 
angular_speed1 = pi / (2*t0); 
angular_speed2 = 0;

% Initierar hastighet i sidled i punkter längs bandet mot isen. 
% Beror på angular speed. 
speed_side1 = r_inner*angular_speed1;
speed_side2 = r_inner*angular_speed2;

% Ange friktionsriktningar beroende på sikte
% Har ändrat lite och lagt till en koefficient för positiv eller 
% negativ curl som används i calculateDirectionVectors. Därmed tagit 
% bort att c1 och c2 förändras, eftersom det blir knas med tecknen. 
% Vi har kommit överens om att endast ortogonala riktningsvektorn byter
% Inte helt säker på om detta fungerar som det ska nu. 
if  (-pi/2)<=angle1<=0 % Curlar åt vänster (sikte höger)
    ortDir = -1;
elseif 0<angle1<=(pi/2) % Curlar åt höger (sikte vänster)
    ortDir = 1; % Anger om ortogonala riktningen (curl-riktn) ska vara pos/neg. 
end

