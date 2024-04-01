'use strict';

import words from './words.js';

let startScore = 0;
let initialTimer = 'Timer';
let initialWord = '';
let initialInput = '';
let initialScore = 'Score';
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

function show() {
    
    document.body.appendChild(gameDiv);
    
    gamePara.classList.add('timer');
    gameDiv.appendChild(gamePara);
    gamePara.innerText = "";

    leftDiv.setAttribute('id', 'left-div');
    document.body.appendChild(leftDiv);

    rightDiv.setAttribute('id', 'right-div');
    document.body.appendChild(rightDiv);

    gameHead.textContent = 'Super Typing Game';
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
    score.textContent = 'Score';
    headerDiv.appendChild(score);

    word.setAttribute('id', 'type-word');
    centerDiv.appendChild(word);
    
    inputWord.autocomplete = 'off';
    inputWord.setAttribute('type', 'text');
    inputWord.setAttribute('id', 'input-word');
    bottomDiv.appendChild(inputWord);

    setUpEndingPage();
}

show();

function setUpEndingPage() {
    
    gameOverHead.setAttribute('id', 'game-over');
    gameOverHead.textContent = 'Game Over';
    rightDiv.appendChild(gameOverHead);
    
    finalPoints.setAttribute('id', 'final-points');
    finalPoints.textContent = 'Points: ';
    rightDiv.appendChild(finalPoints);

    finalScore.setAttribute('id', 'final-score');
    finalScore.textContent = '18';
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
    let appearScore = document.getElementById('score');
    appearScore.textContent = num;
}

function showTimer(num) {
    let appearTimer = document.getElementById('timer');
    appearTimer.textContent = num;
}

function showInput(str) {
    let appearInput = document.getElementById('input-word');
    appearInput.value = str;
    console.log(str);
}

function generateRandomWords() {
    let randomIndex = Math.random() * 100;
    let randomWord = words[Math.round(randomIndex)];
    return randomWord;
}

function matchWord() {
    let wordToMatch = document.getElementById('input-word').addEventListener('input', (event) => {
        let valueOfInput = document.getElementById('input-word').value;
        let valueOfWord = document.getElementById('type-word').textContent;

        if (valueOfWord === valueOfInput) {
            showWord();  
            document.getElementById('input-word').value = '';
            startScore = startScore + 1;
            showScore(startScore);
        }
    });
}

matchWord();

function initialState() {
    initialTimer = 'Timer';
    initialWord = '';
    initialInput = '';
    initialScore = 'Score';
    startScore = 0;
    document.getElementById('input-word').value = 'Press start and type here';
}

function startInterval() {
    initialState();
    showWord();
    showScore(startScore);
    const timerID = setInterval(function() {
        console.log("called");
    }, 1000);

    setTimeout(function () {
        clearInterval(timerID)
        alert(startScore);
        initialState();
    },10000);
}

function startGame() {
    document.getElementById('input-word').value = '';
}