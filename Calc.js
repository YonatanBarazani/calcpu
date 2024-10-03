let totalQuestions = 30;
let questionsAnswered = 0;
let correctAnswers = 0;
let score = 100;
let startTime;
let currentQuestion;
let choice;

// Start the game
function startGame() {
    const level = document.getElementById('level').value;
    choice = parseInt(level);
    questionsAnswered = 0;
    correctAnswers = 0;
    score = 100;
    document.getElementById('score').textContent = '';
    document.getElementById('finalScore').textContent = '';
    document.getElementById('feedback').textContent = '';  // Clear feedback on game start
    startTime = new Date();
    generateQuestion();
    // Listen for "Enter" key press to submit the answer
    document.getElementById('answer').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submitAnswer();
        }
    });
}

// Generate a new question
function generateQuestion() {
    if (questionsAnswered >= totalQuestions) {
        endGame();
        return;
    }

    const num1 = Math.floor(Math.random() * choice) + 1;
    const num2 = Math.floor(Math.random() * choice) + 1;
    currentQuestion = num1 * num2;

    document.getElementById('question').textContent = `${questionsAnswered + 1}. ${num1} * ${num2} = `;
}

// Submit the answer and show feedback
function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    if (!isNaN(answer)) { // Validate if answer is a number
        if (answer === currentQuestion) {
            correctAnswers++;
            document.getElementById('feedback').textContent = `Correct!`;
        } else {
            document.getElementById('feedback').textContent = `Wrong! The correct answer is: ${currentQuestion}`;
            score -= 3;
        }
        questionsAnswered++;
        document.getElementById('answer').value = '';  // Clear the input field
        generateQuestion(); // Generate the next question
    } else {
        document.getElementById('feedback').textContent = `Please enter a valid number.`;
    }
}

// End the game and calculate the final score
function endGame() {
    const endTime = new Date();
    const durationSeconds = (endTime - startTime) / 1000;
    const timePenalty = Math.max(0, (durationSeconds - 300) / 10);

    const finalScore = Math.max(0, Math.round(score - timePenalty));
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);

    document.getElementById('score').textContent = `Correct answers: ${correctAnswers}/${questionsAnswered}`;
    document.getElementById('time').textContent = `Total time taken: ${minutes}:${seconds}`;
    document.getElementById('finalScore').textContent = `Final score: ${finalScore}`;
}

// Restart the game
function restartGame() {
    // Reset game variables and display
    document.getElementById('feedback').textContent = ''; // Clear feedback
    document.getElementById('answer').value = ''; // Clear input field
    startGame(); // Restart the game from scratch
}
