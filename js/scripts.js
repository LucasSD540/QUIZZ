// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const welcomeContainer = document.querySelector("#welcome-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Iniciar o Quizz
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", function() {
  welcomeContainer.style.display = "none";
  quizzContainer.style.display = "block";
});

// Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual linguagem de programação é conhecida por ser usada principalmente para desenvolvimento front-end de websites?",
      "answers": [
        {
          "answer": "Python",
          "correct": false
        },
        {
          "answer": "Ruby",
          "correct": false
        },
        {
          "answer": "JavaScript",
          "correct": true
        },
        {
          "answer": "C++",
          "correct": false
        },
      ]
    },
    {
      "question": "O que HTML representa?",
      "answers": [
        {
          "answer": "Hyper Text Markup Language",
          "correct": true
        },
        {
          "answer": "High-Level Text Machine Language",
          "correct": false
        },
        {
          "answer": "Hyper Transfer Markup Language",
          "correct": false
        },
        {
          "answer": "Home Tool Markup Language",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual desses frameworks é usado para desenvolvimento de aplicativos móveis multiplataforma?",
      "answers": [
        {
          "answer": "Angular",
          "correct": false
        },
        {
          "answer": "React",
          "correct": false
        },
        {
          "answer": "Vue",
          "correct": false
        },
        {
          "answer": "Flutter",
          "correct": true
        },
      ]
    },
    {
      "question": "Qual é a linguagem de consulta usada para acessar e manipular bancos de dados relacionais?",
      "answers": [
        {
          "answer": "HTML",
          "correct": false
        },
        {
          "answer": "JavaScript",
          "correct": false
        },
        {
          "answer": "SQL",
          "correct": true
        },
        {
          "answer": "CSS",
          "correct": false
        },
      ]
    },
    {
      "question": "O que CSS representa em desenvolvimento web?",
      "answers": [
        {
          "answer": "Cascading Style Sheet",
          "correct": true
        },
        {
          "answer": "Computer Style Sheet",
          "correct": false
        },
        {
          "answer": "Creative Style Sheet",
          "correct": false
        },
        {
          "answer": "Colorful Style Sheet",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual das seguintes linguagens é conhecida por ser uma linguagem de programação orientada a objetos?",
      "answers": [
        {
          "answer": "PHP",
          "correct": false
        },
        {
          "answer": "Ruby",
          "correct": true
        },
        {
          "answer": "Swift",
          "correct": false
        },
        {
          "answer": "SQL",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual é o formato de dados amplamente usado para representar informações estruturadas em uma página web?",
      "answers": [
        {
          "answer": "JSON",
          "correct": true
        },
        {
          "answer": "XML",
          "correct": false
        },
        {
          "answer": "YAML",
          "correct": false
        },
        {
          "answer": "CSV",
          "correct": false
        },
      ]
    },
  ]

// Substituição do quizz para a primeira pergunta
function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Alterar texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

        // Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir a alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Inserir um evento de click no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    // Incrementar o número da questão
    actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {

    // Seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
        
        if(button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            // Checa se o usuário acertou a pergunta
            if (btn === button) {
                // Incremento dos pontos
                points++;
            }

        } else {

            button.classList.add("wrong-answer");
        
        }
    
    });

    // Exibir próxima pergunta
    nextQuestion();

}

// Exibe a próxima pergunta no quizz
function nextQuestion() {

    // timer para usuário ver as respostas
    setTimeout(function() {

    // verifica se ainda há perguntas
    if(actualQuestion >= questions.length) {
        // apresenta a mensagem de sucesso
        showSuccessMessage();
        return;
    }

    createQuestion(actualQuestion);

    }, 1500); 

}

// Exibe a tela final
function showSuccessMessage() {

  hideOrShowQuizz();

  // trocar dados da tela de sucesso

  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");

  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
  // zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  location.reload();
});

// Inicialização do Quizz
init();