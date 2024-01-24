class StatusBarBottles extends DrawableObject {
    IMAGES_STATUSBAR_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLES);
        this.x = 24;
        this.y = 50;
        this.width = 200;
        this.height = 53;
        this.setBottles(0); // Set initial bottle amount
        
    }

    /**
     * Sets the number of bottles and updates the displayed image accordingly.
     * @param {number} bottleAmount - The amount of bottles to set.
     */
    setBottles(bottleAmount) {
        this.bottleAmount = bottleAmount; 
        let path = this.IMAGES_STATUSBAR_BOTTLES[this.resolveImageIndex()]; 
        this.img = this.imageCache[path]; 
    }

    /**
     * Resolves the index of the image to be displayed based on the bottle amount.
     * @returns {number} - The index of the image to display.
     */
    resolveImageIndex() {
        if (this.bottleAmount > 8) {
            return 5;
        } else if (this.bottleAmount > 6) {
            return 4;
        } else if (this.bottleAmount > 4) {
            return 3;
        } else if (this.bottleAmount > 2) {
            return 2;
        } else if (this.bottleAmount > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}