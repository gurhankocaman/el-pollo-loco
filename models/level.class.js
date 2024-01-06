class Level {
    enemies;  
    clouds;  
    backgroundObjects;  
    bottles;
    coins;
    level_end_x = 3600; // Declaration of the endpoint on the x-axis for the character

    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;  
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}