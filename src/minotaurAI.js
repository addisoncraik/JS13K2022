let minotaur = {
    x:0*map.ts,
    y:0*map.ts,

    i:0,
    j:0,

    width: 45,
    height: 90,

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

    draw () {
        if(this.health > 0){
            ctx.fillStyle = "red"
            ctx.fillRect(this.x+map.x,this.y+map.y,this.width,-this.height)

            ctx.fillStyle = "yellow"
            for(let i =0; i<this.path.length; i++){
                ctx.fillRect(map.x+this.path[i].i*map.ts,map.y+this.path[i].j*map.ts,20,20)
            }

            ctx.fillStyle = "blue"
            ctx.fillRect(map.x+this.destination.x,map.y+this.destination.y,5,5)
            
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

        if(closestNPC.d < findDistanceToEnd(player,this)){
            this.target = closestNPC.t
        }else{
            this.target = player
        }


        //Path finding
        if((this.target.i > this.i || this.target.j > this.j || this.target.i < this.i || this.target.j < this.j) && this.path.length == 0){
            
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

        if(this.target.i == this.i && this.target.j == this.j){
            this.path = []
            this.dir = {x:0,y:0}
            this.destination.x = this.target.x
            this.destination.y = this.target.y+this.target.height
        }


        //Chasing
        if(this.dir != undefined){

            if(this.x > this.destination.x-20 && this.x < this.destination.x+20){
                
            }else{
                if(this.destination.x < this.x){
                    this.dir.x = "l"
                }
                if(this.destination.x > this.x){
                    this.dir.x = "r"
                }
            }
            
            if(this.y > this.destination.y-20 && this.y < this.destination.y+20){
                
            }else{
                if(this.destination.y > this.y){
                    this.dir.y = "d"
                }
        
                if(this.destination.y < this.y){
                    this.dir.y = "u"
                }
            }

            if(this.x > this.destination.x-20 && this.y > this.destination.y-20 && this.x < this.destination.x+20 && this.y < this.destination.y+20){
                if(this.path.length > 0){
                    this.dir = undefined
                    this.path.splice(this.path.length-1,1)
                }else{
                    this.target.health --
                }
            }
        }
    },

    move(){

        if(this.dir == undefined){
            return
        }
        if (this.dir.y == "u") { this.yVel -= this.acc; }

        if (this.dir.x == "r") { this.xVel += this.acc; }

        if (this.dir.y == "d") { this.yVel += this.acc; }

        if (this.dir.x == "l") { this.xVel -= this.acc; }

        this.x += this.xVel;// Update the current position
        this.y += this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;


        this.i = Math.floor(this.x/map.ts)
        this.j = Math.floor(this.y/map.ts)
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