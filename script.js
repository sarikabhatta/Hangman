const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const getRandomWord = () => {
    // get random word and hint from WordList array
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    // make the current word as random word that we get from above line
    currentWord = word;
    document.querySelector(".hint-text").innerText = hint;

    // Resetting game variables and UI elements for a new game
    correctLetters = new Set();
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    // here we first split the current word and map it with the css in letter class and then join it
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    
}

const gameOver = (isVictory) => {
    
    if(isVictory) {
        alert("Yayyyyyy! You Won the Game :)");
    } else {
        alert("You Lost the Game :(");
    }

    // after game is over, disable the keyboard
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

const initGame = (button, clickedLetter) => {
    // check if clickedLetter exists in the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.add(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
        // Checking if the user has won
        if(correctLetters.size === new Set(currentWord).size) { 
            setTimeout(() => gameOver(true), 500); 
        }
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        
        // Checking if the user has lost, specifically after 6 incorrect guesses
        if(wrongGuessCount === maxGuesses) {
            setTimeout(() => gameOver(false), 500); 
        }
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord(); // Start a new game when the page loads
