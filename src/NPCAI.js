
class NPC {
    constructor(i,j,s,cI) {

        this.x = (i+0.5)*map.ts
        this.y = (j+0.5)*map.ts//in relation to map

        this.i = i
        this.j = j

        this.xVel = 0
        this.yVel = 0

        this.fric = 0.9
        this.acc = 0.3

        this.width = 45;
        this.height = 130;

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
        this.sC = randInt(4)
        this.fC = randInt(3,1)
        this.aC = randInt(2)

        this.lastDir = ""

        this.offset = 0
        this.offsetVel = 0.07

        this.legRotation = 0
        this.legVel = 2

        this.armRotation = 0
        this.armVel = 0.7
    }


    draw () {
        if(!this.dead){

            ctx.save()
            ctx.translate(map.x+this.x,map.y+this.y)

            if(this.lastDir == "right"){
                ctx.translate(this.width,0)
                ctx.scale(-1,1)
            }

            draw(9,0,30+this.offset,0.5)


            ctx.globalAlpha = 0.2
            ctx.fillStyle = "#000000"
            ctx.fillRect(-10,127,65,20)
            ctx.globalAlpha = 1

            ctx.shadowColor = '#0000004d';
            ctx.shadowBlur = 3;



            ctx.save()
            ctx.translate(10,100)
            ctx.rotate(this.legRotation*(Math.PI/180))

            draw(37+this.sC,-14,10,0.5)
            ctx.restore()

            ctx.save()
            ctx.translate(33,100)
            ctx.rotate(-this.legRotation*(Math.PI/180))

            draw(37+this.sC,-17,10,0.5)
            ctx.restore()


            ctx.shadowBlur = 0;

            draw(34+this.fC,0,30+this.offset,0.5)
            draw(10+this.aC*12+this.fC*4+this.sC,0,-20-this.offset,0.5)

            ctx.save()
            ctx.fillStyle = skinColors[this.sC]
            ctx.translate(25,40)
            ctx.rotate(-this.armRotation*(Math.PI/180))
            ctx.fillRect(-9,31,18,18)
            ctx.restore()

            
            ctx.restore()
        }
    }

    move() {
        if(this.dir != undefined){
            if (this.dir == 0) { this.yVel -= this.acc;}

            if (this.dir == 1) { this.xVel += this.acc;this.lastDir = "right"}

            if (this.dir == 2) { this.yVel += this.acc; }

            if (this.dir == 3) { this.xVel -= this.acc;this.lastDir = "left"}

            this.x += this.xVel;// Update the current position
            this.y += this.yVel;

            this.xVel *= this.fric;
            this.yVel *= this.fric;
        }

        this.i = Math.floor(this.x/map.ts)
        this.j = Math.floor((this.y+this.height)/map.ts)


        if(this.dir != undefined){
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
            if(this.x+this.width/2 > this.destination.x-12 && this.y+this.height > this.destination.y-12 && this.x+this.width/2 < this.destination.x+12 && this.y+this.height < this.destination.y+12){

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

            if(this.destination.x+6 < this.x+this.width/2){
                this.dir = 3
            }
            if(this.destination.x-6 > this.x+this.width/2){
                this.dir = 1
            }

            if(this.destination.y-6 > this.y+this.height){
                this.dir = 2
            }

            if(this.destination.y+6 < this.y+this.height){
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
    npcs.push(new NPC(randInt(map.size),randInt(map.size),0))
}

//select npc to look for sword pieces (theseus) the rest wander, looking for an exit