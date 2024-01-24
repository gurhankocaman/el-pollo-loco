class StatusBarCharacter extends DrawableObject {
    IMAGES_STATUSBAR_CHARACTER = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_CHARACTER);
        this.x = 24;
        this.y = 0;
        this.width = 200;
        this.height = 53;
        this.setPercentage(100); // Set initial percentage
    }
}