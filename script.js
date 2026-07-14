// These are the five trivia questions for the game.
const questions = [
  {
    question: "Which phase of the moon is completely dark?",
    answers: ["Full Moon", "New Moon", "Half Moon", "Blue Moon"],
    correctAnswer: "New Moon"
  },
  {
    question: "What tool is often used to look into the future in stories?",
    answers: ["Crystal Ball", "Teacup", "Broom", "Candle"],
    correctAnswer: "Crystal Ball"
  },
  {
    question: "Which color is made by mixing red and blue?",
    answers: ["Green", "Orange", "Purple", "Yellow"],
    correctAnswer: "Purple"
  },
  {
    question: "What do witches often ride in classic Halloween tales?",
    answers: ["Broomstick", "Dragon", "Boat", "Cloud"],
    correctAnswer: "Broomstick"
  },
  {
    question: "Which object is a shiny stone often used in magical designs?",
    answers: ["Feather", "Crystal", "Shell", "Leaf"],
    correctAnswer: "Crystal"
  }
];

// These variables keep track of the player's place in the game.
let currentQuestionIndex = 0;
let score = 0;

// These variables connect JavaScript to parts of the HTML page.
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const message = document.getElementById("message");
const finalScore = document.getElementById("final-score");

// This starts the game when the player clicks the start button.
startButton.addEventListener("click", startGame);

// This restarts the game when the player clicks the restart button.
restartButton.addEventListener("click", startGame);

// This function resets the score and shows the first question.
function startGame() {
  currentQuestionIndex = 0;
  score = 0;

  startScreen.classList.add("hide");
  endScreen.classList.add("hide");
  quizScreen.classList.remove("hide");

  showQuestion();
}

// This function puts the current question and answers on the page.
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  message.textContent = "";
  questionNumber.textContent = "Question " + (currentQuestionIndex + 1) + " of " + questions.length;
  questionText.textContent = currentQuestion.question;
  answerButtons.innerHTML = "";

  // This loop creates one button for each answer choice.
  currentQuestion.answers.forEach(function(answer) {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-button");
    button.addEventListener("click", function() {
      checkAnswer(answer);
    });
    answerButtons.appendChild(button);
  });
}

// This function checks if the clicked answer is correct.
function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    message.textContent = "Correct! The stars are smiling.";
  } else {
    message.textContent = "Wrong! The right answer was " + currentQuestion.correctAnswer + ".";
  }

  // This prevents the player from clicking more answers for the same question.
  const buttons = document.querySelectorAll(".answer-button");
  buttons.forEach(function(button) {
    button.disabled = true;
  });

  // This waits a moment, then moves to the next question.
  setTimeout(function() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showFinalScore();
    }
  }, 1400);
}

// This function shows the final score screen.
function showFinalScore() {
  quizScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  finalScore.textContent = "You scored " + score + " out of " + questions.length + "!";
}
