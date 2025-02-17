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
]


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const sectionEl = document.querySelector('section');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((c, index) => {
        if (c === 'X') {
            squareEls[index].textContent = 'X';
        } else if (c === 'O') {
            squareEls[index].textContent = 'O';
        } else {
            squareEls[index].textContent = '';
        }
    });
}

function updateMessage() {
    if (!winner && !tie) {
        if (turn === 'X') {
            messageEl.textContent = "It's X's turn";
        } else {
            messageEl.textContent = "It's O's turn";
        }
    } else if (!winner && tie) {
        messageEl.textContent = 'Tie game!';
    } else {
        if (turn === 'X') {
            messageEl.textContent = 'X wins!';
        } else {
            messageEl.textContent = 'O wins!';
        }
    }
}

function handleClick(event) {
    const squareIndex = event.target.id;
    const squareIsFull = board[squareIndex] !== '';
    if (squareIsFull || winner) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}
function placePiece(index) {
    board[index] = turn;
}
function checkForWinner() {
    winningCombos.forEach((combo) => {
        if (
            board[combo[0]] !== '' &&
            board[combo[0]] === board[combo[1]] &&
            board[combo[0]] === board[combo[2]]
        ) {
            winner = true;
        }
    })
}
function checkForTie() {
    if (winner) return;
    let e = true;
    board.forEach((i) => {
        if(!i) {
            e = false;
            return;
        };
    });
    tie = e;
}
function switchPlayerTurn() {
    if (winner) return;
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }

}
init();
/*----------------------------- Event Listeners -----------------------------*/
sectionEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);

