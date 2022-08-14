let cells = []
let groups = []
let edges = []

let mapSize = 30
let tileSize = 10


class Cell{
    constructor(i,j,group){
        this.i = i //x
        this.j = j //y

        this.group = group
        this.edges = [1,1,0,0] //t,r,b,l
    }

    draw(){
        for(let i = 0; i<this.edges.length; i++){
            ctx.save()
            ctx.translate(this.i*tileSize+tileSize/2, this.j*tileSize+tileSize/2)
            ctx.rotate(i*(Math.PI/2))
            if(this.edges[i]){
                ctx.fillRect(-tileSize/2,-tileSize/2,tileSize,1)
            }
            ctx.restore()
        }
    }

    remove(edge, side){
        
        let neighbour = side ? cells[this.i+1][this.j] : cells[this.i][this.j-1]

        if(neighbour.group != this.group){
            this.edges[side] = 0
            neighbour.edges[side+2] = 0
            edges.splice(edge,1)
            this.delete(neighbour)
            return
        }
    }

    delete(neighbour){

        

        for(let i = 0; i<groups[neighbour.group].length; i++){
            groups[this.group].push(groups[neighbour.group][i])
        }

        groups.splice(neighbour.group,1)

        for(let i = neighbour.group < this.group ? neighbour.group : this.group; i < groups.length; i++){
            for(let j = 0; j<groups[i].length; j++){
                groups[i][j].group = i
                cells[groups[i][j].i][groups[i][j].j].group = i
            }
        }
    }
}

for(let i = 0; i < mapSize; i++){
    cells.push([])
    for(let j = 0; j < mapSize; j++){
        cells[i].push(new Cell(i,j,groups.length))
        groups.push([cells[i][j]])
    }
}


for(let i = 0; i< mapSize; i++){
    for(let j = 0; j < mapSize; j++){
        if(i+1 < mapSize){
            edges.push({i:i,j:j,s:1})
        }
        if(j-1 >= 0){
            edges.push({i:i,j:j,s:0})
        }
    }
}

function removeWall(){
    while(groups.length > 1){
        let rE = randInt(edges.length)
        cells[edges[rE].i][edges[rE].j].remove(rE,edges[rE].s)

        
    }
}


removeWall()

ctx.clearRect(0,0,canvas.width,canvas.height)
        for(let i = 0; i < mapSize; i++){
            for(let j = 0; j < mapSize; j++){
                cells[i][j].draw()
            }
        }



function randInt(max, min = 0){
    return Math.floor(Math.random() * (max - min)) + min
}
