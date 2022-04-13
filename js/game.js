let selected = false;
let numOfQuestions;

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

function submit(id) {}

function startGame() {
    if (selected === true) {
        window.location.href = "game.html";
        console.log(numOfQuestions);
    }
}

const images = [
    {
        image: "./images/notes/middle_c.png",
        choices: ["A", "D", "E", "C"],
        answer: "C",
    },
];

let noteIndex = Math.floor(Math.random() * images.length);

let image = document.getElementById("note-image"); //
image.src = images[noteIndex].image;

for (let i = 1; i < 5; i++) {
    let answerChoice = document.getElementById(`answer-${i}`);
    answerChoice.innerHTML = images[noteIndex].choices[i - 1];
}
