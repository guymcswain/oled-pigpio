/*
 * text.mjs
 * Display test on a small I2C connected display
 *
 * 2023-08-12 v1.0 Guy McSwain
 */

"use strict";

/* Must set --experimental-specifier-resolution=node flag for top level await. */

import i2c from '../i2c-bus.js';
import oled from '../oled.js';
import font from 'oled-font-5x7';

var opts = {
  width: 128,
  height: 32,
  address: 0x3C,
  bus:1,
  driver: 'SSD1306'
};


await i2c.ready;

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
