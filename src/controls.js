function keyPress (event) {
    if (event.keyCode == 87) {
        player.up = true;
    }
    if (event.keyCode == 65) {
        player.left = true;
    }
    if (event.keyCode== 83) {
        player.down = true;
    }
    if (event.keyCode == 68) {
        player.right = true;
    }
}
function keyUp(event) {
    if (event.keyCode == 87) player.up = false;
    if (event.keyCode == 65) player.left = false;
    if (event.keyCode== 83) player.down = false;
    if (event.keyCode == 68) player.right = false;
}
//w is 87
//a is 65 
// s is 83
// d is 68