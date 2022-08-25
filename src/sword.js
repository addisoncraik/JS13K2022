let swords = []

class Sword{
    constructor(i,j,c){
        this.x = i*map.ts
        this.y = j*map.ts

        this.component = c
        this.collect = true
        
        this.rotate = 0
        this.length = 206

        this.w
        this.h
    }

    collision(){

        if(player.x+player.width > this.x && player.x < this.x + 57.2 && player.y + player.height > this.y && player.y+player.height < this.y + 32){
            this.collect = true
        }

        if(this.collect){
            this.x = player.x
            this.y = player.y

            let pX = this.x - Math.sin(this.rotate*(Math.PI/180))*this.length
            let pY = this.y - Math.cos(this.rotate*(Math.PI/180))*this.length

            if(this.rotate > 0){
                this.rotate -= 4

                if(this.minoCollision(this.x,this.y,pX,pY,minotaur.x,minotaur.y,minotaur.width,minotaur.height) && minotaur.canTakeDmg){
                    minotaur.health -= 20
                    minotaur.canTakeDmg = false
                    setTimeout(()=>{minotaur.canTakeDmg = true},1000)
                }
            }

            if(this.rotate < 0){
                this.rotate += 4

                if(this.minoCollision(this.x,this.y,pX,pY,minotaur.x,minotaur.y,minotaur.width,minotaur.height) && minotaur.canTakeDmg){
                    minotaur.health -= 20
                    minotaur.canTakeDmg = false
                    setTimeout(()=>{minotaur.canTakeDmg = true},1000)
                }
            }

            if(player.attack && this.rotate == 0){
                if(player.lastDir == "left"){
                    this.rotate = 80
                }else{
                    this.rotate = -80
                }
            }
        }
    }

    minoCollision(x1,y1,x2,y2,rx,ry,rw,rh){
        let left = lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh)
        let right = lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh)
        let top = lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry)
        let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh)

        if (left || right || top || bottom) {
            return true;
        }
        
        return false;
    }

    draw(){
        ctx.save()
        ctx.translate(map.x+this.x,map.y+this.y)

        if(this.collect){
            ctx.scale(0.4,-0.4)
            ctx.rotate(this.rotate*(Math.PI/180))
        }else{
            ctx.scale(0.4, 0.4)
        }
        

        ctx.shadowColor = '#b38432';
        ctx.shadowBlur = 10;
        
        if(this.component == 0){
            if(this.collect){
                draw(6,-18,110)
            }else{
                draw(6,20,-120)
                ctx.shadowBlur = 0;
                ctx.fillStyle = "gray"
                ctx.fillRect(10,50,65,220)
                
                draw(0,0,0)
            }
            
        }
        if(this.component == 1){
            if(this.collect){
                draw(7, -58, 25)
            }else{
                draw(7,20,-50)
                ctx.shadowBlur = 0;
                draw(0,0,0)
            }
        }
        
        if(this.component == 2){
            if(this.collect){
                draw(8,-12,0)
            }else{
                draw(8,50,-20)
                ctx.shadowBlur = 0;
                draw(0,0,0)
            }
        }
        ctx.restore()
    }
}

let sPos = [[1/6,1/6],[5/6,5/6],[1/6,5/6],[5/6,1/6]]

for(let i = 0; i < 3; i++){
    let j = randInt(sPos.length)
    swords.push(new Sword(map.size*sPos[j][0], map.size*sPos[j][1],i))
    sPos.splice(j,1)
}


function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the direction of the lines
    let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
  
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {  
      return true;
    }
    return false;
  }