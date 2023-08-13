/*
 * text.js
 * Display test on a small I2C connected display
 *
 * 2023-08-12 v1.0 Guy McSwain
 */

"use strict";

const i2c = require('../i2c-bus.js');
const oled = require('../oled.js');
const font = require('oled-font-5x7');

var opts = {
  width: 128,
  height: 32,
  address: 0x3C,
  bus:1,
  driver: 'SSD1306'
};

i2c.ready.then(async info => {
  console.log(`pigpio version = ${info.pigpioVersion}`);

  var i2cBus = await i2c.openSync(opts);
  var display = new oled(i2cBus, opts);
  display.clearDisplay();
  display.turnOnDisplay();

  display.setCursor(1, 1);
  display.writeString(font, 1, 'Hello PiOLED', 1, true);

  setTimeout( () => {
    display.turnOffDisplay();
    i2cBus.close(process.exit);
  }, 10000);
});