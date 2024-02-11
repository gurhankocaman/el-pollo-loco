class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
    * Defines the offset of collision boundaries.
    * @type {Object}
    * @property {number} top - Top offset
    * @property {number} left - Left offset
    * @property {number} right - Right offset
    * @property {number} bottom - Bottom offset
    */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {  // Execute while y-axis is less than 155px or speedY is greater than 0
            this.y -= this.speedY;  // Decrease y-axis by the value of speedY
            this.speedY -= this.acceleration; // Decrease speedY by the value of acceleration
            }   
        }, 1000 / 25);
    }

    /**
    * Checks if the object is above the ground.
    * @returns {boolean} - True if above ground, false otherwise.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // If this is an instance of ThrowableObject, return true
            return this.y < 305;
        } else { // Otherwise, return true if y-axis is less than 145
            return this.y < 145;
        }
    }       


    /**
    * Checks if the object is colliding with another object.
    * @param {MovableObject} mo - The other movable object.
    * @returns {boolean} - True if colliding, false otherwise.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
        }

        
    /**
    * Handles the Character being hit.
    */
    characterHit() {
        this.energy -= 2; // Decrease energy value by 2 when a collision occurs
        if (this.energy < 0) { // Prevent energy from going into negative values
            this.energy = 0;
        } else { // Update lastHit with current timestamp
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Handles the Endboss being hit.
    */
    endbossHit() {
        this.energy -= 10; // Decrease energy value by 10 when a collision occurs
        if (this.energy < 0) { // Prevent energy from going into negative values
            this.energy = 0;
        } else { // Update lastHit with current timestamp
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s           
        return timepassed < 0.5; // Return true if timepassed is less than 0.5 seconds

    }

    isDead() {
        return this.energy == 0;
    }


    /**
    * Plays animation for the object using provided images.
    * @param {string[]} images - Array of image paths for the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length; // Modulo-Operator: i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, etc.
        let path = images[i]; // Calculate index for current image using modulo operator
        this.img = this.imageCache[path]; // Assign image from imageCache to img variable in MovableObject
        this.currentImage++; // Increment currentImage index for the next image
    }

    moveRight() {
        this.x += this.speed;
        walking_sound.play();
    }

        moveLeft(){
                this.x -= this.speed;
        }
        
}

