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

fb.text(0,0,"Latitude:",false);
fb.text(20,0,"Longitude:",false);
fb.text(40,0,"Speed:",false);
fb.text(60,0,"Course:",false);
fb.text(80,0,"Longitude:",false);
fb.text(100,0,"Balance:",false);
fb.text(120,0,"Volume:",false);
fb.text(140,0,"Stroke Rate:",false);
fb.text(100,0,"/500:",false);
fb.text(100,0,"Race Mode: 5000m",false);
fb.text(100,0,"Estimated Finish time:",false);
//fb.font("fantasy", 12); // Use the "fantasy" font with size 12
//fb.text(0, 20, "HI", false); // Draw the text non-centered, rotated _a_ degrees
//sleep.sleep(5);

console.log("Starting Board");

var board = new five.Board({
  io: new Raspi()
});

function displayPush(){
    console.log("displayPush");
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

  gps.on("change", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    console.log("  longitude  : ", this.longitude);
    console.log("--------------------------------------");
  });
});
