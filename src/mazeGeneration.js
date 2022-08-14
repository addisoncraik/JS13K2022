let cells = []
let groups = []
let edges = []

let mapSize = 30
let tileSize = 30


class Cell{
    constructor(i,j,group){
        this.i = i //x
        this.j = j //y

        this.group = group
        this.edges = [1,1,0,0] //t,r,b,l
    }


    //draw stuff
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

    //only used during generation
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

/////////////////
//generate maze//
/////////////////

for(let i = 0; i < mapSize; i++){
    cells.push([])
    for(let j = 0; j < mapSize; j++){

        //this is going to be used globally
        //create cells
        cells[i].push(new Cell(i,j,groups.length))
        

        //This is only needed during maze generation

        //create groups
        groups.push([cells[i][j]])

        //creates edges
        if(i+1 < mapSize){
            edges.push({i:i,j:j,s:1})
        }
        if(j-1 >= 0){
            edges.push({i:i,j:j,s:0})
        }
        if(i==0){
            cells[i][j].edges[3] = 1
        }
        if(j==mapSize-1){
            cells[i][j].edges[2] = 1
        }
    }
}

//Maze generation//
function removeWall(){
    while(groups.length > 1){
        let rE = randInt(edges.length)
        cells[edges[rE].i][edges[rE].j].remove(rE,edges[rE].s)
    }
}

removeWall()


//Carve Rooms//

//Minotaur room radius (cells)
let mRoomR = 3

//Treasure room radius (cells)
let tRoomR = 2

for(let i = 0; i < mapSize; i++){
    for(let j = 0; j < mapSize; j++){
        let mRoomL = [.5,.5]
        let tRoomL = [[1/6,1/6],[5/6,5/6],[1/6,5/6],[5/6,1/6]]

        if(findDistance(cells[i][j],mRoomL) < mRoomR){
            cells[i][j].edges = [0,0,0,0]
        }

        for(let t = 0; t < tRoomL.length; t++){
            if(findDistance(cells[i][j],tRoomL[t]) < tRoomR){
                cells[i][j].edges = [0,0,0,0]
            }
        }
    }
}

//Carve Exits//

cells[0][randInt(mapSize)].edges[3] = 0
cells[randInt(mapSize)][0].edges[0] = 0
cells[mapSize-1][randInt(mapSize)].edges[1] = 0
cells[randInt(mapSize)][mapSize-1].edges[2] = 0



//temporarily draws maze
ctx.clearRect(0,0,canvas.width,canvas.height)
for(let i = 0; i < mapSize; i++){
    for(let j = 0; j < mapSize; j++){
        cells[i][j].draw()
    }
}


//distance function
function findDistance(cell, point){
    let distX = mapSize*point[0]-cell.i
    let distY = mapSize*point[1]-cell.j

    return Math.sqrt(distX**2 + distY**2)
}

//helper function (will be global)
function randInt(max, min = 0){
    return Math.floor(Math.random() * (max - min)) + min
}
