var rpio = require('rpio');
const RED = 11; 
const GREEN = 21;   // Green, Pin21-GPIO9
const YELLOW = 19;  // Yellow, Pin19-GPIO10
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);
let GreenBlinking = false;

var value = 0;
function pollcb(pin)
{
    if (GreenBlinking)
		return led.unexport();
   
    rpio.msleep(3000);
    
    rpio.write(GREEN, rpio.LOW^1);
    rpio.msleep(10000);
    for (var i=0; i<3; i++) {
        rpio.write(RED, rpio.HIGH);
        rpio.sleep(500);
        rpio.write(RED, rpio.LOW);
        rpio.msleep(500);  
    }
    console.log('Button pressed on pin P%d', pin);
}

process.on('SIGINT', function() {
    console.log('\nUser Interrupt Detected. Exiting');
    rpio.close(RED);
    rpio.close(SWITCH);
});

rpio.poll(SWITCH, pollcb, rpio.POLL_LOW);

setTimeout(function() {
	GreenBlinking = true
}, 16000);