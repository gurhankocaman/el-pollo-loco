class MovableObject {
        x = 120;
        y = 345;
        img;
        height = 150;
        width = 100; 


        loadImage(path) {
            this.img = new Image(); // this.img = document.getElementById('image'); yani <img id="image" src>
            this.img.src = path;
        }

        moveRight() {
            console.log('Moving right');
        }

        moveLeft(){
        
        }
}

