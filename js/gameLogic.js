class GameLogic {
  constructor() {
    this.winner = "";
    this.gridsToPaint = [];
    this.possibleWins = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
  }

  verifyBoard() {
    let grids = document.querySelectorAll(".game-panel .board .grid");
    if (Array.from(grids).every(grid => grid.textContent !== "")) {
      this.winner = "draw";
    } else {
      let i = 0;
      let len = this.possibleWins.length;
      do{
        const wins = this.possibleWins[i];
        const letters = [
          grids[wins[0] - 1].textContent,
          grids[wins[1] - 1].textContent,
          grids[wins[2] - 1].textContent,
        ];
        this.winner = letters.every(letter => letter === "X") ? "player1" :
        this.winner = letters.every(letter => letter === "O") ? "player2" : "";
        if(this.winner == "player1" || this.winner == "player2") {
          wins.forEach(gridNumber => this.gridsToPaint.push(gridNumber - 1));
        } else {
          ++i;
        }
      } while(this.winner !== "" ^ i < len);
    }
  }

  hasWinner() {
    return this.winner !== "draw" && this.winner !== "";
  }

  isDraw() {
    return this.winner === "draw";
  }

  get getWinner() {
    return this.winner;
  }
}