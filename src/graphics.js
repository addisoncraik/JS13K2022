///////////////////////////////////
///////////Handles Graphics////////
///////////////////////////////////


//loads graphics canvas into script
let canv = document.getElementById("graphics")
let gfx = canv.getContext("2d")
canv.width = window.innerWidth*5
canv.height = window.innerHeight*5

//Where all asset data is stored
let data = [
    {"d":"c #693535 1, c #482727 0 1, w 6, a 11 66 8 0 360 1 1, a 33 53 21 0 360 1 1, a 65 36 33 0 360 1 1, c #492727 0 1, a 120 53 20 0 360 1 1, c #482727 0 1, a 103 36 20 0 360 1 1, a 83 47 28 0 360 1 1, a 105 67 8 0 360 1 1, c #4d2929 0 1, a 53 65 12 0 360 1 1,","w":143,"h":80}, //dirt
    {"d":"c #4e4e4e 0 1, w 8, p M116 55L116 155M366 55L0 55M216 0L216 55M267 255L46 255M217 155L216 255M316 55L316 155M407 155L98 155 s,","w":407,"h":259},//tile1
    {"d":"c #4e4e4e 0 1, w 8, p M226 0L226 64M245 64L76 64M226 165L0 165M126 64L126 165 s,","w":245,"h":169},//tile2
    {"d":"c #4e4e4e 0 1, w 8, p M65 40L65 109M265 40L265 140M290 40L0 40M321 140L116 140M165 0L165 40M165 140L165 219 s,","w":321,"h":219},//tile3
    {"d":"c #4e4e4e 0 1, w 8, p M56 55L56 155M256 55L256 155M302 55L0 55M378 155L28 155M156 0L156 55M384 255L341 255L275 255M157 155L156 225M357 155L356 255 s,","w":384,"h":259},//tile4
    {"d":"c #4e4e4e 1, r 0 0 45 190 1, c #a37e3c 1, r 0 0 45 178 1, c #621c10 1, r 0 0 45 42 1, c #7a2d1a 1, r 0 0 45 30 1, r 0 50 45 5 1, r 0 70 45 5 1, r 12 58 17 5 1, r 18 61 5 9 1, r 0 62 6 5 1, r 34 62 6 5 1, r 40 54 5 13 1,","w":45,"h":190},//wall face
    {"d":"c #bababa 1, p M27 0L18 7L18 375C18 375 25 354 27 327L36 7Z f, c #737373 1, p M9 0L18 7L18 375C18 375 11 354 9 327L0 7Z f,","w":36,"h":375}, //sword blade
    {"d":"c #954b33 1, p M13 112L0 94C0 94 4 90 26 84C49 80 57 80 58 80C90 84 112 90 116 94L 103 112C90 96 76 88 58 91C58 91 40 88 26 96 f, c #782c19 1, p M44 83 L 49 0 L 65 0 L 72 83 f, c #954b33 1, r 40 77 36 8 1,","w":116,"h":112}, //hilt
    {"d":"c #a17c3b 1, a 12 7 7 0 360 1, c #b38432 1, a 12 16 12 0 360 1,","w":24,"h":28}, //pommel
    {"d":"c #cbb69d 1, p M90 165L30 190L0 152L47 129L90 165Z f,","w":95,"h":190}, //tunic Back

]


