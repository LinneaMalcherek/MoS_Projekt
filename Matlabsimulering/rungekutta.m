function [ v_n1 ] = rungekutta(v_n,v,h,a)
%UNTITLED Summary of this function goes here
%   Detailed explanation goes here                                       
k_1 = a(v);
k_2 = a(v+0.5*h*k_1);
k_3 = a(v+0.5*h*k_2);
k_4 = a(v+h*k_3);

if 0 < (v_n - (1/6)*(k_1+2*k_2+2*k_3+k_4)*h)
    v_n1 = v_n + (1/6)*(k_1+2*k_2+2*k_3+k_4)*h;  % main equation
else
    v_n1 = 0;
end

end

