'use strict';

import words from './words.js';
import { Score } from './Score.js';

let hits;
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
const resetBtn = document.getElementById("reset-btn");

let wordList = [];
let timerId;
const showScoreList = document.createElement('div');
const scoreListDiv = document.createElement('div');

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

    showScoreList.setAttribute('id', 'show-score-list');
    rightDiv.appendChild(showScoreList);

    scoreListDiv.setAttribute('id', 'score-div');
    document.body.appendChild(scoreListDiv);

    resetBtn.addEventListener('click', function() {
        reset();
    });

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

function showWordOrExit() {
    let appearWord = document.getElementById('type-word');
    appearWord.textContent = generateRandomWords(); 
}

function showScore(num) {
    score.innerHTML = `Score<br>${num}`;
}

function showTimer(num) {
    timer.innerHTML = `Timer<br>${num}`;
}

function checkWordListLength() {
    if (wordList.length === 90) {
        endGame();
    }
}

function generateRandomWords() {
    checkWordListLength();
    let randomIndex = Math.random() * 90;
    console.log(Math.round(randomIndex));
    let randomWord = words[Math.round(randomIndex)];

    if (wordList.includes(randomWord) === false) {
        wordList.push(randomWord);
    }
    
    return randomWord;
}

function matchWord() {
    document.getElementById('input-word').addEventListener('input', (event) => {
        let valueOfInput = document.getElementById('input-word').value;
        let valueOfWord = document.getElementById('type-word').textContent;

        if (valueOfWord === valueOfInput) {
            document.getElementById('input-word').value = '';
            hits = hits + 1;
            showScore(hits);
            showWordOrExit();  
        }
    });
}

function initialState() {
    hideScoreListDiv();
    document.getElementById('input-word').value = 'Press start and type here';
    document.getElementById('type-word').textContent = '';
    document.getElementById('timer').textContent = 'Timer';
    document.getElementById('score').textContent = 'Score';
    rightDiv.setAttribute('class', 'hidden');
    leftDiv.setAttribute('class', 'show'); 
    startButton.setAttribute('class', 'appear');
    wordList = [];
    resetScore();
}

function startInterval() {
    initialState();
    showWordOrExit();
    showScore(hits);
    let totalTimer = 15;
    showTimer(totalTimer);

    timerId = setInterval(function() {
            totalTimer = totalTimer - 1;
            showTimer(totalTimer);

            if (totalTimer <= 0) {
                // Game Ends Here
                endGame();
            }
        }, 1000);
    }

function startGame() {
    startInterval();
    document.getElementById('input-word').value = '';
    startButton.setAttribute('class', 'gone');
    audioObject.play();
}

function endGame() {
    clearInterval(timerId);
    stopAudio();
    finalScore.textContent = hits;
    rightDiv.setAttribute('class', 'show');
    leftDiv.setAttribute('class', 'hidden');
    const scoresList = addScoreToList(hits);
    createScoreList(scoresList);
    resetScore();
}

function stopAudio() {
    audioObject.pause();
    audioObject.currentTime = 0;
 }

 function resetScore() {
    hits = 0;
 }

 function acceptNumber(jsonObject) {
    const hits = jsonObject.hits;
    const percentage = jsonObject.percenatge;
    const date = jsonObject.date;
    const addNumberToDiv = document.createElement('div');
    addNumberToDiv.setAttribute('id', 'add-number-div');
    addNumberToDiv.innerHTML = `${hits} ${percentage}% ${date}`;
    scoreListDiv.appendChild(addNumberToDiv);
 }

 function addScoreToList(num) {
    const percentage = num * 100 / 90;
    const integerPercentage = Math.floor(percentage);
    const date = new Date();
    const dateString = formatDate(date);
    const listOfScores = addScoreToLocalStorage(num, integerPercentage, dateString);
    return listOfScores;
 }

 function formatDate(date) {
    // Get day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    // Construct the formatted date string in "DD-MM-YYYY" format
    return `${day}-${month}-${year}`;
}

 function sortScoreList(jsonList) {
    let sortedScoreList = jsonList.sort((a, b) => b.hits - a.hits);
    let topNineScores = sortedScoreList.slice(0, 9);
    return topNineScores;
 }

 function createScoreList(jsonlist) {
    console.log(
        jsonlist
    );
    scoreListDiv.innerHTML = '';
    for (let i = 0; i < jsonlist.length; i++) {
        acceptNumber(jsonlist[i]);
    }
    showScoreListDiv();
 }

 function showScoreListDiv() {
    scoreListDiv.setAttribute('class', 'appear');
 }

 function hideScoreListDiv() {
    scoreListDiv.setAttribute('class', 'gone');
 }

 function createJSONString(hits, percentage, date) {
    const jsonScore =  JSON.stringify( { "hits" : hits, "percentage": percentage, "date": date } );
    return jsonScore;
 }
``
 function getItemLocalStorage() {
    const stored = localStorage.getItem('scores');
    return stored;
 }

 function saveItemLocalStorage(jsonObject) {
    localStorage.setItem('scores', jsonObject);
 }

 function addScoreToLocalStorage(hits, percentage, date) {
    const scoreJsonString = createJSONString(hits, percentage, date);
    let localStorageJson = getItemLocalStorage();
    if(localStorageJson === null) {
        localStorageJson = JSON.stringify( [] );
    }
    const scoreJsonObject = JSON.parse(scoreJsonString);
    const storedJsonObject = JSON.parse(localStorageJson);
    storedJsonObject.push(scoreJsonObject);
    const sortedJsonObject = sortScoreList(storedJsonObject);
    const localStorageJsonString = JSON.stringify(sortedJsonObject);
    saveItemLocalStorage(localStorageJsonString);
    const saved = getItemLocalStorage();
    console.log(
        saved
    );
    return sortedJsonObject;
 }

function reset() {
    clearInterval(timerId);
    stopAudio();
    resetScore();
    initialState();
}

show();
matchWord();


