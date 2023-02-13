const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptinganswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
  {
    question: "how many heading there are in HTML ?",
    choice1: "4",
    choice2: "6",
    choice3: "8",
    choice4: "5",
    answer: 2,
  },
  {
    question: "which header has bolder ?",
    choice1: "<h1>",
    choice2: "<h4>",
    choice3: "<h3>",
    choice4: "<h5>",
    answer: 1,
  },
  {
    question: "how many ways there are to insert a style sheet with css",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3,
  },
  {
    question: "what does document means in javascript ?",
    choice1: "header",
    choice2: "body",
    choice3: "footer",
    choice4: "html",
    answer: 2,
  },
  {
    question: "how can access HTML element with javascript ?",
    choice1: "document.element",
    choice2: "document.name",
    choice3: "document.getElementById(id)",
    choice4: "document.getElementById(cass)",
    answer: 3,
  },
  {
    question: "how to make a string variable ?",
    choice1: "String name ?",
    choice2: "$name",
    choice3: "var name ",
    choice4: "const name",
    answer: 3,
  },
  {
    question: "which one is true ?",
    choice1: "var x = 'ali'",
    choice2: "var x = 3",
    choice3: "var x = 9.3",
    choice4: "all",
    answer: 4,
  },
  {
    question: "what is php got from ?",
    choice1: "hypertext preprocessor",
    choice2: "hypertext markup language",
    choice3: "1",
    choice4: "2",
    answer: 3,
  },
  {
    question: "which language is working with server side ?",
    choice1: "php",
    choice2: "HTML",
    choice3: "js",
    choice4: "1",
    answer: 4,
  },
  {
    question: "what is HTML for ?",
    choice1: "for interface",
    choice2: "backend",
    choice3: "form validation",
    choice4: "1",
    answer: 4,
  },
];

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  // console.log(availableQuestions);
  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  // console.log(availableQuestions);
  acceptinganswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target);
    if (!acceptinganswers) return;
    acceptinganswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
