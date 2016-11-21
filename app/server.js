var Raspi = require("raspi-io");
var five = require("johnny-five");
var pitft = require("pitft");
var sleep = require('sleep');

var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode

// Clear the screen buffer
fb.clear();

var xMax = fb.size().width;
var yMax = fb.size().height;

fb.color(1, 1, 1); // Set the color to whit
fb.font("fantasy", 12); // Use the "fantasy" font with size 12

//fb.font("fantasy", 12); // Use the "fantasy" font with size 12
//fb.text(0, 20, "HI", false); // Draw the text non-centered, rotated _a_ degrees
//sleep.sleep(5);

console.log("Starting Board");

var board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  console.log("this might work");

  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: ['P1-8', 'P1-10']
  });


  fb.text(20,20,this.latitude,false);
  sleep.sleep(5);

  gps.on("change", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    fb.text(20,20,"bruh",true);
    fb.text(0, 20, this.latitude, false); // Draw the text non-centered, rotated _a_ degrees
    console.log("  longitude  : ", this.longitude);
    fb.font("fantasy", 12); // Use the "fantasy" font with size 12
    fb.text(0, 20, this.longitude, false); // Draw the text non-centered, rotated _a_ degrees
    console.log("--------------------------------------");
    sleep.sleep(5);
    fb.clear();
  });
});
