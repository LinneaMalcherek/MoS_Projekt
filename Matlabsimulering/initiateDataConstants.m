%% Fasta data
g = 9.82;

% Sten
m = 18;
r = 0.6; %0.1454676 �r korrekt, men inte s� bra att testa med. 
r_inner = 0.1; %inte taget fr�n verkliga data

% Isen
my = 0.01; %0.0168;
F_friktion = my*m*g;
a_friction= F_friktion/m;

% Friktionscoefficienter f�r curlen, tecken beror p� startvinkel 
% och ber�knas l�ngre ner. (f�r nu �r det enklare att testa olika v�rden)
c1 = 0.00001;
c2 = 0.001;

% Banan
field_length = 36.59;                 % Fr�n hack till banans slut
field_width = 20;                     % Banans bredd
hackhog = 6.40;                       % Fr�n hack till hog
tee = [0;34.76];                      % Koordinater f�r mitten av bot
                                      % Origo �r i hack

% Tid och startposition och startvinkelhastighet(abs)
%dt = 0.1; Beror p� tiden i while-loopen i main ist�llet
position = [0;0];

% Ber�knar tid mellan hack och hogg
t0 = hackhog/speed1;

% Initierar angular speed, beror p� utslagshastigheten. 
angular_speed1 = pi / (2*t0); 
angular_speed2 = 0;

% Initierar hastighet i sidled i punkter l�ngs bandet mot isen. 
% Beror p� angular speed. 
speed_side1 = r_inner*angular_speed1;
speed_side2 = r_inner*angular_speed2;

% Ange friktionsriktningar beroende p� sikte
% Har �ndrat lite och lagt till en koefficient f�r positiv eller 
% negativ curl som anv�nds i calculateDirectionVectors. D�rmed tagit 
% bort att c1 och c2 f�r�ndras, eftersom det blir knas med tecknen. 
% Vi har kommit �verens om att endast ortogonala riktningsvektorn byter
% Inte helt s�ker p� om detta fungerar som det ska nu. 
if  (-pi/2)<=angle1<=0 % Curlar �t v�nster (sikte h�ger)
    ortDir = -1;
elseif 0<angle1<=(pi/2) % Curlar �t h�ger (sikte v�nster)
    ortDir = 1; % Anger om ortogonala riktningen (curl-riktn) ska vara pos/neg. 
end

