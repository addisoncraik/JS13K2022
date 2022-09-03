
let colors = ["red","yellow","magenta","pink","orange","green","aqua","tomato","purple","silver","olive"]

class NPC {
    constructor(i,j,s,cI) {

        this.x = (i+0.5)*map.ts
        this.y = (j+0.5)*map.ts//in relation to map

        this.i = i
        this.j = j

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

        this.escape = false

        this.destination = {x:this.x,y:this.y}
        this.lastDestination = {i:i,j:j}

        this.health = 1
        this.dead = false

        //asthetics
        this.colour = colors[cI]
    }


    draw () {
        if(!this.dead){
            ctx.fillStyle = this.colour
            ctx.fillRect(map.x+this.x,map.y+this.y,this.width,this.height)

            ctx.fillRect(map.x+this.destination.x,map.y+this.destination.y,5,5)
            ctx.fillStyle = "black"
        }
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

        this.i = Math.floor(this.x/map.ts)
        this.j = Math.floor(this.y/map.ts)
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

                if(this.i < 0 || this.j < 0 || this.i >= map.size || this.j >= map.size){
                    
                    if(this.dir != undefined){
                        this.dir = undefined
                    }
                    return
                }

                let edges = cells[this.i][this.j].edges
                let dirs = []

                for(let i = 0; i < edges.length; i++){
                    if(!edges[i]){
                        dirs.push(i)
                    }
                }

                if(this.i-1 >= 0){
                    if(cells[this.i-1][this.j].edges[1]){
                        dirs.splice(dirs.indexOf(3),1)
                    }
                }

                if(this.j+1 < map.size){
                    if(cells[this.i][this.j+1].edges[0]){
                        dirs.splice(dirs.indexOf(2),1)
                    }
                }


                if(dirs.length > 0){

                    if(this.lastDestination.j > this.j){
                        dirs.splice(dirs.indexOf(2),1)
                    }

                    else if(this.lastDestination.i > this.i){
                        dirs.splice(dirs.indexOf(1),1)
                    }

                    else if(this.lastDestination.j < this.j){
                        dirs.splice(dirs.indexOf(0),1)
                    }

                    else if(this.lastDestination.i < this.i){
                        dirs.splice(dirs.indexOf(3),1)
                    }
                }

                let neighbouringCells = []

                for (let i = 0;i<dirs.length;i++){
                    let cell;
                    if (dirs[i] == 0) {
                        cell = cells[this.i][this.j-1]
                    } else if (dirs[i] == 1) {
                        cell = cells[this.i+1][this.j]
                    } else if (dirs[i] == 2) {
                        cell = cells[this.i][this.j+1]
                    } else if (dirs[i] == 3) {
                        cell = cells[this.i-1][this.j]
                    }
                    neighbouringCells.push({i:cell.i,j:cell.j,g:cell.gScore,d:i})
                }

                neighbouringCells.sort((a,b)=>{
                    return a.g - b.g
                })
            

                let dir = Math.random()

                if(neighbouringCells.length > 1){
                    if(dir > 0.3){
                        dir = neighbouringCells[0].d
                    }else if(dirs.length == 2){
                        dir = neighbouringCells[1].d
                    }else if(dir > 0.15){
                        dir = neighbouringCells[1].d
                    }else if(dirs.length == 3){
                        dir = neighbouringCells[2].d
                    }else if(dir > 0.05){
                        dir = neighbouringCells[2].d
                    }else{
                        dir = neighbouringCells[3].d
                    }
                }else{
                    dir = 0
                }

                this.lastDestination.j = Math.floor(this.destination.y/map.ts)
                this.lastDestination.i = Math.floor(this.destination.x/map.ts)

                if(cells[this.i][this.j].open){
                    dir=dirs.length
                    this.escape = true
                    dirs.push(cells[this.i][this.j].exit)

                    console.log("escaped")
                }

                switch(dirs[dir]){
                    case 0:
                        this.destination.y = (this.j-0.5)*map.ts
                        break;
                    case 1:
                        this.destination.x = (this.i+1.5)*map.ts
                        break;
                    case 2:
                        this.destination.y = (this.j+1.5)*map.ts
                        break;
                    case 3:
                        this.destination.x = (this.i-0.5)*map.ts
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

    isDead(){
        if(this.health <= 0 && !this.dead){
            this.dead = true
            console.log("NPC Dead")
        }
    }
}

let npcs = []

let amount = 20

for(let i = 0; i < amount; i++){
    npcs.push(new NPC(randInt(map.size),randInt(map.size),0,randInt(colors.length)))
}

//select npc to look for sword pieces (theseus) the rest wander, looking for an exit