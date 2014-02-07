function h = drawCircle(x,y,r)
%drawCircle draws a circle with radius r in coordinates (x,y)

hold on
th = 0:pi/50:2*pi;
xunit = r * cos(th) + x;
yunit = r * sin(th) + y;
h = plot(xunit, yunit);
hold off

end

