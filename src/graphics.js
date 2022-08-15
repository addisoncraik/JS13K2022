///////////////////////////////////
///////////Handles Graphics////////
///////////////////////////////////


//loads graphics canvas into script
let canv = document.getElementById("graphics")
let gfx = canv.getContext("2d")
canv.width = window.innerWidth
canv.height = window.innerHeight

//Where all asset data is stored
let data = []


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

        if(x + data[i].w > canv.width){
            y = nextY
            x = 0
        }
        
        data[i].x = x
        data[i].y = y

        svg(data[i].d,x,y);

        x += data[i].w

        if(data[i].h+y > nextY){
            nextY = data[i].h+y
        }
    }
}

//loads img data onto graphics canvas (function name deceiving)
createSpriteSheet()


//creates spritesheet from graphics canvas (hidden)
const spriteSheet = new Image
spriteSheet.src = canv.toDataURL("image/png")


//function for drawing assets (will probably need to add transformation functions for animations)
function draw(imgIndex,posX,posY,sizeX,sizeY){
    let img = data[imgIndex]
    ctx.drawImage(spriteSheet, img.x, img.y, img.w, img.h, posX, posY, img.w, img.h)
}

spriteSheet.onload = () => {
    //wait for sprite sheet to load
    //then can start draw loop
}