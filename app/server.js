var Raspi = require("raspi-io");
var five = require("johnny-five");
var pitft = require("pitft");
var sleep = require('sleep');

var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode
var xMax = fb.size().width;
var yMax = fb.size().height;
var latitude;
var longitude;
// Clear the screen buffer
fb.clear();
fb.color(1, 1, 1); // Set the color to whit
fb.font("fantasy", 12); // Use the "fantasy" font with size 12

fb.text(20,20,"HAY",false);
sleep.sleep(5);
fb.text(20,20,"changed",false);
//fb.font("fantasy", 12); // Use the "fantasy" font with size 12
//fb.text(0, 20, "HI", false); // Draw the text non-centered, rotated _a_ degrees
//sleep.sleep(5);

console.log("Starting Board");

var board = new five.Board({
  io: new Raspi()
});

function displayPush(){
    fb.clear();
    fb.text(0,50,latitude,true);
    fb.text(50,50,longitude,true)     // The function returns the product of p1 and p2
}

board.on("ready", function() {

  console.log("this might work");

  var gps = new five.GPS({
    breakout: "ADAFRUIT_ULTIMATE_GPS",
    pins: ['P1-8', 'P1-10']
  });

  gps.once("change", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    latitude = this.latitude;
    console.log("  longitude  : ", this.longitude);
    longitude = this.longitude
    console.log("--------------------------------------");
    displayPush();
  });
});
