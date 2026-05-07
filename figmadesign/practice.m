clc;
clear all;
close all;



VAL1 = 7;                         
Transmitted_Message = 'imranhasan';     


good_EbNo_dB = VAL1 + 20;
snr = 10^(good_EbNo_dB/10);

% MESSAGE TO BINARY ASCII


b_data = asc2bn(Transmitted_Message);

disp('binary ASCII information at transmitter:');
disp(b_data);



x = b_data;

disp('Serial binary information at Transmitter (x):');
disp(x);

% unipolar NRZ signal, 1 kbps


bp = 1/1000;        
br = 1/bp;          
f = br*10;          

tx_bit_signal = [];

for n = 1:length(x)
    if x(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    tx_bit_signal = [tx_bit_signal se];
end

t1 = bp/100:bp/100:100*length(x)*(bp/100);


% BASK modulation and demodulation
% 1 bit per symbol

t2 = bp/99:bp/99:bp;
ss = length(t2);

m_bask = [];

for i = 1:length(x)

    if x(i) == 1
        AA = 5;
    else
        AA = 0;
    end

    y = AA*cos(2*pi*f*t2);
    m_bask = [m_bask y];
end

t_bask_mod = bp/99:bp/99:bp*length(x);

signal_power = mean(abs(m_bask).^2);
noise_power = signal_power/snr;
noise = sqrt(noise_power)*randn(size(m_bask));

Rec_bask = m_bask + noise;

mn_bask = [];
amp_bask = [];

for n = ss:ss:length(Rec_bask)

    t = bp/99:bp/99:bp;
    carrier = cos(2*pi*f*t);

    segment = Rec_bask((n-(ss-1)):n);
    z = trapz(t,segment.*carrier);

    detected_amp = 2*z/bp;
    amp_bask = [amp_bask detected_amp];

    if detected_amp >= 2.5
        a = 1;
    else
        a = 0;
    end

    mn_bask = [mn_bask a];
end

mn_bask = mn_bask(1:length(x));
Received_Message_BASK = bin2asc(mn_bask);

disp('BASK Received Message:');
disp(Received_Message_BASK);

bit_bask = [];

for n = 1:length(mn_bask)
    if mn_bask(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    bit_bask = [bit_bask se];
end


% 4-ASK modulation and demodulation
% 2 bits per symbol
% 00 = -3, 01 = -1, 10 = 1, 11 = 3


k = 2;

if mod(length(x),k) ~= 0
    x4 = [x zeros(1,k-mod(length(x),k))];
else
    x4 = x;
end

Ts = k*bp;
t2 = Ts/99:Ts/99:Ts;
ss = length(t2);

m_4ask = [];

for i = 1:2:length(x4)

    if x4(i)==0 && x4(i+1)==0
        AA = -3;
    elseif x4(i)==0 && x4(i+1)==1
        AA = -1;
    elseif x4(i)==1 && x4(i+1)==0
        AA = 1;
    elseif x4(i)==1 && x4(i+1)==1
        AA = 3;
    end

    y = AA*cos(2*pi*f*t2);
    m_4ask = [m_4ask y];
end

t_4ask_mod = Ts/99:Ts/99:(length(x4)/2)*Ts;

signal_power = mean(abs(m_4ask).^2);
noise_power = signal_power/snr;
noise = sqrt(noise_power)*randn(size(m_4ask));

Rec_4ask = m_4ask + noise;

mn_4ask = [];
amp_4ask = [];

for n = ss:ss:length(Rec_4ask)

    t = Ts/99:Ts/99:Ts;
    carrier = cos(2*pi*f*t);

    segment = Rec_4ask((n-(ss-1)):n);
    z = trapz(t,segment.*carrier);

    detected_amp = 2*z/Ts;
    amp_4ask = [amp_4ask detected_amp];

    if detected_amp < -2
        bits = [0 0];
    elseif detected_amp >= -2 && detected_amp < 0
        bits = [0 1];
    elseif detected_amp >= 0 && detected_amp < 2
        bits = [1 0];
    else
        bits = [1 1];
    end

    mn_4ask = [mn_4ask bits];
end

mn_4ask = mn_4ask(1:length(x));
Received_Message_4ASK = bin2asc(mn_4ask);

disp('4-ASK Received Message:');
disp(Received_Message_4ASK);

bit_4ask = [];

for n = 1:length(mn_4ask)
    if mn_4ask(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    bit_4ask = [bit_4ask se];
end


% 16-ASK modulation and demodulation
% 4 bits per symbol


k = 4;

if mod(length(x),k) ~= 0
    x16 = [x zeros(1,k-mod(length(x),k))];
else
    x16 = x;
end

Ts = k*bp;
t2 = Ts/99:Ts/99:Ts;
ss = length(t2);

m_16ask = [];

for i = 1:4:length(x16)

    b1 = x16(i);
    b2 = x16(i+1);
    b3 = x16(i+2);
    b4 = x16(i+3);

    if b1==0 && b2==0 && b3==0 && b4==0
        AA = -15;
    elseif b1==0 && b2==0 && b3==0 && b4==1
        AA = -13;
    elseif b1==0 && b2==0 && b3==1 && b4==0
        AA = -11;
    elseif b1==0 && b2==0 && b3==1 && b4==1
        AA = -9;
    elseif b1==0 && b2==1 && b3==0 && b4==0
        AA = -7;
    elseif b1==0 && b2==1 && b3==0 && b4==1
        AA = -5;
    elseif b1==0 && b2==1 && b3==1 && b4==0
        AA = -3;
    elseif b1==0 && b2==1 && b3==1 && b4==1
        AA = -1;
    elseif b1==1 && b2==0 && b3==0 && b4==0
        AA = 1;
    elseif b1==1 && b2==0 && b3==0 && b4==1
        AA = 3;
    elseif b1==1 && b2==0 && b3==1 && b4==0
        AA = 5;
    elseif b1==1 && b2==0 && b3==1 && b4==1
        AA = 7;
    elseif b1==1 && b2==1 && b3==0 && b4==0
        AA = 9;
    elseif b1==1 && b2==1 && b3==0 && b4==1
        AA = 11;
    elseif b1==1 && b2==1 && b3==1 && b4==0
        AA = 13;
    elseif b1==1 && b2==1 && b3==1 && b4==1
        AA = 15;
    end

    y = AA*cos(2*pi*f*t2);
    m_16ask = [m_16ask y];
end

t_16ask_mod = Ts/99:Ts/99:(length(x16)/4)*Ts;

signal_power = mean(abs(m_16ask).^2);
noise_power = signal_power/snr;
noise = sqrt(noise_power)*randn(size(m_16ask));

Rec_16ask = m_16ask + noise;

mn_16ask = [];
amp_16ask = [];

for n = ss:ss:length(Rec_16ask)

    t = Ts/99:Ts/99:Ts;
    carrier = cos(2*pi*f*t);

    segment = Rec_16ask((n-(ss-1)):n);
    z = trapz(t,segment.*carrier);

    detected_amp = 2*z/Ts;
    amp_16ask = [amp_16ask detected_amp];

    if detected_amp < -14
        bits = [0 0 0 0];
    elseif detected_amp >= -14 && detected_amp < -12
        bits = [0 0 0 1];
    elseif detected_amp >= -12 && detected_amp < -10
        bits = [0 0 1 0];
    elseif detected_amp >= -10 && detected_amp < -8
        bits = [0 0 1 1];
    elseif detected_amp >= -8 && detected_amp < -6
        bits = [0 1 0 0];
    elseif detected_amp >= -6 && detected_amp < -4
        bits = [0 1 0 1];
    elseif detected_amp >= -4 && detected_amp < -2
        bits = [0 1 1 0];
    elseif detected_amp >= -2 && detected_amp < 0
        bits = [0 1 1 1];
    elseif detected_amp >= 0 && detected_amp < 2
        bits = [1 0 0 0];
    elseif detected_amp >= 2 && detected_amp < 4
        bits = [1 0 0 1];
    elseif detected_amp >= 4 && detected_amp < 6
        bits = [1 0 1 0];
    elseif detected_amp >= 6 && detected_amp < 8
        bits = [1 0 1 1];
    elseif detected_amp >= 8 && detected_amp < 10
        bits = [1 1 0 0];
    elseif detected_amp >= 10 && detected_amp < 12
        bits = [1 1 0 1];
    elseif detected_amp >= 12 && detected_amp < 14
        bits = [1 1 1 0];
    else
        bits = [1 1 1 1];
    end

    mn_16ask = [mn_16ask bits];
end

mn_16ask = mn_16ask(1:length(x));
Received_Message_16ASK = bin2asc(mn_16ask);

disp('16-ASK Received Message:');
disp(Received_Message_16ASK);

bit_16ask = [];

for n = 1:length(mn_16ask)
    if mn_16ask(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    bit_16ask = [bit_16ask se];
end

% QPSK modulation and demodulation
% 2 bits per symbol


k = 2;

if mod(length(x),k) ~= 0
    xq = [x zeros(1,k-mod(length(x),k))];
else
    xq = x;
end

Ts = k*bp;
t2 = Ts/99:Ts/99:Ts;
ss = length(t2);

m_qpsk = [];

for i = 1:2:length(xq)

    if xq(i)==0 && xq(i+1)==0
        PH = 0;
    elseif xq(i)==0 && xq(i+1)==1
        PH = pi/2;
    elseif xq(i)==1 && xq(i+1)==0
        PH = pi;
    elseif xq(i)==1 && xq(i+1)==1
        PH = 3*pi/2;
    end

    y = cos(2*pi*f*t2 + PH);
    m_qpsk = [m_qpsk y];
end

t_qpsk_mod = Ts/99:Ts/99:(length(xq)/2)*Ts;

signal_power = mean(abs(m_qpsk).^2);
noise_power = signal_power/snr;
noise = sqrt(noise_power)*randn(size(m_qpsk));

Rec_qpsk = m_qpsk + noise;

mn_qpsk = [];
IQ_qpsk = [];

for n = ss:ss:length(Rec_qpsk)

    t = Ts/99:Ts/99:Ts;
    carrier_cos = cos(2*pi*f*t);
    carrier_sin = sin(2*pi*f*t);

    segment = Rec_qpsk((n-(ss-1)):n);

    I = 2*trapz(t,segment.*carrier_cos)/Ts;
    Q = -2*trapz(t,segment.*carrier_sin)/Ts;

    IQ_qpsk = [IQ_qpsk I + 1j*Q];

    angle_value = atan2(Q,I);

    if angle_value < 0
        angle_value = angle_value + 2*pi;
    end

    if angle_value >= 7*pi/4 || angle_value < pi/4
        bits = [0 0];
    elseif angle_value >= pi/4 && angle_value < 3*pi/4
        bits = [0 1];
    elseif angle_value >= 3*pi/4 && angle_value < 5*pi/4
        bits = [1 0];
    else
        bits = [1 1];
    end

    mn_qpsk = [mn_qpsk bits];
end

mn_qpsk = mn_qpsk(1:length(x));
Received_Message_QPSK = bin2asc(mn_qpsk);

disp('QPSK Received Message:');
disp(Received_Message_QPSK);

bit_qpsk = [];

for n = 1:length(mn_qpsk)
    if mn_qpsk(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    bit_qpsk = [bit_qpsk se];
end

% 8-PSK modulation AND demodulation
% 3 bits per symbol


k = 3;

if mod(length(x),k) ~= 0
    x8 = [x zeros(1,k-mod(length(x),k))];
else
    x8 = x;
end

Ts = k*bp;
t2 = Ts/99:Ts/99:Ts;
ss = length(t2);

m_8psk = [];

for i = 1:3:length(x8)

    b1 = x8(i);
    b2 = x8(i+1);
    b3 = x8(i+2);

    if b1==0 && b2==0 && b3==0
        PH = 0;
    elseif b1==0 && b2==0 && b3==1
        PH = pi/4;
    elseif b1==0 && b2==1 && b3==0
        PH = pi/2;
    elseif b1==0 && b2==1 && b3==1
        PH = 3*pi/4;
    elseif b1==1 && b2==0 && b3==0
        PH = pi;
    elseif b1==1 && b2==0 && b3==1
        PH = 5*pi/4;
    elseif b1==1 && b2==1 && b3==0
        PH = 3*pi/2;
    elseif b1==1 && b2==1 && b3==1
        PH = 7*pi/4;
    end

    y = cos(2*pi*f*t2 + PH);
    m_8psk = [m_8psk y];
end

t_8psk_mod = Ts/99:Ts/99:(length(x8)/3)*Ts;

signal_power = mean(abs(m_8psk).^2);
noise_power = signal_power/snr;
noise = sqrt(noise_power)*randn(size(m_8psk));

Rec_8psk = m_8psk + noise;

mn_8psk = [];
IQ_8psk = [];

for n = ss:ss:length(Rec_8psk)

    t = Ts/99:Ts/99:Ts;
    carrier_cos = cos(2*pi*f*t);
    carrier_sin = sin(2*pi*f*t);

    segment = Rec_8psk((n-(ss-1)):n);

    I = 2*trapz(t,segment.*carrier_cos)/Ts;
    Q = -2*trapz(t,segment.*carrier_sin)/Ts;

    IQ_8psk = [IQ_8psk I + 1j*Q];

    angle_value = atan2(Q,I);

    if angle_value < 0
        angle_value = angle_value + 2*pi;
    end

    if angle_value >= 15*pi/8 || angle_value < pi/8
        bits = [0 0 0];
    elseif angle_value >= pi/8 && angle_value < 3*pi/8
        bits = [0 0 1];
    elseif angle_value >= 3*pi/8 && angle_value < 5*pi/8
        bits = [0 1 0];
    elseif angle_value >= 5*pi/8 && angle_value < 7*pi/8
        bits = [0 1 1];
    elseif angle_value >= 7*pi/8 && angle_value < 9*pi/8
        bits = [1 0 0];
    elseif angle_value >= 9*pi/8 && angle_value < 11*pi/8
        bits = [1 0 1];
    elseif angle_value >= 11*pi/8 && angle_value < 13*pi/8
        bits = [1 1 0];
    else
        bits = [1 1 1];
    end

    mn_8psk = [mn_8psk bits];
end

mn_8psk = mn_8psk(1:length(x));
Received_Message_8PSK = bin2asc(mn_8psk);

disp('8-PSK Received Message:');
disp(Received_Message_8PSK);

bit_8psk = [];

for n = 1:length(mn_8psk)
    if mn_8psk(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    bit_8psk = [bit_8psk se];
end


% 16-QAM MODULATION AND DEMODULATION
% 4 bits per symbol

k = 4;

if mod(length(x),k) ~= 0
    xqam = [x zeros(1,k-mod(length(x),k))];
else
    xqam = x;
end

Ts = k*bp;
t2 = Ts/99:Ts/99:Ts;
ss = length(t2);

m_16qam = [];

for i = 1:4:length(xqam)

    b1 = xqam(i);
    b2 = xqam(i+1);
    b3 = xqam(i+2);
    b4 = xqam(i+3);

    if b1==0 && b2==0
        I_level = -3;
    elseif b1==0 && b2==1
        I_level = -1;
    elseif b1==1 && b2==0
        I_level = 1;
    elseif b1==1 && b2==1
        I_level = 3;
    end

    if b3==0 && b4==0
        Q_level = -3;
    elseif b3==0 && b4==1
        Q_level = -1;
    elseif b3==1 && b4==0
        Q_level = 1;
    elseif b3==1 && b4==1
        Q_level = 3;
    end

    y = I_level*cos(2*pi*f*t2) - Q_level*sin(2*pi*f*t2);
    m_16qam = [m_16qam y];
end

t_16qam_mod = Ts/99:Ts/99:(length(xqam)/4)*Ts;

signal_power = mean(abs(m_16qam).^2);
noise_power = signal_power/snr;
noise = sqrt(noise_power)*randn(size(m_16qam));

Rec_16qam = m_16qam + noise;

mn_16qam = [];
IQ_16qam = [];

for n = ss:ss:length(Rec_16qam)

    t = Ts/99:Ts/99:Ts;
    carrier_cos = cos(2*pi*f*t);
    carrier_sin = sin(2*pi*f*t);

    segment = Rec_16qam((n-(ss-1)):n);

    I_detect = 2*trapz(t,segment.*carrier_cos)/Ts;
    Q_detect = -2*trapz(t,segment.*carrier_sin)/Ts;

    IQ_16qam = [IQ_16qam I_detect + 1j*Q_detect];

    if I_detect < -2
        bits_I = [0 0];
    elseif I_detect >= -2 && I_detect < 0
        bits_I = [0 1];
    elseif I_detect >= 0 && I_detect < 2
        bits_I = [1 0];
    else
        bits_I = [1 1];
    end

    if Q_detect < -2
        bits_Q = [0 0];
    elseif Q_detect >= -2 && Q_detect < 0
        bits_Q = [0 1];
    elseif Q_detect >= 0 && Q_detect < 2
        bits_Q = [1 0];
    else
        bits_Q = [1 1];
    end

    bits = [bits_I bits_Q];
    mn_16qam = [mn_16qam bits];
end

mn_16qam = mn_16qam(1:length(x));
Received_Message_16QAM = bin2asc(mn_16qam);

disp('16-QAM Received Message:');
disp(Received_Message_16QAM);

bit_16qam = [];

for n = 1:length(mn_16qam)
    if mn_16qam(n) == 1
        se = 5*ones(1,100);
    else
        se = zeros(1,100);
    end
    bit_16qam = [bit_16qam se];
end


% FIGURE 1: TRANSMITTED NRZ + TIME-DOMAIN MODULATED SIGNALS


figure(1);
clf;

subplot(7,1,1);
plot(t1,tx_bit_signal,'LineWidth',2.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
xlabel('time(sec)');
ylabel('Amplitude');
title('Transmitted Unipolar NRZ Signal');

subplot(7,1,2);
plot(t_bask_mod,m_bask);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('BASK Modulated Signal');

subplot(7,1,3);
plot(t_4ask_mod,m_4ask);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('4-ASK Modulated Signal');

subplot(7,1,4);
plot(t_16ask_mod,m_16ask);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('16-ASK Modulated Signal');

subplot(7,1,5);
plot(t_qpsk_mod,m_qpsk);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('QPSK Modulated Signal');

subplot(7,1,6);
plot(t_8psk_mod,m_8psk);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('8-PSK Modulated Signal');

subplot(7,1,7);
plot(t_16qam_mod,m_16qam);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('16-QAM Modulated Signal');


% FIGURE 2: TRANSMITTED NRZ + RECEIVED NOISY SIGNALS


figure(2);
clf;

subplot(7,1,1);
plot(t1,tx_bit_signal,'LineWidth',2.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
xlabel('time(sec)');
ylabel('Amplitude');
title('Transmitted Unipolar NRZ Signal');

subplot(7,1,2);
plot(t_bask_mod,Rec_bask);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('BASK Received Signal with AWGN');

subplot(7,1,3);
plot(t_4ask_mod,Rec_4ask);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('4-ASK Received Signal with AWGN');

subplot(7,1,4);
plot(t_16ask_mod,Rec_16ask);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('16-ASK Received Signal with AWGN');

subplot(7,1,5);
plot(t_qpsk_mod,Rec_qpsk);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('QPSK Received Signal with AWGN');

subplot(7,1,6);
plot(t_8psk_mod,Rec_8psk);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('8-PSK Received Signal with AWGN');

subplot(7,1,7);
plot(t_16qam_mod,Rec_16qam);
grid on;
xlabel('time(sec)');
ylabel('Amplitude');
title('16-QAM Received Signal with AWGN');


% FIGURE 3: RECEIVED CONSTELLATION DIAGRAMS


figure(3);
clf;

subplot(3,2,1);
plot(amp_bask,zeros(size(amp_bask)),'.');
grid on;
xlabel('In-phase');
ylabel('Quadrature');
title('BASK Received Constellation');

subplot(3,2,2);
plot(amp_4ask,zeros(size(amp_4ask)),'.');
grid on;
xlabel('In-phase');
ylabel('Quadrature');
title('4-ASK Received Constellation');

subplot(3,2,3);
plot(amp_16ask,zeros(size(amp_16ask)),'.');
grid on;
xlabel('In-phase');
ylabel('Quadrature');
title('16-ASK Received Constellation');

subplot(3,2,4);
plot(real(IQ_qpsk),imag(IQ_qpsk),'.');
grid on;
xlabel('In-phase');
ylabel('Quadrature');
title('QPSK Received Constellation');

subplot(3,2,5);
plot(real(IQ_8psk),imag(IQ_8psk),'.');
grid on;
xlabel('In-phase');
ylabel('Quadrature');
title('8-PSK Received Constellation');

subplot(3,2,6);
plot(real(IQ_16qam),imag(IQ_16qam),'.');
grid on;
xlabel('In-phase');
ylabel('Quadrature');
title('16-QAM Received Constellation');


% FIGURE 4: DEMODULATED NRZ SIGNALS


t_rx = bp/100:bp/100:100*length(x)*(bp/100);

figure(4);
clf;

subplot(6,1,1);
plot(t_rx,bit_bask,'LineWidth',1.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
title('BASK Demodulated NRZ');

subplot(6,1,2);
plot(t_rx,bit_4ask,'LineWidth',1.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
title('4-ASK Demodulated NRZ');

subplot(6,1,3);
plot(t_rx,bit_16ask,'LineWidth',1.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
title('16-ASK Demodulated NRZ');

subplot(6,1,4);
plot(t_rx,bit_qpsk,'LineWidth',1.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
title('QPSK Demodulated NRZ');

subplot(6,1,5);
plot(t_rx,bit_8psk,'LineWidth',1.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
title('8-PSK Demodulated NRZ');

subplot(6,1,6);
plot(t_rx,bit_16qam,'LineWidth',1.5);
grid on;
axis([0 bp*length(x) -0.5 6]);
title('16-QAM Demodulated NRZ');


% Q9: FIND Eb/N0 THRESHOLD WHERE MESSAGE CANNOT BE RECONSTRUCTED
% Original code above is unchanged.
% No start bit and no stop bit are added.


disp(' ');
disp('================ Q9: Eb/N0 THRESHOLD TEST ================');

rng(1);

modNames = {'BASK','4ASK','16ASK','QPSK','8PSK','16QAM'};
threshold_fail_EbNo = nan(1,length(modNames));
worstConst = cell(1,length(modNames));

EbNo_search_range = 30:-1:-5;

for s = 1:length(modNames)

    currentMod = modNames{s};

    for EbNo_test = EbNo_search_range

        [rx_bits_temp, rx_msg_temp, ber_temp, const_temp] = simulate_oel_modulation_manual( ...
            x, Transmitted_Message, currentMod, EbNo_test, bp, f);

        if ~strcmp(Transmitted_Message, rx_msg_temp)
            threshold_fail_EbNo(s) = EbNo_test;
            worstConst{s} = const_temp;

            fprintf('%s: Message first failed at Eb/N0 = %d dB, BER = %.5f\n', ...
                currentMod, EbNo_test, ber_temp);

            break;
        end
    end

    if isnan(threshold_fail_EbNo(s))
        fprintf('%s: Message did not fail from 30 dB down to -5 dB\n', currentMod);
    end
end


% Q9: WORST-CASE RECEIVED CONSTELLATION DIAGRAMS


figure(5);
clf;

for s = 1:length(modNames)

    subplot(3,2,s);

    c = worstConst{s};

    if isempty(c)
        plot(0,0,'x');
        title([modNames{s} ' Worst Case Not Found']);
    else
        if strcmp(modNames{s}, 'BASK') || strcmp(modNames{s}, '4ASK') || strcmp(modNames{s}, '16ASK')
            plot(real(c),zeros(size(c)),'.');
        else
            plot(real(c),imag(c),'.');
            axis equal;
        end

        title([modNames{s} ' Worst Case, Eb/N0 = ' num2str(threshold_fail_EbNo(s)) ' dB']);
    end

    grid on;
    xlabel('In-phase');
    ylabel('Quadrature');
end


% Q10: BER PROBABILITY PLOT FOR Eb/N0 = 10 TO 30 dB




rng(2);

EbNo_range = 10:1:30;
ber_test_bits = repmat(x, 1, 500);

BER = zeros(length(modNames), length(EbNo_range));

for s = 1:length(modNames)

    currentMod = modNames{s};

    for e = 1:length(EbNo_range)

        EbNo_test = EbNo_range(e);

        [rx_bits_temp, rx_msg_temp, ber_temp, const_temp] = simulate_oel_modulation_manual( ...
            ber_test_bits, '', currentMod, EbNo_test, bp, f);

        BER(s,e) = ber_temp;
    end
end

figure(6);
clf;
hold on;

BER_plot = BER;
BER_plot(BER_plot == 0) = 1/length(ber_test_bits);

for s = 1:length(modNames)
    semilogy(EbNo_range, BER_plot(s,:), '-o', 'LineWidth', 1.5);
end

grid on;
xlabel('Eb/N0 (dB)');
ylabel('Bit Error Probability / BER');
title('BER Probability vs Eb/N0 for Different Modulation Schemes');
legend(modNames, 'Location', 'southwest');
hold off;

disp('BER table: rows = modulation schemes, columns = Eb/N0 from 10 to 30 dB');
disp(array2table(BER, ...
    'VariableNames', compose('EbNo_%ddB', EbNo_range), ...
    'RowNames', modNames));



% LOCAL FUNCTIONS 


function [rx_bits, rx_message, ber, const_points] = simulate_oel_modulation_manual(bits, tx_message, scheme, EbNo_dB, bp, f)

    bits = bits(:).';
    original_length = length(bits);
    snr_local = 10^(EbNo_dB/10);

    if strcmp(scheme,'BASK')
        k = 1;
    elseif strcmp(scheme,'4ASK')
        k = 2;
    elseif strcmp(scheme,'16ASK')
        k = 4;
    elseif strcmp(scheme,'QPSK')
        k = 2;
    elseif strcmp(scheme,'8PSK')
        k = 3;
    elseif strcmp(scheme,'16QAM')
        k = 4;
    else
        error('Unknown modulation scheme');
    end

    if mod(length(bits),k) ~= 0
        xpad = [bits zeros(1,k-mod(length(bits),k))];
    else
        xpad = bits;
    end

    Ts = k*bp;
    t2 = Ts/99:Ts/99:Ts;
    ss = length(t2);

    tx_signal = [];

    if strcmp(scheme,'BASK')

        for i = 1:length(xpad)
            if xpad(i) == 1
                AA = 5;
            else
                AA = 0;
            end

            y = AA*cos(2*pi*f*t2);
            tx_signal = [tx_signal y];
        end

    elseif strcmp(scheme,'4ASK')

        for i = 1:2:length(xpad)
            if xpad(i)==0 && xpad(i+1)==0
                AA = -3;
            elseif xpad(i)==0 && xpad(i+1)==1
                AA = -1;
            elseif xpad(i)==1 && xpad(i+1)==0
                AA = 1;
            elseif xpad(i)==1 && xpad(i+1)==1
                AA = 3;
            end

            y = AA*cos(2*pi*f*t2);
            tx_signal = [tx_signal y];
        end

    elseif strcmp(scheme,'16ASK')

        for i = 1:4:length(xpad)

            b1 = xpad(i);
            b2 = xpad(i+1);
            b3 = xpad(i+2);
            b4 = xpad(i+3);

            if b1==0 && b2==0 && b3==0 && b4==0
                AA = -15;
            elseif b1==0 && b2==0 && b3==0 && b4==1
                AA = -13;
            elseif b1==0 && b2==0 && b3==1 && b4==0
                AA = -11;
            elseif b1==0 && b2==0 && b3==1 && b4==1
                AA = -9;
            elseif b1==0 && b2==1 && b3==0 && b4==0
                AA = -7;
            elseif b1==0 && b2==1 && b3==0 && b4==1
                AA = -5;
            elseif b1==0 && b2==1 && b3==1 && b4==0
                AA = -3;
            elseif b1==0 && b2==1 && b3==1 && b4==1
                AA = -1;
            elseif b1==1 && b2==0 && b3==0 && b4==0
                AA = 1;
            elseif b1==1 && b2==0 && b3==0 && b4==1
                AA = 3;
            elseif b1==1 && b2==0 && b3==1 && b4==0
                AA = 5;
            elseif b1==1 && b2==0 && b3==1 && b4==1
                AA = 7;
            elseif b1==1 && b2==1 && b3==0 && b4==0
                AA = 9;
            elseif b1==1 && b2==1 && b3==0 && b4==1
                AA = 11;
            elseif b1==1 && b2==1 && b3==1 && b4==0
                AA = 13;
            elseif b1==1 && b2==1 && b3==1 && b4==1
                AA = 15;
            end

            y = AA*cos(2*pi*f*t2);
            tx_signal = [tx_signal y];
        end

    elseif strcmp(scheme,'QPSK')

        for i = 1:2:length(xpad)

            if xpad(i)==0 && xpad(i+1)==0
                PH = 0;
            elseif xpad(i)==0 && xpad(i+1)==1
                PH = pi/2;
            elseif xpad(i)==1 && xpad(i+1)==0
                PH = pi;
            elseif xpad(i)==1 && xpad(i+1)==1
                PH = 3*pi/2;
            end

            y = cos(2*pi*f*t2 + PH);
            tx_signal = [tx_signal y];
        end

    elseif strcmp(scheme,'8PSK')

        for i = 1:3:length(xpad)

            b1 = xpad(i);
            b2 = xpad(i+1);
            b3 = xpad(i+2);

            if b1==0 && b2==0 && b3==0
                PH = 0;
            elseif b1==0 && b2==0 && b3==1
                PH = pi/4;
            elseif b1==0 && b2==1 && b3==0
                PH = pi/2;
            elseif b1==0 && b2==1 && b3==1
                PH = 3*pi/4;
            elseif b1==1 && b2==0 && b3==0
                PH = pi;
            elseif b1==1 && b2==0 && b3==1
                PH = 5*pi/4;
            elseif b1==1 && b2==1 && b3==0
                PH = 3*pi/2;
            elseif b1==1 && b2==1 && b3==1
                PH = 7*pi/4;
            end

            y = cos(2*pi*f*t2 + PH);
            tx_signal = [tx_signal y];
        end

    elseif strcmp(scheme,'16QAM')

        for i = 1:4:length(xpad)

            b1 = xpad(i);
            b2 = xpad(i+1);
            b3 = xpad(i+2);
            b4 = xpad(i+3);

            if b1==0 && b2==0
                I_level = -3;
            elseif b1==0 && b2==1
                I_level = -1;
            elseif b1==1 && b2==0
                I_level = 1;
            elseif b1==1 && b2==1
                I_level = 3;
            end

            if b3==0 && b4==0
                Q_level = -3;
            elseif b3==0 && b4==1
                Q_level = -1;
            elseif b3==1 && b4==0
                Q_level = 1;
            elseif b3==1 && b4==1
                Q_level = 3;
            end

            y = I_level*cos(2*pi*f*t2) - Q_level*sin(2*pi*f*t2);
            tx_signal = [tx_signal y];
        end
    end

    signal_power = mean(abs(tx_signal).^2);
    noise_power = signal_power/snr_local;
    noise = sqrt(noise_power)*randn(size(tx_signal));
    Rec = tx_signal + noise;

    rx_bits = [];
    const_points = [];

    for n = ss:ss:length(Rec)

        t = Ts/99:Ts/99:Ts;
        segment = Rec((n-(ss-1)):n);

        if strcmp(scheme,'BASK')

            carrier = cos(2*pi*f*t);
            z = trapz(t,segment.*carrier);
            detected_amp = 2*z/Ts;

            const_points = [const_points detected_amp];

            if detected_amp >= 2.5
                a = 1;
            else
                a = 0;
            end

            rx_bits = [rx_bits a];

        elseif strcmp(scheme,'4ASK')

            carrier = cos(2*pi*f*t);
            z = trapz(t,segment.*carrier);
            detected_amp = 2*z/Ts;

            const_points = [const_points detected_amp];

            if detected_amp < -2
                temp_bits = [0 0];
            elseif detected_amp >= -2 && detected_amp < 0
                temp_bits = [0 1];
            elseif detected_amp >= 0 && detected_amp < 2
                temp_bits = [1 0];
            else
                temp_bits = [1 1];
            end

            rx_bits = [rx_bits temp_bits];

        elseif strcmp(scheme,'16ASK')

            carrier = cos(2*pi*f*t);
            z = trapz(t,segment.*carrier);
            detected_amp = 2*z/Ts;

            const_points = [const_points detected_amp];

            if detected_amp < -14
                temp_bits = [0 0 0 0];
            elseif detected_amp >= -14 && detected_amp < -12
                temp_bits = [0 0 0 1];
            elseif detected_amp >= -12 && detected_amp < -10
                temp_bits = [0 0 1 0];
            elseif detected_amp >= -10 && detected_amp < -8
                temp_bits = [0 0 1 1];
            elseif detected_amp >= -8 && detected_amp < -6
                temp_bits = [0 1 0 0];
            elseif detected_amp >= -6 && detected_amp < -4
                temp_bits = [0 1 0 1];
            elseif detected_amp >= -4 && detected_amp < -2
                temp_bits = [0 1 1 0];
            elseif detected_amp >= -2 && detected_amp < 0
                temp_bits = [0 1 1 1];
            elseif detected_amp >= 0 && detected_amp < 2
                temp_bits = [1 0 0 0];
            elseif detected_amp >= 2 && detected_amp < 4
                temp_bits = [1 0 0 1];
            elseif detected_amp >= 4 && detected_amp < 6
                temp_bits = [1 0 1 0];
            elseif detected_amp >= 6 && detected_amp < 8
                temp_bits = [1 0 1 1];
            elseif detected_amp >= 8 && detected_amp < 10
                temp_bits = [1 1 0 0];
            elseif detected_amp >= 10 && detected_amp < 12
                temp_bits = [1 1 0 1];
            elseif detected_amp >= 12 && detected_amp < 14
                temp_bits = [1 1 1 0];
            else
                temp_bits = [1 1 1 1];
            end

            rx_bits = [rx_bits temp_bits];

        elseif strcmp(scheme,'QPSK') || strcmp(scheme,'8PSK') || strcmp(scheme,'16QAM')

            carrier_cos = cos(2*pi*f*t);
            carrier_sin = sin(2*pi*f*t);

            I = 2*trapz(t,segment.*carrier_cos)/Ts;
            Q = -2*trapz(t,segment.*carrier_sin)/Ts;

            const_points = [const_points I + 1j*Q];

            if strcmp(scheme,'QPSK')

                angle_value = atan2(Q,I);

                if angle_value < 0
                    angle_value = angle_value + 2*pi;
                end

                if angle_value >= 7*pi/4 || angle_value < pi/4
                    temp_bits = [0 0];
                elseif angle_value >= pi/4 && angle_value < 3*pi/4
                    temp_bits = [0 1];
                elseif angle_value >= 3*pi/4 && angle_value < 5*pi/4
                    temp_bits = [1 0];
                else
                    temp_bits = [1 1];
                end

                rx_bits = [rx_bits temp_bits];

            elseif strcmp(scheme,'8PSK')

                angle_value = atan2(Q,I);

                if angle_value < 0
                    angle_value = angle_value + 2*pi;
                end

                if angle_value >= 15*pi/8 || angle_value < pi/8
                    temp_bits = [0 0 0];
                elseif angle_value >= pi/8 && angle_value < 3*pi/8
                    temp_bits = [0 0 1];
                elseif angle_value >= 3*pi/8 && angle_value < 5*pi/8
                    temp_bits = [0 1 0];
                elseif angle_value >= 5*pi/8 && angle_value < 7*pi/8
                    temp_bits = [0 1 1];
                elseif angle_value >= 7*pi/8 && angle_value < 9*pi/8
                    temp_bits = [1 0 0];
                elseif angle_value >= 9*pi/8 && angle_value < 11*pi/8
                    temp_bits = [1 0 1];
                elseif angle_value >= 11*pi/8 && angle_value < 13*pi/8
                    temp_bits = [1 1 0];
                else
                    temp_bits = [1 1 1];
                end

                rx_bits = [rx_bits temp_bits];

            elseif strcmp(scheme,'16QAM')

                I_detect = I;
                Q_detect = Q;

                if I_detect < -2
                    bits_I = [0 0];
                elseif I_detect >= -2 && I_detect < 0
                    bits_I = [0 1];
                elseif I_detect >= 0 && I_detect < 2
                    bits_I = [1 0];
                else
                    bits_I = [1 1];
                end

                if Q_detect < -2
                    bits_Q = [0 0];
                elseif Q_detect >= -2 && Q_detect < 0
                    bits_Q = [0 1];
                elseif Q_detect >= 0 && Q_detect < 2
                    bits_Q = [1 0];
                else
                    bits_Q = [1 1];
                end

                rx_bits = [rx_bits bits_I bits_Q];
            end
        end
    end

    rx_bits = rx_bits(1:original_length);
    bit_errors = sum(bits ~= rx_bits);
    ber = bit_errors/original_length;

    if isempty(tx_message)
        rx_message = '';
    else
        rx_message = bin2asc(rx_bits);
    end
end