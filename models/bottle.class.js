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


    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);  
        this.animate();     
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 200);
    }
}