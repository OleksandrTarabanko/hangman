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
const alphabet = "abcdefghijklmnopqrstuvwxyz";
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

const livesArea = document.querySelector(".lives-area");
const guessLettersArea = document.querySelector(".guess-letters-area");
const hangmanArea = document.querySelector(".hangman-area");
const hangmanImage = document.querySelector("[data-name=hangmanImage]");
const wrongLettersArea = document.querySelector(".wrong-area");
const keyboardArea = document.querySelector(".keyboardArea");

const modalBackdrop = document.querySelector(".modalBackdrop");
const modalLose = document.querySelector("[data-status=lost]");
const modalWin = document.querySelector("[data-status=won]");
const lostRestartBtn = document.querySelector("[data-name=lostRestartBtn]");
const wonRestartBtn = document.querySelector("[data-name=wonRestartBtn]");

function randomWord(wordsArr) {
  return wordsArr[Math.floor(Math.random() * wordsArr.length)];
}

function makeUnderlines(letters) {
  const guessLettersMarkup = letters
    .map(
      (letter) => `<span data-letter="${letter}" class="underline">___</span>`
    )
    .join("");
  guessLettersArea.innerHTML = guessLettersMarkup;
}

function showHearts(hearts) {
  livesArea.innerHTML = livesMarkup.repeat(hearts);
}

function showHangmanImage(hearts) {
  const expression =
    "JavaScript is my and Danli favoutite programming launguage".split(" ");

  hangmanArea.textContent = expression.slice(0, 8 - hearts).join(" ");
  hangmanImage.setAttribute("src", `./images/${8 - hearts}.png`);
}

function showWrongLetters(wrongLettersArr) {
  wrongLettersArea.innerHTML = wrongLettersArr
    .map((letter) => `<span>${letter.toUpperCase()}</span>`)
    .join("");

  console.log(wrongLettersArr);
}

function makeKeyboard() {
  for (const letter of alphabet) {
    const virtualLetter = document.createElement("button");
    virtualLetter.classList.add("virtual-letter");
    virtualLetter.textContent = letter.toUpperCase();

    virtualLetter.addEventListener("click", (event) => {
      handleKey(event.target.textContent.toLowerCase());
    });

    keyboardArea.appendChild(virtualLetter);
  }
}

function handleKey(key) {
  if (livesCount > 0) {
    for (const letter of wordToGuessLetters) {
      //   RIGHT LETTER AND WON MODAL
      if (key === letter) {
        document
          .querySelectorAll(`[data-letter="${letter}"]`)
          .forEach((element) => (element.textContent = letter.toUpperCase()));

        rightLetters = [...guessLettersArea.childNodes];

        if (rightLetters.every((el) => el.textContent !== "___")) {
          modalBackdrop.classList.remove("hidden");
          modalWin.classList.remove("hidden");
          document.onkeydown = null;
        }
        return;
      }
    }

    //   WRONG LETTER AND -1 HEART
    if (!wrongLetters.includes(key)) {
      wrongLetters.push(key);
      showWrongLetters(wrongLetters);
      livesCount--;
      showHearts(livesCount);
    }

    showHangmanImage(livesCount);

    // LOST MODAL
    if (livesCount === 0) {
      modalBackdrop.classList.remove("hidden");
      modalLose.classList.remove("hidden");
      return;
    }
  }
}

function reset() {
  livesCount = 8;
  wordToGuess = randomWord(words);
  wordToGuessLetters = wordToGuess.split("");
  wrongLetters = [];
  rightLetters = [];

  hangmanArea.textContent = "";
  hangmanImage.setAttribute("src", "");
  wrongLettersArea.innerHTML = "";

  modalBackdrop.classList.add("hidden");
  modalLose.classList.add("hidden");
  modalWin.classList.add("hidden");

  makeUnderlines(wordToGuessLetters);
  showHearts(livesCount);

  document.onkeydown = (e) => {
    handleKey(e.key);
  };
}

let livesCount = 8;
let wordToGuess = randomWord(words);
let wordToGuessLetters = wordToGuess.split("");
let wrongLetters = [];
let rightLetters = [];

makeKeyboard();
makeUnderlines(wordToGuessLetters);
showHearts(livesCount);

document.onkeydown = (e) => {
  handleKey(e.key);
};

//   RESTART
lostRestartBtn.onclick = () => {
  reset();
};
wonRestartBtn.onclick = () => {
  reset();
};
