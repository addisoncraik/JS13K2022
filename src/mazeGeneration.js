///////////////////////////////
////Handles Map Generation/////
///////////////////////////////


//Arrays for maze
let cells = []
let groups = []
let edges = []


//map object
let map = {
    ts:250,
    size:2,
    x:canvas.width/2 - 30/2*20,
    y:canvas.height/2 - 30/2*20,
    ws:15,
}


//cell class (this will basically control everything that is static)
class Cell{
    constructor(i,j,group){
        this.i = i //x
        this.j = j //y
        this.x = map.x+this.i*map.ts+map.ts/2 //x
        this.y = map.y+this.j*map.ts+map.ts/2 //y

        this.group = group
        this.edges = [1,1,0,0] //t,r,b,l
    }


    //draw stuff
    draw(){
        for(let i = 0; i<this.edges.length; i++){
            ctx.strokeRect(this.x-map.ts/2,this.y-map.ts/2,map.ts,map.ts)
            ctx.save()
            ctx.translate(map.x+this.i*map.ts+map.ts/2, map.y+this.j*map.ts+map.ts/2)
            ctx.rotate(i*(Math.PI/2))
            if(this.edges[i]){
                ctx.fillRect(-map.ts/2,-map.ts/2,map.ts,map.ws)
            }
            ctx.restore()
        }
    }

    //only used during generation
    remove(edge, side){
        
        let neighbour = side ? cells[this.i+1][this.j] : cells[this.i][this.j-1]

        if(neighbour.group != this.group){
            this.edges[side] = 0
            edges.splice(edge,1)

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

            return
        }
    }
    collision () {
        for (let i = 0; i<edges.length;i++) {
  
            if (this.edges[3]) { // left side
                
                collisionWall(player,this, "left");
            } 
            if (this.edges[1]) { // right side
                collisionWall(player,this,"right")
                
            }

            if (this.edges[0]) { // top
                collisionWall(player,this,"top")
                
            }
            if (this.edges[2]) { // bottom
                collisionWall(player,this,"bot")
               
            }
        }
    }
}


function collisionWall(entity, wall,side) {

}

/////////////////
//generate maze//
/////////////////

for(let i = 0; i < map.size; i++){
    cells.push([])
    for(let j = 0; j < map.size; j++){

        //this is going to be used globally
        //create cells
        cells[i].push(new Cell(i,j,groups.length))
        

        //This is only needed during maze generation

        //create groups
        groups.push([cells[i][j]])

        //creates edges
        if(i+1 < map.size){
            edges.push({i:i,j:j,s:1})
        }
        if(j-1 >= 0){
            edges.push({i:i,j:j,s:0})
        }
        if(i==0){
            cells[i][j].edges[3] = 1
        }
        if(j==map.size-1){
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
let mRoomR = 0

//Treasure room radius (cells)
let tRoomR = 0

for(let i = 0; i < map.size; i++){
    for(let j = 0; j < map.size; j++){
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

cells[0][randInt(map.size)].edges[3] = 0
cells[randInt(map.size)][0].edges[0] = 0
cells[map.size-1][randInt(map.size)].edges[1] = 0
cells[randInt(map.size)][map.size-1].edges[2] = 0



function drawMap(){
//temporarily draws maze
ctx.clearRect(0,0,canvas.width,canvas.height)
for(let i = 0; i < map.size; i++){
    for(let j = 0; j < map.size; j++){
        cells[i][j].draw()
    }
}
}

drawMap()


//distance function
function findDistance(cell, point){
    let distX = map.size*point[0]-cell.i
    let distY = map.size*point[1]-cell.j

    return Math.sqrt(distX**2 + distY**2)
}

//helper function (will be global)
function randInt(max, min = 0){
    return Math.floor(Math.random() * (max - min)) + min
}
