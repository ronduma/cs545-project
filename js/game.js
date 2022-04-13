let selected = false;
let questionNumber = 1;
let correct = 0;
let numOfQuestions;
let firstAttempt = true;
let finishedQuestion = false;
let startTime = Date.now();
let endTime;

const notes = ["C", "D", "E", "F", "G", "A", "B"];

let images = [
    {
        image: "./images/notes/middle_c.png",
        choices: ["C"],
        answer: "C",
    },
];

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

for (let elem of images) {
    while (elem.choices.length < 4) {
        let randomIndex = Math.floor(Math.random() * notes.length);
        if (notes[randomIndex] !== elem.answer) {
            elem.choices.push(notes[randomIndex]);
        }
    }
    shuffle(elem.choices);
}

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

    for (let elem of images) {
        while (elem.choices.length < 4) {
            let randomIndex = Math.floor(Math.random() * notes.length);
            if (notes[randomIndex] !== elem.answer) {
                elem.choices.push(notes[randomIndex]);
            }
        }
        shuffle(elem.choices);
    }

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
