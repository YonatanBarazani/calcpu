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
    document.getElementById('answer').value = ''; // Clear input field on game start

    // Remove previous event listeners to avoid duplication
    const answerInput = document.getElementById('answer');
    answerInput.removeEventListener('keydown', submitOnEnter);
    answerInput.addEventListener('keydown', submitOnEnter);
}

// Submit on "Enter" key press
function submitOnEnter(event) {
    if (event.key === 'Enter') {
        submitAnswer();
    }
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
    const feedbackElement = document.getElementById('feedback');

    if (!isNaN(answer)) {  // Ensure the answer is a valid number
        if (answer === currentQuestion) {
            correctAnswers++;
            feedbackElement.textContent = "Correct!";
            feedbackElement.style.color = "green";  // Set feedback color to green for correct
        } else {
            feedbackElement.textContent = `Wrong! The correct answer is: ${currentQuestion}`;
            feedbackElement.style.color = "red";  // Set feedback color to red for wrong
            score -= 3;
        }

        questionsAnswered++;
        generateQuestion();
        document.getElementById('answer').value = '';  // Clear the input field
    } else {
        feedbackElement.textContent = "Please enter a valid number.";
        feedbackElement.style.color = "orange";  // Set feedback color to orange for invalid input
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

    // Clear the question and feedback once the game ends
    document.getElementById('question').textContent = '';
    document.getElementById('feedback').textContent = '';
}

// Restart the game
function restartGame() {
    // Reset game variables and display
    document.getElementById('feedback').textContent = ''; // Clear feedback
    document.getElementById('answer').value = ''; // Clear input field
    startGame(); // Restart the game from scratch
}
