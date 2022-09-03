function aStar (s,e) {// where the start is a cell and the end is a cell e.g. cells[0][0],cells[5][5]. Also start is not used at the moment, just put the starting cell in the openset array
    
    let aStarCells = []

    for (let i = 0;i<map.size;i++) {
        aStarCells.push([])
        for(let j = 0;j<map.size;j++){
            aStarCells[i].push({i:i,j:j,g:0,f:0,previous:null})
        }
    }

    let finished = false;

    let end = aStarCells[e[0]][e[1]]

    let openSet=[aStarCells[s[0]][s[1]]]
    let closedSet = []
    

    while(!finished) {
        
        let currentCell = openSet[0]

        for (let i = 1; i<openSet.length;i++) {
            if (openSet[i].f < currentCell.f) { //makes the current cell the cell with the lowest f value
                currentCell = openSet[i];
            }
        }

    
        if (currentCell == end){ //runs when aStar finds the end
    
            finished = true;
    
            let temp = currentCell //next 7 lines create the path by tracing back the previous cells
            
            let path = []
    
            path.push(temp)

    
            while (temp.previous) {
                path.push(temp.previous)
                temp = temp.previous
            }
    
            return path;
        }
    
    
        openSet.splice(openSet.indexOf(currentCell),1)//removes current cell from openSet
    
        closedSet.push(currentCell) //adds cell to closedcell cause its evaluated
    
        let neighbour = findSurroundingCells(cells[currentCell.i][currentCell.j],aStarCells) //this part evaluates the surrounding cells
    
        for (let i = 0;i<neighbour.length;i++) {
            if (!closedSet.includes(neighbour[i])) { //makes sure neighbour is not part of closedset
    
                let tempG = currentCell.g + 1; //sets g value
    
                if (openSet.includes(neighbour[i])) { //checks if neighbour is in openset and might reasign g value
                    if (tempG < neighbour[i].g) {
                        neighbour[i].g = tempG
                    } 
                } else { //if not, then the g value is just temp g and then pushes it into openset
                    neighbour[i].g = tempG
                    openSet.push(neighbour[i])
                }
    
                neighbour[i].f  = findDistanceToEnd(neighbour[i],end) + neighbour[i].g //getting f value
                neighbour[i].previous = currentCell; //used for end pathing
            }
        }
    } 
}


function findSurroundingCells (cell,aCells) { // finds neighbours
    let neighbouringCells = []
    
     // top right bottom left
    let dirs = []

    for(let i = 0; i < cell.edges.length; i++){
        if(!cell.edges[i]){
            dirs.push(i)
        }
    }

    if(cell.i > 0){
        if(cells[cell.i-1][cell.j].edges[1]){
            dirs.splice(dirs.indexOf(3),1)
        }
    }

    if(cell.j+1 < map.size){
        if(cells[cell.i][cell.j+1].edges[0]){
            dirs.splice(dirs.indexOf(2),1) 
        }
    }

    for (let i = 0;i<dirs.length;i++){
        if (dirs[i] == 0) {
            neighbouringCells.push(aCells[cell.i][cell.j-1])
        } else if (dirs[i] == 1) {
            neighbouringCells.push(aCells[cell.i+1][cell.j])
        } else if (dirs[i] == 2) {
            neighbouringCells.push(aCells[cell.i][cell.j+1])
        } else if (dirs[i] == 3) {
            neighbouringCells.push(aCells[cell.i-1][cell.j])
        }
    }
    return neighbouringCells
}


function findDistanceToEnd(cell1,cell2) {
    //distance = Math.sqrt(Math.pow(cell1.y-cell2.y,2)+Math.pow(cell1.x-cell2.x,2)) //This is the Euclidean distance
    let distance = Math.abs(cell1.i-cell2.i) + Math.abs(cell1.j-cell2.j)
    return distance;
}

function findGScoresForCells() {
    for (let i = 0;i<map.size;i++){
        for (let j = 0;j<map.size;j++) {

            let gScores = []; // this is the version where you find the g scores for all of the exits and then chooses the lowest one, very intensive
            
            if (!cells[i][j].exit) {
                for (let f=0;f<exitCoords.length;f++) {

                    gScores.push(aStar([i,j],exitCoords[f]).length)
                }
    
                gScores.sort((a,b)=>{
                    return a - b
                })
    
                cells[i][j].gScore = gScores[0]
            }

            /* openSet=[cells[i][j]] //this one calculates the heuristic value for the exits, chooses the one with the lowest then calculates g value for only that one exit 4x more effecient!
            let hScores = []; 
            for (let f=0;f<exits.length;f++) {
                if (cells[i][j] == exits[f]) {
                    continue;
                }
                hScores.push({cell:exits[f],h:Math.sqrt(Math.pow(cells[i][j].y-exits[f].y,2)+Math.pow(cells[i][j].x-exits[f].x,2))})
            }
            hScores.sort((a,b)=>{
                return a.h - b.h
            })
                while (!cells[i][j].gScore) {
                    let result = aStar(cells[i][j],hScores[0].cell)
                    if (result) {
                        cells[i][j].gScore = result.g
                    }
                        
                }
                closedSet = []
            for (let u = 0;u<cells.length;u++) {
                    for(let b = 0;b<cells.length;b++){
                        cells[u][b].g = 0;
                        cells[u][b].previous = undefined;
                    }
                } */
                
            
        }
    }
}