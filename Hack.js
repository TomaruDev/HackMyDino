function keyDown(codeKey) {
	Podium = {};

	var oEvent = document.createEvent("KeyboardEvent");

	Object.defineProperty(oEvent, "keyCode", {
		get() {
			return this.keyCodeVal;
		}
	});      

	if(oEvent.initKeyboardEvent) {
		oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, codeKey, codeKey, "", "", false, "");
	} else {
		oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, codeKey, 0);
	}

	oEvent.keyCodeVal = codeKey;

	document.body.dispatchEvent(oEvent);
}

function keyUp(codeKey) {
	Podium = {};

	var oEvent = document.createEvent("KeyboardEvent");

	Object.defineProperty(oEvent, "keyCode", {
		get() {
			return this.keyCodeVal;
		}
	});      

	if(oEvent.initKeyboardEvent) {
		oEvent.initKeyboardEvent("keyup", true, true, document.defaultView, codeKey, codeKey, "", "", false, "");
	} else {
		oEvent.initKeyEvent("keyup", true, true, document.defaultView, false, false, false, false, codeKey, 0);
	}

	oEvent.keyCodeVal = codeKey;

	document.body.dispatchEvent(oEvent);
}


let Cheat = new (class Hack {
	constructor() {
		this.default = {
			score: 0,
			speed: 10,
			jump: 12,
			skin: "https://raw.githubusercontent.com/<URL DU PNG>",
			gameOver: Runner.prototype.gameOver
		};

		this.hacks = {
			invincible: false,
			autoplay: false,
			jump: 12
		};
	}


	invincible(bool) {
		if(bool) {
			Runner.prototype.gameOver = () => {};
		} else {
			Runner.prototype.gameOver = this.default.gameOver;
		}
	}

	autoplay(bool) {
		if(bool) {
			clearInterval(this.bot);
		} else {
			this.bot = setInterval(() => {
				if(Runner.instance_.horizon.obstacles.length > 0) {
					if(Runner.instance_.horizon.obstacles[0].xPos < Runner.instance_.currentSpeed * 25 - Runner.instance_.horizon.obstacles[0].width / 2 && Runner.instance_.horizon.obstacles[0].yPos > 75) {
						keyUp(40);
						keyDown(38);
					}
	
					if(Runner.instance_.horizon.obstacles[0].xPos < Runner.instance_.currentSpeed * 30 - Runner.instance_.horizon.obstacles[0].width / 2 && Runner.instance_.horizon.obstacles[0].yPos <= 75)
						keyDown(40);
				}
			}, 5);
		}
	}

	skin(image) {
		document.getElementById("offline-resources-1x").src = image;
		document.getElementById("offline-resources-2x").src = image;
	}


	setScore(score) {
		Runner.instance_.distanceRan = score / Runner.instance_.distanceMeter.config.COEFFICIENT;
	}

	resetScore() {
		Runner.instance_.distanceRan = this.default.score;
	}

	getScore() {
		return Runner.instance_.distanceRan * Runner.instance_.distanceMeter.config.COEFFICIENT
	}


	setSpeed(speed) {
		Runner.instance_.setSpeed(speed);
	}

	resetSpeed() {
		Runner.instance_.setSpeed(this.default.speed);
	}

	getSpeed() {
		return Runner.instance_.currentSpeed;
	}


	setJump(jump) {
		Runner.instance_.tRex.setJumpVelocity(jump);
		this.hacks.jump = jump;
	}

	resetJump() {
		Runner.instance_.tRex.setJumpVelocity(this.default.jump);
		this.hacks.jump = this.default.jump;
	}

	getJump() {
		return this.hacks.jump;
	}
});

document.addEventListener("keypress", (e) => {
	e = e || window.event;

	switch(e.key) {
		case "0":
			Cheat.invincible(!Cheat.hacks.invincible);
			Cheat.hacks.invincible = !Cheat.hacks.invincible;
		break;
	
		case "1":
			Cheat.autoplay(!Cheat.hacks.autoplay);
			Cheat.hacks.autoplay = !Cheat.hacks.autoplay;
		break;

		case "2":
			let image = prompt("Enter a URL or a Base64 code to define the sprites of the dino :");
			if(image != '' && image != null) Cheat.skin(image);
		break;

		case "3":
			let score = prompt("Enter the score to set :");
			if(score != '' && score != null) Cheat.setScore(score);
		break;

		case "4":
			let speed = prompt("Enter the speed to set :");
			if(speed != '' && speed != null) Cheat.setSpeed(speed);
		break;

		case "5":
			let jump = prompt("Enter the jump to set :");
			if(jump != '' && jump != null) Cheat.setJump(jump);
		break;

		case "6":
		break;
		
		case "7":
		break;
		
		case "8":
		break;
		
		case "9":
		break;
	}
}, false);