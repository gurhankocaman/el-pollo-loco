class Endboss extends MovableObject {
    y = 155;
    x = 3600;
    height = 275;
    width = 250;
    speed = 6;
    distanceTimer = 0;
 
    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 110,
        left: 50,
        right: 50,
        bottom: 0
    };    
    

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.endbossAnimations();
        }, 200);
    }

    /**
    * Perform various animations and actions based on the character's state.
    */
    endbossAnimations() {
        const distance = this.x - world.character.x;

        if (distance > 500) {
            this.endbossWalks();
        }
        if (distance < 500) {
            if (this.distanceTimer < 8) {
                this.endbossAlert();
            } else {
                this.endbossAttacks();
            }
            this.distanceTimer++;
            if (world.endbossHasBeenHit) {
                this.endbossHurt();
            }
        }
    }

    endbossWalks() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
    }

    endbossAlert() {
        this.playAnimation(this.IMAGES_ALERT)
    }

    endbossAttacks() {
        chicken_alarm.play();
        this.playAnimation(this.IMAGES_ATTACK);
        this.moveLeft();
    }

    endbossHurt() {
        this.playAnimation(this.IMAGES_HURT);
        world.endbossHasBeenHit = false;
    }

    endbossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        chicken_alarm.pause();
        walking_sound.pause();
        endboss_screams.play();
        setTimeout(() => {
            gameWon();
        }, 2000);
    }


    endbossOutOfGame() {
        walking_sound.pause();
        gameLost();
    }




    
}