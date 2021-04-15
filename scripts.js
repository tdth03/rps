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
const modal = document.querySelector('.game-results');
const modalWinner = document.querySelector('.game-winner');
const closeBtn = document.getElementById('close');
const winnerText = document.querySelector('.win-text');

let yourScore = '0';
let computerSCore = '0';


/* Click Event Listener For User Selection */
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
        console.log(selection.name);
    });
    
})

/*Random Selection for Computer Selection */
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

/* Take Computer Selection and User Selection, compare, and return winner */
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

/* Take winning selections, add results, and increment score if needed. */
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);
    
    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);

    yourScore = parseInt(yourScoreSpan.innerText);
    computerScore = parseInt(computerScoreSpan.innerText);

    console.log("Your score is " + yourScoreSpan.innerText);
    console.log("Computer score is " + computerScoreSpan.innerText);

    console.log(computerSelection.name);

    console.log("You selected " + selection.name +". Computer selected " + computerSelection.name + ".")

    if (yourScore === 5 || computerScore === 5) declareWinner();
}

/* Increment score function */
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText, 10) + 1
}

/* Add results to page, adding classes to include CSS styling. */
function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

/* Declare winner after user or computer reaches 5 round wins. */
function declareWinner() {
    yourScoreSpan.innerText = parseInt(yourScoreSpan.innerText);
    computerScoreSpan.innerText = parseInt(computerScoreSpan.innerText);
    if (yourScoreSpan.innerText > computerScoreSpan.innerText) {
        modal.style.display = 'block';
        winnerText.innerText = "Congratulations! You have won " + yourScore + " to " + computerScore;
    } else {
        modal.style.display = 'block';
        winnerText.innerText = "You suck. You have failed us all. The Computer beat you " + computerScore + " to " + yourScore;
    }

    selectionButtons.forEach((selection) => {
        selection.classList.add('end-game');
        selection.classList.remove('selection:hover');
        selection.setAttribute('disabled', '');
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
      }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
}