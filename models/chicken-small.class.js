class ChickenSmall extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    enemyIsDead = false;

    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
     offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_SMALL_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700 + Math.random() * 2900;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * Initiates the main animation loop for the chicken's movement and animation.
     */
    animate() {
        setInterval(() => {
            this.chickenSmallMoves();
        }, 1000 / 60);
        this.chickenSmallAnimation();
    }

    /**
    * Handles the animation of the chicken's state (walking or dead).
    */
    chickenSmallAnimation() {
        const chickenSmallAnimation = setInterval(() => {
            if (this.enemyIsDead) {
                this.loadImage(this.IMAGES_SMALL_CHICKEN_DEAD);
                chicken_screams.play();
                this.stopAnimation(chickenSmallAnimation);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
    * Moves the small chicken to the left if not dead.
    */
    chickenSmallMoves() {
        if (!this.enemyIsDead) {
            this.moveLeft();
        }
    }

    /**
    * Stops the given animation interval and clears the image after a delay.
    * @param {number} chickenSmallAnimation - The animation interval to stop.
    */
    stopAnimation(chickenSmallAnimation) {
        clearInterval(chickenSmallAnimation);
        setTimeout(() => {
            this.loadImage('');
        }, 750);
    }

}