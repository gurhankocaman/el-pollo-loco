class Bottle extends MovableObject {
    y = 360;
    x = 300 + Math.random() * 3600;
    height = 60;
    width = 100;

    offset = {
        top: 10,
        left: 40,
        right: 30,
        bottom: 10
    };

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        this.loadRandomImage();
    }

    /**
     * Loads a random bottle image from the IMAGES_BOTTLES array.
     */
    loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLES.length);
        this.loadImage(this.IMAGES_BOTTLES[randomIndex]);
    }
}