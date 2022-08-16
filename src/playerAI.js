class character {
    constructor() {
        this.width = 10;
        this.height = 20;
        this.health = 3;
    }
    draw () {

    }
    AI () {

    }
}


let player = {
    x: canvas.width/2-5,
    y: canvas.height/2-5,
    width: 20,
    height: 40,
    xVelR: 0,
    xVelL: 0,
    yVelU: 0,
    yVelD: 0,
    health: 3,
    draw () {
        ctx.fillRect(this.x,this.y,this.width,this.height)
    },
    move () {

    },
    takeDamage (src) {
        if (src) {
            this.health --;
        }
    },
}