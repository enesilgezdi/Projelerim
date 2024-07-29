const questions = [
    {
        question: "which is larget animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "ataürk kaç yilinda dogmustur",
        answers: [
            {text: "1887", correct: false},
            {text: "1889", correct: false},
            {text: "1881", correct: true},
            {text: "1850", correct: false},
        ]
    },
    {
        question: "Türkiyenin en klabalik ili hagisidir?",
        answers: [
            {text: "İstanbul", correct: true},
            {text: "Antalya", correct: false},
            {text: "konya", correct: false},
            {text: "kars", correct: false},
        ]
    },
    {
        question: "türkiyenin başenketi neresidir",
        answers: [
            {text: "istanbul", correct: false},
            {text: "eskişehir", correct: false},
            {text: "Ankara", correct: true},
            {text: "Bursa", correct: false},
        ]
    },
    {
        question: "Fenerbahçenin efsana fulbocusu hangisidir?",
        answers: [
            {text: "quaresma", correct: false},
            {text: "yattara", correct: false},
            {text: "sergen ", correct: false},
            {text: "Voklan", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display  = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled="true"
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ` you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display ="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();