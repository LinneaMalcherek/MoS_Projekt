function [ a ] = a_speedSide(vfront)
% Returnerar accelerationen för rörelsen i sidled
    g = 9.82;
    cf = 0.00001;
    cb = 0.0001;
    a = g*(cb-cf)/sqrt(vfront);

end