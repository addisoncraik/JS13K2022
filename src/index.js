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
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // this should go in a seperate update function

    ctx.fillStyle = "gray"
    ctx.fillRect(map.x,map.y,map.size*map.ts,map.size*map.ts)

    for(let i =-3; i<4; i++){
        for(let j = -3; j<4; j++){
            if(player.i+j >= 0 && player.j+i >= 0 && player.i+j < map.size && player.j+i < map.size){
                cells[player.i+j][player.j+i].update(0)
            }
        }
    }

    for(let i =0; i<4; i++){
        for(let j = -3; j<4; j++){
            if(player.i+j >= 0 && player.j+i >= 0 && player.i+j < map.size && player.j+i < map.size){
                cells[player.i+j][player.j+i].update(2)
            }
        }
    }


    for(let j = -3; j<4; j++){
        if(player.i+j >= 0 && player.i+j < map.size){
            cells[player.i+j][map.size-1].update(1)
        }
    }
    
    key.draw()

    for(let i = 0; i < npcs.length; i++){
        npcs[i].draw()
    }

    for(let i = 0; i < 3; i++){
        if(!swords[i].collect){
            swords[i].draw()
        }
    }

    minotaur.draw()
    //window.requestAnimationFrame(drawCanvas)
}

function update() {

    player.move()
    player.isDead()

    //minotaur.AI()
    
    //minotaur.move()

    

    key.collision()
    
    for(let i = 0; i < 3; i++){
        swords[i].collision()
    }

    for(let i = 0; i < npcs.length; i++){
        npcs[i].move()
        npcs[i].AI()
        npcs[i].isDead()
    }
}