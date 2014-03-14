function [ a ] = a_angSpeed(vfront)
% Returnerar accelerationen för rörelsen i sidled
    g = 9.82;
    %cf = 0.00001;
    %cb = 0.001;
    cf = 0.000001;
    cb = 0.0001;
    r_inner = 0.05;
    
    a = -g*(cb+cf)/(sqrt(vfront)*r_inner);

end