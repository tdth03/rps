const body = document.querySelector('body')
const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '👊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🤚',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
        console.log(selection.name);
    });
    
})

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);

    console.log(computerSelection.name);

    console.log("You selected " + selection.name +". Computer selected " + computerSelection.name + ".")

    
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    console.log("Your score is " + yourScoreSpan.innerText);
    console.log("Computer score is " + computerScoreSpan.innerText);
    if (yourScoreSpan.innerText === 5 || computerScoreSpan.innerText === 5) declareWinner();
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}


function declareWinner() {
    /* const modal = document.querySelector('.game-results');
    const modalWinner = document.querySelector('.game-winner');
    const closeBtn = document.getElementById('close');
    const winnerText = document.querySelector('.win-text'); */

    if (playerScoreSpan.innerText > computerScoreSpan.innerText) {
        /* modal.style.display = fixed; */
        alert("Congratulations! You have won.");
    } else {
        /* modal.style.display = fixed; */
        alert("You suck. You have failed us all.");
    }

    /* closeBtn.onclick = function() {
        modal.style.display = none;
      }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    } */
}