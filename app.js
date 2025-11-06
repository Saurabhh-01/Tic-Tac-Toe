// Game state
const gameState = {
    currentPlayer: 'O',
    moveCount: 0,
    gameActive: true
};

// DOM elements
const cells = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#btn');
const newGameBtn = document.querySelector('.newBtn');
const gameOverScreen = document.querySelector('.game-status');
const winnerText = document.querySelector('.para');
const container = document.querySelector('.container');
const currentPlayerDisplay = document.querySelector('.current-player');

// Winning combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
const handleCellClick = (cell, index) => {
    if (cell.innerText !== '' || !gameState.gameActive) return;

    // Make move
    cell.innerText = gameState.currentPlayer;
    cell.style.color = gameState.currentPlayer === 'O' ? '#ff69b4' : '#64403E';
    gameState.moveCount++;

    // Check for winner
    if (checkWinner()) {
        endGame(`Winner is "${gameState.currentPlayer}"`);
        return;
    }

    // Check for draw
    if (gameState.moveCount === 9) {
        endGame('Match Draw!');
        return;
    }

    // Switch player
    gameState.currentPlayer = gameState.currentPlayer === 'O' ? 'X' : 'O';
    currentPlayerDisplay.textContent = gameState.currentPlayer;
};

// Check for winning combinations
const checkWinner = () => {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        const values = [cells[a].innerText, cells[b].innerText, cells[c].innerText];
        return values.every(value => value === gameState.currentPlayer);
    });
};

// End game and show result
const endGame = (message) => {
    gameState.gameActive = false;
    winnerText.innerText = message;
    gameOverScreen.classList.remove('fullhide');
    resetBtn.classList.add('fullhide');
    cells.forEach(cell => cell.disabled = true);
};

// Reset game state
const resetGame = () => {
    gameState.currentPlayer = 'O';
    gameState.moveCount = 0;
    gameState.gameActive = true;
    currentPlayerDisplay.textContent = 'O';

    cells.forEach(cell => {
        cell.innerText = '';
        cell.disabled = false;
        cell.style.color = '';
    });

    gameOverScreen.classList.add('fullhide');
    resetBtn.classList.remove('fullhide');
    container.classList.remove('mainhide');
};

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);

// Initialize hover effect
cells.forEach(cell => {
    cell.addEventListener('mouseover', () => {
        if (cell.innerText === '' && gameState.gameActive) {
            cell.style.backgroundColor = '#f8f8f8';
        }
    });
    
    cell.addEventListener('mouseout', () => {
        cell.style.backgroundColor = 'white';
    });
});
