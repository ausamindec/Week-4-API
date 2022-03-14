const startQuiz = document.querySelector('#start-quiz');
const displayTimer = document.querySelector('.timer h2');
const mainTag = document.querySelector('main');
const questionContainer = document.querySelector('.question-container h2');
const optiona = document.querySelector('#a');
const optionb = document.querySelector('#b');
const optionc = document.querySelector('#c');
const optiond = document.querySelector('#d');
const options = document.querySelectorAll('.options');
const questionCard = document.querySelector('#question-card');
const over = document.querySelector('#over');
const displayScore = document.querySelector('#score');
var initialsBox = document.querySelector("#initialsBox");
var submitBtn = document.querySelector("#submitBtn");
var scoreCard=document.querySelector('#score-card')
var leaderBoard = document.getElementById('leaderBoard')
// const overContainer=document.getElementById

var timeLeft = questionBank.length * 15;
var q = 0;
var clicked = 0;
let scoreList = [];

startQuiz.addEventListener('click', function () {
    clicked ++;
    if (clicked===1) {
        timer();
        mainTag.classList.add('hide')
        displayQuestion();
    }      
})

function timer() {
    timeInterval = setInterval(function () {
        timeLeft--;
        displayTimer.textContent = `TIMER: ${timeLeft}`;
  
        if (timeLeft === 0 || q >= questionBank.length) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}

function displayQuestion() {
    if (q < questionBank.length) {
        questionContainer.innerText = questionBank[q].question;
        options.forEach(element => {
            element.classList.remove('hide');
        });
        optiona.innerText='1. '+questionBank[q].selection[0]
        optionb.innerText='2. '+questionBank[q].selection[1]
        optionc.innerText='3. '+questionBank[q].selection[2]
        optiond.innerText='4. '+questionBank[q].selection[3]        
    } else {
        gameOver();
    }
}
function gameOver() {
    console.log('Game over');
    questionCard.classList.add('hide')
    over.classList.remove('hide')
    displayScore.innerText = score;
}
function compareAnswer(ans) {
    if (q >= questionBank.length) {
        gameOver();
    } else if(ans!==''){
        if (ans === questionBank[q].answer) {
            console.log("Correct Answer");
            response = document.createElement('h2');
            response.innerText='Correct!!!'
            questionCard.append(response);
            
        } else {
            response = document.createElement('h2');
            response.innerText='Wrong Answer!!!'
            questionCard.append(response);
            timeLeft -= 10;
        }

        score = timeLeft;
        q++;
        setTimeout(() => {
            displayQuestion();
            response.innerText=''
        }, 1000);
        
    }
}
questionCard.addEventListener('click', (event) => {
        compareAnswer(event.target.id)
})

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var playerInitials = initialsBox.value.trim();
    var newScore = {
      player: playerInitials,
      score: score,
    };
    saveScore(newScore);
    over.classList.add("hide");
    scoreCard.classList.remove("hide");
    scoreBoard();
});
  

function scoreBoard() {
    removeAllChildNodes(leaderBoard);
    scoreList=JSON.parse(localStorage.getItem("highScore"));
    scoreList.sort((a, b) => {
      return b.score - a.score;
    });
    //only render the top 4 scores.
    topTen = scoreList.slice(0, 10);
    addToLeaderBoard();
    }
  

function addToLeaderBoard() {
      scoreList=JSON.parse(localStorage.getItem("highScore"));
      scoreList.forEach(element => {
          scoreElement = document.createElement('div')
          scoreElement.innerText= `${element.player} - ${element.score}`
        leaderBoard.append(scoreElement)
    });
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScore"));
    if (storedScore !== null) {
      scoreList = storedScore;
    }
  }
 
  // Saving the scores to local storage
function saveScore(newScore) {
    // var scoreList = JSON.parse(localStorage.getItem("highScore"));
    localStorage.setItem("entry", JSON.stringify(newScore));
    console.log(scoreList);
    scoreList = JSON.parse(localStorage.getItem("highScore"));
    console.log(scoreList);
    var entry = JSON.parse(localStorage.getItem("entry"));
    if (scoreList == null) {
        scoreList = []
        scoreList.push(entry);
        localStorage.setItem("highScore", JSON.stringify(scoreList));
        
        console.log(`new score list inside if= ${scoreList}`)
    } else {
        console.log('inside else')
        console.log(scoreList);
        scoreList = JSON.parse(localStorage.getItem("highScore"));
    
        scoreList.push(entry);
        localStorage.setItem("highScore", JSON.stringify(scoreList));
        console.log(`new score list = ${scoreList}`);   
    }
    
  }   
      

  function handleGoBack() {
    location.reload();
  }
function handleClear() {
    scoreList = [];
    // start.classList.add("hide");
    localStorage.setItem("highScore", JSON.stringify(scoreList));
    location.reload()
    addToLeaderBoard()
}
function showHighScores() {
    questionCard.classList.add('hide')
    mainTag.classList.add('hide')
    scoreBoard();
    scoreCard.classList.remove('hide')

}