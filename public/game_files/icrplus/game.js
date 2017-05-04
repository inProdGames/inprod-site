var gameSpeed = 3; // how far down the cubes move
var flyer; // ------- the flyer
var cubes; // ------- the array of all cubes
var nextCube = 0 // -- the next cube to be placed (inv & 2P)
var cubeSize = 48; // the width = height of each cube
var maxCubes = 10; // the maximum number of cubes

var field // ---- the game field
var fieldWidth = 640; // --- the field width
var fieldHeight = 480; // -- the field height

/* modes:
 * 0 = 1P normal
 * 1 = 1P inverted
 * 2 = 2P
 */
var mode = 0;

// cheats
var godMode = false;
var customSpeed = false;
var debugMode = false;

var theme = "winter"; // the name of the current theme
var themeFileLink; //  the <link> to the current theme

var interval;

// keys
var aKey = false;
var dKey = false;
var eKey = false;
var leftKey = false;
var rightKey = false;

function init() {
	// theme
	loadTheme();
	
	// game field
	field = document.getElementById("field");
	fieldWidth = field.offsetWidth;
	fieldHeight = field.offsetHeight;
//	field = document.getElementsByTagName("body")[0];
//	fieldWidth = window.innerWidth;
//	fieldHeight = window.innerHeight;
	
	// cubes
	maxCubes = Math.round((window.innerWidth * window.innerHeight) / 60000); // set the max number of cubes proportional to the screen size
	if (maxCubes < 10) { // --------------------------------------------------- it should be at least 10
		maxCubes = 10;
	}
	cubeSize = Math.round(window.innerHeight / 8); // set the size of the cubes (and the flyer) proportional to the screen height
	
	// debug info
	document.getElementById("debugFieldWidth").innerHTML = fieldWidth;
	document.getElementById("debugFieldHeight").innerHTML = fieldHeight;
	document.getElementById("debugMaxCubes").innerHTML = maxCubes;
	document.getElementById("debugCubeSize").innerHTML = cubeSize;
	
	// when the window resizes, change the field size, cube size, and cube number for the next game
	window.onresize = function() {
		fieldWidth = field.offsetWidth;
		fieldHeight = field.offsetHeight;
//		fieldWidth = window.innerWidth;
//		fieldHeight = window.innerHeight;
		
		maxCubes = Math.round((window.innerWidth * window.innerHeight) / 60000);
		if (maxCubes < 10) {
			maxCubes = 10;
		}
		cubeSize = Math.round(window.innerHeight / 8);
		
		// also update debug info if debug mode is on
		if (debugMode) {
			document.getElementById("debugFieldWidth").innerHTML = fieldWidth;
			document.getElementById("debugFieldHeight").innerHTML = fieldHeight;
			document.getElementById("debugMaxCubes").innerHTML = maxCubes;
			document.getElementById("debugCubeSize").innerHTML = cubeSize;
		}
	}
	
	// add cube creation event for 1P inv and 2P modes
	document.getElementById("cubeArea").onclick = function(e) {
		if (mode == 1 || mode == 2) { // basic anti-cheat
			if (e.which == 1) { // left mouse button only
				var clickX; // vars for the click coords
				var clickY;
				if (e.pageX) { // ------ if the x-coord can be found the easy way,
					clickX = e.pageX; //   do that
				} else { // ------------ otherwise do it the hard(er) way
					clickX = e.clientX + document.body.scrollLeft;
				}
				if (e.pageY) { // same thing for the y-coord
					clickY = e.pageY;
				} else {
					clickY = e.clientY + document.body.scrollTop;
				}
				clickX -= cubeSize / 2; // change the coords so the cube spawns centered at the mouse
				clickY -= cubeSize / 2;
				
				if (cubes[nextCube] != null) { // if cubes[nextCube] exists...
					field.removeChild(cubes[nextCube].cube);
					cubes[nextCube] = null; // ---- destroy it!
				}
				cubes[nextCube] = new Cube(clickX, clickY); // make a new cube!
				if (++nextCube == maxCubes) { // and increment/reset nextCube
					nextCube = 0;
				}
			}
		}
	}
	
	
	// add keyboard event listeners
	document.addEventListener("keydown", keyPressed, true);
	document.addEventListener("keyup", keyReleased, true);
	
	if (location.hash.indexOf("notitle") != -1) {
		document.getElementById("titlePg").style.visibility = "hidden";
	}
	
	var ua = navigator.userAgent
	// display warning for IEs
	// checks for "MSIE" where version != 9 and no Chrome Frame
	if (ua.indexOf("MSIE") != -1 && ua.indexOf("MSIE 9") == -1 && ua.indexOf("Chrom") == -1) {
		document.getElementById("ieWarning").style.visibility = "visible";
	}
	// display warning for old Gecko
	// checks for version 2008 or earlier
	if (ua.indexOf("Gecko/") != -1) {
		if (parseInt(ua.substring((ua.indexOf("Gecko/") + 6), (ua.indexOf("Gecko/") + 12))) < 201006) {
			document.getElementById("geckoWarning").style.visibility = "visible";
		}
	}
	// everything is done; show the menu!
	document.getElementById("loadingBox").style.visibility = "hidden";
}

