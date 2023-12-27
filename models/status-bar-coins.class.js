class StatusBarCoins extends DrawableObject {
   
   
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 24;
        this.y = 100;
        this.width = 180;
        this.height = 53;
        this.setCoins(0); // Set initial coin amount
       
    }

    /**
     * Updates the displayed coin image based on the current coin amount.
     * @param {number} coinAmount - The new coin amount.
     */

    setCoins(coinAmount) {
        this.coinAmount = coinAmount; 
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the coin image based on the current coin amount.
     * @returns {number} The index of the coin image to be displayed.
     */
    resolveImageIndex() {
            
        if (this.coinAmount > 4) {
            return 5;
        } else if (this.coinAmount > 3) {
            return 4;
        } else if (this.coinAmount > 2) {
            return 3;
        } else if (this.coinAmount > 1) {
            return 2;
        } else if (this.coinAmount > 0) {
            return 1;
        } else  {
            return 0;
        }
    }


}