function [ new_pos, new_w, new_v ] = nextPosition(pos, w, v )

new_v= v - (F_friktion/m)*dt;
new_w = w - J*alpha*dt; 
new_pos=pos + v*dt;


end

