class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle;
    statusBar = new Statusbar();
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() { 
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if( this.character.isColliding(enemy) ) {
                    this.character.hit();
                }
            });
        }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // das Canvas wird gelöscht


        this.ctx.translate(this.camera_x, 0);
        // dann werden Elemente direkt hinzugefügt
        this.addObjectsToMap(this.level.backgroundObjects); // damit Hintergrundobjekt erst hinzugefügt werden kann, zieht man nach vorne!
        this.addToMap(this.statusBar);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        

      
      
      
        // draw() wird immer wieder aufgerufen
        let self = this;   // das Bild wird durchgehend angezeigt!
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
           this.addToMap(o); 
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {                
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);   // translate() verursacht das Verschieben
        this.ctx.scale(-1, 1);             // scale() verursacht die Spiegelung
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}


