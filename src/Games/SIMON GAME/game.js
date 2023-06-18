let butColor=["red","blue","green","yellow"];
let userClickedPattern=[];
let gamePattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").html("Level "+level);
        nextSequencer();
        started=true;
    }
});

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}

$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAns(userClickedPattern.length-1);
});

function checkAns(curLevel)
{
    if(gamePattern[curLevel]===userClickedPattern[curLevel])
    {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function() {
                nextSequencer();
            },1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("GAME OVER! Press Any key to Restart");
        startOver();
    }
}

function nextSequencer()
{

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var ranNo=Math.floor(Math.random()*4);
    var ranColor=butColor[ranNo];
    //console.log(ranColor);

    gamePattern.push(ranColor);
    //console.log(gamePattern);

    $("#"+ranColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(ranColor);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(curColor)
{
    $("#"+curColor).addClass("pressed");
    setTimeout(function() {
        $("#"+curColor).removeClass("pressed");
    },100);
}


// console.log("wrong");

// //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
// playSound("wrong");

// //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
// $("body").addClass("game-over");
// setTimeout(function () {
//   $("body").removeClass("game-over");
// }, 200);

// //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
// $("#level-title").text("Game Over, Press Any Key to Restart");