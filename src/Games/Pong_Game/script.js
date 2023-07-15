/**
 * Canvas and Context
 */
const canvas = document.getElementById('container')
const context = canvas.getContext("2d")
sessionStorage.setItem("winner", "None");


/**
 * Objects
 */
const ball = {
    radius: 8,
    positionX: canvas.width / 2 + 8,
    positionY: canvas.height / 2 + 8,
    velocityX: 2,
    velocityY: 2,
    color: 'white'
}

const leftPlayer = {
    height: 100,
    width: 10,
    positionX: 10,
    positionY: canvas.height / 2 - 100 / 2,
    color: 'white',
    player: 'left',
    speed: 2
}

const rightPlayer = {
    height: 100,
    width: 10,
    positionX: canvas.width - 20,
    positionY: canvas.height / 2 - 100 / 2,
    color: 'white',
    player: 'right',
    speed: 2
}


/**
 * Game
 */
const game = {
    leftScore: 0,
    rightScore: 0,
    turn: 0,
    topScore: 5,
    speedIncreaseHit: 3,
}

const keyPressed = {
    W: false,
    S: false,
    Up: false,
    Down: false
}

let activated = true;
let hits = 0;



/**
 * Update and Draw
 */
function drawLeftPlayer() {
    context.beginPath();
    context.fillStyle = leftPlayer.color;
    context.rect(leftPlayer.positionX, leftPlayer.positionY, leftPlayer.width, leftPlayer.height);
    context.fill();
    context.closePath();
}

function drawRightPlayer() {
    context.beginPath();
    context.fillStyle = rightPlayer.color;
    context.rect(rightPlayer.positionX, rightPlayer.positionY, rightPlayer.width, rightPlayer.height);
    context.fill();
    context.closePath();
}


function drawBall() {
    context.beginPath();
    context.fillStyle = ball.color;
    context.arc(ball.positionX, ball.positionY, ball.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}


function drawAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLeftPlayer()
    drawRightPlayer()
    drawBall()
}


function resetBall() {
    ball.positionX = canvas.width / 2 + 8
    ball.positionY = canvas.height / 2 + 8

    let velocityX = ball.velocityX
    let velocityY = ball.velocityY

    ball.velocityX = 0
    ball.velocityY = 0

    setTimeout(() => {
        ball.velocityX = -velocityX
        ball.velocityY = -velocityY
    }, 1000)
}


function collisionTimeLag() {
    activated = false
    console.log('Deactivated Collision')
    setTimeout(() => {
        activated = true
        console.log('Ready For Collision')
    }, 1000)
}


function setScore() {
    if (ball.positionX > canvas.width - (rightPlayer.width)) {
        game.leftScore++
        resetBall()
    } else if (ball.positionX < rightPlayer.width) {
        game.rightScore++
        resetBall()
    }

    document.getElementsByClassName('left')[0].textContent = game.leftScore
    document.getElementsByClassName('right')[0].textContent = game.rightScore
}


function gameOver(){
    if(game.leftScore === game.topScore){
        console.log('Left Wins')
        sessionStorage.setItem("winner", "Left");
        window.location.href = "winner.html";
        resetGame()
    }else if(game.rightScore === game.topScore){
        console.log('Right Wins')
        sessionStorage.setItem("winner", "Right");
        window.location.href = "winner.html";
        resetGame()
    }
}


function resetGame(){
    game.leftScore = 0
    game.rightScore = 0
    ball.positionX = 0
    ball.positionY = 0
    updateDefault()
}


function updateKeyPresses() {
    if (keyPressed['W']) {
        if (leftPlayer.positionY > 0) {
            leftPlayer.positionY -= leftPlayer.speed;
        }
    }
    if (keyPressed['S']) {
        if (leftPlayer.positionY < canvas.height - leftPlayer.height) {
            leftPlayer.positionY += leftPlayer.speed;
        }
    }
    if (keyPressed['Up']) {
        if (rightPlayer.positionY > 0) {
            rightPlayer.positionY -= rightPlayer.speed;
        }
    }
    if (keyPressed['Down']) {
        if (rightPlayer.positionY < canvas.height - rightPlayer.height) {
            rightPlayer.positionY += rightPlayer.speed;
        }
    }
}

function updateStates() {
    if ((ball.positionY + ball.radius) >= canvas.height || (ball.positionY - ball.radius) <= 0) {
        ball.velocityY = -ball.velocityY;
    }

    if (
        (ball.positionX + ball.radius >= canvas.width - (rightPlayer.width + 10) &&
            (ball.positionY >= rightPlayer.positionY && ball.positionY <= rightPlayer.positionY + rightPlayer.height)) ||

        (ball.positionX - ball.radius <= (leftPlayer.width + 10) &&
            (ball.positionY >= leftPlayer.positionY && ball.positionY <= leftPlayer.positionY + leftPlayer.height))
    ) {
        if (activated) {
            hits++;
            ball.velocityX = -ball.velocityX
            collisionTimeLag()
        }
    }

    setScore()
    gameOver()

    if(hits === game.speedIncreaseHit){
        hits = 0
        ball.velocityX += 0.2
        ball.velocityY += 0.2
        leftPlayer.speed += 0.2
        rightPlayer.speed += 0.2

        console.log(ball.velocityX, leftPlayer.speed);
    }

    ball.positionX += ball.velocityX;
    ball.positionY += ball.velocityY;
}


/**
 * Key Listeners
 */
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    if (code === 'KeyS') {
        keyPressed['S'] = true;
    }
    if (code === 'KeyW') {
        keyPressed['W'] = true;
    }
    if (code === 'ArrowUp') {
        keyPressed['Up'] = true;
    }
    if (code === 'ArrowDown') {
        keyPressed['Down'] = true;
    }

}, false);



document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;

    if (code === 'KeyS') {
        keyPressed['S'] = false;
    }
    if (code === 'KeyW') {
        keyPressed['W'] = false;
    }
    if (code === 'ArrowUp') {
        keyPressed['Up'] = false;
    }
    if (code === 'ArrowDown') {
        keyPressed['Down'] = false;
    }

}, false);



/**
 * Game Loop and Render
 */
function gameLoop() {
    updateKeyPresses()
    updateStates()
    drawAll()
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);




/**
 * Support
 */
function updateDefault() {
    canvas.width = Math.min(window.innerWidth * 0.6, 800)
    canvas.height = Math.min(window.innerHeight * 0.8, 600)

    ball.positionX = canvas.width / 2 + ball.radius
    ball.positionY = canvas.height / 2 + ball.radius

    leftPlayer.positionY = canvas.height / 2 - leftPlayer.height / 2

    rightPlayer.positionX = canvas.width - (rightPlayer.width + 10)
    rightPlayer.positionY = canvas.height / 2 - rightPlayer.height / 2
}

function resizeHandler() {
    if (window.innerWidth < 560) {
        document.getElementsByClassName('small-device')[0].style.display = "flex";
        document.getElementsByClassName('canvas-container')[0].style.display = "none";
    } else {
        document.getElementsByClassName('small-device')[0].style.display = "none";
        document.getElementsByClassName('canvas-container')[0].style.display = "flex";
    }

    updateDefault()
}

resizeHandler()
window.addEventListener('resize', () => { resizeHandler() })