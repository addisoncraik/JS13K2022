//variables

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