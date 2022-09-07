//Where to store spritesheet
const spriteSheet = new Image

//Game Canvas
let canvas = document.getElementById("c")
let ctx = canvas.getContext("2d")

//Buffer Canvas
let canv = document.getElementById("g")
let gfx = canv.getContext("2d")

//Vignette Div
let v = document.getElementById("v")

//Arrays for maze
let cells;
let groups;
let edges;
let swords;
let npcs;

//map object
let map = {
    ts:263,
    size:20,
    x:700/2-(263*10),//*15,
    y:700/2-(263*10),//*15,
    ws:45,
    shake: false,
}

let menu = "m"

let click = 0

let sF = 1

let mute = false

let exitCoords;

//Where all asset data is stored
let data = [
    {"d":"c #693535 1, c #482727 0 1, w 6, a 11 66 8 0 360 1 1, a 33 53 21 0 360 1 1, a 65 36 33 0 360 1 1, c #492727 0 1, a 120 53 20 0 360 1 1, c #482727 0 1, a 103 36 20 0 360 1 1, a 83 47 28 0 360 1 1, a 105 67 8 0 360 1 1, c #4d2929 0 1, a 53 65 12 0 360 1 1,","w":143,"h":80}, //dirt
    {"d":"c #4e4e4e 0 1, w 8, p M116 55L116 155M366 55L0 55M216 0L216 55M267 255L46 255M217 155L216 255M316 55L316 155M407 155L98 155 s,","w":407,"h":259},//tile1
    {"d":"c #4e4e4e 0 1, w 8, p M226 0L226 64M245 64L76 64M226 165L0 165M126 64L126 165 s,","w":245,"h":169},//tile2
    {"d":"c #4e4e4e 0 1, w 8, p M65 40L65 109M265 40L265 140M290 40L0 40M321 140L116 140M165 0L165 40M165 140L165 219 s,","w":321,"h":219},//tile3
    {"d":"c #4e4e4e 0 1, w 8, p M56 55L56 155M256 55L256 155M302 55L0 55M378 155L28 155M156 0L156 55M384 255L341 255L275 255M157 155L156 225M357 155L356 255 s,","w":384,"h":259},//tile4
    {"d":"c #4e4e4e 1, r 0 0 45 190 1, c #a37e3c 1, r 0 0 45 178 1, c #621c10 1, r 0 0 45 42 1, c #7a2d1a 1, r 0 0 45 30 1, r 0 50 45 5 1, r 0 70 45 5 1, r 12 58 17 5 1, r 18 61 5 9 1, r 0 62 6 5 1, r 34 62 6 5 1, r 40 54 5 13 1,","w":45,"h":190},//wall face
    {"d":"c #ffffff 1 1, w 6, r 8 8 45 80 0 1, a 31 67 13 0 360 0 1, a 31 30 10 0 360 0 1, a 31 67 5 0 360 1,","w":61,"h":96}, //Speaker On
    {"d":"w 6, c #d21414 0 1, p M0 0L61 96 fs,","w":61,"h":96}, //Speaker Off
    {"d":"c #be392c 0 1, w 15, p M64 0L32 30 s, c #e2574c 0 1, p M0 0L32 30 s, c #ec9d5d 1, a 32 44 19 0 360 1, c #bf7131 0 1, w 4, a 32 44 12 0 360 1 1,","w":64,"h":64}, //Medal
    {"d":"c #525252 0 1, w 4, r 5 11 50 0 0 1, c #454545 1, a 22 11 7 0 360 1, r 5 32 50 0 0 1, a 41 32 7 0 360 1, r 7 53 50 0 0 1, a 30 53 7 0 360 1,","w":64,"h":64},//color wheel
    {"d":"c #bababa 1, p M27 0L18 7L18 375C18 375 25 354 27 327L36 7Z f, c #737373 1, p M9 0L18 7L18 375C18 375 11 354 9 327L0 7Z f,","w":36,"h":375}, //sword blade
    {"d":"c #954b33 1, p M13 112L0 94C0 94 4 90 26 84C49 80 57 80 58 80C90 84 112 90 116 94L 103 112C90 96 76 88 58 91C58 91 40 88 26 96 f, c #782c19 1, p M44 83 L 49 0 L 65 0 L 72 83 f, c #954b33 1, r 40 77 36 8 1,","w":116,"h":112}, //hilt
    {"d":"c #a17c3b 1, a 12 7 7 0 360 1, c #b38432 1, a 12 16 12 0 360 1,","w":24,"h":28}, //pommel
    {"d":"c #852610 1, r 75 160 73 22 1, c #a0472d 1, r 61 60 98 114 1, c #cbaf8c 1, p M23 0L0 77L85 129L82 72L39 59L23 0Z f, c #852610 1, r 135 122 45 45 1, c #6a1608 1, a 159 145 8 0 360 1, c #6a1608 0 1, w 6, a 128 99 13 0 230 0 1, p M110 80L150 105 s,","w":180,"h":180},//minotaur head
    {"d":"c #a0472d 1, p M26 0L91 0L100 152L41 145L0 60L26 0Z f, r 69 8 33 60 1, c #852610 1, r 79 118 23 15 1, r 77 97 23 15 1, r 73 76 26 15 1, c #251612 1, r 29 142 65 21 1, c #483127 1, r 81 138 24 57 1,","w":105,"h":195}, //minotaur body
    {"d":"c #664e4d 1, r 34 10 8 145 1, c #c57404 1, c #deb000 0 1, w 4, p M36 29C14 31 25 2 25 2C25 2-2 2 2 35C2 68 26 70 26 70C26 70 11 38 36 42C41 43 58 42 58 42L82 35L57 29C57 29 44 28 36 29Z fs, c #deb000 1, r 32 19 12 34 1, r 33 110 10 34 1,","w":88,"h":155},//minotaur axe
    {"d":"c #cbb69d 1, p M90 165L30 190L0 152L47 129L90 165Z f,","w":95,"h":190}, //tunic Back
]

