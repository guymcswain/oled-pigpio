'use strict';

// i2c socket command codes for pigpio APIs
const I2CO = 54; // i2cOpen
const I2CC = 55; // i2cClose
const I2CRD = 56; // i2cReadDevice
const I2CWD = 57; // i2cWriteDevice

const pigpio = require('pigpio-client').pigpio(); // localhost
const ready = new Promise((resolve, reject) => {
  pigpio.once('connected', resolve);
  pigpio.once('error', reject);
});


class Bus {
  constructor(handle, options) {
    options = options || {};
    this.handle = handle;
  }

  close(cb) {
    console.info('closing pigpio i2c bus');
    pigpio.request(I2CC, this.handle, 0, 0, cb);
  }

  closeSync() {
    console.info('Empty function called - Bus.closeSync');
  }

  async i2cReadSync(addr, length, buffer) {
    try {
      buffer = await pigpio.request(I2CRD, this.handle, length, 0);
      return buffer.length;
    }
    catch (e) { console.error('i2cReadSync', e); }
  }

  async i2cWriteSync(addr, length, buffer) {
    try {
      await pigpio.request(I2CWD, this.handle, 0, length, null, buffer);
      return buffer.length;
    }
    catch (e) { console.error('i2cWriteSync', e); }
  }
}

const openSync = async function (options)
{
  //checkBusNumber(busNumber);

  try {
    let flags = new Uint8Array(4);
    let handle = await pigpio.request(I2CO, options.bus, options.address, 4, null, flags);
    return new Bus(handle, options);
  }
  catch (e) {throw new Error("Can't open i2c bus! " + e);}
}

module.exports = {
  openSync: openSync,
  ready: ready
};