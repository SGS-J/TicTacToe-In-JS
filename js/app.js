class App {
  constructor() {
    this.GAME;
    this.userLog = document.querySelector(".players-log");
    this.gamePanel = document.querySelector(".game-panel");
    this.players = ["", ""];
    this.waitForPlayerName();
  }

  waitForPlayerName() {
    this.userLog.querySelector(".btn-play").addEventListener("click", () => {
      const inputs = this.userLog.querySelectorAll("form .player-name");
      if (inputs[0].value !== "" && inputs[1].value !== "") {
        this.players[0] = inputs[0].value;
        this.players[1] = inputs[1].value;
        this.switchToGamePanel();
      } else {
        this.warnInvalidName();
      }
    });
  }

  switchToGamePanel() {
    this.userLog.hidden = true;
    this.gamePanel.querySelector(".header .turn").textContent =
      this.players[0] + "'s turn";
    this.gamePanel.querySelectorAll(".score span")[0].textContent =
      this.players[0] + " : 0";
    this.gamePanel.querySelectorAll(".score span")[1].textContent =
      this.players[1] + " : 0";
    this.GAME = new Game(this.players[0], this.players[1]);
    this.gamePanel.hidden = false;
  }

  warnInvalidName() {
    const inputs = this.userLog.querySelectorAll("form .player-name");
    inputs.forEach((comp) => {
      if (comp.value === "") {
        comp.setAttribute("style", "outline: .1em solid #f006");
        setTimeout(() => {
          comp.setAttribute("style", "outline: none");
        }, 1000);
      }
    });
  }
}

const APP = new App();