function loadTheme(newTheme) {
	if (newTheme != null) {
		theme = newTheme;
		// save the new theme in localStorage, if possible
		try {
			localStorage.icr_theme = theme;
		} catch(e) {
			// the theme will not be saved if something goes wrong
		}
	} else {
		try {
			theme = localStorage.icr_theme;
		} catch(e) { // ---- in case there is an issue with localStorage
			theme = null; // just set it to null (and it will be set to the default theme)
		}
		if (theme == null || theme == "" || theme == "null") {
			theme = "winter"; // use this as the default theme
			// save the theme in localStorage, if possible
			try {
				localStorage.icr_theme = theme;
			} catch(e) {
				// the theme will not be saved if something goes wrong
			}
		}
		
		document.getElementById("themeSelect").value = theme;
	}
	
	// save the theme in localStorage, if possible
	try {
		localStorage.icr_theme = theme;
	} catch(e) {
		// the theme will not be saved if something goes wrong
	}
	
	if (themeFileLink == null) { // -------------------------------------- if there is no <link>
		themeFileLink = document.createElement("link"); // -------------------- create new <link> element
		themeFileLink.setAttribute("rel", "stylesheet"); // ------------------- this is a stylesheet
		themeFileLink.setAttribute("type", "text/css"); // -------------------- this is a CSS file
		themeFileLink.setAttribute("href", "themes/" + theme + "/game.css"); // URL of the CSS file (always called "game.css")
		document.getElementsByTagName("head")[0].appendChild(themeFileLink); // put the new <link> tag in the <head>
	} else { // ---------------------------------------------------------- otherwise just change the URL
		themeFileLink.setAttribute("href", "themes/" + theme + "/game.css"); // URL of the CSS file (always called "game.css")
	}
}

function start() {
	document.getElementById('field').style.WebkitTransitionDuration = (1 / gameSpeed) + "s";
	document.getElementById('field').style.MozTransitionDuration = (1 / gameSpeed) + "s";
	document.getElementById('field').style.OTransitionDuration = (1 / gameSpeed) + "s";
	document.getElementById('field').style.TransitionDuration = (1 / gameSpeed) + "s";
	document.getElementById('field').style.top = "0%";
	
	cubes = new Array(maxCubes);
	if (mode == 0) {
		for (var i = 0; i < cubes.length; i++) {
			cubes[i] = new Cube(null,null);
		}
	}
	
	// player/AIevent.clientX + document.body.scrollLeft;
	flyer = new Flyer();
	
	if (mode == 1 || mode == 2) {
		document.getElementById("cubeArea").style.visibility = "visible";
	}
	
	interval = setInterval("main();", 10);
}

