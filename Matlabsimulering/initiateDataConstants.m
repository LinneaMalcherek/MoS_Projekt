%% Fasta data
g = 9.82;

% Sten
m = 18;
r = 1;%0.1454676;
r_inner = 0.1;
J = m*r*r/2;

% Isen
my = 0.0168;
my_rot = 0.0068; % Kolla denna... 
F_friktion = my*m*g;
F_friktion_rotation=my_rot*m*g;
a_friction= F_friktion/m;

% Banan
field_length = 36.59;                 % Fr�n hack till banans slut
field_width = 20;                     % Banans bredd
hackhog = 6.40;                 % Fr�n hack till hog
tee = [0;34.76];                % Koordinater f�r mitten av bot

% Tid och startposition och startvinkelhastighet(abs)
dt = 0.01;
t = 1:dt:40;
position = [0;0];
alpha = 0.02;                   % Tokh�ftat!

% Ber�knar tid mellan hack och hogg
t0 = hackhog/speed1;

angular_speed1 = pi / (2*t0); 

angular_speed2=0;

% Ange friktionsriktningar beroende p� sikte
if  (-pi/2)<=angle<=0 % Curlar �t v�nster (sikte h�ger)
    c1 = 0.00001;
    c2 = -0.001;
elseif 0<angle<=(pi/2) % Curlar �t h�ger (sikte v�nster)
    c1 = -0.00001;
    c2 = 0.001;
end