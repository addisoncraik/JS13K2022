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

    x: 0,
    y: 0,

    cX: canvas.width/2-10,
    cY: canvas.height/2-20,

    oldX: 0,
    oldY: 0,

    width: 20,
    height: 40,

    acc: 0.5,
    fric: 0.87,

    xVel: 0,
    yVel: 0,

    health: 3,

    draw () {
        ctx.fillStyle = "green"
        ctx.fillRect(this.cX,this.cY,this.width,this.height)
    },

    move () {

        this.oldX = this.x;// Set the old position to the current position
        this.oldY = this.y;// before we update the current position, thus making it current

        this.x = this.cX-map.x
        this.y = this.cY-map.y

        // this.xVel = toDecimal(this.xVel)
        // this.yVel = toDecimal(this.yVel)

        // this.x = toDecimal(this.x)
        // this.y = toDecimal(this.y)

        if (this.down) { this.yVel += this.acc; }

        if (this.left) { this.xVel -= this.acc; }

        if (this.right) { this.xVel += this.acc; }

        if (this.up) { this.yVel -= this.acc; }

        map.x -= this.xVel;// Update the current position
        map.y -= this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;

        let playerI = Math.floor((this.x)/map.ts)
        let playerJ = Math.floor((this.y)/map.ts)
        
        for(let i =-1; i<2; i++){
            for(let j = -1; j<2; j++){
                if(playerI+i >= 0 && playerJ+j >= 0 && playerI+i < map.size && playerJ+j < map.size){
                    cells[playerI+i][playerJ+j].collision()
                }
            }
        }
    },

    takeDamage (src) {
        if (src) {
            this.health --;
        }
    },
}


// toDecimal = (val) => {
//     return Math.floor(val * 100) / 100
// }