//entity skin colors
let skinColors = ["#7a5229","#c67f54","#763a21","#431b14","#a0472d"]
let featherColors = ["#631c0f","#272863","#440f57"]
let armourColors = [["#7a5b23","#a47e3c"],["#4e4e4e","#767676"],["#784b40","#A57164"]]


let mainMenu = {
    buttons:[
        {t:"play",x:250,y:350,w:200,h:30,a:"bs"},
        {t:"controls",x:250,y:400,w:200,h:30,a:"htp"},
        {t:"credits",x:250,y:450,w:200,h:30,a:"c"},
        {t:"",x:250,y:500,w:70,h:70,a:"hs"},
        {t:"",x:380,y:500,w:70,h:70,a:"cc"},
    ],
    draw(){

        draw(8,250,500,70/64)
        draw(9,380,500,70/64)

        ctx.fillText("Labyrinth Of Death", 200, 20)

        dButtons(this.buttons)
    },
    update(){
        cButtons(this.buttons)
        //test
    },
}

let htpMenu = {
    buttons:[
        {t:"back",x:250,y:600,w:200,h:30,a:"m"}
    ],
    draw(){
        ctx.fillText("How to play", 200, 20)

        dButtons(this.buttons)
    },
    update(){
        cButtons(this.buttons)
    },
}

let hsMenu = {
    buttons:[
        {t:"back",x:75,y:600,w:200,h:30,a:"m"},
        {t:"reset",x:425,y:600,w:200,h:30,a:"!"}
    ],
    draw(){
        ctx.fillText("Highscores", 200, 20)

        dButtons(this.buttons)
    },
    update(){
        cButtons(this.buttons)
    },
}

let cMenu = {
    buttons:[
        {t:"back",x:250,y:600,w:200,h:30,a:"m"}
    ],
    draw(){
        ctx.fillText("Credits", 200, 20)

        dButtons(this.buttons)
    },
    update(){
        cButtons(this.buttons)
    },
}

let bsMenu = {
    draw(){

        ctx.fillText("BackStory", 200, 20)
    },
    update(){
        if(click){
            click = false
            startGame()
            //start game
        }
    },
}

let pMenu = {
    buttons:[
        {t:"Quit",x:75,y:600,w:200,h:30,a:"m"},
        {t:"Resume",x:425,y:600,w:200,h:30,a:""}
    ],
    draw(){
        ctx.fillText("Paused", 200, 20)

        dButtons(this.buttons)
    },
    update(){
        cButtons(this.buttons)
    },
}

let eMenu = {
    buttons:[
        {t:"Highscores",x:75,y:600,w:200,h:30,a:"hs"},
        {t:"Main Menu",x:425,y:600,w:200,h:30,a:"m"}
    ],
    draw(){
        ctx.fillText("Win", 200, 20)

        dButtons(this.buttons)
    },
    update(){
        cButtons(this.buttons)
    },
}

let ccMenu = {
    buttons:[
        {t:"Back",x:250,y:600,w:200,h:30,a:"m"},
        {t:"",x:120,y:250,w:70,h:70,a:"!",c:false},
        {t:"",x:120,y:345,w:70,h:70,a:"!",c:false},
        {t:"",x:120,y:440,w:70,h:70,a:"!",c:false}
    ],
    fC:0,
    sC:0,
    aC:0,

    offset:0,
    offsetVel:0.05,

    draw(){

        ctx.fillStyle = "gray"
        ctx.fillRect(0,400,700,300)

        draw(2,30,400)
        draw(3,500,500)

        for(let i = 0; i < 700; i+= 88){
            draw(5,i,30,2)
        }
        ctx.fillStyle = "black"
        ctx.globalAlpha = 0.3
        ctx.fillRect(0,0,700,700)
        ctx.globalAlpha = 1

        ctx.lineWidth = 4
        ctx.fillStyle = featherColors[this.fC]
        ctx.fillRect(120,250,70,70)
        ctx.fillStyle = armourColors[this.aC][1]
        ctx.fillRect(120,345,70,70)
        ctx.fillStyle = skinColors[this.sC]
        ctx.fillRect(120,440,70,70)

        ctx.save()
        ctx.translate(310,250)
        ctx.scale(2,2)

        ctx.globalAlpha = 0.2
        ctx.fillStyle = "#000000"
        ctx.fillRect(-10,127,65,20)
        ctx.globalAlpha = 1
    
        draw(16,0,30+this.offset,0.5)

        draw(56+this.sC,-4,110,0.5)
        draw(56+this.sC,16,110,0.5)

        draw(53+this.fC,0,30+this.offset,0.5)

        draw(17+this.aC*12+this.fC*4+this.sC,0,-20-this.offset,0.5)

        ctx.fillStyle = skinColors[this.sC]
        ctx.fillRect(16,71,18,18)

        ctx.restore()


        dButtons(this.buttons)
    },
    update(){

        if(this.buttons[1].c){
            this.fC ++
            this.buttons[1].c = false
        }

        if(this.buttons[2].c){
            this.aC ++
            this.buttons[2].c = false
        }

        if(this.buttons[3].c){
            this.sC ++
            this.buttons[3].c = false
        }

        if(this.aC > 2){
            this.aC = 0
        }
        if(this.fC > 2){
            this.fC = 0
        }
        if(this.sC > 3){
            this.sC = 0
        }

        if(Math.abs(this.offset) > 0.5){
            this.offsetVel = -this.offsetVel
        }

        this.offset += this.offsetVel

        cButtons(this.buttons)
    },
}

//resizes canvas
window.onresize = () => {
    v.style.width = v.style.height = canvas.width = canvas.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight
    sF = canvas.width/700
}

