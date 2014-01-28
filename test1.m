% Skickar in en kraft, massa, tid, friktionskoefficient, radie
F = 12; 
m = 18;
t = 1:100;
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
forw = zeros(2,100);
forw(2,:) = v_forw;
sidew = zeros(2,100);
sidew(1,:) = (v_back-v_front);
v = forw + sidew;

%% Beräkna position
p0 = [0;0];
pos = zeros(2,100);
for i = 1:1:100
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
plot(pos(1,:),pos(2,:),'*')
axis equal


