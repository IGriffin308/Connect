let player = 1
let gameOver = 0
let gameBoard = [
[null,null,null,null,null,null,null],
[null,null,null,null,null,null,null],
[null,null,null,null,null,null,null],
[null,null,null,null,null,null,null],
[null,null,null,null,null,null,null],
[null,null,null,null,null,null,null]
]

const topRow = document.getElementById('top')
topRow.addEventListener('click', clickEvent)

// click event should 
// determine which column has been clicked, 
// determine which row is the next available, 
// add the piece to the appropriate cell in both table and array
// end game or swap to next player
function clickEvent(click) {
    if (gameOver !== 0) {
      alert("Game Over!")
    }
    else {
    // determine which column has been clicked, 
    let x = click.target.id;
    // determine which row is the next available, 
    function findRow(x) {
        for (let i = 5; i >= 0; i--) {
            if (!gameBoard[i][x]) {
              return i;
            }
          }
    }
    let y = findRow(x)
    // add the piece to the appropriate cell in both table and array
    gameBoard[y][x] = player;
    function placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece', `p${player}`);
        piece.innerText = (`${player}`);
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
      }
    placeInTable(y, x)
    // end game
    function checkForWin() {
      function win(cells) {
        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < 6 &&
            x >= 0 &&
            x < 7 &&
            gameBoard[y][x] === player
        );
      }   
      for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 7; x++) {
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
          if (win(horiz) || win(vert) || win(diagDR) || win(diagDL)) {
            return true;
          }
        }
      }
    }
    if (checkForWin()) {
      alert(`Player ${player} won!`);
      gameOver++;
    }
    if (gameBoard.every(row => row.every(cell => cell))) {
      alert('Tie!');
      gameOver++;
    }
    // swap to next player
    player = player === 1 ? 2 : 1;
  }
}