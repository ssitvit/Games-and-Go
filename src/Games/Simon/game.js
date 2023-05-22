// creating a color name holding array
const buttonColours = ["red", "blue", "green", "yellow"];

// creating an empty arry 
var gamePattern = [];

// creating an empty arry 
let userClickedPattern = [];

// need a way to keep track of whether if the game has started or not
var started = false;

var level = 0;

// Using jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    // changing the h1 to level 0 when the game is started
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// function for generating random number between 0 and 4 and storing it in a variable 
function nextSequence(){ 
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber =  Math.floor(Math.random()*4);

  // used the randomNumber to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // Adding the new randomChosenColour generated, to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // play the sound for the button colour selected
  playSound("sounds/" + randomChosenColour + ".mp3");
}



$(".btn").click(function(){
  let userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  //calling play sound function to play the sound according to the button which is clicked
  playSound("sounds/" + userChosenColour + ".mp3");
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    
    if (userClickedPattern.length === gamePattern.length){

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("sounds/wrong.mp3");
    gameOverAnimation();
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
 started = false;
 level = 0;
 gamePattern = [];

}

// Function that takes the source in the parameter called name and play the sound
function playSound(name){
  var audio = new Audio(name);
  audio.play();
}

// Animations to User Clicks //
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// Game over animation
function gameOverAnimation(){
  $("body").addClass("game-over");

 setTimeout(function(){
  $("body").removeClass("game-over");
 }, 200);
}
