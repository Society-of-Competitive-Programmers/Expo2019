var socket = require("socket.io-client")('https://sleepy-everglades-29815.herokuapp.com');
var gpio = require("rpi-gpio");

process.on("SIGINT", function(){
  gpio.write(12, true, function(){
    gpio.destroy(function(){
      process.exit();
    });
  });
});

gpio.setup(12, gpio.DIR_OUT, function(){ // GPIO 18 - LED
    gpio.write(12, true); // TURNS LED OFF
});


gpio.setup(11, gpio.DIR_OUT, function(){ // GPIO 17 - INPUT A
    gpio.write(11, false);
}); 
gpio.setup(15, gpio.DIR_OUT, function(){ // GPIO 22 - INPUT B
    gpio.write(15, false);
}); 
gpio.setup(16, gpio.DIR_OUT, function(){ // GPIO 23 - INPUT C
    gpio.write(16, false);
});
gpio.setup(18, gpio.DIR_OUT, function(){ // GPIO 24 - INPUT D
    gpio.write(18, false);
}); 

socket.on("connect", function(){
  console.log("Connected to server");

  socket.on("updateState", function(state){
    console.log("The new state is: " + state);
    gpio.write(12, !state);
  });

  socket.on('turnRobot', function(state){
    console.log('The robot is turning ' + state);
    if(state == 'left'){
      gpio.write(11, false);
      gpio.write(15, true);
      gpio.write(16, false);
      gpio.write(18, true);
    }
    else{
      gpio.write(11, true);
      gpio.write(15, false);
      gpio.write(16, true);
      gpio.write(18, false);
    }
  });

  socket.on('stopRobotTurn', function(state){
    console.log('The robot stopped turning ' + state);
    gpio.write(16, false);
    gpio.write(18, false);
    gpio.write(11, false);
    gpio.write(15, false);
  });

  socket.on('moveRobot', function(state){
    console.log('The robot is moving ' + state);
    if(state == 'forward'){
      gpio.write(11, true);
      gpio.write(15, false);
      gpio.write(16, false);
      gpio.write(18, true);
    }
    else{
      gpio.write(11, false);
      gpio.write(15, true);     
      gpio.write(16, true);
      gpio.write(18, false);
    }
  });

  socket.on('stopRobotMove', function(state){
    console.log('The robot stopped moving ' + state);
    gpio.write(11, false);
    gpio.write(15, false);
    gpio.write(16, false);
    gpio.write(18, false);
  });

});
