let player1 = "";
let player2 = "";
let numberOfTimesClicked = 0;
let mode = "";
let turn = "X";
let myboxes = document.getElementsByClassName("boxes")
const playerTurn = new Audio("./assets/playerTurn.mp3");
const gameOver = new Audio("./assets/gameover.mp3");


function ComputersTurn (min=0,max=8){
  min = Math.ceil(min);
  max = Math.floor(max);
  val = Math.floor(Math.random() * (max - min + 1)) + min;

  if(myboxes[val].querySelector(".boxtext").innerText === ""){
    myboxes[val].querySelector(".boxtext").innerText = turn
    numberOfTimesClicked++;
    checkwin()
    turn = changeTurn()
  }
  else{
    ComputersTurn()
  }
  

}

function showWinnerModal(msg, imagepath) {
  gameOver.play();
  numberOfTimesClicked = 0;
  setTimeout(() => {
    document.getElementById("celebrationImage").src = imagepath;
    document.getElementById("tic-tac-toe-conatiner").style.display = "none";
    document.getElementById("declaringResults").style.display = "block";
    document.getElementById("declareWinnerName").innerText = msg;

    resetBoxes();
  }, 200);
}

function updateScores(player1, player2) {
  var score1 = 0;
  var score2 = 0;
  let tbody = document.getElementById("tbody");
  var row = tbody.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  cell1.innerHTML = player1;
  cell2.innerHTML = player2;

  var table = document.getElementById("tbody");
  for (var i = 0, row; (row = table.rows[i]); i++) {
    for (var j = 0, col; (col = row.cells[j]); j++) {
      if (j === 0) {
        score1 = parseInt(col.innerText) + score1;
      } else {
        score2 = parseInt(col.innerText) + score2;
      }
    }
  }
  document.getElementById("total1").innerHTML = score1
  document.getElementById("total2").innerHTML = score2
}

function readyToPlay() {
  turn = "X";
  numberOfTimesClicked = 0;
  document.getElementById("x-turn").classList.add("turn-border");
  document.getElementById("o-turn").classList.remove("turn-border");
  document.getElementById("tic-tac-toe-conatiner").style.display = "flex";
  document.getElementById("declaringResults").style.display = "none";
}

function resetBoxes() {
  let gameboxes = document.getElementsByClassName("boxtext");
  Array.from(gameboxes).forEach((element) => {
    element.innerHTML = "";
  });
}

function checkwin() {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      let winner = boxtext[e[0]].innerText;
      if (winner == "X") {
        winner = player1;
        updateScores(1, 0);
      } else {
        winner = player2;
        updateScores(0, 1);
      }
      showWinnerModal(winner + " wins !", "./assets/winner.gif");
    } else if (numberOfTimesClicked >= 9) {
      showWinnerModal("It is a Draw!", "./assets/draw.gif");
      updateScores(1, 1);
    }
  });
}

function changeTurn() {
  tempTurn = turn === "X" ? "O" : "X";
  if (tempTurn === "X") {
    document.getElementById("x-turn").classList.add("turn-border");
    document.getElementById("o-turn").classList.remove("turn-border");
  } else {
    document.getElementById("o-turn").classList.add("turn-border");
    document.getElementById("x-turn").classList.remove("turn-border");
  }
  return tempTurn;
}

function askplayername(secondplayer) {
  player1 = prompt("Enter name for Player1", "Player1");
  if (secondplayer) {
    player2 = prompt("Enter name for Player2", "Player2");
    mode = "";
  } else {
    player2 = "Computer";
    mode = "computer";
  }
  resetBoxes();
  document.getElementById("total1").innerHTML = ""
  document.getElementById("total2").innerHTML = ""
  document.getElementById("player1Name").innerHTML = player1;
  document.getElementById("player2Name").innerHTML = player2;
  document.getElementById("tbody").innerHTML = "";
  document.getElementById("player1").innerText = player1;
  document.getElementById("player2").innerText = player2;
  document.getElementById("norecords").style.display = "none";
  document.getElementById("tbody").classList.remove("d-none");
}

let boxes = document.getElementsByClassName("boxes");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      playerTurn.play();
      numberOfTimesClicked++;
      checkwin();
      turn = changeTurn();
      if(mode == "computer"){
        ComputersTurn()
      }
    }
  });
});
