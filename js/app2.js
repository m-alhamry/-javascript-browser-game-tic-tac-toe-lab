/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let turn;
let tie;
let win;

/*------------------------ Cached Element References ------------------------*/
const sqrsEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
init();

function init() {
    turn = 'X';
    tie = false;
    win = false;
    updateMessage();
}

function updateMessage() {
    if (tie) {
        messageEl.textContent = 'Tie game!';
    } else if (win) {
        messageEl.textContent = `'${turn}' win!`;
    } else {
        messageEl.textContent = `It's '${turn}' turn`;
    }
}

function handleClick(event) {
    if (!win && !tie && !event.target.textContent) {
        fillTheCell(event);
        checkForWinner();
        checkForTie();
        updateTurn();
        updateMessage();
    }
}

function fillTheCell(event) {
    event.target.textContent = turn;
}

function updateTurn() {
    if (!win && !tie) {
        if (turn === 'X') {
            turn = 'O';
        }
        else {
            turn = 'X';
        }
    }
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        if (sqrsEls[combo[0]].textContent !== '') {
            if (sqrsEls[combo[0]].textContent === sqrsEls[combo[1]].textContent &&
                sqrsEls[combo[0]].textContent === sqrsEls[combo[2]].textContent) {
                win = true;
                return;
            }
        }
    });
}

function checkForTie() {
    if (!win) {
        tie = true;
        sqrsEls.forEach((sqr) => {
            if (!sqr.textContent) {
                tie = false;
                return;
            }
        });
    }
}

function reset() {
    sqrsEls.forEach((sqr) => {
        sqr.textContent = '';
    });
    turn = 'X';
    tie = false;
    win = false;
    updateMessage();
}

/*----------------------------- Event Listeners -----------------------------*/
sqrsEls.forEach((sqrEl) => {
    sqrEl.addEventListener('click', handleClick);
})
resetBtnEl.addEventListener('click', reset);