//set up & stuff
window.onload = () => {
    canv.width = window.innerWidth
    canv.height = window.innerHeight*10
    onresize()

    document.title = "Loading..."

    createSpriteSheet()


    gameLoop()
    document.title = "Labyrinth Of Death"
}


v.addEventListener("mousedown",inputStart)
v.addEventListener("mouseup",inputEnd)

window.addEventListener("keydown",keyDown)
window.addEventListener("keyup",keyUp)

function inputEnd(){
    click = 0;
}

function inputStart(e){
    e.preventDefault()
    if(e.which == 1 || e.which == 0){
        click = {
        x:(e.clientX-v.getBoundingClientRect().left)/sF,
        y:(e.clientY-v.getBoundingClientRect().top)/sF
        };
    }
}

function keyDown (event) {
    if (event.keyCode == 87) {
        player.up = true;
    }
    if (event.keyCode == 65) {
        player.left = true;
    }
    if (event.keyCode== 83) {
        player.down = true;
    }
    if (event.keyCode == 68) {
        player.right = true;
    }
    if (event.keyCode == 32){
        player.attack = true;
    }
}

function keyUp(event) {
    if (event.keyCode == 87){
        player.up = false;
    }
    if (event.keyCode == 65){
        player.left = false;
    }
    if (event.keyCode== 83){
        player.down = false;
    }
    if (event.keyCode == 68){
        player.right = false;
    }
    if (event.keyCode == 32){
        player.attack = false;
    }
}


//gameLoop
function gameLoop(){

    canvas.width ^= 0

    ctx.save()
    ctx.scale(sF,sF)

    if(map.shake){
        var dx = Math.random()*10;
        var dy = Math.random()*10;
        ctx.translate(dx, dy); 
    }

    switch(menu){
        case "m":
            mainMenu.draw()
            mainMenu.update()
            break;
        case "hs":
            hsMenu.draw()
            hsMenu.update()
            break;
        case "htp":
            htpMenu.draw()
            htpMenu.update()
            break;
        case "c":
            cMenu.draw()
            cMenu.update()
            break;
        case "bs":
            bsMenu.draw()
            bsMenu.update()
            break;
        case "p":
            pMenu.draw()
            pMenu.update()
            break;
        case "e":
            eMenu.draw()
            eMenu.update()
            break;
        case "cc":
            ccMenu.draw()
            ccMenu.update()
            break;
        case "":
            updateGame()
            drawGame()
            break;
    }

    draw(6,50,50,0.5)
    if(mute){
        draw(7,50,50,0.5)
    }

    ctx.restore()


    if(click){
        if(click.x > 50 && click.y > 50 && click.x < 80.5 && click.y < 98){
            mute = !mute
            click = 0
        }
    }

    window.requestAnimationFrame(gameLoop)
}


///////////////////////////
///Classes & Big Objects///
///////////////////////////

//map cell
class Cell{
    constructor(i,j,group){
        this.i = i //x
        this.j = j //y
        this.x = this.i*map.ts+map.x //x
        this.y = this.j*map.ts+map.y //y

        this.pattern = randInt(5)
        this.patternOffset = {x:randInt(50, -50),y:randInt(50, -50)}

        this.alphaT = 1

        this.alphaB = 1

        this.open = false
        this.exit = null

        this.group = group
        this.edges = [1,1,0,0] //t,r,b,l
        this.wallD = [[map.ts,map.ws],[map.ws,map.ts+map.ws]]
        this.wallP = []

        if(this.j == map.size-1){
            this.wallD[1][1] = map.ts
        }
    }

