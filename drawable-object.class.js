class DrawableObject {
    x = 120;
    y = 345;
    img;
    height = 150;
    width = 100; 
    imageCache = [];
    currentImage = 0; 




    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image'); yani <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {       
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'transparent';
        ctx.rect(this.x, this.y, this.width, this.height);
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