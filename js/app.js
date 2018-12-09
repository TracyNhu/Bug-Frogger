// Enemies our player must avoid
var Enemy = function(x, y) {

	this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.resetX = x;
	this.resetY = y;
	this.width = 75;
	this.height = 50;
	this.speed = Math.floor(Math.random() * 300 + 1);
 };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for all computers.

	this.x = this.x + (this.speed * dt);


	if (this.x >= 500) {
		this.x = -100;
	} 

// sample handle collision codes from http://blog.sklambert.com/html5-canvas-game-2d-collision-detection#d-collision-detection

	if (player.x <= this.x + this.width && 
		player.x + player.width > this.x &&
		player.y < this.y + this.height && 
		player.y + player.height > this.y) {
			console.log('collision');
			player.x = 200;
			player.y = 300;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
	this.width = 75;
	this.height = 50;
};

Player.prototype.update = function(dt) {
	// player won
	if (this.y < -35) {
		gameWon();
	}
};
// message window shows when player wins the game
function gameWon () {
	document.getElementsByClassName('message')[0].classList.add('show');

	// when click on the button "play again", close it
	document.getElementById('playAgain').addEventListener('click', function() {
		player.reset();
		document.getElementsByClassName('message')[0].classList.remove('show');
	}); 
}

// reset to initial location
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 300;	
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
	switch(keys) {
		case 'left':
			this.x -= 100;
			break;
		case 'down':
			this.y += 85;
			break;
		case 'right':
			this.x += 100;
			break;
		case 'up':
			this.y -= 85;
	}
	
	if (this.x > 400 || this.x < 0 || this.y > 400) {
	 	this.x = 200;
	 	this.y = 300;
	}
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-150, 225), new Enemy(-125, 225), new Enemy(-100, 145), new Enemy(-75, 145), new Enemy (-120, 60), new Enemy(-165, 60)];

// Place the player object in a variable called player
var player = new Player(200, 300);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});


