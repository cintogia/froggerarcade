// randomize enemyLine
const line = function random() {
    let random = Math.floor(Math.random() * 3);
    if (random === 0) {
        return 44;
    } else if (random === 1) {
        return 134;
    } else {
        return 224;
    }
};

// Enemies our player must avoid
const Enemy = function Enemy(x, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = line();
    this.speed = speed * Math.ceil(Math.random() * 5);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 400) {
        this.x = -100;
        this.y = line();
        this.speed = Math.ceil(Math.random() * 5) * 100;
    }

    // collision
    if (player.x - this.x < 10 && this.y === player.y) {
        console.log("You lose");
        gameOver();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function Player() {
    this.blockInput = false;
    this.name = "LITTLE BOY";
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 404;
};

Player.prototype.update = function() {
    if (this.y < 44) {
        gameWon();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText(`${this.name}`, 330, 40);
};

Player.prototype.handleInput = function(direction) {
    if(player.blockInput === false) {
    switch (direction) {
        case "left":
            this.x -= 100;
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case "right":
            this.x += 100;
            if (this.x > 400) {
                this.x = 400;
            }
            break;
        case "up":
            this.y -= 90;
            if (this.y < -46) {
                this.y = -46;
            }
            break;
        case "down":
            this.y += 90;
            if (this.y > 404) {
                this.y = 404;
            }
            break;
    }
    }
};

// Player Switch
const Selector = function Selector() {
    this.sprite = "images/Selector.png";
    this.x = 404;
    this.y = 375;
};

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selector.prototype.update = function() {
    if (player.x === 400 && player.y === 404) {
        let boy = "images/char-boy.png";
        if (player.sprite === boy) {
            player.name = "CAT GIRL";
            player.sprite = "images/char-cat-girl.png";
            player.x = 300;
        } else {
            player.name = "LITTLE BOY";
            player.sprite = "images/char-boy.png";
            player.x = 300;
        }
    }
};

// Coins

const Coins = function Coins() {
    // add counter
    this.count = 0;
    // bring in an unordered list of positions
    const position_x = [2, 0, 4, 1, 3];
    // make sure 6th(goal) line cannot be used
    const position_y = [3, 1, 2, 0];
    // list of coins
    const img = ["images/Star.png", "images/Gem Green.png"];
    const value = [10, 25];
    // randomize positions
    this.move = function() {
        // get a random index for the positions
        let index_x = Math.floor(Math.random() * 5);
        let index_y = Math.floor(Math.random() * 4);
        // pick random coin
        let sprite_index = Math.floor(Math.random() * 2);
        this.x = position_x[index_x] * 100; // use full width (5 columns) of the canvas
        this.y = 314 - position_y[index_y] * 90; // start at 2nd line of the canvas
        this.sprite = img[sprite_index];
        this.value = value[sprite_index];
    };
    this.move();
};

Coins.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Raleway";
    ctx.fillText(`${this.count} COINS`, 0, 40);
};

Coins.prototype.update = function() {
    if (player.x === this.x && this.y === player.y) {
        console.log("You earned 10 coins");
        this.count += this.value;
        coins.move();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
for (let i = 0; i < 3; i++) {
    let enemy = new Enemy(-100, 100);
    allEnemies.push(enemy);
}

let coins = new Coins();

let player = new Player();

let selector = new Selector();

let gameOver = function() {
    console.log("Game Over");
    const modalOver = new Modal(document.querySelector("#gameOver"));
    window.openModal = modalOver.open.bind(modalOver);
    openModal();
    player.blockInput = true;
    player.x = 200;
    player.y = 404;
};

let gameWon = function() {
    console.log("Game Won");
    const modalWon = new Modal(document.querySelector("#gameWon"));
    window.openModal = modalWon.open.bind(modalWon);
    openModal();
    player.blockInput = true;
    player.x = 200;
    player.y = 404;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// reset Button

let reset = document.getElementById("reset");
reset.addEventListener("click", function() {
    coins.count = 0;
    coins.move();
    player.x = 200;
    player.y = 404;
});

// https://lowrey.me/modals-in-pure-es6-javascript/
class Modal {
    constructor(overlay) {
        this.overlay = overlay;
        const closeButton = overlay.querySelector(".button-close");
        closeButton.addEventListener("click", this.close.bind(this));
        overlay.addEventListener("click", e => {
            if (e.srcElement.id === this.overlay.id) {
                this.close();
            }
        });
    }
    open() {
        this.overlay.classList.remove("is-hidden");
    }

    close() {
        this.overlay.classList.add("is-hidden");
        player.blockInput = false;
    }
}
