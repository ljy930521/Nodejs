'use strict';

const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');


const iv = setInterval(function()  {
    led.writeSync(led.readSync() ^ 1);//xor
}, 100);

setTimeout(function()  {
    clearInterval(iv);
    led.unexport();
    
},5000);