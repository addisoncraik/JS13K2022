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
    up:false,
    down:false,
    left:false,
    right:false,

    x: canvas.width/2-10,
    y: canvas.height/2-20,

    oldX: canvas.width/2-10,
    oldY: canvas.height/2-20,

    width: 20,
    height: 40,

    acc: 0.5,
    fric: 0.87,

    xVel: 0,
    yVel: 0,

    health: 3,
    draw () {
        ctx.fillRect(this.x,this.y,this.width,this.height)
    },

    move () {
        if (this.down) { this.yVel += this.acc; }

        if (this.left) { this.xVel -= this.acc; }

        if (this.right) { this.xVel += this.acc; }

        if (this.up) { this.yVel -= this.acc; }

        this.oldX = this.x;// Set the old position to the current position
        this.oldY = this.y;// before we update the current position, thus making it current

        this.x += this.xVel;// Update the current position
        this.y += this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;
    },
    takeDamage (src) {
        if (src) {
            this.health --;
        }
    },
}