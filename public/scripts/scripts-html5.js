window.onresize = function() {
	if (window.innerWidth < 768) {
		document.getElementById("main").style.right = "0px";
		document.getElementById("main").style.width = "auto";
	} else {
		document.getElementById("main").style.right = "auto";
		document.getElementById("main").style.width = "749px";
	}
}

function swapImg(element, newSrc) {
	document.getElementById(element).src = newSrc;
}