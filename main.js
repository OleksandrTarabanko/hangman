const words = [
  "apple",
  "banana",
  "watermelon",
  "strawberry",
  "pineapple",
  "grapefruit",
  "cherry",
  "mango",
  "blueberry",
  "kiwi",
  "computer",
  "javascript",
  "keyboard",
  "monitor",
  "internet",
  "software",
  "programming",
  "developer",
  "variable",
  "function",
  "mountain",
  "ocean",
  "island",
  "volcano",
  "desert",
  "forest",
  "rainbow",
  "storm",
  "galaxy",
  "planet",
  "elephant",
  "giraffe",
  "kangaroo",
  "tiger",
  "dolphin",
  "penguin",
  "rabbit",
  "squirrel",
  "butterfly",
  "dragon",
  "mystery",
  "adventure",
  "puzzle",
  "treasure",
  "journey",
  "fantasy",
  "castle",
  "wizard",
  "robot",
  "spaceship",
];
let livesCount = 6;
const wordToGuess = "cherry";
const lettersArr = wordToGuess.split("");
const wrongLetters = [];

const livesArea = document.querySelector(".lives-area");
const guessLettersArea = document.querySelector(".guess-letters-area");
const hangmanArea = document.querySelector(".hangman-area");
const wrongLettersArea = document.querySelector(".wrong-area");

function getHearts() {
  livesArea.innerHTML = "";
  const livesMarkup = `<span>
    <svg
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
  >
    <g transform="translate(0 -1028.4)">
      <path
        d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
        fill="#e74c3c"
      />
    </g>
  </svg>
  </span>`;

  for (let i = 0; i < livesCount; i++) {
    livesArea.insertAdjacentHTML("beforeend", livesMarkup);
  }
}

function makeUnderlines() {
  guessLettersArea.innerHTML = "";
  const guessLettersMarkup = lettersArr
    .map(
      (letter) => `<span data-letter="${letter}" class="underline">___</span>`
    )
    .join("");

  guessLettersArea.insertAdjacentHTML("beforeend", guessLettersMarkup);
}

function getWrongLetters() {
  wrongLettersArea.innerHTML = "";

  for (let i = 0; i < wrongLetters.length; i++) {
    const element = wrongLetters[i];

    wrongLettersArea.insertAdjacentHTML(
      "beforeend",
      `<span>${element.toUpperCase()}</span>`
    );
  }

  console.log(wrongLetters);
}

document.onkeydown = (e) => {
  for (const letter of lettersArr) {
    if (e.key === letter) {
      document
        .querySelectorAll(`[data-letter="${letter}"]`)
        .forEach((element) => (element.textContent = letter.toUpperCase()));
      return;
    }
  }

  if (!wrongLetters.includes(e.key)) {
    wrongLetters.push(e.key);
    getWrongLetters();
    livesCount--;
    getHearts();
  }
};

makeUnderlines();
getHearts(livesCount);