    //draw walls
    drawW(e){
        if(this.i == player.i && player.j == this.j-1){
            this.alphaT -= 0.02           
        }else if(this.i == player.i && player.j == this.j){
            this.alphaB -= 0.02
        }
        
        if(this.alphaT < 1){
            this.alphaT += 0.01
        }else if(this.alphaB < 1){
            this.alphaB += 0.01
        }
            

        if(this.alphaT < 0.3){
            this.alphaT = 0.3
        }

        if(this.alphaB < 0.3){
            this.alphaB = 0.3
        }

        let x = map.x+this.wallP[e][0]
        let y = map.y+this.wallP[e][1]
        let w = this.wallD[e%2][0]
        let h = this.wallD[e%2][1]

        if(e == 0 || e == 2){

            ctx.fillStyle = "#3e3e3e"
            if(this.exit == e){
                ctx.fillRect(x,y-145,w,h)
                ctx.globalAlpha = 1
                return
            }

            if(this.alphaT < 1 || this.alphaB < 1){
                ctx.fillRect(x,y,w,h)
            }

            if(e==0){
                ctx.globalAlpha = this.alphaT
            }

            if(e==2){
                ctx.globalAlpha = this.alphaB
            }

            for(let i = this.wallP[e][0]-1; i < this.wallP[e][0]+w; i+=44){
                draw(5,map.x+i,y-145)
            }
        }else{
            ctx.fillStyle = "#7a2d1a"

            if(this.exit == e){
                ctx.fillStyle = "#3e3e3e"
            }

            ctx.fillRect(x-1,y-145,w+2,h-15)

            draw(5,x,y+h-190)
        }

        ctx.globalAlpha = 1
    }
    drawF(){
        if(this.pattern > 3){
            return
        }
        
        let x = map.x+this.x+map.ts/2+this.patternOffset.x
        let y = map.y+this.y+map.ts/2+this.patternOffset.y


        if(this.pattern == 0){
            x -= 102
            y -= 65
        }
        if(this.pattern == 1){
            x -= 62
            y -= 42
        }
        if(this.pattern == 2){
            x -= 80
            y -= 55
        }
        if(this.pattern == 3){
            x -= 96
            y -= 65
        }

        draw(this.pattern+1,x,y,.5)
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

    //updates cell
    update(){
        this.x = this.i*map.ts //x
        this.y = this.j*map.ts //y

        this.wallP = [[this.x,this.y],[this.x+map.ts-map.ws,this.y],[this.x,this.y+map.ts-map.ws],[this.x,this.y]]

        for (let i = 0; i<this.edges.length;i++) {
            if (this.edges[i] && !this.open) {
                this.collision(player, i)
            }
        }
    }

    //handles collision with player
    collision(object, e) {

        let wallP = this.wallP[e]
        let wallD = this.wallD[e%2]

        //moving right

        if(object.x - object.oldX > 0){
            

            if(object.x + object.width > wallP[0] && object.oldX + object.width <= wallP[0] && object.y+object.height > wallP[1] && object.y+object.height < wallP[1]+wallD[1]){

                object.xVel = 0;
                object.x = object.oldX = wallP[0] - object.width - 0.01;

                map.x = object.cX-object.x
                map.y = object.cY-object.y

                if(this.exit == 1 && key.collect){
                    for(let i =0; i<exitCoords.length; i++){
                        cells[exitCoords[i][0]][exitCoords[i][1]].open = true
                    }
                    map.shake = true
                    setTimeout(()=>{map.shake=false},1500)
                }
                
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

                if(this.exit == 3 && key.collect){
                    for(let i =0; i<exitCoords.length; i++){
                        cells[exitCoords[i][0]][exitCoords[i][1]].open = true
                    }
                    map.shake = true
                    setTimeout(()=>{map.shake=false},1500)
                }

                return;

            }

        }

        //moving up
        if (object.y - object.oldY < 0 && ((object.x+object.width > wallP[0] && object.x+object.width < wallP[0]+wallD[0]) || (object.x > wallP[0] && object.x < wallP[0]+wallD[0]))) {

            let bottom = wallP[1]+wallD[1]+2;

            if(object.y+object.height < bottom && object.oldY+object.height >= bottom){

                object.yVel = 0;
                object.oldY = object.y = bottom - object.height + 0.01;

                map.x = object.cX-object.x
                map.y = object.cY-object.y

                if(this.exit == 0 && key.collect){
                    for(let i =0; i<exitCoords.length; i++){
                        cells[exitCoords[i][0]][exitCoords[i][1]].open = true
                    }
                    map.shake = true
                    setTimeout(()=>{map.shake=false},1500)
                }

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

                if(this.exit == 2 && key.collect){
                    for(let i =0; i<exitCoords.length; i++){
                        cells[exitCoords[i][0]][exitCoords[i][1]].open = true
                    }
                    map.shake = true
                    setTimeout(()=>{map.shake=false},1500)
                }

                return

            }

        }
        }

    //gets walls for drawing
    getWalls () {
        let walls = []

        for (let i = 0; i<this.edges.length;i++) {
            if (this.edges[i]) {
                if(isInBounds(this.wallP[i][0],this.wallP[i][1]-145,this.wallD[i%2][0],this.wallD[i%2][1]+145)){
                    walls.push({y:this.wallP[i][1]+this.wallD[i%2][1],t:"w",i:this.i,j:this.j,e:i})
                }
            }
        }

        return walls
    }
}

//Player
let player = {

    up:false,
    down:false,
    left:false,
    right:false,

    x: 0,
    y: 0,

    i:0,
    j:0,

    cX: 700/2-22.5,
    cY: 700/2-70,

    oldX: 0,
    oldY: 0,

    width: 45,
    height: 140,

    acc: 0.5,
    fric: 0.87,

    attack: false,
    lastDir: "",

    xVel: 0,
    yVel: 0,

    health: 3,

    offset:0,
    offsetVel: 0.07,

    legRotation:0,
    legVel:2,

    armRotation:0,
    armVel:0.7,

    sC:0,
    fC:0,
    aC:0,

    dead:false,

    canHit: true,

    draw () {

        ctx.save()
        ctx.translate(this.cX,this.cY)

        if(this.lastDir == "right"){
            ctx.translate(this.width,0)
            ctx.scale(-1,1)
        }

        draw(16,0,30+this.offset,0.5)



        ctx.globalAlpha = 0.2
        ctx.fillStyle = "#000000"
        ctx.fillRect(-10,127,65,20)
        ctx.globalAlpha = 1
        


        ctx.save()
        ctx.translate(10,100)
        ctx.rotate(this.legRotation*(Math.PI/180))

        draw(56+this.sC,-14,10,0.5)
        ctx.restore()

        ctx.save()
        ctx.translate(33,100)
        ctx.rotate(-this.legRotation*(Math.PI/180))

        draw(56+this.sC,-17,10,0.5)
        ctx.restore()



        draw(53+this.fC,0,30+this.offset,0.5)
        draw(17+this.aC*12+this.fC*4+this.sC,0,-20-this.offset,0.5)

        
        for(let i = 0; i < 3; i++){
            if(swords[i].collect){
                swords[i].draw()
            }
        }

        ctx.save()
        ctx.fillStyle = skinColors[this.sC]

        if(swords[0].collect || swords[1].collect || swords[2].collect){
            ctx.translate(-10,80)
            ctx.rotate(Math.sign(swords[0].rotate)*-swords[0].rotate*(Math.PI/180))
            ctx.fillRect(-9,-9,18,18)
        }else{
            ctx.translate(25,40)
            ctx.rotate(-this.armRotation*(Math.PI/180))
            ctx.fillRect(-9,31,18,18)
        }
        ctx.restore()

        
        ctx.restore()
        
    },
    move () {

        this.oldX = this.x;// Set the old position to the current position
        this.oldY = this.y;// before we update the current position, thus making it current

        this.x = this.cX-map.x
        this.y = this.cY-map.y

        this.i = Math.floor((this.x+this.width/2)/map.ts)
        this.j = Math.floor((this.y+this.height)/map.ts)

        if (this.down) { this.yVel += this.acc;}

        if (this.left) { this.xVel -= this.acc;this.lastDir = "left"}

        if (this.right) { this.xVel += this.acc;this.lastDir = "right"}

        if (this.up) { this.yVel -= this.acc; }

        map.x -= this.xVel;// Update the current position
        map.y -= this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;

        if(this.up || this.down || this.left || this.right){
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
    },
    hit(){
        if(this.canHit){
            this.canHit = false
            map.shake = true
            console.log("hit")
            this.health --
            setTimeout(()=>{this.canHit = true;map.shake=false},1000)
        }
        
    },
    isDead(){
        if(this.health <= 0){
            this.dead = true
            //console.log("dead")
        }
    }
}

//Sword (Need to figure out w & h)
class Sword{
    constructor(i,j,c){
        this.x = i*map.ts
        this.y = j*map.ts

        this.component = c
        this.collect = false
        
        this.rotate = 0
        this.swing = true
        this.length = 165

        this.height = 100
        this.width = 58
    }

    collision(){

        if(player.x+player.width > this.x && player.x < this.x + this.width && player.y + player.height > this.y && player.y+player.height < this.y + this.height){
            this.collect = true
        }

        if(this.collect){
            this.x = -10
            this.y = 80

            if(!this.swing){
                this.rotate -= 4
            }

            if(Math.abs(this.rotate) == 104 || !player.attack){
                this.swing = false
            }

            if(this.rotate == 0){
                this.swing = true
            }

            if(player.attack && this.swing && swords[0].collect && swords[1].collect && swords[2].collect){
                this.rotate += 8
            }

            let sX = player.x-12
            let sY = player.y+80

            if(player.lastDir == "right"){
                sX = player.x+player.width+12
            }

            let pX = sX - Math.sin(-Math.sign(sX-player.x)*this.rotate*(Math.PI/180))*this.length
            let pY = sY - Math.cos(-Math.sign(sX-player.x)*this.rotate*(Math.PI/180))*this.length

            if(lineRect(sX,sY,pX,pY,minotaur.x,minotaur.y,minotaur.width,minotaur.height) && minotaur.canTakeDmg && this.rotate != 0){
                minotaur.health -= 20
                minotaur.canTakeDmg = false
                setTimeout(()=>{minotaur.canTakeDmg = true},750)
            }
        }
    }
    draw(){
        ctx.save()

        if(this.collect){
            ctx.translate(this.x,this.y)
            ctx.scale(0.4,-0.4)
            ctx.rotate(this.rotate*(Math.PI/180))
        }else{
            ctx.translate(map.x+this.x,map.y+this.y)
            ctx.scale(0.4, 0.4)
        }

        ctx.shadowColor = '#b38432';
        ctx.shadowBlur = 10;
        
        if(this.component == 0){
            if(this.collect){
                draw(10,-18,30)
            }else{
                this.height = 147
                ctx.save()
                ctx.rotate(-.17)
                draw(10,20,5)
                ctx.restore()
                ctx.shadowBlur = 0;
                
                draw(0,0,285)
            }
            
        }
        if(this.component == 1){
            if(this.collect){
                draw(11, -58, -40)
            }else{
                this.height = 49
                draw(11,20,0)
                ctx.shadowBlur = 0;
                draw(0,0,40)
            }
        }
        
        if(this.component == 2){
            if(this.collect){
                draw(12,-12,-65)
            }else{
                this.height = 40
                draw(12,50,0)
                ctx.shadowBlur = 0;
                draw(0,0,20)
            }
        }
        ctx.restore()
    }
}

//key (still needs a lot of work)
let key = {
    x:0,
    y:0,

    height: 20,
    width: 60,

    collect: false,   

    draw(){
        ctx.fillStyle = "aqua"
        ctx.fillRect(map.x+this.x,map.y+this.y,60,20)
    },

    collision(){
        if(player.x+player.width > this.x && player.x < this.x + 60 && player.y + player.height > this.y && player.y+player.height < this.y + 20){
            this.collect = true
        }

        if(this.collect){
            this.x = player.x
            this.y = player.y
        }
    }
}

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
        this.fC = randInt(3)
        this.aC = randInt(3)

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

            draw(16,0,30+this.offset,0.5)


            ctx.globalAlpha = 0.2
            ctx.fillStyle = "#000000"
            ctx.fillRect(-10,127,65,20)
            ctx.globalAlpha = 1

            ctx.shadowColor = '#0000004d';
            ctx.shadowBlur = 3;



            ctx.save()
            ctx.translate(10,100)
            ctx.rotate(this.legRotation*(Math.PI/180))

            draw(56+this.sC,-14,10,0.5)
            ctx.restore()

            ctx.save()
            ctx.translate(33,100)
            ctx.rotate(-this.legRotation*(Math.PI/180))

            draw(56+this.sC,-17,10,0.5)
            ctx.restore()


            ctx.shadowBlur = 0;

            draw(53+this.fC,0,30+this.offset,0.5)
            draw(17+this.aC*12+this.fC*4+this.sC,0,-20-this.offset,0.5)

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

    hit(){
        this.dead = true
        console.log("NPC Dead")
    }
}

let minotaur = {
    x:0,
    y:0,

    i:0,
    j:0,

    width: 80,
    height: 250,

    health: 100,
    canTakeDmg: true,

    dir:undefined,

    xVel:0,
    yVel:0,

    fric:0.8,
    acc:0.5,

    target:player,
    path:[],
    destination:{x:0,y:0},
    lastDir: "",

    offset:0,
    offsetVel: 0.07,

    legRotation:0,
    legVel:2,

    axeRotation:0,
    swing:false,
    dead: false,

    draw () {
        if(this.health > 0){
            ctx.save()
            ctx.translate(this.x+map.x,this.y+map.y)

            if(this.lastDir == "left"){
                ctx.translate(this.width,0)
                ctx.scale(-1,1)
            }

            ctx.globalAlpha = 0.2
            ctx.fillStyle = "#000000"
            ctx.fillRect(0,260,90,30)
            ctx.globalAlpha = 1

            ctx.fillStyle = "#a0472d"

            ctx.save()
            ctx.scale(-1,1)
            ctx.translate(-50,190)
            ctx.rotate(this.legRotation*(Math.PI/180))
            ctx.fillRect(5,5,18,40)
            draw(60,-14,40,0.8)
            ctx.restore()

            ctx.save()
            ctx.scale(-1,1)
            ctx.translate(-65,190)
            ctx.rotate(-this.legRotation*(Math.PI/180))
            ctx.fillRect(1,5,18,40)
            draw(60,-17,40,0.8)
            ctx.restore()

            draw(14,-5,83-this.offset,0.75)


            draw(13,-40,-40+this.offset,0.7)




            ctx.save()
            ctx.scale(-1,1)
            ctx.translate(-105,140)
            ctx.rotate(-this.axeRotation*(Math.PI/180))

            draw(15,-45,-140-this.offset,1.1)

            ctx.fillRect(-15,-15,30,30)
            
            ctx.restore()

            ctx.restore()
        }
    },
    axeSwing(){
        let hX = this.x+105
        let hY = this.y+140
        
        if(this.lastDir == "left"){
            hX -= 210-this.width
        }

        let aX = hX - Math.sin(this.axeRotation*(Math.PI/180))*105
        let aY = hY - Math.cos(this.axeRotation*(Math.PI/180))*105

        if(this.swing == false){
            if(circleRect(this.x+105,hY,70,this.target.x,this.target.y,this.target.width,this.target.height)){
                //if(this.axeRotation == 0 && this.target.x+this.target.width > this.x+105){
                    this.swing = true
                    this.lastDir = "right"
                //}
            }else if(circleRect(this.x-105+this.width,hY,70,this.target.x,this.target.y,this.target.width,this.target.height)){
                //if( && this.target.x < this.x-105+this.width){
                    this.swing = true
                    this.lastDir = "left"
                //}
            }
        }
        

        if(this.axeRotation == 360){
            this.axeRotation = 0
            this.swing = null
            setTimeout(()=>{this.swing = false},300)
            
        }

        if(this.swing){
            this.axeRotation += 8


            if(circleRect(aX,aY,30,this.target.x,this.target.y,this.target.width,this.target.height)){
                this.target.hit()
            }

        }
    },
    AI () {

        //Finding target
        let closestNPC = {d:100}

        for(let i =0; i<npcs.length; i++){
            if(findDistance(npcs[i],this) < closestNPC.d && !npcs[i].escape && !npcs[i].dead){
                closestNPC = {d:findDistance(npcs[i],this), t:npcs[i]}
            }
        }

        if(closestNPC.d < findDistance(player,this) || player.dead){
            this.target = closestNPC.t
        }else{
            this.target = player
        }

        if(this.target.escape || this.target.dead){
            this.dir = undefined
        }


        //Path finding

        if(this.dir == undefined){
            if(this.target.i >= 0 && this.target.i < map.size && this.target.j >= 0 && this.target.j < map.size){
                this.path = aStar([this.i,this.j],[this.target.i,this.target.j])
                this.path.pop()
            }
        }

        if(this.path.length > 0 && this.dir == undefined){
            let nextTile = this.path[this.path.length-1]

            if(nextTile.j != this.j){
                this.destination.y = (nextTile.j+0.5)*map.ts
            }

            if(nextTile.i != this.i){
                this.destination.x = (nextTile.i+0.5)*map.ts
            }

            this.dir = {x:0,y:0}
        }


        //Chasing
        if(this.dir != undefined){

            if(this.x+this.width/2 > this.destination.x-20 && this.x+this.width/2 < this.destination.x+20){
                
            }else{
                if(this.destination.x < this.x+this.width/2){
                    this.dir.x = "l"
                }
                if(this.destination.x > this.x+this.width/2){
                    this.dir.x = "r"
                }
            }
            
            if(this.y+this.height > this.destination.y-20 && this.y+this.height < this.destination.y+20){
                
            }else{
                if(this.destination.y > this.y+this.height){
                    this.dir.y = "d"
                }
        
                if(this.destination.y < this.y+this.height){
                    this.dir.y = "u"
                }
            }

            if(this.x+this.width/2 > this.destination.x-20 && this.y+this.height > this.destination.y-20 && this.x+this.width/2 < this.destination.x+20 && this.y+this.height < this.destination.y+20){
                if(this.path.length > 0){
                    this.dir = undefined
                    this.path.splice(this.path.length-1,1)
                }
            }
        }
    },

    move(){

        if(this.dir != undefined){
            this.legRotation += this.legVel
        }else{
            if(this.legRotation > 0){
                this.legRotation -= Math.abs(this.legVel)
            }

            if(this.legRotation < 0){
                this.legRotation += Math.abs(this.legVel)
            }
        }

        if(Math.abs(this.legRotation) > 25){
            this.legVel = -this.legVel
        }

        if(Math.abs(this.offset) > 1){
            this.offsetVel = -this.offsetVel
        }

        this.offset += this.offsetVel




        if(this.dir == undefined){
            return
        }

        if (this.dir.y == "u") { this.yVel -= this.acc; }

        if (this.dir.x == "r") { this.xVel += this.acc; this.lastDir = "right"}

        if (this.dir.y == "d") { this.yVel += this.acc; }

        if (this.dir.x == "l") { this.xVel -= this.acc; this.lastDir = "left"}

        this.x += this.xVel;// Update the current position
        this.y += this.yVel;

        this.xVel *= this.fric;
        this.yVel *= this.fric;


        this.i = Math.floor((this.x+this.width/2)/map.ts)
        this.j = Math.floor((this.y+this.height)/map.ts)


    },
}

////////////////////
//Helper Functions//
////////////////////

//Svg Function
function svg(c,e,f){for(gfx.save(),gfx.translate(e,f),i=0;i<c.length;i++){var b=c[i],a=d(c,i);"p"==b?(b=new Path2D(a.join(" ")),"s"!=(a=a[a.length-1])[1]&&"s"!=a[0]||gfx.stroke(b),"f"==a[0]&&gfx.fill(b)):"w"==b?gfx.lineWidth=a:"g"==b?gfx.globalAlpha=a:"s"==b?gfx.shadowBlur=a:"c"==b?(parseInt(a[1])&&(gfx.fillStyle=a[0]),parseInt(a[2])&&(gfx.strokeStyle=a[0]),parseInt(a[3])&&(gfx.shadowColor=a[0]),i+=a[0].length+1):"a"==b?(gfx.beginPath(),gfx.arc(a[0],a[1],a[2],.01745*a[3],.01745*a[4]),parseInt(a[5])&&gfx.fill(),parseInt(a[6])&&gfx.stroke()):"r"==b?(gfx.beginPath(),gfx.rect(a[0],a[1],a[2],a[3]),parseInt(a[4])&&gfx.fill(),parseInt(a[5])&&gfx.stroke()):"<"==b?gfx.save():">"==b?gfx.restore():"t"==b?gfx.translate(a[0],a[1]):"q"==b&&gfx.rotate(.01745*a)}gfx.restore()}function d(a,b){return a.slice(b+2,a.indexOf(",",b+2)).split(" ")}
//creates spriteSheet data
function createSpriteSheet(){

    clothingVariations()

    let x = 0;
    let y = 0;
    let nextY = 0;

    for(let i = 0; i<data.length;i++){

        if(x + data[i].w + 10 > canv.width){
            y = nextY
            x = 0
        }
        
        data[i].x = x
        data[i].y = y

        svg(data[i].d,x,y);

        x += data[i].w + 10

        if(data[i].h+y+10 > nextY){
            nextY = data[i].h+y+10
        }
    }

    spriteSheet.src = canv.toDataURL("image/png")
}
//creates clothing variation
function clothingVariations(){
    for(let aC = 0; aC < 3; aC++){
        for(let fC = 0; fC < 3; fC++){
            for(let sC = 0; sC < 4; sC ++){
                data.push({"d":"c "+skinColors[sC]+" 1, r 10 72 82 68 1, c "+featherColors[fC]+" 1, a 55 65 65 -126 60 1, c "+armourColors[aC][1]+" 1, c "+armourColors[aC][0]+" 0 1, w 4, p M52 34C27 34 6 52 2 77L2 101L15 101L15 77L45 77L45 125L89 125L102 125L102 77C98 52 77 34 52 34Z fs, c #ffffff 1, r 21 90 17 30 1, c #000000 1 1, r 20 99 15 19 1,","w":120,"h":140}) //head
            }
        }
    }

    for(let fC = 0; fC < 3; fC++){
        data.push({"d":"c #e6d9c6 1, p M41 0L72 0L92 92L90 114L90 165L47 138L0 153L12 121L12 89L41 0Z f, c "+featherColors[fC]+" 1, r 8 105 87 25 1,","w":95,"h":190}) //tunic Front
    }

    for(let sC = 0; sC < 5; sC ++){
        data.push({"d":"c #402d22 1, r 0 44 50 14 1, c "+skinColors[sC]+" 1, r 23 0 22 36 1, r 0 36 49 16 1, c #402d22 1, r 4 34 6 23 1, r 15 34 6 23 1, r 44 14 6 44 1, r 23 27 22 6 1, r 23 16 22 6 1, r 4 32 20 4 1, r 20 16 5 17 1,","w":50,"h":60}) //Foot
    }
}
//actual function we call to draw stuff on game canvas
function draw(imgIndex,posX,posY,scale=1){
    let img = data[imgIndex]
    
    let sizeX = img.w*scale
    let sizeY = img.h*scale

    ctx.drawImage(spriteSheet, img.x, img.y, img.w, img.h, posX, posY, sizeX, sizeY)
}




//draw buttons
function dButtons(b){
    b.forEach(button => {
        ctx.strokeRect(button.x,button.y,button.w,button.h)
    });
}

//collision for buttons
function cButtons(b){
    b.forEach(button => {
        if(click){
            if(click.x > button.x && click.x < button.x+button.w && click.y > button.y && click.y < button.y+button.h){
                
                if(button.a == "!"){
                    button.c = true
                    click = 0
                }else{
                    menu = button.a
                    click = 0
                }

                
            }
        }
    });
}




//generates map
function generateMap(){
    cells = []
    groups = []
    edges = []

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
    while(groups.length > 1){
        let rE = randInt(edges.length)
        cells[edges[rE].i][edges[rE].j].remove(rE,edges[rE].s)
    }


    //Carve Rooms//

    //Minotaur room radius (cells)
    let mRoomR = 2.5
    //Treasure room radius (cells)
    let tRoomR = 1.5

    for(let i = 0; i < map.size; i++){
        for(let j = 0; j < map.size; j++){
            let tRoomL = [{i:3,j:3},{i:16,j:16},{i:3,j:16},{i:16,j:3}]

            if(findDistance(cells[i][j],{i:10,j:10}) < mRoomR){
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

    exitCoords = [
        [randInt(map.size),0],
        [map.size-1,randInt(map.size)],
        [randInt(map.size),map.size-1],
        [0,randInt(map.size)]
    ]

    for(let i =0; i<exitCoords.length; i++){
        cells[exitCoords[i][0]][exitCoords[i][1]].exit = i
    }

    //finds GScore for every cell
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
        }
    }
}

//distance function
function findDistance(cell, point){
    let distX = point.i-cell.i
    let distY = point.j-cell.j

    return Math.sqrt(distX**2 + distY**2)
}

//RNG
function randInt(max, min = 0){
    return Math.floor(Math.random() * (max - min)) + min
}




//aStar Function
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
    
                neighbour[i].f  = findDistance(neighbour[i],end) + neighbour[i].g //getting f value
                neighbour[i].previous = currentCell; //used for end pathing
            }
        }
    } 
}
//Finds valid surrounding Cells
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



