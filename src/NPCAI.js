
let colors = ["red","yellow","magenta","pink","orange","green","aqua","tomato","purple","silver","olive"]

class NPC {
    constructor(i,j,s,cI) {

        this.x = i*map.ts + map.ts/4 + randInt(map.ts/2)
        this.y = j*map.ts + map.ts/4 + randInt(map.ts/2) //in relation to map

        this.xVel = 0
        this.yVel = 0

        this.fric = 0.9
        this.acc = 0.1

        this.width = 10;
        this.height = 20;

        this.health = 3;

        this.sword = 0;

        this.dir = randInt(3) //0 = up, 1 = right, 2 = bottom, 3 = left
        this.selected = s

        this.destination = {x:this.x,y:this.y}
        this.lastDestination = {i:i,j:j}

        //asthetics
        this.colour = colors[cI]
    }


    draw () {
        ctx.fillStyle = this.colour
        ctx.fillRect(map.x+this.x,map.y+this.y,this.width,this.height)

        ctx.fillRect(map.x+this.destination.x,map.y+this.destination.y,5,5)
        ctx.fillStyle = "black"
    }

    move() {
        if(this.dir != undefined){
            if (this.dir == 0) { this.yVel -= this.acc; }

            if (this.dir == 1) { this.xVel += this.acc; }

            if (this.dir == 2) { this.yVel += this.acc; }

            if (this.dir == 3) { this.xVel -= this.acc; }

            this.x += this.xVel;// Update the current position
            this.y += this.yVel;

            this.xVel *= this.fric;
            this.yVel *= this.fric;
        }
    }

    combat(){
        if(this.sword == 3){
            //combat engage 

            //-find minotaur
            //-fight

            //if die, select new theseus
        }
    }

    AI () {
        if(this.selected){
            this.dir = undefined
        }else{
            if(this.x > this.destination.x-6 && this.y > this.destination.y-6 && this.x < this.destination.x+6 && this.y < this.destination.y+6){
                let npcI = Math.floor((this.x)/map.ts)
                let npcJ = Math.floor((this.y)/map.ts)

                if(npcI < 0 || npcJ < 0 || npcI >= map.size || npcJ >= map.size){
                    
                    if(this.dir != undefined){
                        this.dir = undefined
                    }
                    return
                }

                let edges = cells[npcI][npcJ].edges
                let dirs = []

                for(let i = 0; i < edges.length; i++){
                    if(!edges[i]){
                        dirs.push(i)
                    }
                }

                if(npcI-1 >= 0){
                    if(cells[npcI-1][npcJ].edges[1]){
                        dirs.splice(dirs.indexOf(3),1)
                    }
                }

                if(npcJ+1 < map.size){
                    if(cells[npcI][npcJ+1].edges[0]){
                        dirs.splice(dirs.indexOf(2),1)
                    }
                }
                

                if(dirs.length > 0){

                    if(this.lastDestination.j > npcJ){
                        dirs.splice(dirs.indexOf(2),1)
                    }

                    else if(this.lastDestination.i > npcI){
                        dirs.splice(dirs.indexOf(1),1)
                    }

                    else if(this.lastDestination.j < npcJ){
                        dirs.splice(dirs.indexOf(0),1)
                    }

                    else if(this.lastDestination.i < npcI){
                        dirs.splice(dirs.indexOf(3),1)
                    }
                }

                let dir = randInt(dirs.length)


                this.lastDestination.i = npcI
                this.lastDestination.j = npcJ

                switch(dirs[dir]){
                    case 0:
                        this.destination.y = (npcJ-1)*map.ts + map.ts/4 + randInt(map.ts/2)
                        break;
                    case 1:
                        this.destination.x = (npcI+1)*map.ts + map.ts/4 + randInt(map.ts/2)
                        break;
                    case 2:
                        this.destination.y = (npcJ+1)*map.ts + map.ts/4 + randInt(map.ts/2)
                        break;
                    case 3:
                        this.destination.x = (npcI-1)*map.ts + map.ts/4 + randInt(map.ts/2)
                        break;
                }
            }

            if(this.destination.x+3 < this.x){
                this.dir = 3
            }
            if(this.destination.x-3 > this.x){
                this.dir = 1
            }

            if(this.destination.y-3 > this.y){
                this.dir = 2
            }

            if(this.destination.y+3 < this.y){
                this.dir = 0
            }
        }
    }
}

let npcs = []

let amount = 100

for(let i = 0; i < amount; i++){
    npcs.push(new NPC(randInt(map.size),randInt(map.size),0,randInt(colors.length)))
}

//select npc to look for sword pieces (theseus) the rest wander, looking for an exit