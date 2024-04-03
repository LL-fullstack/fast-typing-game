'use strict';

import words from './words.js';
import { Score } from './classes.js';

let currentScore = new Score(new Date(), 0, 0);
const gameDiv = document.createElement('div');
const gamePara = document.createElement('p');
const leftDiv = document.createElement('div');
const rightDiv = document.createElement('div');
const gameHead = document.createElement('h1');
const headerDiv = document.createElement('div');
const centerDiv = document.createElement('div');
const bottomDiv = document.createElement('div');
const startButton = document.createElement('button');
const timer = document.createElement('p');
const score = document.createElement('p');
const word = document.createElement('p');
const inputWord = document.createElement('input');
const gameOverHead = document.createElement('h1');
const finalPoints = document.createElement('div');
const finalScore = document.createElement('div');
const tryAgainBtn = document.createElement('button');
const audioObject = document.getElementById("gameAudio");

function show() {
    
    document.body.appendChild(gameDiv);
    
    gamePara.classList.add('timer');
    gameDiv.appendChild(gamePara);
    gamePara.innerText = "";

    leftDiv.setAttribute('id', 'left-div');
    document.body.appendChild(leftDiv);

    rightDiv.setAttribute('id', 'right-div');
    document.body.appendChild(rightDiv);

    gameHead.textContent = 'SpeedTyper';
    leftDiv.appendChild(gameHead);

    headerDiv.setAttribute('id', 'header-div');
    leftDiv.appendChild(headerDiv);

    centerDiv.setAttribute('id', 'center-div');
    leftDiv.appendChild(centerDiv);

    bottomDiv.setAttribute('id', 'bottom-div');
    leftDiv.appendChild(bottomDiv);

    startButton.setAttribute('id', 'start-button');
    startButton.textContent = 'Start';
    headerDiv.appendChild(startButton);
    startButton.addEventListener('click', function() {
        startInterval();
        startGame();
    });

    timer.setAttribute('id', 'timer');
    timer.textContent = 'Timer';
    headerDiv.appendChild(timer);

    score.setAttribute('id', 'score');
    showScore('Score');
    headerDiv.appendChild(score);

    word.setAttribute('id', 'type-word');
    centerDiv.appendChild(word);
    
    inputWord.autocomplete = 'off';
    inputWord.setAttribute('type', 'text');
    inputWord.setAttribute('id', 'input-word');
    bottomDiv.appendChild(inputWord);

    setUpEndingPage();
    initialState();
}

function setUpEndingPage() {
    
    gameOverHead.setAttribute('id', 'game-over');
    gameOverHead.textContent = 'Game Over';
    rightDiv.appendChild(gameOverHead);
    
    finalPoints.setAttribute('id', 'final-points');
    finalPoints.textContent = 'Points: ';
    rightDiv.appendChild(finalPoints);

    finalScore.setAttribute('id', 'final-score');
    finalScore.textContent = matchWord();
    rightDiv.appendChild(finalScore);

    tryAgainBtn.setAttribute('id', 'try-again-btn');
    tryAgainBtn.textContent = 'Try again';
    rightDiv.appendChild(tryAgainBtn);
    tryAgainBtn.addEventListener('click', function() {
        initialState();
    });
}

function showWord() {
    let appearWord = document.getElementById('type-word');
    appearWord.textContent = generateRandomWords(); 
}

function showScore(num) {
    score.innerHTML = `Score<br>${num}`;
}

function showTimer(num) {
    timer.innerHTML = `Timer<br>${num}`;
}


function generateRandomWords() {
    let randomIndex = Math.random() * 90;
    console.log(Math.round(randomIndex));
    let randomWord = words[Math.round(randomIndex)];
    
    return randomWord;
}

function matchWord() {
    document.getElementById('input-word').addEventListener('input', (event) => {
        let valueOfInput = document.getElementById('input-word').value;
        let valueOfWord = document.getElementById('type-word').textContent;

        if (valueOfWord === valueOfInput) {
            showWord();  
            document.getElementById('input-word').value = '';
            currentScore.hits = currentScore.hits + 1;
            showScore(currentScore.hits);
            return currentScore.hits;
        }
    });
}

function initialState() {
    document.getElementById('input-word').value = 'Press start and type here';
    document.getElementById('type-word').textContent = '';
    document.getElementById('timer').textContent = 'Timer';
    document.getElementById('score').textContent = 'Score';
    rightDiv.setAttribute('class', 'hidden');
    leftDiv.setAttribute('class', 'show'); 
    startButton.setAttribute('class', 'appear');
}

function startInterval() {
    initialState();
    showWord();
    showScore(currentScore.hits);
    let totalTimer = 10;
    showTimer(totalTimer);

    const timerID = setInterval(function() {
            totalTimer = totalTimer - 1;
            showTimer(totalTimer);

            if (totalTimer <= 0) {
                // Game Ends Here
                clearInterval(timerID);
                endGame();
            }
        }, 1000);
    }

function startGame() {
    document.getElementById('input-word').value = '';
    startButton.setAttribute('class', 'gone');
    audioObject.play();
}

function endGame() {
    stopAudio();
    finalScore.textContent = currentScore.hits;
    rightDiv.setAttribute('class', 'show');
    leftDiv.setAttribute('class', 'hidden');
    currentScore = new Score(new Date(), 0, 0);
}

function stopAudio() {
    audioObject.pause();
    audioObject.currentTime = 0;
 }

show();
matchWord();