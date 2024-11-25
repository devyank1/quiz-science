const questions = [
    { question: "O que é uma cadeia alimentar?", answers: ["A interação entre seres vivos por alimentação", "Um tipo de rede elétrica", "Um grupo de plantas", "Um ciclo da água"], correct: 0 },
    { question: "Qual o papel dos produtores em uma cadeia alimentar?", answers: ["Produzir energia", "Consumir alimentos", "Decompor matéria", "Predar outros animais"], correct: 0 },
    { question: "Qual é um exemplo de consumidor primário?", answers: ["Gafanhoto", "Sapo", "Onça", "Fungo"], correct: 0 },
    { question: "Quem são os decompositores?", answers: ["Bactérias e fungos", "Leões e tigres", "Capim e árvores", "Gafanhotos e sapos"], correct: 0 },
    { question: "O que é um consumidor secundário?", answers: ["Quem come consumidores primários", "Quem produz alimentos", "Quem come plantas", "Quem decompõe matéria"], correct: 0 },
    { question: "O que acontece se removermos os sapos de uma cadeia alimentar?", answers: ["População de gafanhotos aumenta", "População de plantas aumenta", "A cadeia permanece a mesma", "Os decompositores somem"], correct: 0 },
    { question: "O que é uma teia alimentar?", answers: ["Interconexão de várias cadeias alimentares", "Uma rede de caçadores", "Somente consumidores terciários", "Somente decompositores"], correct: 0 },
    { question: "Qual é um exemplo de consumidor terciário?", answers: ["Onça", "Capim", "Gafanhoto", "Fungo"], correct: 0 },
    { question: "Por que as espécies exóticas são perigosas?", answers: ["Podem desequilibrar os ecossistemas", "Sempre são predadoras", "Produzem alimentos", "Não causam impacto"], correct: 0 },
    { question: "Quem ocupa o primeiro nível trófico?", answers: ["Produtores", "Decompositores", "Consumidores secundários", "Consumidores terciários"], correct: 0 },
    { question: "O que é fotossíntese?", answers: ["Processo de produzir energia pelas plantas", "Consumo de matéria orgânica", "Respiração de fungos", "Caça por predadores"], correct: 0 },
    { question: "Qual é um exemplo de desequilíbrio ambiental?", answers: ["Extinção de predadores", "Aumento da população de onças", "Redução de decompositores", "Nada muda"], correct: 0 },
    { question: "O que é um nível trófico?", answers: ["Uma posição na cadeia alimentar", "Uma decomposição de matéria", "Um tipo de consumidor primário", "Uma planta"], correct: 0 },
    { question: "Quem são os organismos mais importantes?", answers: ["Todos desempenham papéis importantes", "Consumidores primários", "Consumidores terciários", "Decompositores"], correct: 0 },
    { question: "O que acontece com a energia ao longo da cadeia?", answers: ["Ela diminui", "Ela aumenta", "Ela não muda", "Ela desaparece"], correct: 0 }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        if (index === currentQuestion.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
        scoreElement.innerText = `Pontuação: ${score}`;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `Você completou o quiz! Sua pontuação final é ${score} de ${questions.length}.`;
    nextButton.innerText = "Reiniciar";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        showNextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