//Collision Functions

//line with rectangle
function lineRect(x1,y1,x2,y2,rx,ry,rw,rh){
    let left = lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh)
    let right = lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh)
    let top = lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry)
    let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh)

    if (left || right || top || bottom) {
        return true;
    }
    
    return false;
}
//line with line
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
//circle with rectangle
function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;

    // which edge is closest?
    if (cx < rx){testX = rx;}      // test left edge
    else if (cx > rx+rw){testX = rx+rw;}   // right edge

    if (cy < ry){testY = ry;}   // top edge
    else if (cy > ry+rh){testY = ry+rh;}   // bottom edge

    // get distance from closest edges
    let distX = cx-testX;
    let distY = cy-testY;
    let distance = Math.sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the radius, collision!
    if (distance <= radius) {
        return true;
    }
    return false;
}


//starts game
function startGame(){
    //character stuff
    player.health = 3
    player.dead = false
    player.fC = ccMenu.fC
    player.aC = ccMenu.aC
    player.sC = ccMenu.sC

    player.i = 10 + randInt(2,-1)
    player.j = 10 + randInt(2,-1)
    player.x = player.oldX = (player.i+0.5)*map.ts - player.width/2
    player.y = player.oldY = (player.j+0.5)*map.ts - player.height

    //sword stuff
    swords = []

    let sPos = [[1/6,1/6],[5/6,5/6],[1/6,5/6],[5/6,1/6]]

    for(let i = 0; i < 3; i++){
        let j = randInt(sPos.length)
        swords.push(new Sword(map.size*sPos[j][0], map.size*sPos[j][1],i))
        sPos.splice(j,1)
    }
    //key stuff
    key.x = sPos[0][0]*map.size*map.ts
    key.y = sPos[0][1]*map.size*map.ts

    //minotaur stuff
    minotaur.health = 100
    minotaur.i = minotaur.j = 10
    minotaur.target = player
    minotaur.path = []
    minotaur.dead = false
    minotaur.destination.x = minotaur.destination.y = minotaur.x = minotaur.y = 10.5*map.ts
    minotaur.x -= minotaur.width/2
    minotaur.y -= minotaur.height

    //npc stuff
    npcs = []

    for(let i = 0; i < 20; i++){
        npcs.push(new NPC(randInt(map.size),randInt(map.size),0))
    }

    //map stuff
    map.x = map.y = 350-(263*(player.i+.5))
    map.y = 350-(263*(player.j+.5))
    
    generateMap()

    menu = ""
}
//draws game
function drawGame(){

    //base layer (no draw order)
    ctx.fillStyle = "gray"
    ctx.fillRect(map.x,map.y,map.size*map.ts,map.size*map.ts)

    for(let i =0; i<map.size; i++){
        for(let j = 0; j<map.size; j++){
            cells[i][j].drawF()
        }
    }

    //everything after this has a draw order

    let drawableObjects = collectDrawableObjects() //returns {y,type,index if needed, i/j/edge if needed}

    //draw objects
    drawableObjects.forEach((dObject)=>{
        switch(dObject.t){
            case "p":
                player.draw()
                break
            case "s":
                swords[dObject.i].draw()
                break
            case "k":
                key.draw()
                break
            case "m":
                minotaur.draw()
                break
            case "n":
                npcs[dObject.i].draw()
                break
            case "w":
                cells[dObject.i][dObject.j].drawW(dObject.e)
                break
        }
    })
}
//updates game
function updateGame(){

    player.move()
    player.isDead()

    for(let i =0; i<map.size; i++){
        for(let j = 0; j<map.size; j++){
            cells[i][j].update()
        }
    }

    minotaur.axeSwing()
    //minotaur.AI()
    //minotaur.move()

    key.collision()

    npcs.forEach((npc)=>{
        npc.move()
        npc.AI()
    })

    swords.forEach((sword)=>sword.collision())
}



