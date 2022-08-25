let minotaur = {
    x:10*map.ts,
    y:10*map.ts,
    width: 45,
    height: 90,
    health: 100,
    canTakeDmg: true,

    draw () {
        if(this.health > 0){
            ctx.fillStyle = "red"
            ctx.fillRect(this.x+map.x,this.y+map.y,this.width,this.height)
        }
    },
    AI () {

    },
    takeDamage (weapon) {
        if (weapon == 'sword') {
            this.health -= 100
        }
    },
    attack () {

    },
    dash () {

    },
}