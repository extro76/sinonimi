const wordList = [
"abietto",
"accanito",
"genetliaco",
"affabile",
"arcano",
"avvilito",
"bellicoso",
"effimero",
"caduco",
"capzioso",
"perorare",
"costernato",
"pomposo",
"diafano",
"mitigare",
"avulso",
"ossequente",
"soliloquio",
"turpe",
"petulante",
]; // 20 parole difficili

const sinonimi = [
"disturbato",
"ostinato",
"compleanno",
"gentile",
"misterioso",
"umiliato",
"combattivo",
"labile",
"debole",
"ingannevole",
"appoggiare",
"addolorato",
"arrogante",
"trasparente",
"alleviare",
"separato",
"rispettoso",
"monologo",
"volgare",
"arrogante",
]; // un sinonimo per ogni parola

const startButton = document.getElementById('start');
const replayButton = document.getElementById('replay');
const choiceButtons = document.querySelectorAll('.choice');
const fallingWord = document.getElementById('falling-word');
const gameplay = document.getElementById('gameplay');
const gameOver = document.getElementById('game-over');
const scoreDisplay = document.getElementById('score');
const finalScore = document.getElementById('final-score');

let currentWordIndex;
let currentChoices;
let score;

function initGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameplay.hidden = true;
  gameOver.hidden = true;
}

function startGame() {
  currentWordIndex = getRandomIndex(wordList.length);
  fallingWord.textContent = wordList[currentWordIndex];
  currentChoices = generateChoices(currentWordIndex);
  choiceButtons.forEach((button, index) => {
    button.textContent = currentChoices[index];
  });
  gameplay.hidden = false;
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function generateChoices(index) {
  const correctChoice = sinonimi[index];
  const choices = [correctChoice];

  while (choices.length < 3) {
    const randomWord = wordList[getRandomIndex(wordList.length)];
    if (!choices.includes(randomWord)) {
      choices.push(randomWord);
    }
  }

  return choices.sort(() => Math.random() - 0.5);
}

function checkAnswer(event) {
  const chosenWord = event.target.textContent;
  if (chosenWord === sinonimi[currentWordIndex]) {
    score++;
    scoreDisplay.textContent = score;
    if (wordList.length > 1) {
      wordList.splice(currentWordIndex, 1);
      sinonimi.splice(currentWordIndex, 1);
      startGame();
    } else {
      endGame();
    }
  } else {
    endGame();
  }
}

function endGame() {
  gameplay.hidden = true;
  gameOver.hidden = false;
  finalScore.textContent = score;
}

startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', () => {
  initGame();
  startGame();
});
choiceButtons.forEach(button => button.addEventListener('click', checkAnswer));

initGame();
