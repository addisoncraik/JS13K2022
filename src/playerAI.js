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

    width: 45,
    height: 90,

    acc: 0.5,
    fric: 0.87,

    attack: false,
    lastDir: "",

    canDash:true,
    coolDown:false,

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

        if (this.down) { this.yVel += this.acc;}

        if (this.left) { this.xVel -= this.acc;this.lastDir = "left"}

        if (this.right) { this.xVel += this.acc;this.lastDir = "right"}

        if (this.up) { this.yVel -= this.acc; }

        map.x -= this.xVel;// Update the current position
        map.y -= this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;
    },

    takeDamage (src) {
        if (src) {
            this.health --;
        }
    },

    dash(){
        if(!this.coolDown){
            if(this.canDash == "right" && this.right){
                this.xVel += 50
                this.coolDown = true
                setTimeout(()=>{this.coolDown = false},5000)
            }
            if(this.canDash == "left" && this.left){
                this.xVel -= 50
                this.coolDown = true
                setTimeout(()=>{this.coolDown = false},5000)
            }
            if(this.canDash == "up" && this.up){
                this.yVel -= 50
                this.coolDown = true
                setTimeout(()=>{this.coolDown = false},5000)
            }
            if(this.canDash == "down" && this.down){
                this.yVel += 50
                this.coolDown = true
                setTimeout(()=>{this.coolDown = false},5000)
            }
        }
    },
}


// toDecimal = (val) => {
//     return Math.floor(val * 100) / 100
// }