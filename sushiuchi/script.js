const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

// inputテキストあっているか判定
typeInput.addEventListener("input", () => {
  const sentenceArray = typeDisplay.querySelectorAll("span");
  const arrayValue = typeInput.value.split("");

  console.log(sentenceArray);
  sentenceArray.forEach((characterSpan, index) => {
    if (arrayValue[index] == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
    }
  });
});

function GetRundomSentence() {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function RenderNextSentence() {
  const sentence = await GetRundomSentence();

  let oneText = sentence.split("");
  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    typeDisplay.appendChild(characterSpan);
  });

  typeInput.value = "";
  StartTimer();
}

let starttime;
let origintime = 30;
function StartTimer() {
  timer.innerText = origintime;
  starttime = new Date();
  setInterval(() => {
    timer.innerText = origintime - getTimerTime();
    if (timer.innerText <= 0) TimeUp();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - starttime) / 1000);
}

function TimeUp() {
  RenderNextSentence();
}
RenderNextSentence();
