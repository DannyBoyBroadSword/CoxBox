var Raspi = require("raspi-io");
var five = require("johnny-five");
var pitft = require("pitft");
var sleep = require('sleep');

var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode

var xMax = fb.size().width;
console.log(xMax);
var yMax = fb.size().height;
console.log(yMax);


// Clear the screen buffer
fb.clear();
fb.color(1, 1, 1); // Set the color to whit
fb.font("fantasy", 12); // Use the "fantasy" font with size 12

fb.text(0,20,"Latitude:",false);
fb.text(0,40,"Longitude:",false);
fb.text(0,60,"Speed:",false);
fb.text(0,80,"Course:",false);
fb.text(0,100,"Longitude:",false);
fb.text(0,120,"Balance:",false);
fb.text(0,140,"Volume:",false);
fb.text(0,160,"Stroke Rate:",false);
fb.text(0,180,"/500:",false);
fb.text(0,200,"Race Mode: 5000m",false);
fb.text(0,220,"Estimated Finish time:",false);

sleep.sleep(5);
/*
sleep.sleep(5)

fb.clear();
fb.text(0,20,"Latitude: ya",false);
fb.text(0,40,"Longitude: boy",false);
fb.text(0,60,"Speed: the ",false);
fb.text(0,80,"Course: lazy ",false);
fb.text(0,100,"Longitude: brown",false);
fb.text(0,120,"Balance: cow",false);
fb.text(0,140,"Volume: jumped",false);
fb.text(0,160,"Stroke Rate: over",false);
fb.text(0,180,"/500: your ",false);
fb.text(0,200,"Race Mode: 5000m mom",false);
fb.text(0,220,"Estimated Finish time: lol",false);
*/
//fb.font("fantasy", 12); // Use the "fantasy" font with size 12
//fb.text(0, 20, "HI", false); // Draw the text non-centered, rotated _a_ degrees
//sleep.sleep(5);

console.log("Starting Board");

var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  var imu = new five.IMU({
    controller: "MPU6050"
  });

  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: ['P1-8', 'P1-10']
  });

  /*
  var volumecontrol = new five.i2c({
    controller: "i2c"
  });

  var strokeRate = new five.Board({
    controller: "arduino"
  });
  */

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
    console.log("  x   : ", imu.accelerometer.x);
    console.log("  y   : ", imu.accelerometer.y);
    console.log("  z   : ", imu.accelerometer.z);
    console.logt("MPU6050 Temp");
    console.log("  fahrenheit   : ", imu.thermometer.fahrenheit);
    //console.log("Volume");
    //console.log("  Volume   : ",volumecontrol.currentVolume);
    //console.log("Stroke Rate");
    //console.log("  Stroke Rate   : ",strokeRate.currentStrokeRate);
    console.log("--------------------------------------");

  });
});
