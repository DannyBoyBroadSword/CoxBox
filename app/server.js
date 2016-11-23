var Raspi = require("raspi-io");
var five = require("johnny-five");
var pitft = require("pitft");
var sleep = require('sleep');
//var pitftTouch = require('pitft-touch');

var WriteVolumeAddress=0x4B;
var ReadStrokeAddress=8;
var volumeLevel=31;
var isStarted=false;

var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode
//var touchscreen = pitftTouch("/dev/input/touchscreen");

var xMax = fb.size().width;
console.log(xMax);
var yMax = fb.size().height;
console.log(yMax);


// Clear the screen buffer
fb.clear();
fb.color(1, 1, 1); // Set the color to whit
fb.font("fantasy", 12); // Use the "fantasy" font with size 12

fb.text(0,20,"This will never work.",false);

console.log("Starting Board");

var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  //Prepare i2c Data
  new five.Pin('SDA0');

  //prepare buttons from TFT
  var buttonOne = new five.Button(0);
  var buttonTwo = new five.Button(3);
  var buttonThree = new five.Button(4);
  var buttonFour = new five.Button(2);


  //prepare imu
  var imu = new five.IMU({
    controller: "MPU6050"
  });

  //prepare gps
  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: ['P1-8', 'P1-10']
  });


  //create a function that reads the Volume.
  function readVolume(address){
    return defaultVolumeLevel;
  }

  //create a cunction that writes Volume
  function writeVolume(address,volume){
    return board.io.i2cwrite(address,volume)
    //sample writeVolume(WriteVolumeAddress,defaultVolumeLevel);
  }

  //create a function that read's stroke rate.
  function readStrokeRate(address){
    return board.io.i2cread(address,4,true);
    //sample readStrokeRate(ReadStrokeAddress);
  }

  //default volume
  writeVolume(writeVolumeAddress,volumeLevel);

  buttonOne.on("press", function() {
    writeVolume(WriteVolumeAddress,VolumeLevel+1);
    VolumeLevel = VolumeLevel+1
    console.log( "Increased Volume" );
  });

  buttonTwo.on("press", function() {
    writeVolume(writeVolumeAddress,VolumeLevel-1);
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

  touchscreen.on("data.touch", function() {
    var screenX = ((270 - 50) / (693 - 3307)) * data.x + 320;
    var screenY = ((190 - 50) / (3220 - 996)) * data.y;
    console.log("  screenX   : ", screenX);
    console.log("  screenY  : ", screeny);
  }



  gps.on("change", function() {
    console.log("GPS Data");
    console.log("  Speed   : ", gps.speed);
    console.log("  Course  : ", gps.course);
    console.log("  latitude   : ", gps.latitude);
    console.log("  longitude  : ", gps.longitude);
    console.log("  altitude   : ", gps.altitude);
    console.log("MPU6050 Roll Data");
    console.log("  pitch   : ", imu.gyro.pitch);
    console.log("MPU6050 Starting Acceleration");
    console.log("  Acceleration   : ", imu.accelerometer.acceleration);
    console.log("MPU6050 Temp");
    console.log("  fahrenheit   : ", imu.thermometer.fahrenheit);
    console.log("Volume");
    console.log("  Volume   : ",volumeLevel);
    console.log("Stroke Rate");
    console.log("  Stroke Rate   : ",readStrokeRate(ReadStrokeAddress));
    console.log("--------------------------------------");
  });
});
