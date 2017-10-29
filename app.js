const express = require('express');
const app = express();
const io = require('socket.io')(app.listen(3000));
const five = require('johnny-five');

//Setting the path to static assets
app.use(express.static(__dirname + '/public'));

//Serving the static HTML file
app.get('/', function (res) {
    res.sendFile('index.html')
});

var board = new five.Board({
    repl: false
});

board.on('ready', function () {
    sensorAgua = new five.Sensor.Digital(13);

    sensorTemp = new five.Thermometer({
      //controller: "DS18B20",
      pin: "A0",
      freq: 1000
    });

    servo = new five.Servo(8);
    bomba1 = new five.Led(4);
    bomba2 = new five.Led(7);
    Yled = new five.Led(6);
    RGBled = new five.Led.RGB([11, 10, 9]);
    servo.to(0);
    bomba1.toggle();
    bomba2.toggle();

    commands = null;

    sensorAgua.on("change", function(){ //funcao para checar se o sensor esta conectado
        var dadoSensor1 = sensorAgua.value; //armazena os dados do sensor em dadoSensor

        if(dadoSensor1 == 1){
           dadoSensor1 = "COM AGUA";
        }else if(dadoSensor1 == 0){
           dadoSensor1 = "SEM AGUA";
        }
        console.log("Caixa: ", dadoSensor1);

        io.sockets.emit('leituraAgua', dadoSensor1); //emite os dados do sensor para o socket leitura > front
    });


    sensorTemp.on("change", function(){ //funcao para checar se o sensor esta conectado
        var dadoSensor2 = this.celsius;
        dadoSensor2 = dadoSensor2 - 1000;
        console.log("Temperatura:", dadoSensor2, "°C");

        io.sockets.emit('leitura', dadoSensor2); //emite os dados do sensor para o socket leitura > front
    });

    io.on('connection', function (socket) {
        //Leds
        socket.on('vermelho', function () {
            bomba1.toggle();
            RGBled.toggle();
        });
        socket.on('verde', function () {
            bomba2.toggle();
        });
        socket.on('amarelo', function () {
            Yled.toggle();
        });

        //RGB Led
        socket.on('rgb1', function () {
            RGBled.color("#E0FFFF");
            servo.to(0);
        });
        socket.on('rgb2', function () {
            RGBled.color("#00FFFF");
            servo.to(20);
        });
        socket.on('rgb3', function () {
            RGBled.color("blue");
            servo.to(30);
        });
        socket.on('rgb4', function () {
            RGBled.color("yellow");
            servo.to(50);
        });
        socket.on('rgb5', function () {
            RGBled.color("red");
            servo.to(90);
        });
    });
});
