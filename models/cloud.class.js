class Cloud extends MovableObject {
    width = 500;
    height = 250;
    

    constructor(imagePath) {
        super().loadImage(imagePath); 
        this.x = 0 + Math.random() * 2800; 
        this.y = 15 + Math.random() * 30;
        this.animate(); 
    }
    
    animate() {
        const speedMoveLeft = 10 + Math.random() + 20;
        setInterval(() => {
            this.moveLeft();
        }, 1000 / speedMoveLeft);
    }
}