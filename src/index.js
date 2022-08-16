///////////////////////
//////TO-DO LIST///////
///////////////////////

/* 
-collidable walls, almost done, just need to figure out the side collisons on top and bottom walls

-NPC class (we'll need to figure out some A* stuff)
    -also walk in random direction, unless the minotaur is after them.
-Minotaur AI / Class (dont worry about making him playable rn)
    -idea for now: 
    -walks in a random directions until he picks up a scent or sees someone and begins chasing once detected.
    -players have a scent associated with them.
-Sword components
-Win Condition / lose Condition

---We will need to do a shitload of reformatting here---

-Menu
-Playable minotaur + ai for npcs to kill minotaur
-ART
-Animations

---Probably some more reformatting---

-More Menues 
-SFX 
-Music 
-Highscore?? 

--Hope to god its under 13k--- 
*/


//////////////////////
//////////////////////
//////////////////////




//variables
//this is where everthing needed by the entire game is going i.e map, score, lives, etc.

let drawInterval;
let updateInterval;
const frameRate = 60;

window.onload = () => {
    //drawCanvas();
    drawInterval = setInterval(drawCanvas,1000/frameRate)
    updateInterval = setInterval(update,1000/frameRate)
}
window.addEventListener("keydown",keyPress)
window.addEventListener("keyup",keyUp)



function drawCanvas() {
    gfx.color = "white";
    gfx.clearRect(0,0,canv.width,canv.height)
    // this should go in a seperate update function
    player.x += player.xVelR;
    player.x += player.xVelL;
    player.y += player.yVelD
    player.y += player.yVelU;
    drawMap()
    player.draw()
    //window.requestAnimationFrame(drawCanvas)
}
function update() {
    for(let i = 0; i < map.size; i++){
        for(let j = 0; j < map.size; j++){
            cells[i][j].collision()
        }
    }
}