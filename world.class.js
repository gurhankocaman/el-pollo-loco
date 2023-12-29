class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle;
    statusBarCharacter = new StatusBarCharacter();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];
    collectedBottles = []; // Array for collected Bottles
    collectedCoins = []; // Array for collected coins
    bottleIsThrown = false;

   
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Set the world property of the Character object to this World instance.
     */
    setWorld() {
        this.character.world = this;  // Set the world property of the Character object to this World instance
    }

    /**
     * Run functions at intervals.
     */
    run() { 
        setInterval(() => {
            this.checkCollisionBottlesToCollect();
            this.checkCollisionCoinsToCollect();
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles.length > 0) { // If key D is pressed and value is contained in array, new bottle is pushed and thrown into array throwableObjects
            const characterOtherDirection = this.character.otherDirection;
            if (!characterOtherDirection) { // New bottle with drop coordinates of the character
                this.bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            }
            if (characterOtherDirection) { // New bottle with drop coordinates of the character if direction rotated
                this.bottle = new ThrowableObject(this.character.x - 50, this.character.y + 100);
            }
            this.throwableObjects.push(this.bottle);
            this.collectedBottles.pop(); // Remove a value from array after dropping it
            this.statusBarBottles.setBottles(this.collectedBottles.length); // Pass value to StatusBarBottles
            this.bottleIsThrown = true;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy)  => {
            if( this.character.isColliding(enemy) ) {
                this.character.hit();
                collision_enemies_sound.play();
                this.statusBarCharacter.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * Checks if the character collides with bottles that can be collected.
    */
    checkCollisionBottlesToCollect() {
        this.level.bottles.forEach((bottle, index) => { // With index of the element in the array
            if (this.character.isColliding(bottle)) { // Will only be executed if value does not yet exist
                if (!this.collectedBottles.includes(bottle)) {
                    this.collectedBottles.push(bottle);
                    collect_bootle_sound.play();
                    this.statusBarBottles.setBottles(this.collectedBottles.length); // Pass value to StatusBarBottles
                    this.level.bottles.splice(index, 1); // Remove the collided bottle from the array and remove image
                }
            }
        })
    }

    checkCollisionCoinsToCollect() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (!this.collectedCoins.includes(coin)) {
                    this.collectedCoins.push(coin);
                    collect_coin_sound.play();
                    this.statusBarCoins.setCoins(this.collectedCoins.length);
                    this.level.coins.splice(index, 1);
                }
            }
        })
    }

    checkCollisionEndbossThrownBottle() {
        let collisionEndboss = false;
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.endboss)) {
                collisionEndboss = true;
            }
        });
        if (collisionEndboss && !this.endbossHasBeenHit) {
            this.level.endboss.endbossHit();
            this.statusBarEndboss.setPercentage(this.level.endboss.energy);
            this.endbossHasBeenHit = true;
        }
        return collisionEndboss;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // das Canvas wird gelöscht


        this.ctx.translate(this.camera_x, 0);
        // dann werden Elemente direkt hinzugefügt
        this.addObjectsToMap(this.level.backgroundObjects); // damit Hintergrundobjekt erst hinzugefügt werden kann, zieht man nach vorne!
        
        this.ctx.translate(-this.camera_x, 0); 
        // ---- Space for fixed objects
        this.addToMap(this.statusBarCharacter);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        
        this.ctx.translate(this.camera_x, 0);
        
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
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
        objects.forEach(o => { // forEach works only with arrays, so objects need to be passed as an array
            this.addToMap(o); // Add each object to the map
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
        this.ctx.save(); // Save the current state of the context (drawn images)
        this.ctx.translate(mo.width, 0); // Translate the context by the character's width in the x direction
        this.ctx.scale(-1, 1); // Flip the x-axis to reverse the character
        mo.x = mo.x * -1; // Reverse the character's x position
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1; // Revert the character's x position to restore the original value
        this.ctx.restore(); // Restore the previous state of the context
    }

}


