'use strict';
const I2CO = 54; // i2cOpen
const I2CC = 55; // i2cClose
const I2CRD = 56; // i2cReadDevice
const I2CWD = 57; // i2cWriteDevice

const pigpio = require('pigpio-client').pigpio(); // localhost

var i2c = function (opts)
{
  this.pigpio = pigpio;
  this.bus = opts.bus;
  this.device = ops.address;
  this.handle;
}

i2c.prototype.open = function (this.bus, this.device, callback) {
  let flags = new Uint8Array(4);
  return pigpio.request(I2CO, this.bus, this.device, 4, callback, flags);
}

i2c.prototype.close = function (handle, callback) {
  return pigpio.request(I2CC, handle, 0, 0, callback);
}

i2c.prototype.readDevice = function (handle, count, callback) {
  return pigpio.request(I2CRD, handle, count, 0, callback);
}

i2c.prototype.writeDevice = function (handle, data, callback) {
  let buffer = new Uint8Array(data);
  return pigpio.request(I2CWD, handle, 0, data.length, callback, buffer);
}

module.exports = i2c;