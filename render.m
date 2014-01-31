function render(v_forw,position,turn) 
% Funktion som renderar varje sten tills den stannar
% och kalla rekursivt om krock (inte alls klar)
% M�ste lagra alla positioner f�r stenar att kolla mot (PositionZ)
if turn==1
positionZ=[-1;25];          % Position f�r sten i bot, posZ inlagd f�r test
plot(positionZ(1,1),positionZ(2,1),'ro')
hold on;
end

%% *********** Fasta data ************
g = 9.82;
% Sten
m = 18;
r =1;% 0.1454676;
% Isen
my = 0.0168; 
F_friktion = my*m*g;
% Banan
length = 36.59;                 % Fr�n hack till banans slut
% Tid och startposition och startvinkelhastighet(abs)
dt = 0.01;
%t = 1:dt:40;
%  ********** Fasta data  slut ***********

for t = 1:dt:20

% Ber�knar momentanhastigheten fram�t i vektor
v_forw = v_forw - ((F_friktion/m) * dt);
% Kontrollera att hastigheten inte �r negativ
if v_forw < 0 ;
    return;
end

position = position + v_forw*dt; %ny

% Om stenen g�r utanf�r p� l�ngden
if position(2,1) > length 
    return;
end    
    
%Unders�k om kollision
[vA,vB]=collision(v_forw, positionZ, position, r);
if vA==0 %Om ingen krock
        clf;
        % Rita
        plot(position(1,1),position(2,1),'bo','Markersize',r*20,'Markerfacecolor','blue');
        hold on 
        plot(positionZ(1,1),positionZ(2,1),'ro','Markersize',r*20,'Markerfacecolor','red');
        hold off;
        axis([-20 20 0 40])
        drawnow;
        pause(dt);
        
else  %Om krock KRACHAR!
    render(vA,position,2);
    %render(vB,positionZ);
end 
end
end