let selected = false;
let questionNumber = 1;
let correct = 0;
let numOfQuestions;
let firstAttempt = true;
let finishedQuestion = false;
let startTime = Date.now();
let endTime;
const images = [
    {
        image: "./images/notes/middle_c.png",
        choices: ["A", "D", "E", "C"],
        answer: "C",
    },
    {
        image: "./images/notes/A4.svg",
        choices: ["B", "A", "C", "F"],
        answer: "A"
    },
    {
        image: "./images/notes/B4.svg",
        choices: ["G", "E", "C", "B"],
        answer: "B"
    },
    {
        image: "./images/notes/C4.svg",
        choices: ["C", "B", "G", "F"],
        answer: "C"
    },
    {
        image: "./images/notes/C5.svg",
        choices: ["B", "A", "E", "C"],
        answer: "C"
    },
    {
        image: "./images/notes/D4.svg",
        choices: ["D", "F", "E", "A"],
        answer: "D"
    },
    {
        image: "./images/notes/D5.svg",
        choices: ["G", "D", "A", "F"],
        answer: "D"
    },
    {
        image: "./images/notes/E4.svg",
        choices: ["F", "G", "B", "E"],
        answer: "E"
    },
    {
        image: "./images/notes/E5.svg",
        choices: ["A", "C", "E", "B"],
        answer: "E"
    },
    {
        image: "./images/notes/F4.svg",
        choices: ["B", "G", "F", "A"],
        answer: "F"
    },
    {
        image: "./images/notes/F5.svg",
        choices: ["E", "F", "A", "C"],
        answer: "F"
    },
    {
        image: "./images/notes/G4.svg",
        choices: ["A", "G", "B", "D"],
        answer: "G"
    },
    {
        image: "./images/notes/G5.svg",
        choices: ["D", "F", "G", "A"],
        answer: "G"
    },
];

let noteIndex = Math.floor(Math.random() * images.length);

let image = document.getElementById("note-image"); //
image.src = images[noteIndex].image;

for (let i = 1; i < 5; i++) {
    let answerChoice = document.getElementById(`answer-${i}`);
    answerChoice.innerHTML = images[noteIndex].choices[i - 1];
}

const urlParams = new URLSearchParams(window.location.search);
numOfQuestions = urlParams.get("questions");
if (numOfQuestions === null) {
    numOfQuestions = 10;
}

let questionElem = document.getElementById("question");
questionElem.innerHTML = `Question: ${questionNumber}`;

let scoreElem = document.getElementById("score");
scoreElem.innerHTML = `Score: ${correct}/${numOfQuestions}`;

function select(id) {
    selected = true;
    let choices = document.getElementsByClassName("choice");
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove("selected");
        choices[i].classList.add("secondary-btn");
    }
    let current = document.getElementById(id);
    current.classList.remove("secondary-btn");
    current.classList.add("selected");
    numOfQuestions = Number.parseInt(current.innerHTML);

    // option.style.backgroundColor = "#46B1C9";
    // option.style.color = "#FBFBF5";
}

function submit(id) {
    if (finishedQuestion === false) {
        let choices = document.getElementsByClassName("choice");
        for (let i = 0; i < choices.length; i++) {
            choices[i].classList.remove("selected");
            choices[i].classList.remove("wrong-selected");
            choices[i].classList.add("secondary-btn");
        }
        let current = document.getElementById(id);
        current.classList.remove("secondary-btn");
        let message = document.getElementById("display-message");
        let nextQuestion = document.getElementById("next-question");
        if (current.innerHTML === images[noteIndex].answer) {
            current.classList.add("selected");
            message.innerHTML = "Good Job!";
            if (firstAttempt === true) {
                correct++;
                scoreElem.innerHTML = `Score: ${correct}/${numOfQuestions}`;
                firstAttempt = false;
            }
            nextQuestion.style.display = "block";
            finishedQuestion = true;
        } else {
            current.classList.add("wrong-selected");
            message.innerHTML = "Try Again!";
            firstAttempt = false;
        }
    }
}

function startGame() {
    if (selected === true) {
        window.location.href = `game.html?questions=${numOfQuestions}`;
    }
}

function changeQuestion() {
    if (questionNumber == numOfQuestions) {
        let gameQuestions = document.getElementById("game-questions");
        gameQuestions.remove();
        endTime = Date.now();
        displayScore();
    }
    finishedQuestion = false;
    firstAttempt = true;
    questionNumber++;
    questionElem.innerHTML = `Question: ${questionNumber}`;
    let nextQuestion = document.getElementById("next-question");
    nextQuestion.style.display = "none";
    noteIndex = Math.floor(Math.random() * images.length);

    image.src = images[noteIndex].image;

    for (let i = 1; i < 5; i++) {
        let answerChoice = document.getElementById(`answer-${i}`);
        answerChoice.innerHTML = images[noteIndex].choices[i - 1];
    }

    let choices = document.getElementsByClassName("choice");
    for (let i = 0; i < choices.length; i++) {
        choices[i].classList.remove("selected");
        choices[i].classList.remove("wrong-selected");
        choices[i].classList.add("secondary-btn");
    }

    let message = document.getElementById("display-message");
    message.innerHTML = "";
}

function displayScore() {
    let gameResults = document.getElementById("game-results");
    let container = document.createElement("div");
    container.className = "container";
    let row = document.createElement("div");
    row.className = "row";
    let img1div = document.createElement("div");
    img1div.className = "col";
    let img1 = document.createElement("img");
    img1.src = "./images/left_notes.png";
    img1div.appendChild(img1);
    let scorediv = document.createElement("div");
    scorediv.className = "col";
    scorediv.innerHTML = `
    <div class="card">
    <div class="card-body">
      <h4 class="card-title">Results</h4>
      <p>Score ${correct}</p>
      <p>Percent Correct ${correct}/${numOfQuestions}</p>
      <p>Time ${(endTime - startTime) / 1000} seconds</p>
    </div>
  </div>
    `;
    let img2div = document.createElement("div");
    img2div.className = "col";
    let img2 = document.createElement("img");
    img2.src = "./images/right_notes.png";
    img2div.appendChild(img2);

    row.appendChild(img1div);
    row.appendChild(scorediv);
    row.appendChild(img2div);
    container.appendChild(row);
    gameResults.appendChild(container);
}
