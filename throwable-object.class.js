class ThrowableObject extends MovableObject {
    bottleAnimation;

    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASHING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    
    constructor(x, y) {
        super().loadImage(this.IMAGES_THROWING[0]);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_SPLASHING_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw();
  
        
    }


    /**
    * Initiates the throwing motion of the object.
    */
    throw() {
        this.speedY = 30; /// Falling speed
        this.applyGravity(); // Object falls down
        this.animate();
        this.throwDirection();

    }

    /**
     * Adjusts the horizontal position of the thrown object based on character direction.
     */
    throwDirection() {
        if (!world.bottleIsThrown) {
            if (!world.character.otherDirection) {
                setInterval(() => {
                    this.x += 8;
                    world.bottleIsThrown = false;
                }, 25);
            } else if (world.character.otherDirection) {
                setInterval(() => {
                    this.x -= 8;
                    world.bottleIsThrown = false;
                }, 25);
            }
        }
    }

    /**
    * Initiates the animation sequence of the object.
    */
    animate() {
        this.bottleAnimation = setInterval(() => {
            if (world.endbossHasBeenHit) {
                this.bottleSplash();
            } else if (this.y < 320) {
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                this.bottleSplash();
            }
        }, 100);
    }
    

    /**
    * Initiates the splash animation and sound effect when the object hits a target.
    */
    bottleSplash() {
        bottle_breaks.play();
        this.playAnimation(this.IMAGES_SPLASHING_BOTTLE);
        this.stopAnimation(this.bottleAnimation);
    }

    /**
    * Stops the animation interval and clears the animation.
    * @param {number} bottleAnimation - The interval ID of the animation.
    */
    stopAnimation(bottleAnimation) {
        clearInterval(bottleAnimation);
        setTimeout(() => {
            this.loadImage('');
        }, 60);
    }
}