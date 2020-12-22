let numHeart = 3
let timeleft = 60 
let colors = []
let trueColor
let Tryagain = ["Try again","Maybe next time?","Dont give up","Guess again","Keep trying","I believe you will succeed!"]
let Correct = ["Correct!!"," You're a champion !! "," you are the best !! "," Congratulations you won !!","you are the winner!!"] 
let heart = document.querySelectorAll(".heart")
let paragraph = document.querySelector("p")
let h1 = document.querySelector("h1")
let BresetGame = document.querySelector("#reset")
let modeButtonSelect = document.querySelectorAll(".mode")
let colorDisplay = document.getElementById("colorDisplay")


init()

function init() {
	modeButton()
	setupHeart()
	resetGame()
}

function modeButton() {
	BresetGame.addEventListener("click", function() {
		resetGame()
		timeleft= 60;
	})
	//change selected mode for the button
	for(let i = 0; i < modeButtonSelect.length; i++) {
		modeButtonSelect[i].addEventListener("click", function() {
			modeButtonSelect[0].classList.remove("selected")
			modeButtonSelect[1].classList.remove("selected")
			this.classList.add("selected")
			//num heart like the level that player selection
			if (this.textContent === "Easy"){
				numHeart = 3;
				timeleft= 60;
			} 
			else{
				 numHeart = 6;
				 timeleft= 60;
				}
			resetGame()
		})
	}
}

//timer to 60 seconds to restarted the game
let downloadTimer = setInterval(function(){
	if(timeleft <= 0){
	  document.getElementById("countdown").innerHTML = "time is up";
	  resetGame()
	  paragraph.textContent = "The game has been restarted - next time Try to be speeder"
	  timeleft = 60
	} else {
	  document.getElementById("countdown").innerHTML = timeleft + " seconds to restarted";
	}
	timeleft -= 1;
}, 1000);
  
//reset the setting of the game	
function resetGame() {
	colors = createRandomRgbHeart(numHeart)
	trueColor = ColorToGuess()
	colorDisplay.textContent = trueColor
    paragraph.style.backgroundColor = ""
	BresetGame.textContent = "Another Colors"
	paragraph.textContent = "lets start!!"
	for(let i =0; i < heart.length; i++) {
		if(colors[i]) {
			heart[i].style.display = "block"
			heart[i].style.backgroundColor = colors[i]
			heart[i].style.opacity = 1;
		} else {
			heart[i].style.display = "none"
		}
	}
}

//set up the hearts : compare color to pickcolor.
function setupHeart() {
	for(let i =0; i < heart.length; i++) {
		heart[i].addEventListener("click", function() {
			let clickedColor = this.style.backgroundColor
			if(clickedColor === trueColor) {
			    paragraph.textContent = Correct[Math.floor(Math.random()*Correct.length)];
				BresetGame.textContent = "Play Again?"
				HeartsColors(clickedColor)
				paragraph.style.backgroundColor = clickedColor
			} else {
				paragraph.textContent = Tryagain[Math.floor(Math.random()*Tryagain.length)];
				this.style.opacity = 0.3;
				this.style.display = "block";
			}
		})
	}
}

//makes hearts color to Correct color.
function HeartsColors(color) {
	for(let i = 0; i < heart.length; i++) {
		heart[i].style.backgroundColor = color
	}
}

//random color for the player need to guess	(Correct Color).
function ColorToGuess() {
	let random = Math.floor(Math.random() * colors.length)
	return colors[random]
}

//random color to list for the heart.
function createRandomRgbHeart(num) {
	let listRandomRGB = []
	for(let i = 0; i < num; i++) {
		listRandomRGB.push(randomRGB())
	}
	return listRandomRGB
}

// random RGB color.
function randomRGB() {
	let red = Math.floor(Math.random() * 256)
	let green = Math.floor(Math.random() * 256)
	let blue = Math.floor(Math.random() * 256)
	return "rgb(" + red + ", " + green + ", " + blue + ")"
}

