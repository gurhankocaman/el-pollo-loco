class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 1700;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }





    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
      

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

    }


}