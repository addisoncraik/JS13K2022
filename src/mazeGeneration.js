///////////////////////////////
////Handles Map Generation/////
///////////////////////////////


//Arrays for maze
let cells = []
let groups = []
let edges = []


//map object
let map = {
    ts:263,
    size:20,
    x:canvas.width/2 - 270,//*15,
    y:canvas.height/2 - 270,//*15,
    ws:45,
}


//cell class (this will basically control everything that is static)
class Cell{
    constructor(i,j,group){
        this.i = i //x
        this.j = j //y
        this.x = this.i*map.ts //x
        this.y = this.j*map.ts //y

        this.pattern = randInt(5)

        this.alpha = 1

        this.group = group
        this.edges = [1,1,0,0] //t,r,b,l
    }

    //draw stuff
    drawW(pos,d,e){
        if(Math.floor((player.y+player.height)/map.ts) == this.j-1 && this.i == Math.floor((player.x+player.width/2)/map.ts)){
            this.alpha -= 0.02
        }else if(this.alpha < 1){
            this.alpha += 0.02
        }

        if(e == 0){
            ctx.fillStyle = "#3e3e3e"
            ctx.fillRect(map.x+pos[0],map.y+pos[1],d[0],d[1])

            if(this.alpha < 0.3){
                this.alpha = 0.3
            }

            ctx.globalAlpha = this.alpha
        }
        

        if(e == 0 || e == 2){
            for(let i = pos[0]-1; i < pos[0]+d[0]; i+=44){
                draw(5,map.x+i,map.y+pos[1]-145)
            }
        }else{
            ctx.fillStyle = "#7a2d1a"
            ctx.fillRect(map.x+pos[0]-1,map.y+pos[1]-145,d[0]+2,d[1]-15)
            draw(5,map.x+pos[0],map.y+pos[1]+d[1]-190)
        }
        ctx.globalAlpha = 1
    }

    drawF(){
        if(this.pattern == 0){
            draw(1,map.x+this.x+map.ws,map.y+this.y+map.ws,.5)
        }
        if(this.pattern == 1){
            draw(2,map.x+this.x+map.ws,map.y+this.y+map.ws,.5)
        }
        if(this.pattern == 2){
            draw(3,map.x+this.x+map.ws,map.y+this.y+map.ws,.5)
        }
        if(this.pattern == 3){
            draw(4,map.x+this.x+map.ws,map.y+this.y+map.ws,.5)
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

    update () {
        this.x = this.i*map.ts //x
        this.y = this.j*map.ts //y

        this.drawF()

        let pos = [[this.x,this.y],[this.x+map.ts-map.ws,this.y],[this.x,this.y+map.ts-map.ws],[this.x,this.y]]
        let dimensions = [[map.ts,map.ws],[map.ws,map.ts+map.ws]]

        if(this.j == map.size-1){
            dimensions[1][1] = map.ts
        }

        for (let i = 0; i<this.edges.length;i++) {
            if (this.edges[i]) {
                collision(player,pos[i],dimensions[i%2]);
                this.drawW(pos[i],dimensions[i%2],i)
            } 

            if(Math.floor((player.y+player.height)/map.ts) == this.j){
                if(i == 1){
                    player.draw()
                }
            }
        }
    }
}


function collision(object, wallP, wallD) {

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
let mRoomR = 2.5//2

//Treasure room radius (cells)
let tRoomR = 1.5//1

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