//fancy svg function (see: https://craiky.github.io/mini-svg/)
function svg(c,e,f){for(gfx.save(),gfx.translate(e,f),i=0;i<c.length;i++){var b=c[i],a=d(c,i);"p"==b?(b=new Path2D(a.join(" ")),"s"!=(a=a[a.length-1])[1]&&"s"!=a[0]||gfx.stroke(b),"f"==a[0]&&gfx.fill(b)):"w"==b?gfx.lineWidth=a:"g"==b?gfx.globalAlpha=a:"s"==b?gfx.shadowBlur=a:"c"==b?(parseInt(a[1])&&(gfx.fillStyle=a[0]),parseInt(a[2])&&(gfx.strokeStyle=a[0]),parseInt(a[3])&&(gfx.shadowColor=a[0]),i+=a[0].length+1):"a"==b?(gfx.beginPath(),gfx.arc(a[0],a[1],a[2],.01745*a[3],.01745*a[4]),parseInt(a[5])&&gfx.fill(),parseInt(a[6])&&gfx.stroke()):"r"==b?(gfx.beginPath(),gfx.rect(a[0],a[1],a[2],a[3]),parseInt(a[4])&&gfx.fill(),parseInt(a[5])&&gfx.stroke()):"<"==b?gfx.save():">"==b?gfx.restore():"t"==b?gfx.translate(a[0],a[1]):"q"==b&&gfx.rotate(.01745*a)}gfx.restore()}function d(a,b){return a.slice(b+2,a.indexOf(",",b+2)).split(" ")}



//////////////////////////////
//Should improve performance//
//////////////////////////////

function createSpriteSheet(){

    let x = 0;
    let y = 0;
    let nextY = 0;

    for(let i = 0; i<data.length;i++){

        if(x + data[i].w + 2 > canv.width){
            y = nextY
            x = 0
        }
        
        data[i].x = x
        data[i].y = y

        svg(data[i].d,x,y);

        x += data[i].w + 2

        if(data[i].h+y > nextY){
            nextY = data[i].h+y
        }
    }
}

let skinColors = ["#7a5229","#c67f54","#763a21","#431b14"]

function clothingVariations(){
    let featherColors = ["#631c0f","#272863","#440f57"]
    let armourColors = [["#7a5b23","#a47e3c"],["#4e4e4e","#767676"]]

    for(let aC = 0; aC < armourColors.length; aC++){
        for(let fC = 0; fC < featherColors.length; fC++){
            for(let sC = 0; sC < skinColors.length; sC ++){
                data.push({"d":"c "+skinColors[sC]+" 1, r 10 72 82 68 1, c "+featherColors[fC]+" 1, a 55 65 65 -126 60 1, c "+armourColors[aC][1]+" 1, c "+armourColors[aC][0]+" 0 1, w 4, p M52 34C27 34 6 52 2 77L2 101L15 101L15 77L45 77L45 125L89 125L102 125L102 77C98 52 77 34 52 34Z fs, c #ffffff 1, r 21 90 17 30 1, c #000000 1 1, r 20 99 15 19 1,","w":120,"h":140}) //head
            }
        }
    }

    for(let fC = 0; fC < featherColors.length; fC++){
        data.push({"d":"c #e6d9c6 1, p M41 0L72 0L92 92L90 114L90 165L47 138L0 153L12 121L12 89L41 0Z f, c "+featherColors[fC]+" 1, r 8 105 87 25 1,","w":95,"h":190}) //tunic Front
    }

    for(let sC = 0; sC < skinColors.length; sC ++){
        data.push({"d":"c #402d22 1, r 0 44 50 16 1, c "+skinColors[sC]+" 1, r 23 0 22 36 1, r 0 36 49 16 1, c #402d22 1, r 4 34 6 23 1, r 15 34 6 23 1, r 44 14 6 44 1, r 23 27 22 6 1, r 23 16 22 6 1, r 4 32 20 4 1, r 20 16 5 17 1,","w":50,"h":60}) //Foot
    }
}


//loads img data onto graphics canvas (function name deceiving)
clothingVariations()
createSpriteSheet()


//creates spritesheet from graphics canvas (hidden)
const spriteSheet = new Image
spriteSheet.src = canv.toDataURL("image/png")


//function for drawing assets (will probably need to add transformation functions for animations)
function draw(imgIndex,posX,posY,scale=1){
    let img = data[imgIndex]
    
    let sizeX = img.w*scale
    let sizeY = img.h*scale

    ctx.drawImage(spriteSheet, img.x, img.y, img.w, img.h, posX, posY, sizeX, sizeY)
}
