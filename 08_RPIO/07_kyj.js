var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const GREEN = 21;   // Green, Pin21-GPIO9
const YELLOW = 19;  // Yellow, Pin19-GPIO10
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);

var value = 0;
function pollcb(pin)
{
    
    rpio.msleep(3000);
  
    value = value ^ 1;
    rpio.write(GREEN, value);
    rpio.msleep(100000);
    rpio.write(GREEN, rpio.LOW);
    for (var i=0; i<5; i++) {
        rpio.write(GREEN, rpio.HIGH);
        rpio.sleep(500);
        rpio.write(GREEN, rpio.LOW);
        rpio.msleep(3000);  
    }
    rpio.write(YELLOW, value);
    rpio.sleep(3000);
    rpio.write(YELLOW, rpio.LOW);
    rpio.write(RED, rpio.HIGH);




   
}

process.on('SIGINT', function() {
    console.log('\nUser Interrupt Detected. Exiting');
    rpio.close(RED);
    rpio.close(SWITCH);
    rpio.close(YELLOW);
    rpio.close(GREEN);
});

