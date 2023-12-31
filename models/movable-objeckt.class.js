class MovableObject extends DrawableObject{
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 1.6;
        energy = 100;
        lastHit = 0;

        applyGravity() {
            setInterval(() => {
                if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                }   
            }, 1000 / 25);
        }


        isAboveGround() {
            if (this instanceof ThrowableObject) { // Throwable object should always fall
                return true;
            }
            return this.y < 145;
        }        


        // character.isColliding(chicken);
        isColliding(mo) {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }

        
        hit() {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
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


  

        playAnimation(images) {
            let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 6, und dann wieder 0..
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++; 
        }

        moveRight() {
            this.x += this.speed;
            walking_sound.play();
        }

        moveLeft(){
                this.x -= this.speed;
        }
}

