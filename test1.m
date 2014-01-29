% Skickar in en kraft, massa, tid, friktionskoefficient, radie
F = 12; 
m = 18;
Tmax = 100;
t = 1:Tmax;
f = 0.0168;
F_friktion = f*m*9.82;
r = 0.1454676;
% Beräknar utslagshastighet
v0 = 3.5; %integral(F) / m; 
% Beräknar tid mellan hack och hogg
s = 6.40; % Avstånd hack och hogg
t0 = s/v0;
omega = -pi / (2*t0);
% Beräknar vinkelhastighet

%%
% Beräknar momentanhastigheten framåt
v_forw = (v0 - (F_friktion * t / m));
v_front = omega*r; %Testar nu för outhand
v_back = omega*r*0.1; %Testar nu för outhand
v_front = r*omega^3 / 3*m; %Beräknat utifrån centrifugalkraften
v_back = v_front*0.3; 

%%
% Resultant
forw = zeros(2,Tmax);
forw(2,:) = v_forw;
sidew = zeros(2,Tmax);
sidew(1,:) = (v_back-v_front);
v = forw + sidew;

%% Beräkna position
% Skapar en positionsvektor och placerar koordinater för x och y
p0 = [0;0];
pos = zeros(2,Tmax);
for i = 1:1:Tmax
    pos(:,i) = p0+v(:,i);
    p0 = pos(:,i); 
    if v(2,i)<0.001
        break;
    end
    if pos(2,i) > 36.59
        break;
    end
end

%%
i=1;
while i<80
    plot(pos(1,i),pos(2,i),'o')
    axis([-10 10 0 50])
    drawnow;
    pause(0.05);
    hold on;
    i = i+1;
end

% %
% while 
% plot(pos(1,:),pos(2,:),'*')
% drawnow;
% axis equal


