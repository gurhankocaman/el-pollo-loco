class Character extends MovableObject {
    y = 50;
    height = 275;
    width = 120;
    speed = 10;
    world;
    jumpOnEnemy = false;

    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 140,
        left: 30,
        right: 40,
        bottom: 10
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initializes the animation intervals for character movements and animations.
     */
    animate() {
        setInterval(() => {
            this.characterMovements();
        }, 1000 / 60);
        setInterval(() => {
            this.characterAnimations();
        }, 125);
    }

    /**
     * Updates character movements based on keyboard input.
     */
    characterMovements() {
        walking_sound.pause();
        this.characterMovesRight();
        this.characterMovesLeft();
        this.characterMovesUp();
        this.world.camera_x = -this.x + 100; // Update the position of the camera based on the X position of the character.
    }

    /**
    * Handles character animations based on different states.
    */
    characterAnimations() {
        if (this.isDead() || this.world.collisionWithEndboss) {
            this.characterDead();
        } else if (this.isHurt()) {
            this.characterHurt();
        } else if (this.isAboveGround()) {
            this.characterJumps();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.characterWalks();
        } else {
            this.characterIdle();
        }
    }

    /**
     * Moves the character to the right.
     */
    characterMovesRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { // Animation is executed only if I press Arrow Right on keyboard and x-axis value is smaller than end value of x-axis
            this.moveRight();
            this.otherDirection = false; // Character isn't mirrored
            walking_sound.play();
        }
    }

    /**
    * Moves the character to the left.
    */
    characterMovesLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true; // Character is mirrored
            walking_sound.play();
        }
    }

    /**
    * Makes the character jump if above ground.
    */
    characterMovesUp() {
        if (this.world.keyboard.UP && !this.isAboveGround()) { // Animation is executed only if I press UP key and if isAboveGround() returns false
            this.jump();
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) { // Animation is executed only if I press Space an UP key and if isAboveGround() returns false
            this.jump();
        }
    }

    /**
     * Plays the hurt animation and sound for the character.
     */
    characterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        character_hit.play();
    }

    /**
     * Plays the jumping animation for the character.
     */
    characterJumps() {
        this.playAnimation(this.IMAGES_JUMPING);

    }

    /**
    * Plays the walking animation for the character.
    */
    characterWalks() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Plays the idle animation for the character.
     */
    characterIdle() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Plays the death animation and sound for the character, then triggers game loss.
     */
    characterDead() {
        this.playAnimation(this.IMAGES_DEAD);
        walking_sound.pause();
        character_dies.play();
        setTimeout(() => {
            gameLost();
        }, 1800);
    }

    jump() {
        this.speedY = 25;
    }
}