class World {
    character = new Character();
    level = level1; // Level-Variable
    canvas;  // Canvas-Variable
    ctx;  // 2D-Context-Variable
    keyboard;  // Keyboard-Objekt
    bottle; // Bottle Variable
    camera_x = 0;  // Camera position (background image) on x-axis
    statusBarCharacter = new StatusBarCharacter();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottles = []; // Array for collected Bottles
    collectedCoins = []; // Array for collected coins
    endbossHasBeenHit = false;
    bottleIsThrown = false;
    collisionWithEndboss = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');  // Retrieve the 2D context of the canvas element
        this.canvas = canvas;  // Store the canvas element
        this.keyboard = keyboard;  // Store the Keyboard object
        this.draw();  // Call the draw function
        this.setWorld();  // Call the setWorld function to set the world property of the Character object
        this.run(); // Call various functions at intervals
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
            this.checkCollisions();
        }, 30);
        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    /**
    * Checks if the "D" key is pressed and bottles can be thrown.
    * If conditions are met, a new bottle is created, added to the throwableObjects array,
    * and thrown based on the character's direction.
    */
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

    /**
    * Checks for various collision scenarios involving the character and other entities.
    */
    checkCollisions() {
        this.checkCollisionBottlesToCollect();
        this.checkCollisionCoinsToCollect();
        this.checkCollisionEndbossThrownBottle();
        this.checkCollisionCharacterEndboss();
        this.checkCollisionCharacterEnemies();
    }

    /**
    * Checks if the character collides with enemies and handles the outcomes.
    */
    checkCollisionCharacterEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isHurt() && this.character.speedY < 0) {
                enemy.enemyIsDead = true;
            }
            if (this.character.isColliding(enemy) && !enemy.enemyIsDead) {
                this.character.characterHit();
                this.statusBarCharacter.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * Checks if the character collides with the end boss, leading to the character's death.
    */
    checkCollisionCharacterEndboss() {
        if (this.character.isColliding(this.level.endboss)) {
            this.collisionWithEndboss = true;
            this.statusBarCharacter.setPercentage(0);
        }
    }

    /**
    * Checks if the character collides with bottles that can be collected.
    */
    checkCollisionBottlesToCollect() {
        this.level.bottles.forEach((bottle, index) => { // With index of the element in the array
            if (this.character.isColliding(bottle)) { // Will only be executed if value does not yet exist
                if (!this.collectedBottles.includes(bottle)) {
                    collect_bottle.play();
                    this.collectedBottles.push(bottle);
                    this.statusBarBottles.setBottles(this.collectedBottles.length); // Pass value to StatusBarBottles
                    this.level.bottles.splice(index, 1); // Remove the collided bottle from the array and remove image
                }
            }
        })
    }

    /**
    * Checks if the character collides with coins that can be collected.
    */
    checkCollisionCoinsToCollect() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                if (!this.collectedCoins.includes(coin)) {
                    collect_coin.play();
                    this.collectedCoins.push(coin);
                    this.statusBarCoins.setCoins(this.collectedCoins.length);
                    this.level.coins.splice(index, 1);
                }
            }
        })
    }

    /**
    * Checks if a thrown bottle collides with the end boss and handles the interaction.
    * @returns {boolean} True if collision with the end boss occurs, false otherwise.
    */
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

    /**
     * Executes the entire drawing process.
     */
    draw() {
        this.clearCanvas();
        this.translateContext(this.camera_x);
        this.drawBackgroundObjects();
        this.resetContextTranslation();
        this.drawStatusBar();
        this.translateContext(this.camera_x);
        this.drawCharacterAndObjects();
        this.resetContextTranslationAgain();
        this.requestNextAnimationFrame();
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Translates the context (background) by the value of camera_x.
     * @param {number} x - The translation value in the x-axis direction.
     */
    translateContext(x) {
        this.ctx.translate(x, 0);
    }

    /**
    * Draws background objects including backgroundObjects and clouds.
    */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
    * Resets translation for fixed StatusBar.
    */
    resetContextTranslationAgain() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * Draws the status bar elements like character info, bottles, coins, and end boss indicator.
    */
    drawStatusBar() {
        const distance = this.level.endboss.x - this.character.x;
        
        this.addToMap(this.statusBarCharacter);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        if (distance < 600) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
    * Draws the main character and various game objects like enemies, end boss, throwable objects, bottles, and coins.
    */
    drawCharacterAndObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }

    /**
    * Resets translation.
    */
    resetContextTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame to execute the draw function again.
     */
    requestNextAnimationFrame() {
        let self = this; // Helper variable 'self' because 'this' doesn't work within requestAnimationFrame()
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Adds an array of objects to the drawing map.
    * @param {Array} objects - An array of objects to be added to the drawing map.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => { // forEach works only with arrays, so objects need to be passed as an array
            this.addToMap(o); // Add each object to the map
        });
    }

    /**
    * Adds a movable object to the drawing map, potentially flipping the image horizontally.
    * @param {MovableObject} mo - The movable object to be added to the map.
    */
    addToMap(mo) { // mo stands for Movable Object and the character is passed as an argument (parameter) here
        if (mo.otherDirection) { // Flip character when moving backward
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) { // Revert the flip
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for the given movable object.
     * @param {MovableObject} mo - The movable object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save(); // Save the current state of the context (drawn images)
        this.ctx.translate(mo.width, 0); // Translate the context by the character's width in the x direction
        this.ctx.scale(-1, 1); // Flip the x-axis to reverse the character
        mo.x = mo.x * -1; // Reverse the character's x position
    }

    /**
     * Reverts the image flipping for the given movable object.
     * @param {MovableObject} mo - The movable object whose image flipping needs to be reverted.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1; // Revert the character's x position to restore the original value
        this.ctx.restore(); // Restore the previous state of the context
    }
}