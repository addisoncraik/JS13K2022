let minotaur = {
    x:10.5*map.ts,
    y:10.5*map.ts,

    i:0,
    j:0,

    width: 80,
    height: 250,

    health: 100,
    canTakeDmg: true,

    dir:undefined,

    xVel:0,
    yVel:0,

    fric:0.8,
    acc:0.5,

    target:player,
    path:[],
    destination:{x:null,y:null},
    lastDir: "",

    offset:0,
    offsetVel: 0.07,

    legRotation:0,
    legVel:2,

    axeRotation:0,
    swing:false,

    draw () {
        if(this.health > 0){
            ctx.save()
            ctx.translate(this.x+map.x,this.y+map.y)

            if(this.lastDir == "left"){
                ctx.translate(this.width,0)
                ctx.scale(-1,1)
            }

            ctx.globalAlpha = 0.2
            ctx.fillStyle = "#000000"
            ctx.fillRect(0,260,90,30)
            ctx.globalAlpha = 1

            ctx.fillStyle = "#a0472d"

            ctx.save()
            ctx.scale(-1,1)
            ctx.translate(-50,190)
            ctx.rotate(this.legRotation*(Math.PI/180))
            ctx.fillRect(5,5,18,40)
            draw(56,-14,40,0.8)
            ctx.restore()

            ctx.save()
            ctx.scale(-1,1)
            ctx.translate(-65,190)
            ctx.rotate(-this.legRotation*(Math.PI/180))
            ctx.fillRect(1,5,18,40)
            draw(56,-17,40,0.8)
            ctx.restore()

            draw(10,-5,83-this.offset,0.75)


            draw(9,-40,-40+this.offset,0.7)




            ctx.save()
            ctx.scale(-1,1)
            ctx.translate(-105,140)
            ctx.rotate(-this.axeRotation*(Math.PI/180))

            draw(11,-45,-140-this.offset,1.1)

            ctx.fillRect(-15,-15,30,30)
            
            ctx.restore()

            ctx.restore()
        }
    },
    axeSwing(){
        let hX = this.x+105
        let hY = this.y+140
        
        if(this.lastDir == "left"){
            hX -= 210-this.width
        }

        let aX = hX - Math.sin(this.axeRotation*(Math.PI/180))*105
        let aY = hY - Math.cos(this.axeRotation*(Math.PI/180))*105

        if(circleRect(this.x+105,hY,70,this.target.x,this.target.y,this.target.width,this.target.height)){
            if(this.axeRotation == 0 && this.target.x+this.target.width > this.x+105){
                this.swing = true
                this.lastDir = "right"
            }
        }else if(circleRect(this.x-105+this.width,hY,70,this.target.x,this.target.y,this.target.width,this.target.height)){
            if(this.axeRotation == 0 && this.target.x < this.x-105+this.width){
                this.swing = true
                this.lastDir = "left"
            }
        }

        // if(!this.swing && this.axeRotation != 0){
        //     this.axeRotation -= 2
        // }

        if(this.axeRotation == 360){
            this.axeRotation = 0
            this.swing = false
        }

        if(this.swing){
            this.axeRotation += 8


            if(circleRect(aX,aY,30,this.target.x,this.target.y,this.target.width,this.target.height)){
                this.target.hit()
            }

        }
    },
    AI () {

        //Finding target
        let closestNPC = {d:100}

        for(let i =0; i<npcs.length; i++){
            if(findDistanceToEnd(npcs[i],this) < closestNPC.d && !npcs[i].escape && !npcs[i].dead){
                closestNPC = {d:findDistanceToEnd(npcs[i],this), t:npcs[i]}
            }
        }

        if(closestNPC.d < findDistanceToEnd(player,this) || player.dead){
            this.target = closestNPC.t
        }else{
            this.target = player
        }

        if(this.target.escape || this.target.dead){
            this.dir = undefined
        }


        //Path finding

        if(this.dir == undefined){
            if(this.target.i >= 0 && this.target.i < map.size && this.target.j >= 0 && this.target.j < map.size){
                this.path = aStar([this.i,this.j],[this.target.i,this.target.j])
                this.path.pop()
            }
        }

        if(this.path.length > 0 && this.dir == undefined){
            let nextTile = this.path[this.path.length-1]

            if(nextTile.j != this.j){
                this.destination.y = (nextTile.j+0.5)*map.ts
            }

            if(nextTile.i != this.i){
                this.destination.x = (nextTile.i+0.5)*map.ts
            }

            this.dir = {x:0,y:0}
        }

        // if(this.target.i == this.i && this.target.j == this.j){
        //     this.path = []
        //     this.dir = {x:0,y:0}
        //     this.destination.x = this.target.x
        //     this.destination.y = this.target.y+this.target.height
        // }


        //Chasing
        if(this.dir != undefined){

            if(this.x+this.width/2 > this.destination.x-20 && this.x+this.width/2 < this.destination.x+20){
                
            }else{
                if(this.destination.x < this.x+this.width/2){
                    this.dir.x = "l"
                }
                if(this.destination.x > this.x+this.width/2){
                    this.dir.x = "r"
                }
            }
            
            if(this.y+this.height > this.destination.y-20 && this.y+this.height < this.destination.y+20){
                
            }else{
                if(this.destination.y > this.y+this.height){
                    this.dir.y = "d"
                }
        
                if(this.destination.y < this.y+this.height){
                    this.dir.y = "u"
                }
            }

            if(this.x+this.width/2 > this.destination.x-20 && this.y+this.height > this.destination.y-20 && this.x+this.width/2 < this.destination.x+20 && this.y+this.height < this.destination.y+20){
                if(this.path.length > 0){
                    this.dir = undefined
                    this.path.splice(this.path.length-1,1)
                }
            }
        }
    },

    move(){

        if(this.dir != undefined){
            this.legRotation += this.legVel
        }else{
            if(this.legRotation > 0){
                this.legRotation -= Math.abs(this.legVel)
            }

            if(this.legRotation < 0){
                this.legRotation += Math.abs(this.legVel)
            }
        }

        if(Math.abs(this.legRotation) > 25){
            this.legVel = -this.legVel
        }

        if(Math.abs(this.offset) > 1){
            this.offsetVel = -this.offsetVel
        }

        this.offset += this.offsetVel




        if(this.dir == undefined){
            return
        }

        if (this.dir.y == "u") { this.yVel -= this.acc; }

        if (this.dir.x == "r") { this.xVel += this.acc; this.lastDir = "right"}

        if (this.dir.y == "d") { this.yVel += this.acc; }

        if (this.dir.x == "l") { this.xVel -= this.acc; this.lastDir = "left"}

        this.x += this.xVel;// Update the current position
        this.y += this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;


        this.i = Math.floor((this.x+this.width/2)/map.ts)
        this.j = Math.floor((this.y+this.height)/map.ts)


    },
    takeDamage (weapon) {
        if (weapon == 'sword') {
            this.health -= 100
        }
    },
    attack () {

    },
    dash () {

    },
}


function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;
  
    // which edge is closest?
    if (cx < rx){testX = rx;}      // test left edge
    else if (cx > rx+rw){testX = rx+rw;}   // right edge

    if (cy < ry){testY = ry;}   // top edge
    else if (cy > ry+rh){testY = ry+rh;}   // bottom edge
  
    // get distance from closest edges
    let distX = cx-testX;
    let distY = cy-testY;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      return true;
    }
    return false;
  }