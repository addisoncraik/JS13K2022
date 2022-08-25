function keyPress (event) {
    if (event.keyCode == 87) {
        player.up = true;
        player.dash()
    }
    if (event.keyCode == 65) {
        player.left = true;
        player.dash()
    }
    if (event.keyCode== 83) {
        player.down = true;
        player.dash()
    }
    if (event.keyCode == 68) {
        player.right = true;
        player.dash()
    }
    if (event.keyCode == 32){
        player.attack = true;
    }
}
function keyUp(event) {
    if (event.keyCode == 87){
        player.canDash = "up"
        setTimeout(()=>{player.canDash = 0},150)
        player.up = false;
    }
    if (event.keyCode == 65){
        player.canDash = "left"
        setTimeout(()=>{player.canDash = 0},150)
        player.left = false;
    }
    if (event.keyCode== 83){
        player.canDash = "down"
        setTimeout(()=>{player.canDash = 0},150)
        player.down = false;
    }
    if (event.keyCode == 68){
        player.canDash = "right"
        setTimeout(()=>{player.canDash = 0;},150)
        player.right = false;
    }
    if (event.keyCode == 32){
        player.attack = false;
    }
}
//w is 87
//a is 65 
// s is 83
// d is 68
// spacebar is 32