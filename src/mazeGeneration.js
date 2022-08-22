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
    size:30,
    x:canvas.width/2 - 15*250,
    y:canvas.height/2 - 15*250,
    ws:25,
}


//cell class (this will basically control everything that is static)
class Cell{
    constructor(i,j,group){
        this.i = i //x
        this.j = j //y
        this.x = this.i*map.ts+map.ts/2 //x
        this.y = this.j*map.ts+map.ts/2 //y

        this.group = group
        this.edges = [1,1,0,0] //t,r,b,l
    }


    //draw stuff
    draw(){
        for(let i = 0; i<this.edges.length; i++){
            ctx.save()
            ctx.translate(map.x+this.i*map.ts+map.ts/2, map.y+this.j*map.ts+map.ts/2)
            ctx.rotate(i*(Math.PI/2))
            if(this.edges[i]){
                ctx.fillStyle = "black"
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
        this.x = this.i*map.ts+map.ts/2 //x
        this.y = this.j*map.ts+map.ts/2 //y

        let pos = [[this.x-map.ts/2,this.y-map.ts/2],[this.x+map.ts/2-map.ws,this.y-map.ts/2],[this.x-map.ts/2,this.y+map.ts/2-map.ws],[this.x-map.ts/2,this.y-map.ts/2]]
        let dimensions = [[map.ts,map.ws],[map.ws,map.ts]]

        if(this.edges[1] && cells[this.i+1][this.j+1].edges[0]){
            dimensions[1][1]+=map.ws
        }

        for (let i = 0; i<this.edges.length;i++) {
            if (this.edges[i] == 1) {
                collision(player,pos[i],dimensions[i%2]);
            } 
        }
    }
}


function collision(object, wallP, wallD) {

    ctx.strokeStyle = "red"
    ctx.strokeRect(map.x+wallP[0],map.y+wallP[1],wallD[0],wallD[1])
    ctx.strokeRect(map.x+object.oldX,map.y+object.oldY,20,40)
    ctx.strokeStyle = "black"

    //moving right

    if(object.x - object.oldX > 0){
        

        if(object.x + object.width > wallP[0] && object.oldX + object.width <= wallP[0] && object.y+object.height > wallP[1] && object.y+object.height < wallP[1]+wallD[1]){

            object.xVel = 0;
            object.x = object.oldX = wallP[0] - object.width - 0.01;

            map.x = object.cX-object.x
            map.y = object.cY-object.y

            
            return;
        }

    }
    
    //moving left
    if (object.x - object.oldX < 0) {

        let right = wallP[0]+wallD[0]

        if (object.x < right && object.oldX >= right && object.y+object.height > wallP[1] && object.y+object.height < wallP[1]+wallD[1]) {

            object.xVel = 0;
            object.oldX = object.x = right + 0.01;
            map.x = object.cX-object.x
            map.y = object.cY-object.y

            return;

        }

    }

    //moving up
    if (object.y - object.oldY < 0 && ((object.x+object.width > wallP[0] && object.x+object.width < wallP[0]+wallD[0]) || (object.x > wallP[0] && object.x < wallP[0]+wallD[0]))) {

        let bottom = wallP[1]+wallD[1];

        if(object.y+object.height < bottom && object.oldY+object.height >= bottom){

            object.yVel = 0;
            object.oldY = object.y = bottom - object.height + 0.01;
            map.x = object.cX-object.x
            map.y = object.cY-object.y

            return
        }

    }
      
    //moving down
    if (object.y - object.oldY > 0) {

        if (object.y+object.height > wallP[1] && object.oldY+object.height <= wallP[1] && ((object.x+object.width > wallP[0] && object.x+object.width < wallP[0]+wallD[0]) || (object.x > wallP[0] && object.x < wallP[0]+wallD[0]))) {

            object.yVel = 0;
            object.oldY = object.y = wallP[1] - object.height - 0.01;
            map.x = object.cX-object.x
            map.y = object.cY-object.y

            return

        }

    }
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
let mRoomR = 2

//Treasure room radius (cells)
let tRoomR = 1

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
