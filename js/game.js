let canvas; 
let world;  
let keyboard = new Keyboard();  
let game_lost = new Audio('audio/game_lost.mp3');
let chicken_alarm = new Audio('audio/chicken_alarm.mp3')
let collect_bottle = new Audio('audio/collect_bottle.mp3');
let collect_coin = new Audio('audio/collect_coin.mp3');
let bottle_breaks = new Audio('audio/breaking_bottle.mp3');
let chicken_screams = new Audio('audio/chicken_scream.mp3');
let endboss_screams = new Audio('audio/chicken_scream_long.mp3');
let walking_sound = new Audio('./audio/running.mp3');
let jump_sound = new Audio('./audio/jump.mp3');
let character_hit = new Audio('audio/character_getting_hit.mp3');
let character_dies = new Audio('audio/character_dies.mp3');
let game_won = new Audio('audio/game_won.mp3');
let isMuted = false;

/**
 * Starts the game by initializing the level and the game world.
 */
function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    init();
}

/**
 * Initializes the game by setting up the level and creating a new World object.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas'); // Get the canvas element
    world = new World(canvas, keyboard); // Create a new World object
    touchEventsStart();
    touchEventsEnd();
}

/**
 * Toggles the fullscreen mode of the game.
 */
function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        closeFullscreen();
    } else {
        openFullscreen();
    }
}

/**
 * Requests to open fullscreen mode.
 */
function openFullscreen() {
    let content = document.getElementById('canvas-container');
    if (content.requestFullscreen) {
        content.requestFullscreen();
    } else if (content.webkitRequestFullscreen) { /* Safari */
        content.webkitRequestFullscreen();
    } else if (content.msRequestFullscreen) { /* IE11 */
        content.msRequestFullscreen();
    }
    document.getElementById('fullscreen-btn').src="img/11_icons/close_fullscreen.png";
}

/**
 * Exits the fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    document.getElementById('fullscreen-btn').src="img/11_icons/fullscreen.png";
}

/**
 * Toggles the sound on or off.
 */
function toggleSound() {
    let audioElements = [game_lost, chicken_alarm, collect_bottle, collect_coin, bottle_breaks, chicken_screams, endboss_screams, walking_sound, character_hit, character_dies, game_won];
    if (isMuted) {
        for (let audio of audioElements) {
            audio.muted = false;
            document.getElementById('volume-btn').src="img/11_icons/volume_off.png";
        }
    } else {
        for (let audio of audioElements) {
            audio.muted = true;
            document.getElementById('volume-btn').src="img/11_icons/volume-on.png";
        }
    }
    isMuted = !isMuted; // Reverse the state of isMuted
}

/**
 * Opens the information content.
 */
function openInfo() {
    document.getElementById('info-content').classList.remove('d-none');
}

/**
 * Closes the information content.
 */
function closeInfo() {
    document.getElementById('info-content').classList.add('d-none');
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

/**
 * Event listeners for keyboard keydown and keyup events.
 */
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        keyboard.RIGHT = true;
    }

    if (e.key === "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (e.key === "ArrowUp") {
        keyboard.UP = true;
    }

    if (e.key === "ArrowDown") {
        keyboard.DOWN = true;
    }

    if (e.key === " ") {
        keyboard.SPACE = true;
    }

    if (e.key === "d") {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        keyboard.RIGHT = false;
    }

    if (e.key === "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (e.key === "ArrowUp") {
        keyboard.UP = false;
    }

    if (e.key === "ArrowDown") {
        keyboard.DOWN = false;
    }

    if (e.key === " ") {
        keyboard.SPACE = false;
    }

    if (e.key === "d") {
        keyboard.D = false;
    }
});

/**
 * Sets up touch events for the mobile game controls.
 */
function touchEventsStart() {
    document.getElementById('btn-left').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btn-right').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btn-jump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btn-throw').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

}

/**
 * Removes touch events for the mobile game controls.
 */
function touchEventsEnd() {
    document.getElementById('btn-left').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btn-right').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btn-jump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btn-throw').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
    });
}