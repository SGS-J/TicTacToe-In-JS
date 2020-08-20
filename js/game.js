class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.pointsPlayer1 = 0;
    this.pointsPlayer2 = 0;
    this.gameState = 0;
    this.turn = 1;
    this.spanTurn = document.querySelector(".game-panel .header .turn");
    this.logic = new GameLogic();
    this.addListenerToRestart();
    this.addListenersToBoard();
  }

  addListenerToRestart() {
    document
      .querySelector(".game-panel .header .reset")
      .addEventListener("click", this.handleRestart);
  }

  addListenersToBoard() {
    document.querySelectorAll(".game-panel .board .grid").forEach((grid) => {
      grid.addEventListener("click", this.handleGridClicked);
    });
  }

  handleGridClicked(e) {
    let letter = e.target.textContent;
    if (letter === "") {
      letter = APP.GAME.turn === 1 ? "X" : "O";
      /* 
         Sets the color of letter.
         If letter is X then the color will be darkblue,
         else the color will be purple.
      */
      e.target.setAttribute(
        "style",
        `color: ${letter === "X" ? "#223366" : "#554499"}`
      );
      e.target.textContent = letter;
      APP.GAME.clickGridDispatched();
    }
  }

  handleRestart() {
    document.querySelectorAll(".game-panel .board .grid").forEach((grid) => {
      grid.textContent = "";
      grid.style.background = "initial";
    });
    APP.GAME.clickRestartDispatched();
  }

  clickGridDispatched() {
    this.verifyAndSetState();
    if (this.gameState == 0) {
      this.changeTurn();
    } else {
      this.spanTurn.textContent = this.setWinner();
      this.removeListenersFromBoard();
    }
  }

  clickRestartDispatched() {
    if (this.gameState != 0) {
      this.addListenersToBoard();
    }
    if(this.gameState != 3){
      this.turn = this.gameState == 1 ? 1 : 2;
    } else {
      this.turn = this.pointsPlayer1 < this.pointsPlayer2 ? 2 : 1;
    } 
    this.logic.gridsToPaint = [];
    this.gameState = 0;
    this.changeTurn();
  }

  changeTurn() {
    this.turn = this.turn === 1 ? 2 : 1;
    this.spanTurn.textContent =
      this.turn == 1 ? this.player1 + "'s turn" : this.player2 + "'s turn";
  }

  verifyAndSetState() {
    this.logic.verifyBoard();
    if (this.logic.hasWinner()) {
      this.gameState = this.logic.getWinner === "player1" ? 1 : 2;
      this.addScoreToWinner();
      this.paintGrids();
    } else if (this.logic.isDraw()) {
      this.gameState = 3;
    } else {
      this.gameState = 0;
    }
  }

  paintGrids() {
    let grids = document.querySelectorAll(".game-panel .board .grid");
    this.logic.gridsToPaint.forEach(position => {
      grids[position].style.background = "#99fe";
    })
  }

  setWinner() {
    let winner = "";
    switch (this.gameState) {
      case 1:
        winner = this.player1 + " wins!";
        break;
      case 2:
        winner = this.player2 + " wins!";
        break;
      case 3:
        winner = "DRAW";
        break;
    }
    return winner;
  }

  addScoreToWinner() {
    const scores = document.querySelectorAll(".game-panel .score span");
    if (this.gameState === 1) {
      scores[0].textContent = this.player1 + " : " + ++this.pointsPlayer1;
    } else if (this.gameState === 2) {
      scores[1].textContent = this.player2 + " : " + ++this.pointsPlayer2;
    }
  }

  removeListenersFromBoard() {
    document.querySelectorAll(".game-panel .board .grid").forEach((grid) => {
      grid.removeEventListener("click", this.handleGridClicked);
    });
  }
}