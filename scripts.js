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
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);

    console.log("You selected " + selection +". Computer selected " + computerSelection + ".")

    if (yourScoreSpan.innerText === 5 || computerScoreSpan.innerText === 5) declareWinner();
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
    console.log("Your score is " + yourScoreSpan.innerText);
    console.log("Computer score is " + computerScoreSpan.innerText);
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


function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('game-results');

    const modalWinner = document.createElement('div');
    modalWinner.classList.add('game-winner');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerText = '>&times;';

    const winnerText = document.createElement('p');
    winnerText.classList.add('win-text');

    modal.appendChild(body);
    modalWinner.appendChild(modal);
    closeBtn.appendChild(modalWinner);
    winnerText.appendChild(modalWinner);

    closeBtn.onclick = function() {
        modal.style.display = "none";
      }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
}


function declareWinner() {
    createModal();
    if (playerScoreSpan.innerText > computerScoreSpan.innerText) {
        winnerText.innerText = "Congratulations! You have won.";
    } else {
        winnerText.innerText = "You suck. You have failed us all.";
    } 
}