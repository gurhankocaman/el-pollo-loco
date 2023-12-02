class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // das Canvas wird gelöscht


        this.ctx.translate(this.camera_x, 0);
        // dann werden Elemente direkt hinzugefügt
        this.addObjectsToMap(this.backgroundObjects); // damit Hintergrundobjekt erst hinzugefügt werden kann, zieht man nach vorne!
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
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
             this.ctx.save();
             this.ctx.translate(mo.width, 0);   // translate() verursacht das Verschieben
             this.ctx.scale(-1, 1);             // scale() verursacht die Spiegelung
             mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

}


