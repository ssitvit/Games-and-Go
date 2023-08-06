"use strict";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var gap = 140;
var constant;
var bX = 30;
var bY = 175;
var gravity = 1.0;
var score = 0;

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0,
};

var gameOver = false; // Game over flag

document.addEventListener("keydown", moveUp);

function moveUp() {
  if (!gameOver) { // Allow bird movement only when game is not over
    bY -= 35;
    fly.play();
  }
}

function restartGame() {
  gameOver = false;
  score = 0;
  pipe = [];
  pipe[0] = {
    x: cvs.width,
    y: 0,
  };
  bY = 175;
  draw();
}

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;
    
    if (pipe[i].x == 130) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    if (
      (bX + bird.width >= pipe[i].x &&
      bX <= pipe[i].x + pipeNorth.width &&
      (bY <= pipe[i].y + pipeNorth.height ||
      bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      gameOver = true;
    }

    if (pipe[i].x == 1) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  if (gameOver) {
    ctx.fillStyle = "#000";
    ctx.font = "30px Verdana";
    ctx.fillText("Game Over", cvs.width / 2 - 60, cvs.height / 2 - 30);
    ctx.fillText("Click to Restart", cvs.width / 2 - 110, cvs.height / 2 + 10);
    cvs.addEventListener("click", restartGame);
  } else {
    requestAnimationFrame(draw);
  }
}

draw();
