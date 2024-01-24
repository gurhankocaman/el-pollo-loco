class DrawableObject {
    img; // The image of the object, this variable will be used later to save the image
    imageCache = []; // An array used to cache image paths
    currentImage = 0; // Index of the current image in the animation
    x = 120;
    y = 290;
    width = 100;
    height = 150;

    /**
    * Loads an image from the specified path.
    * @param {string} path - The path of the image to load.
    */
    loadImage(path) { // Method for loading an image, the path of the image must be passed as an argument
        this.img = new Image(); // Creates a new Image object
        this.img.src = path; // Assigns the passed path to the image path
    }

     /**
     * Draws the object on the canvas using the provided context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // Draw the character on the canvas
    }

     /**
     * Draws a frame (rectangle) around certain objects on the canvas using the provided context.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrame(ctx) { 
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
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
     * Loads multiple images from an array of paths.
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr) { 
        arr.forEach((path) => { // Iterates over each element of the passed array
            let img = new Image(); // Creates a new Image object
            img.src = path; // Assigns the current path from the array to the image path
            this.imageCache[path] = img; // Stores the image object in the imageCache array under the corresponding path
        });
    }

      /**
     * Sets the percentage value and updates the image accordingly.
     * @param {number} percentage - The percentage value to set (0 to 100).
     */
      setPercentage(percentage) {
        this.percentage = percentage; // Gets value from 'energy' variable, which decreases on each collision
        let path = this.IMAGES_STATUSBAR_CHARACTER[this.resolveImageIndex()]; // Assigns URL of the desired image (number between 0 and 5) to 'path'
        this.img = this.imageCache[path]; // Loads path from 'imageCache' array and assigns the image to the 'img' variable in DrawableObjects
    }

    /**
     * Resolves the index of the image based on the current percentage value.
     * @returns {number} The index of the image in the array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}