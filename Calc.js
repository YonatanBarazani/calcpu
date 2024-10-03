let totalQuestions = 30;
let questionsAnswered = 0;
let correctAnswers = 0;
let score = 100;
let startTime;
let currentQuestion;
let choice;

function startGame() {
    const level = document.getElementById('level').value;
    choice = parseInt(level);
    questionsAnswered = 0;
    correctAnswers = 0;
    score = 100;
    document.getElementById('score').textContent = '';
    document.getElementById('finalScore').textContent = '';
    startTime = new Date();
    generateQuestion();
}

function generateQuestion() {
    if (questionsAnswered >= totalQuestions) {
        endGame();
        return;
    }

    const num1 = Math.floor(Math.random() * choice) + 1;
    const num2 = Math.floor(Math.random() * choice) + 1;
    currentQuestion = num1 * num2;

    document.getElementById('question').textContent = `${questionsAnswered + 1}. What is ${num1} * ${num2}?`;
}

function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    if (answer === currentQuestion) {
        correctAnswers++;
    } else {
        score -= 3;
    }

    questionsAnswered++;
    generateQuestion();
    document.getElementById('answer').value = '';
}

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

    const successRate = correctAnswers / questionsAnswered;
    const formattedTime = `${minutes}:${seconds}`;

    // Send the result to the server to save
    fetch('/save_result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            final_score: finalScore,
            level: choice,
            correct_answers: correctAnswers,
            questions_answered: questionsAnswered,
            success_rate: successRate,
            formatted_time: formattedTime,
        }),
    }).then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error('Error:', error));
}
