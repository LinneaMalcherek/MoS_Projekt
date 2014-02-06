%% Curlingvisualisering MoS-projekt 2014
%  Grupp 3
%  
%% Input
v0 = 7;
angle = -pi/150;

% Utslagsriktning beräknas
rotationmatrix = [cos(angle) -sin(angle);
                  sin(angle) cos(angle)];
direction = rotationmatrix*[0;1];
direction = direction/(sqrt(direction(1,1)*direction(1,1)+direction(2,1)*direction(2,1)));
% Ortogonal riktning beräknas
direction_ort = [cos(pi/2) -sin(pi/2);sin(pi/2) cos(pi/2)]*direction;

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
% Banan
length = 36.59;                 % Från hack till banans slut
width = 20;                     % Banans bredd
hackhog = 6.40;                 % Från hack till hog
tee = [0;34.76];                % Koordinater för mitten av bot
% Tid och startposition och startvinkelhastighet(abs)
dt = 0.01;
t = 1:dt:40;
position = [0;0];
alpha = 0.02;                   % Tokhöftat!
% Beräknar tid mellan hack och hogg
t0 = hackhog/v0;

% Eftersom vi aldrig använder vinkelhastighetens riktning och det blir
% fel i beräkningen av omega längre fram kan startvinkelhastigheten lika
% gärna vara positiv (absbelopp) från början
omega0 = pi / (2*t0); 
v0_p = omega0*r_inner;

% Ange friktionsriktningar beroende på sikte
if  (-pi/2)<=angle<=0 % Curlar åt vänster (sikte höger)
    c1 = 0.00001;
    c2 = -0.001;
elseif 0<angle<=(pi/2) % Curlar åt höger (sikte vänster)
    c1 = -0.00001;
    c2 = 0.001;
end

%% Fast sten i bot som ritas ut 
positionZ=[-1;25];          % Position för sten i bot
plot(positionZ(1,1),positionZ(2,1),'ro')
hold on;


v_forw = v0;
v_p = v0_p;
omega = omega0;

%% Beräkna och rita position för varje tid t, Euler
for t = 1:dt:40
    clf;
    % Beräknar momentanhastigheten framåt i vektor
    v_forw = v_forw - ((F_friktion/m) * dt);
    % Beräknar momentanvinkelhastigheten i vektor
    omega = omega - J*alpha*dt; 
    % Kontrollera att hastigheten inte är negativ
    if v_forw < 0 || omega < 0
        break;
    end
    
    % Kraft och hastighet i sidled
    F_side = (m*g*(c1+c2))/sqrt(abs(omega)*r);
    v_side =  (F_side/m)*t;
    
    % Resultant
    v = v_forw*direction + v_side*direction_ort;
    position = position + v*dt;
    
    % Om stenen går utanför på längden
    if position(2,1) > length 
        break;
    end    
    
    %Undersök om kollision
    [vA,vB]=collision(v, positionZ, position, r); 
    if(vA==0) % Om ingen collision
        clf;
        % Rita
        %drawCircle(position(1,1),position(2,1),r);
        plot(position(1,1),position(2,1),'bo','Markersize',r*20,'Markerfacecolor','blue');
        hold on 
        plot(positionZ(1,1),positionZ(2,1),'ro','Markersize',r*20,'Markerfacecolor','red');
        positionA=position;
        positionB=positionZ;
        hold off;
        axis([-20 20 0 40])
        drawnow;
        pause(dt);
    else
        break;
    end 
    
end

if (vA~=0)% Om kollision 
    for t=1:dt:40
       clf;
       
       %ngt med hastigheten, liknande för att de stenar som skjuts ut ska
       %stanna, funkar ej riktigt. 
       %vA = vA - ((F_friktion/m) * dt);
       %vB = vB - ((F_friktion/m) * dt);
       
       positionA = positionA + vA*dt;
       positionB = positionB + vB*dt;
            
       if positionA(2,1) > length  % Om stenen går utanför på längden
            break;
       end      
       if positionB(2,1) > length  % Om stenen går utanför på längden
            break;
       end
       
       % Rita
            plot(positionA(1,1),positionA(2,1),'bo','Markersize',r*20,'Markerfacecolor','blue');
            hold on;
            plot(positionB(1,1),positionB(2,1),'ro','Markersize',r*20,'Markerfacecolor','red');
            hold off;

            axis([-20 20 0 40])
            drawnow;
            pause(dt);
     
  
    end
end

%Skriv ut position och hur långt ifrån tee stenen hamnat
position;
distance = sqrt((tee(1,1)-position(1,1))^2+(tee(2,1)-position(2,1))^2)
