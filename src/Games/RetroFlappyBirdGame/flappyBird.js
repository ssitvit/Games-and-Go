"use strict";

// Get the canvas element and its 2D rendering context
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Load images
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

// Initialize some variables
var gap = 140;
var constant;
var bX = 30;
var bY = 175;
var gravity = 1.0;
var score = 0;

// Load audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// Listen for the "keydown" event to make the bird move up
document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 35;
  fly.play();
}

// Initialize the pipe coordinates
var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// Draw images and update the game state
function draw() {
  // Draw the background
  ctx.drawImage(bg, 0, 0);

  // Loop through pipes and draw them
  for (var i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;

    // Draw the top pipe
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    
    // Draw the bottom pipe
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    // Move the pipe to the left
    pipe[i].x--;

    // When a pipe reaches a certain position, add a new pipe
    if (pipe[i].x == 130) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    // Detect collision with pipes or ground
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // Reload the page to restart the game
    }

    // Increase the score when a pipe is passed
    if (pipe[i].x == 1) {
      score++;
      scor.play();
    }
  }

  // Draw the foreground
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  
  // Draw the bird
  ctx.drawImage(bird, bX, bY);

  // Apply gravity to the bird's position
  bY += gravity;

  // Display the current score on the canvas
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  // Use requestAnimationFrame to call the draw function repeatedly
  requestAnimationFrame(draw);
}

// Start the game loop by calling the draw function
draw();
