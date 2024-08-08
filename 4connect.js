//Declare Variables

var playRed = "R";
var playYellow = "Y";
var currentPlayer = playRed;
var gameOver = false;
var board;
var row = 6;
var columns = 7;
var currentColumn;
window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currentColumn = [5, 5, 5, 5, 5, 5, 5];

  for (let i = 0; i < row; i++) {
    let row = [];

    for (let j = 0; j < columns; j++) {
      row.push("");
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}
function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  r = currentColumn[c];
  if (r < 0) {
    return;
  }
  board[r][c] = currentPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer === playRed) {
    tile.classList.add("redPiece");
    currentPlayer = playYellow;
  } else {
    tile.classList.add("yellowpiece");
    currentPlayer = playRed;
  }
  r -= 1;
  currentColumn[c] = r;
  checkWinner();
}
function checkWinner() {
  //horizontal
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  //vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < row - 3; r++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r+1][c] &&
          board[r+1][c] === board[r+2][c] &&
          board[r+2][c] === board[r+3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  //anti diagonal
  for (let r = 0; r < row-3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r+1][c + 1] &&
          board[r+1][c + 1] === board[r+2][c + 2] &&
          board[r+2][c + 2] === board[r+3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] !== "") {
        if (
          board[r][c] === board[r-1][c + 1] &&
          board[r-1][c + 1] === board[r-2][c + 2] &&
          board[r-2][c + 2] === board[r-3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}
function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] === playRed) {
    winner.innerText = "Red Wins 🎉";
  } else {
    winner.innerText = "Yellow wins 🎉";
  }
  gameOver = true;
}
