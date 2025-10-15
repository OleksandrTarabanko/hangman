const request =
  "https://random-words-api.kushcreates.com/api?language=en&category=countries&type=lowercase&words=1";

async function randomWord() {
  // return wordsArr[Math.floor(Math.random() * wordsArr.length)];
  try {
    const response = await fetch(request);
    const data = await response.json();
    return data[0].word;
  } catch (error) {
    console.error("Promise was rejected with:", error);
  }
}

export { randomWord };