function main() {
	for (var i = 0; i < cubes.length; i++) {
		if (cubes[i] != null) { // cannot do anything if the cube does not exist
			if (mode == 0 || mode == 2) { // only check key input for mode where the flyer is controllable
				if ((aKey || leftKey) && !(dKey || eKey || rightKey)) { // if one of the left keys is pressed and none of the right keys are...
					cubes[i].move(Math.abs(gameSpeed), gameSpeed); // --------------   ...move the cube right
				} else if (!(aKey || leftKey) && (dKey || eKey || rightKey)) { // if one of the right keys is pressed and none of the left keys are...
					cubes[i].move(-Math.abs(gameSpeed), gameSpeed); // --------------------   ...move the cube left
				} else {
					cubes[i].move(0, gameSpeed); // if no movement keys are pressed, do not move
				}
			} else {
				cubes[i].move(0, gameSpeed);
			}
		
			if (!godMode) { // only check for collisions if the player can die
				/* hitboxes:
				 *     ___
				 *    |/ \|
				 *  __|___|__
				 * | /     \ |
				 * |/_______\|
				 *
				 */
				if (touching((flyer.x + (cubeSize * 0.33)), flyer.y, (cubeSize * 0.33), (cubeSize * 0.5), cubes[i].x, cubes[i].y, cubeSize, cubeSize) ||
						touching((flyer.x + (cubeSize * 0.1)), (flyer.y + cubeSize * 0.5), (cubeSize * 0.8), (cubeSize * 0.4), cubes[i].x, cubes[i].y, cubeSize, cubeSize)) {
	//				alert("BOOM!");
					quit();
				}
			}
		}
	}
}

function quit() {
	clearInterval(interval);
	
	if (cubes) {
		for (var i = 0; i < cubes.length; i++) {
			if (cubes[i] != null) {
				field.removeChild(cubes[i].cube);
				cubes[i] = null;
			}
		}
	}
	if (flyer) {
		field.removeChild(flyer.flyer);
		if (flyer.hitbox1) {
			field.removeChild(flyer.hitbox1);
			field.removeChild(flyer.hitbox2);
		}
		flyer = null;
	}
	document.getElementById("cubeArea").style.visibility = "hidden";
	
	//document.getElementById("menu").style.visibility = "visible";
	document.getElementById('field').style.top = '-120%';
}

// collision detection
function touching(x1, y1, w1, h1, x2, y2, w2, h2) {
	if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2) {
		return true;
	} else {
		return false;
	}
}


// key event listeners
function keyPressed(e) {
	switch (e.keyCode) {
		case 65: // A
			aKey = true;
		break;
		case 68: // D
			dKey = true;
		break;
		case 69: // E
			eKey = true;
		break;
		
		case 37: // left
			leftKey = true;
		break;
		case 39: // right
			rightKey = true;
		break;
		
		case 44: // comma
			if (customSpeed) {
				gameSpeed += 0.5;
				if (debugMode) {
					document.getElementById("debugGameSpeed").innerHTML = gameSpeed;
				}
			}
		break;
		case 87: // W
			if (customSpeed) {
				gameSpeed += 0.5;
				if (debugMode) {
					document.getElementById("debugGameSpeed").innerHTML = gameSpeed;
				}
			}
		break;
		case 38: // up
			if (customSpeed) {
				gameSpeed += 0.5;
				if (debugMode) {
					document.getElementById("debugGameSpeed").innerHTML = gameSpeed;
				}
			}
		break;
		case 79: // O
			if (customSpeed) {
				gameSpeed -= 0.5;
				if (debugMode) {
					document.getElementById("debugGameSpeed").innerHTML = gameSpeed;
				}
			}
		break;
		case 83: // S
			if (customSpeed) {
				gameSpeed -= 0.5;
				if (debugMode) {
					document.getElementById("debugGameSpeed").innerHTML = gameSpeed;
				}
			}
		break;
		case 40: // down
			if (customSpeed) {
				gameSpeed -= 0.5;
				if (debugMode) {
					document.getElementById("debugGameSpeed").innerHTML = gameSpeed;
				}
			}
		break;
		
		case 27: // esc
//			if (confirm("Are you sure you want to quit?")) {
				quit();
//			}
		break;
	}
}
function keyReleased(e) {
	switch (e.keyCode) {
		case 65: // A
			aKey = false;
		break;
		case 68: // D
			dKey = false;
		break;
		case 69: // E
			eKey = false;
		break;
		
		case 37: // left
			leftKey = false;
		break;
		case 39: // right
			rightKey = false;
		break;
	}
}
