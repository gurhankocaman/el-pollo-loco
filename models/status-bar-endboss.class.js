class StatusBarEndboss extends DrawableObject {
    IMAGES_STATUSBAR_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue/0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.x = 496;
        this.y = 100;
        this.width = 200;
        this.height = 53;
        this.setPercentage(100); // Initialize the status bar with a default percentage value
    }

    /**
     * Set the boss's health percentage and update the displayed image accordingly.
     * @param {number} percentage - The health percentage of the boss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()]; // Determine the appropriate image index based on the percentage
        this.img = this.imageCache[path];  // Update the displayed image using the image cache
    }
}