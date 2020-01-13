const GREEN = 21;   // Green, Pin21-GPIO9
const YELLOW = 19;  // Yellow, Pin19-GPIO10
const RED = 11;  // RED, Pin11-GPIO17
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(RED, rpio.OUTPUT, rpio.HIGH);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);

for (var i=0; i<5; i++) {
    rpio.sleep(3);
    rpio.write(GREEN, rpio.HIGH);
    rpio.sleep(10);
    rpio.write(GREEN, rpio.LOW);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.HIGH);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.LOW);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.HIGH);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.LOW);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.HIGH);
    rpio.msleep(500);
    rpio.write(GREEN, rpio.LOW);
    rpio.write(YELLOW, rpio.HIGH);
    rpio.sleep(3);
    rpio.write(YELLOW, rpio.LOW);
    rpio.write(RED, rpio.HIGH);
}
// Toggle the state of the LED every 200ms
const iv = setInterval(function() {
    rpio.write(RED, rpio.read(RED) ^ 1);
    rpio.write(GREEN, rpio.read(GREEN) ^ 1);
    rpio.write(YELLOW, rpio.read(YELLOW) ^ 1);
}, 200);

rpio.close(RED);
rpio.close(GREEN);
rpio.close(YELLOW);
// Stop blinking the LED after 5 seconds
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    rpio.close(RED);
    rpio.close(GREEN);
    rpio.close(YELLOW);
}, 5000);