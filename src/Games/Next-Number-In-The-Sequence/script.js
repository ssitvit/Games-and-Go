const seriesArray = [
  [2, 4, 6, 8, 10, 12, 14],
  [3, 6, 9, 12, 15, 18, 21],
  [1, 5, 9, 13, 17, 21, 25],
  [10, 20, 30, 40, 50, 60, 70],
  [50, 40, 30, 20, 10, 0, -10],
  [100, 150, 200, 250, 300, 350, 400],
  [5, 10, 20, 40, 80, 160, 320],

  [2, 4, 8, 16, 32, 64, 128],
  [3, 9, 27, 81, 243, 729, 2187],
  [1, 3, 9, 27, 81, 243, 729],
  [2, 6, 18, 54, 162, 486, 1458],

  // Prime Numbers
  [2, 3, 5, 7, 11, 13, 17],
  [11, 13, 17, 19, 23, 29, 31],
  [7, 11, 13, 17, 19, 23, 29],

  // Square Numbers
  [1, 4, 9, 16, 25, 36, 49],
  [25, 36, 49, 64, 81, 100, 121],
  [16, 81, 144, 225, 324, 441, 576],

  // Cube Numbers
  [1, 8, 27, 64, 125, 216, 343],
  [27, 64, 125, 216, 343, 512, 729],
  [8, 27, 125, 512, 729, 1331, 2197],

  // Fibonacci Numbers
  [1, 1, 2, 3, 5, 8, 13],
  [1, 2, 3, 5, 8, 13, 21],
  [2, 3, 5, 8, 13, 21, 34],

  // Triangular Numbers
  [1, 3, 6, 10, 15, 21, 28],
  [3, 6, 10, 15, 21, 28, 36],
  [6, 10, 15, 21, 28, 36, 45],

  // Power of 2
  [2, 4, 8, 16, 32, 64, 128],
  [4, 16, 64, 256, 1024, 4096, 16384],
  [16, 64, 256, 1024, 4096, 16384, 65536],

  // Powers of 3
  [3, 9, 27, 81, 243, 729, 2187],
  [9, 81, 729, 6561, 59049, 531441, 4782969],
  [27, 81, 243, 729, 2187, 6561, 19683],

  // Square Root
  [1, 1.41, 1.73, 2, 2.24, 2.45, 2.65],
  [4, 5.66, 7.07, 8, 8.94, 9.9, 10.82],
  [9, 11.31, 13.42, 15, 16.49, 17.94, 19.37],

  // More Random Patterns
  [5, 10, 20, 30, 40, 50, 60],
  [100, 90, 80, 70, 60, 50, 40],
  [1000, 500, 250, 125, 62.5, 31.25, 15.625],
  [0, 1, 1, 2, 3, 5, 8],
  [1, 1, 2, 5, 14, 41, 122],
  [2, 7, 26, 97, 362, 1351, 5042],
  [100, 98, 96, 94, 92, 90, 88],
  [1, 1, 2, 5, 15, 52, 203],
  [2, 5, 10, 17, 26, 37, 50],
  [3, 9, 27, 81, 243, 729, 2187],
  // Add more series here...
];

let currentSeriesIndex = -1;
let currentNumberIndex = 0;
let correctAnswers = 0;
let startTime;
let stopTime;
let isPlaying = false;

let sequencesPlayed = 0;
let wrongAnswers = 0;

const numberDisplay = document.getElementById("number-display");
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resultMessage = document.getElementById("result-message");
const correctAnswersSpan = document.getElementById("correct-answers");
const sequencesPlayedSpan = document.getElementById("sequences-played");
const wrongAnswersSpan = document.getElementById("wrong-answers");
const timeTakenSpan = document.getElementById("time-taken");

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function startGame() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  correctAnswers = 0;
  sequencesPlayed = 0;
  wrongAnswers = 0;
  isPlaying = true;
  userInput.disabled = false;
  checkBtn.disabled = false;
  resultMessage.textContent = "";
  getNextSequence();
  startTime = new Date();
  timeTakenSpan.textContent = "0s";
  correctAnswersSpan.textContent = "0";
  sequencesPlayedSpan.textContent = "0";
  wrongAnswersSpan.textContent = "0";
  // Update stats display every second
  updateStatsDisplay();
  setInterval(updateStatsDisplay, 1000);
}

function updateStatsDisplay() {
  const currentTime = new Date();
  let timeTaken = 0;
  if (isPlaying) {
    timeTaken = (currentTime - startTime) / 1000;
  } else if (startTime && stopTime) {
    timeTaken = (stopTime - startTime) / 1000;
  }
  timeTakenSpan.textContent = `${timeTaken.toFixed(2)}s`;

  correctAnswersSpan.textContent = correctAnswers.toString();
  sequencesPlayedSpan.textContent = (correctAnswers + wrongAnswers).toString();
  wrongAnswersSpan.textContent = wrongAnswers.toString();
}

function getNextSequence() {
  currentSeriesIndex = getRandomIndex(seriesArray.length);
  currentNumberIndex = 0;
  numberDisplay.textContent = seriesArray[currentSeriesIndex]
    .slice(currentNumberIndex, currentNumberIndex + 3)
    .join(", ");
  userInput.value = "";
}

function checkNumber() {
  if (!isPlaying) return;

  const userNumber = parseInt(userInput.value, 10);
  const nextNumber = seriesArray[currentSeriesIndex][currentNumberIndex + 3];

  if (userNumber === nextNumber) {
    resultMessage.textContent = "Correct!";
    resultMessage.classList.remove("wrong");
    resultMessage.classList.add("correct");
    correctAnswers++;
    currentNumberIndex++;
  } else {
    resultMessage.textContent = `Wrong answer. The correct answer is ${nextNumber}. Try again.`;
    resultMessage.classList.remove("correct");
    resultMessage.classList.add("wrong");
    wrongAnswers++;
  }

  getNextSequence();
}

function stopGame() {
  stopTime = new Date();
  isPlaying = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resultMessage.textContent = `You've completed ${
    correctAnswers + wrongAnswers
  } sequences.`;

  const timeTaken = (stopTime - startTime) / 1000;
  timeTakenSpan.textContent = `${timeTaken.toFixed(0)}s`;
  userInput.disabled = true;
  checkBtn.disabled = true;
}

startBtn.addEventListener("click", startGame);
checkBtn.addEventListener("click", checkNumber);
stopBtn.addEventListener("click", stopGame);
