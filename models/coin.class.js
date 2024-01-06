class Coin extends MovableObject {
    y = 80 + Math.random() * 120; // set random y-position
    x = 300 + Math.random() * 2600; // set random x-position 
    width = 150;
    height = 150;
    
    /**
     * Offset values for collision detection.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };
   

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);  
        this.animate();     
    }

    /**
    * Animate the coin by cycling through its animation images.
    * Uses setInterval to repeatedly change the displayed image.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 260);
    }


}