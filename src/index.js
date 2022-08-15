///////////////////////
//////TO-DO LIST///////
///////////////////////

/* 
-Movement (Lets start making this playable)
-Player class
-NPC class (we'll need to figure out some A* stuff)
-Minotaur AI / Class (dont worry about making him playable rn)
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
    console.log('hi')
    drawInterval = setInterval(drawCanvas(),1000/frameRate)
}


window.addEventListener("keydown",keyPress)



function drawCanvas() {
    player.draw()
} 