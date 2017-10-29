var socket = io();

//Leds
function redLed(){
    socket.emit('vermelho');
}
function greenLed(){
    socket.emit('verde');
}
function yellowLed(){
    socket.emit('amarelo');
}

//RGB Led
function rgbFrio(){
    socket.emit('rgb1');
}
function rgbMeioFrio(){
    socket.emit('rgb2');
}
function rgbMorno(){
    socket.emit('rgb3');
}
function rgbQuente(){
    socket.emit('rgb4');
}
function rgbMuitoQuente(){
    socket.emit('rgb5');
}

//Leds
document.getElementById('rr').onclick = redLed;
document.getElementById('gg').onclick = greenLed;
document.getElementById('yy').onclick = yellowLed;

//RGB Led
document.getElementById('rgbF').onclick = rgbFrio;
document.getElementById('rgbMF').onclick = rgbMeioFrio;
document.getElementById('rgbM').onclick = rgbMorno;
document.getElementById('rgbQ').onclick = rgbQuente;
document.getElementById('rgbMQ').onclick = rgbMuitoQuente;