//collects drawable objects and orders them
function collectDrawableObjects(){
    //needs x,y,w,h,type,index if multiple
    let dObjects = []

    //player
    dObjects.push({y:player.y+player.height,t:"p"})

    //sword pieces (if not collected)

    for(let i =0; i<3; i++){
        if(isInBounds(swords[i].x,swords[i].y,swords[i].width,swords[i].height)){
            dObjects.push({y:swords[i].y,t:"s",i:i})
        }
    }

    //key
    if(isInBounds(key.x,key.y,key.width,key.height)){
        dObjects.push({y:key.y+key.height,t:"k"})
    }

    //minotaur
    if(isInBounds(minotaur.x-70,minotaur.y-50,minotaur.width+140,minotaur.height+100)){
        dObjects.push({y:minotaur.y+minotaur.height+25,t:"m"})
    }

    //npcs
    for(let i =0; i<npcs.length; i++){
        if(isInBounds(npcs[i].x,npcs[i].y-20,npcs[i].width,npcs[i].height+40)){
            dObjects.push({y:npcs[i].y+npcs[i].height,t:"n",i:i})
        }
    }

    //cell walls
    for(let i =0; i<map.size; i++){
        for(let j = 0; j<map.size; j++){
            dObjects.push(...cells[i][j].getWalls())
        }
    }

    return dObjects.sort((a,b)=>(a.y > b.y) ? 1 : -1)
}
//makes sure object is in canvas
function isInBounds(x,y,w,h){
    if(x+w+map.x > 0 && x+map.x < 700 && y+h+map.y > 0 && y+map.y < 700){
        return true
    }
    return false
}

//remove
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()