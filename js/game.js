let canvas;
let world;
let keyboard = new Keyboard();
let chicken_alarm = new Audio('audio/chicken_alarm.mp3');
let walking_sound = new Audio('audio/running.mp3');
let collect_bootle_sound = new Audio('audio/collect_bottle.mp3');
let collect_coin_sound = new Audio('audio/collect_coin.mp3');
let collision_enemies_sound = new Audio('audio/character_getting_hit.mp3');
let bottle_breaks = new Audio('audio/breaking_bottle.mp3');
let endboss_screams = new Audio('audio/chicken_scream_long.mp3');



function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    init();

}

function init() {
    initLevel();
    canvas = document.getElementById('canvas'); // Get the canvas element
    world = new World(canvas, keyboard); // Create a new World object
}


/**
 * Returns to the main menu from the game over screen.
 */
function backToMenu() {
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('you-lost-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.remove('d-none');
}

/**
 * Displays the game lost screen and plays the corresponding audio.
 * Stops the game.
 */
function gameLost() {
    document.getElementById('you-lost-screen').classList.remove('d-none');
    game_lost.play();
    stopGame();
}

/**
 * Displays the game won screen and plays the corresponding audio.
 * Stops the game.
 */
function gameWon() {
    document.getElementById('game-over-screen').classList.remove('d-none');
    game_won.play();
    stopGame();
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    clearAllIntervals();
}

/**
 * Clears all intervals (timeouts) that were set in the window.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


// Keyboard Object
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    
    if (e.keyCode == 68) {
        keyboard.D = false;
    }


});

