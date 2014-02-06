        
clf;
plot(stone_pos1(1,1),stone_pos1(2,1),'bo','Markersize',r*20,'Markerfacecolor','blue');
hold on 
plot(stone_pos2(1,1),stone_pos2(2,1),'ro','Markersize',r*20,'Markerfacecolor','red');
hold off;
axis([-20 20 0 40])
drawnow;
%pause(dt);