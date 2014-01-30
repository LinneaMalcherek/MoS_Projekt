%% Curlingvisualisering MoS-projekt 2014
%  Grupp 3
%  
%% Input
v0 = 1.223;
%angle = -pi/28;
angle = 0;

% Utslagsriktning ber�knas
rotationmatrix = [cos(angle) -sin(angle);
                  sin(angle) cos(angle)];
direction = rotationmatrix*[0;1];
direction = direction/(sqrt(direction(1,1)*direction(1,1)+direction(2,1)*direction(2,1)));
% Ortogonal riktning ber�knas
direction_ort = [cos(pi/2) -sin(pi/2);sin(pi/2) cos(pi/2)]*direction;

%% Fasta data
g = 9.82;
% Sten
m = 18;
r = 0.1;
r_inner = 0.1;
% Isen
my = 0.0168;
my_rot = 0.0068; % Kolla denna... 
F_friktion = my*m*g;
F_friktion_rotation=my_rot*m*g;
% Banan
length = 36.59;                 % Fr�n hack till banans slut
width = 20;                     % Banans bredd
hackhog = 6.40;                 % Fr�n hack till hog
tee = [0;34.76];                % Koordinater f�r mitten av bot
% Tid och startposition och startvinkelhastighet(abs)
t = 1:0.1:40;
position = [0;0];

% Ber�knar tid mellan hack och hogg
t0 = hackhog/v0;

% Eftersom vi aldrig anv�nder vinkelhastighetens riktning och det blir
% fel i ber�kningen av omega l�ngre fram kan startvinkelhastigheten lika
% g�rna vara positiv (absbelopp) fr�n b�rjan
omega0 = pi / (2*t0); 
v0_p = omega0*r_inner;

% Ange friktionsriktningar beroende p� sikte
if  (-pi/2)<=angle<=0 % Curlar �t v�nster (sikte h�ger)
    %omega0 = -pi / (2*t0); %(flyttat upp) 
    c1 = 0.00001;
    c2 = -0.001;
elseif 0<angle<=(pi/2) % Curlar �t h�ger (sikte v�nster)
    %omega0 = pi / (2*t0);
    c1 = -0.00001;
    c2 = 0.001;
end

%% fast utritad sten
positionZ=[-2;25];
plot(positionZ(1,1),positionZ(2,1),'ro')
hold on;
%% Ber�kna och rita position f�r varje tid t
for t = 1:0.1:40
    % Ber�knar momentanhastigheten fram�t i vektor
    v_forw = v0 - (F_friktion * t / m);
    % Ber�knar momentanvinkelhastigheten i vektor
    %omega = omega0 - (F_friktion_rotation*t / m) %Friktionen �r f�r h�g nu. 
    v_p = v0_p - F_friktion_rotation*t/m;
    omega = v_p/r_inner;
    % Kontrollera att hastigheten inte �r negativ
    if v_forw < 0% || omega < 0 %(G�r inte nu med omega, �r neg pga friktionen �r f�r stor) 
        break;
    end
    
    % Kraft och hastighet i sidled
    F_side = (m*g*(c1+c2))/sqrt(abs(omega)*r);
    v_side =  F_side*t/m;
    
    % Resultant
    v = v_forw*direction + v_side*direction_ort;
    position = position + v;%rotationmatrix*v;
    
    [vA,vB]=collision(v, positionZ, position, r);
    if(vA==0)
        % Rita
        plot(position(1,1),position(2,1),'o')
        positionA=position;
        positionB=positionZ;
        
        axis([-20 20 0 40])
        drawnow;
        pause(0.05);
        hold on;
        if position(2,1) > length % Om stenen g�r utanf�r p� l�ngden
            break;
        end
    else
        break;
    end
    
end

if (vA~=0)
    disp('heeeeeej');
    for t=1:0.1:40
            positionA = positionA + vA;%rotationmatrix*v;
            positionB = positionB + vB;
             % Rita
            plot(positionA(1,1),positionA(2,1),'o')
            drawnow;
            pause(0.05);
            hold on;
            
            plot(positionB(1,1),positionB(2,1),'ro')

            axis([-20 20 0 40])
            drawnow;
            pause(0.05);
            hold on;
            if positionA(2,1) > length || positionB(2,1)  % Om stenen g�r utanf�r p� l�ngden
                break;
            end      
    end
end


%Skriv ut position och hur l�ngt ifr�n tee stenen hamnat
position
distance = sqrt((tee(1,1)-position(1,1))^2+(tee(2,1)-position(2,1))^2)

% %%
% % Ber�knar momentanhastigheten fram�t i vektor
% v_forw = v0 - (F_friktion * t / m);
% % Ber�knar momentanvinkelhastigheten i vektor
% omega = omega0 - (F_friktion_rotation*t / m); 
% % Kraft och hastighet i sidled
% F_side = (m*g*(c1+c2))/sqrt(abs(omega)*r);
% v_side =  F_side*t/m;

%%
% % Resultant
% forw = zeros(2,size(t,2));
% forw(2,:) = v_forw;
% sidew = zeros(2,size(t,2));
% sidew(1,:) = v_side;
% v = forw + sidew;

% %% Ber�kna position
% % Skapar en positionsvektor och placerar koordinater f�r x och y
% % p0 = [0;0];
% position = [0 0];
% % pos = zeros(2,size(t,2));
% for i = 1:1:size(t,2)
%     %pos(:,i) = (p0+v(:,i));
%     position=position + v(:,i)'*rotationmatrix;
%    % pos(:,i) = pos(:,i)'*rotationmatrix
%     %position = position*rotationmatrix;
%     %p0 = pos(:,i); 
%     
%     %%---------
%     plot(position(1,1),position(1,2),'o')
%     axis([-10 10 0 50])
%     drawnow;
%     pause(0.05);
%     hold on;
%     %%--------
%     if v(2,i)<0.001 % Om stenen stannar
%         v(2,i)
%         break;
%     end
%     if position(1,2) > length % Om stenen g�r utanf�r p� l�ngden
%         position(1,2) 
%         break;
%     end
% %     if abs(position(1,1)) < (width/2) % Om stenen g�r utanf�r �t sidorna
% %         break;
% %     end
% end

%%
% i=1;
% while i<80
%     plot(pos(1,i),pos(2,i),'o')
%     axis([-10 10 0 50])
%     drawnow;
%     pause(0.05);
%     hold on;
%     i = i+1;
%     if pos(1,i) == 0 && pos(2,i) == 0
%         break;
%     end
% end

% %
% while 
% plot(pos(1,:),pos(2,:),'*')
% drawnow;
% axis equal
