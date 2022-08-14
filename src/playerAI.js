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
    x: 0,
    y: 0,
    width: 10,
    height: 10,
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