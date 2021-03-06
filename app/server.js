var Raspi = require("raspi-io");
var five = require("johnny-five");
var pitft = require("pitft");
var sleep = require('sleep');
var mqtt = require('mqtt')

var options = {
  port: 19078,
  clientId: 'Resin-Instance-1',
  username: "uxtcukqc",
  password: "Ts2j3EF5B1k-",
};

var client  = mqtt.connect('http://m10.cloudmqtt.com',options)
//var pitftTouch = require('pitft-touch');

//var WriteVolumeAddress=0x4B;
//var ReadStrokeAddress=08;
//var volumeLevel=31;
//var isStarted=false;

//var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode

/*
var touchscreen = require("pitft-touch");

var touchCount = 0;


touchscreen("/dev/input/touchscreen", function(err, data) {
    if (err) {
        throw err;
    }

    // Stop after 10 touches
    if (touchCount++ == 10) {
        data.stop = true;
    }

    console.log(data);
});
*/

//var xMax = fb.size().width;
//console.log(xMax);
//var yMax = fb.size().height;
//console.log(yMax);


// Clear the screen buffer
//fb.clear();
//fb.color(1, 1, 1); // Set the color to whit
//fb.font("fantasy", 12); // Use the "fantasy" font with size 12

//fb.text(0,20,"This will never work.",false);

console.log("Starting Board");

var board = new five.Board({
  io: new Raspi()
});

/*
var touch = new DSTouch({
  address: UU
});
*/

board.on("ready", function() {

/*
  //prepare buttons from TFT
  var buttonOne = new five.Button(0);
  var buttonTwo = new five.Button(3);
  var buttonThree = new five.Button(4);
  var buttonFour = new five.Button(2);
*/

  //prepare imu
  var imu = new five.IMU({
    controller: "MPU6050"
  });

  //prepare gps
  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: ['P1-8', 'P1-10']
  });

/*
  //create a function that reads the Volume.
  function readVolume(){
    return defaultVolumeLevel;
  }

  //create a cunction that writes Volume
  function writeVolume(address,volume){
    return board.io.i2cWrite(address,volume)
    //sample writeVolume(WriteVolumeAddress,defaultVolumeLevel);
  }

  //create a function that read's stroke rate.
  function readStrokeRate(address){
    return board.io.i2cRead(address,4);
    //sample readStrokeRate(ReadStrokeAddress);
  }

  //default volume
  writeVolume(WriteVolumeAddress,volumeLevel);

  buttonOne.on("press", function() {
    writeVolume(WriteVolumeAddress,VolumeLevel+1);
    VolumeLevel = VolumeLevel+1
    console.log( "Increased Volume" );
  });

  buttonTwo.on("press", function() {
    writeVolume(WriteVolumeAddress,VolumeLevel-1);
    VolumeLevel = VolumeLevel-1
    console.log( "Decreased Volume" );
  });

  buttonThree.on("press", function() {
    if (isStarted == false){
      //startSomething();
      console.log("Started");
    }else{
      //stopSomething();
      console.log("Stopped");
    }
  });

  buttonThree.on("hold", function() {
    //resetTimer();
    isStarted = false;
    console.log( "Reset" );
  });

  buttonFour.on("press", function() {
    console.log( "IDK fam" );
    //doSumting();
  });


  touch.on("change", function() {
    console.log(this.x, this.y);
  });
  */

  gps.on("change", function() {
    try{
    console.log("GPS Data");
    console.log("  Speed   : ", gps.speed);
    client.publish('speed', String(gps.speed));
    console.log("  bearing  : ", gps.course);
    client.publish('bearing', String(gps.course));
    console.log("  lat   : ", gps.latitude);
    client.publish('lat', String(gps.latitude));
    console.log("  lon  : ", gps.longitude);
    client.publish('lon', String(gps.longitude));
    console.log("  altitude   : ", gps.altitude);
    client.publish('altitude', String(gps.altitude));
    console.log("MPU6050 Roll Data");
    console.log("  pitch   : ", imu.gyro.pitch);
    client.publish('pitch', String(imu.gyro.pitch));
    console.log("MPU6050 Starting Acceleration");
    console.log("  Acceleration   : ", imu.accelerometer.acceleration);
    client.publish('Acceleration', String(imu.accelerometer.acceleration));
    console.log("MPU6050 Temp");
    console.log("  fahrenheit   : ", imu.thermometer.fahrenheit);
    client.publish('fahrenheit', String(imu.thermometer.fahrenheit));
    console.log("Volume");
    //console.log("  Volume   : ",volumeLevel);
    console.log("Stroke Rate");
    //console.log("  Stroke Rate   : ",readStrokeRate(ReadStrokeAddress));
    console.log("--------------------------------------");
  }
  catch(e){
    console.log("somethings wrong");
    client.end()
  }
  });
});
