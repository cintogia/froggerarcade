/*
 *
 * Title: Frogger Arcade Game
 * Version: 1.0
 * Author: Pietro Tallarico
 * Github: https://github.com/cintogia/frontend-nanodegree-arcade-game
 * JS: prototypal inheritance
 *
 */

// Enemies our player must avoid
const Enemy = function Enemy(x, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = "images/enemy-bug.png";
	this.x = x;
	// defines on which line to start
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
	// Manage collisions, if player hits an enemy, the game will stop and call a modal
	if (
		player.x - this.x < 15 &&
		player.x - this.x > 0 &&
		this.y === player.y
	) {
		// creates and displays modal content and blocks input handler
		gameOver();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// randomize enemyLine
const line = function() {
	let random = Math.floor(Math.random() * 3);
	if (random === 0) {
		return 44;
	} else if (random === 1) {
		return 134;
	} else {
		return 224;
	}
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function Player() {
	this.blockInput = false;
	// set default player
	this.name = "LITTLE BOY";
	this.sprite = "images/char-boy.png";
	this.x = 200;
	this.y = 404;
};

// Win the game when player reaches last line
Player.prototype.update = function() {
	if (this.y < 44) {
		// creates and displays modal content and blocks input handler
		gameWon();
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	// define font family once
	ctx.font = "30px Raleway";
	// display current player name
	ctx.fillText(`${this.name}`, 330, 40);
};
// react on user input only if game isn't stopped (over/won)
Player.prototype.handleInput = function(direction) {
	if (player.blockInput === false) {
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

// Player/Avatar Switch
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

// Create Coins
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
	//display current coins value
	ctx.fillText(`${this.count} COINS`, 0, 40);
};

// count and collect coins
Coins.prototype.update = function() {
	// if player hits the coin add coin value to the counter
	if (player.x === this.x && this.y === player.y) {
		this.count += this.value;
		console.log(`You earned ${this.value} coins`);
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

// New Game Buttons, reset game (counter and player postion) onclick.
let gameOver = function() {
	// create modal content
	button.innerText = "TRY AGAIN";
	document.querySelector(".modal>h1").innerText = "GAME OVER";
	// disable player moving
	player.blockInput = true;
	// show modal
	modal.style.display = "block";
};

let gameWon = function() {
	// create modal content
	button.innerText = "NEW GAME";
	document.querySelector(".modal>h1").innerText = "YAY! GAME WON!";
	// disable player moving
	player.blockInput = true;
	// show modal
	modal.style.display = "block";
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

// New Game Buttons
const reset = document.getElementById("reset");
reset.addEventListener("click", function() {
	coins.count = 0;
	coins.move();
	player.x = 200;
	player.y = 404;
});

const button = document.querySelector("#modalButton");
button.addEventListener("click", function() {
	coins.count = 0;
	coins.move();
	player.x = 200;
	player.y = 404;
	closeModal();
});

// Modal
const modal = document.querySelector(".modal-overlay");
const span = document.querySelector(".button-close");

/* TODO: needs debugging
 *
span.onclick = function() {
  closeModal();
}
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}
 *
 */

// Close Modal function
function closeModal() {
	modal.style.display = "none";
	player.blockInput = false;
}
