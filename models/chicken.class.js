class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    enemyIsDead = false;


    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    ];

    IMAGES_CHICKEN_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }   

    /**
    * Initiates the chicken's animation.
    */
    animate() {
        setInterval(() => {
            this.chickenMoves();
        }, 1000 / 60);
        this.chickenAnimation();
    }

    /**
    * Controls the chicken's animation behavior.
    */
    chickenAnimation() {
        const chickenAnimation = setInterval(() => {
            if (this.enemyIsDead) {
                this.loadImage(this.IMAGES_CHICKEN_DEAD);
                chicken_screams.play();
                this.stopAnimation(chickenAnimation);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }      

    /**
     * Moves the chicken to the left.
     */
    chickenMoves() {
        if (!this.enemyIsDead) {
            this.moveLeft();
        }
    }

    /**
    * Stops the given animation interval and clears the image after a delay.
    * @param {number} chickenAnimation - The animation interval to stop.
    */
    stopAnimation(chickenAnimation) {
        clearInterval(chickenAnimation);
        setTimeout(() => {
            this.loadImage('');
        }, 750);
    }
}