const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guessedNumber = parseInt(document.getElementById('guessInput').value);

    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
        setMessage("Please enter a valid number between 1 and 100.");
    } else {
        attempts++;
        if (guessedNumber === targetNumber) {
            setMessage(`Congratulations! You guessed the correct number ${targetNumber} in ${attempts} attempts.`);
        } else if (guessedNumber < targetNumber) {
            setMessage("Try again! The number is higher.");
        } else {
            setMessage("Try again! The number is lower.");
        }
    }
}

function setMessage(message) {
    document.getElementById('message').textContent = message;
}
