let player = {

    up:false,
    down:false,
    left:false,
    right:false,

    x: 0,
    y: 0,

    i:0,
    j:0,

    cX: 700/2-22.5,
    cY: 700/2-70,

    oldX: 0,
    oldY: 0,

    width: 45,
    height: 140,

    acc: 0.5,
    fric: 0.87,

    attack: false,
    lastDir: "",

    canDash:true,
    coolDown:false,

    xVel: 0,
    yVel: 0,

    health: 3,

    offset:0,
    offsetVel: 0.07,

    legRotation:0,
    legVel:2,

    armRotation:0,
    armVel:0.7,

    sword:0,

    sC:0,
    fC:0,
    aC:0,

    dead:false,

    canHit: true,

    canDraw:false,

    draw () {

        ctx.save()
        ctx.translate(this.cX,this.cY)

        if(this.lastDir == "right"){
            ctx.translate(this.width,0)
            ctx.scale(-1,1)
        }

        draw(12,0,30+this.offset,0.5)


        if(this.canDraw){

            ctx.globalAlpha = 0.2
            ctx.fillStyle = "#000000"
            ctx.fillRect(-10,127,65,20)
            ctx.globalAlpha = 1
        
        }


        ctx.save()
        ctx.translate(10,100)
        ctx.rotate(this.legRotation*(Math.PI/180))

        draw(52+this.sC,-14,10,0.5)
        ctx.restore()

        ctx.save()
        ctx.translate(33,100)
        ctx.rotate(-this.legRotation*(Math.PI/180))

        draw(52+this.sC,-17,10,0.5)
        ctx.restore()



        draw(49+this.fC,0,30+this.offset,0.5)
        draw(13+this.aC*12+this.fC*4+this.sC,0,-20-this.offset,0.5)

        if(this.canDraw){
            for(let i = 0; i < 3; i++){
                if(swords[i].collect){
                    swords[i].draw()
                }
            }
        }

        ctx.save()
        ctx.fillStyle = skinColors[this.sC]

        if(this.sword){
            ctx.translate(-10,80)
            ctx.rotate(Math.sign(swords[0].rotate)*-swords[0].rotate*(Math.PI/180))
            ctx.fillRect(-9,-9,18,18)
        }else{
            ctx.translate(25,40)
            ctx.rotate(-this.armRotation*(Math.PI/180))
            ctx.fillRect(-9,31,18,18)
        }
        ctx.restore()

        
        ctx.restore()

        this.canDraw = false
        
    },

    move () {

        this.oldX = this.x;// Set the old position to the current position
        this.oldY = this.y;// before we update the current position, thus making it current

        this.x = this.cX-map.x
        this.y = this.cY-map.y

        this.i = Math.floor((this.x+this.width/2)/map.ts)
        this.j = Math.floor((this.y+this.height)/map.ts)

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

        if(this.up || this.down || this.left || this.right){
            this.legRotation += this.legVel
            this.armRotation += this.armVel
        }else{
            if(this.legRotation > 0){
                this.legRotation -= Math.abs(this.legVel)
            }

            if(this.legRotation < 0){
                this.legRotation += Math.abs(this.legVel)
            }

            if(this.armRotation > 0){
                this.armRotation -= Math.abs(this.armVel)
            }
            
            if(this.armRotation < 0){
                this.armRotation += Math.abs(this.armVel)
            }
        }

        

        if(Math.abs(this.legRotation) > 25){
            this.legVel = -this.legVel
        }

        if(Math.abs(this.armRotation) > 14){
            this.armVel = -this.armVel
        }

        if(Math.abs(this.offset) > 1){
            this.offsetVel = -this.offsetVel
        }

        this.offset += this.offsetVel
    },
    hit(){
        if(this.canHit){
            this.canHit = false
            map.shake = true
            console.log("hit")
            this.health --
            setTimeout(()=>{this.canHit = true;map.shake=false},750)
        }
        
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
    isDead(){
        if(this.health <= 0){
            this.dead = true
            //console.log("dead")
        }
    }
}


// toDecimal = (val) => {
//     return Math.floor(val * 100) / 100
// }