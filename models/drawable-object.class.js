class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0; 
    x = 120;
    y = 345;
    height = 150;
    width = 100; 

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image'); yani <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle ||this instanceof Coin) {       
            ctx.beginPath(); // Start a new path for the drawing of img frame
            ctx.lineWidth = '3'; // Set line width
            ctx.strokeStyle = 'transparent'; // Set line color
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke(); // Executes the stroke to draw the rectangle
            ctx.beginPath(); // Start a new path for the drawing of collision frame
            ctx.lineWidth = '3'; 
            ctx.strokeStyle = 'transparent'; 
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke(); 
        }
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }    

}   