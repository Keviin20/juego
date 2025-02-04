
const board = document.getElementById('board');
const currentPlayerSpan = document.getElementById('current-player');
const restartButton = document.getElementById('restart');
const statusDiv = document.querySelector('.status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (gameState[cellIndex] || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        statusDiv.textContent = `El jugador ${currentPlayer} ha ganado`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell)) {
        statusDiv.textContent = 'Empate';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerSpan.textContent = currentPlayer;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

restartButton.addEventListener('click', () => {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    currentPlayerSpan.textContent = currentPlayer;
    statusDiv.textContent = 'Turno de: X';
    createBoard();
});

createBoard();
