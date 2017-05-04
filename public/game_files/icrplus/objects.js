// Flyer class
function Flyer() {
	this.flyer = document.createElement("img"); // make an <img> for the flyer
	this.flyer.src = "themes/" + theme + "/flyer.png";
	this.flyer.className = "flyer" // ------------ style it
	
	this.x = Math.round((fieldWidth * 0.5) - (cubeSize * 0.5));
	this.y = (fieldHeight - cubeSize - 8);
	this.flyer.style.left = this.x + "px";
	this.flyer.style.top = this.y + "px";
	this.flyer.style.width = cubeSize + "px";
	this.flyer.style.height = cubeSize + "px";
	
	field.appendChild(this.flyer);
	
	
	if (debugMode) { // show hitboxes in debug mode
		this.hitbox1 = document.createElement("div");
		this.hitbox1.style.backgroundColor = "rgba(0,255,0,0.5)";
		this.hitbox1.style.position = "absolute";
		this.hitbox1.style.left = (this.x + (cubeSize * 0.33)) + "px";
		this.hitbox1.style.top = this.y + "px";
		this.hitbox1.style.width = (cubeSize * 0.33) + "px";
		this.hitbox1.style.height = (cubeSize * 0.5) + "px";
		
		this.hitbox2 = document.createElement("div");
		this.hitbox2.style.backgroundColor = "rgba(0,255,0,0.5)";
		this.hitbox2.style.position = "absolute";
		this.hitbox2.style.left = (this.x + (cubeSize * 0.1)) + "px";
		this.hitbox2.style.top = (this.y + (cubeSize * 0.5)) + "px";
		this.hitbox2.style.width = (cubeSize * 0.8) + "px";
		this.hitbox2.style.height = (cubeSize * 0.4) + "px";
		
		field.appendChild(this.hitbox1);
		field.appendChild(this.hitbox2);
	}
	
	return this;
}

// Cube class
function Cube(spawnX,spawnY) {
	this.cube = document.createElement("div"); // ---------------------------- make the cube div
	this.cube.className = "cube cubeColor" + Math.round(Math.random() * 2); // style it
	
	if (spawnX != null) { // ------------------- if it has a spawn x
		this.x = spawnX; // --------------------- position it
	} else { // ----------------------------------------------- otherwise...
		this.x = Math.round(Math.random() * (fieldWidth) - (cubeSize * 0.5)); // give it a random position
	}
	if (spawnY != null) { // ------------------------------- same for the y...
		this.y = spawnY;
	} else {
		this.y = Math.round(Math.random() * -(fieldHeight * 0.8)) - cubeSize;
	}
	
	
	// change inline CSS
	this.cube.style.left = this.x + "px";
	this.cube.style.top = this.y + "px";
	this.cube.style.width = cubeSize + "px";
	this.cube.style.height = cubeSize + "px";
	
	field.appendChild(this.cube);
	
	
	this.move = function(moveX, moveY) {
		if (this.x != -500) {
			this.x += moveX;
		}
		this.y += moveY;
		if (this.x < -cubeSize) { // ------------------ if it is too far to the left...
			this.x = fieldWidth + cubeSize - 1; // ----   move it to the far right
		} else if (this.x > fieldWidth + cubeSize) { // if it is too far to the right...
			this.x = -cubeSize - 1; // ----------------   move it to the far left
		}
		if (this.y > fieldHeight + cubeSize + cubeSize) { // ----------------------- if it is too far down...
			if (mode == 0) {
				this.x = Math.round(Math.random() * (fieldWidth) - (cubeSize * 0.5)); //   randomly change its x (if in normal mode)...
			}
			this.y = Math.round(Math.random() * -(fieldHeight * 0.7)); // ----------   put it somewhere above the top...
			this.cube.className = "cube cubeColor" + Math.round(Math.random() * 2); // and change its color
		}
		
		this.cube.style.left = this.x + "px"; // change the CSS to reflect the changes
		this.cube.style.top = this.y + "px";
	}
	
	return this;
}
