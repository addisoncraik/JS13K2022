function keyPress (event) {
    if (event.keyCode == 87) {
        player.yVelU = -2;
    }
    if (event.keyCode == 65) {
        player.xVelR = -2;
    }
    if (event.keyCode== 83) {
        player.yVelD = 2;
    }
    if (event.keyCode == 68) {
        player.xVelL = 2;
    }
}
function keyUp(event) {
    if (event.keyCode == 87) player.yVelU = 0 ;
    if (event.keyCode == 65) player.xVelR = 0;
    if (event.keyCode== 83) player.yVelD = 0;
    if (event.keyCode == 68) player.xVelL = 0;
}
//w is 87
//a is 65 
// s is 83
// d is 68