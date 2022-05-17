var player1 = "";
var player2 = "";
var numberOfTimesClicked = 0;
var mode = "";
var turn = "X";
var draw = 0;
var startTime = 0;
var endTime = 0;
var myflag = 0;
var myboxes = document.getElementsByClassName("boxes");
const playerTurn = new Audio("./assets/playerTurn.mp3");
const gameOver = new Audio("./assets/gameover.mp3");
document.getElementById("todayDate").innerHTML = new Date().toDateString()

function ComputersTurn(min = 0, max = 8) {
  min = Math.ceil(min);
  max = Math.floor(max);
  val = Math.floor(Math.random() * (max - min + 1)) + min;

  if (myboxes[val].querySelector(".boxtext").innerText === "") {
    myboxes[val].querySelector(".boxtext").innerText = turn;
    numberOfTimesClicked++;
    checkwin();
    console.log("computer call kiya")
    turn = changeTurn();
  } else {
    ComputersTurn();
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

function updateScores(player1, player2, timeTaken1) {
  let timeTaken = timeTaken1 - startTime;
  timeTaken /= 1000;
  seconds = Math.round(timeTaken);
  var score1 = 0;
  var score2 = 0;
  let mytbody = document.getElementById("mytbody");
  var row = mytbody.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = player1;
  cell2.innerHTML = player2;
  cell3.innerHTML = seconds + " seconds";

  let tableofpoints = document.getElementById("mytbody")
  for (let i = 0, row; (row = tableofpoints.rows[i]); i++) {
    for (let j = 0, col; (col = row.cells[j]); j++) {
      if (j === 0) {
        score1 = parseInt(col.innerText) + score1;
      } else if(j===1) {
        score2 = parseInt(col.innerText) + score2;
      }
    }
  }
  document.getElementById("total1").innerHTML = score1;
  document.getElementById("total2").innerHTML = score2;
  document.getElementById("draw").innerHTML = draw;
  document.getElementById("toalgames").innerHTML = draw + score1 + score2;
}

function readyToPlay() {
  myflag = 0
  startTime = new Date();
  turn = "X";
  numberOfTimesClicked = 0;
  document.getElementById("x-turn").classList.add("turn-border");
  document.getElementById("o-turn").classList.remove("turn-border");
  document.getElementById("tic-tac-toe-conatiner").style.display = "flex";
  document.getElementById("declaringResults").style.display = "none";
}

function resetBoxes() {
  startTime = new Date();
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
        endTime = new Date();
        
        updateScores(1, 0,endTime);
        console.log("Player 1 ka update")
      } 
      else {
        winner = player2;
        endTime = new Date();

        updateScores(0, 1, endTime);
        
        console.log("Player 2 ka update")
      }
      showWinnerModal(winner + " wins !", "./assets/winner.gif");
      myflag = 1

    } 
      else if (numberOfTimesClicked >= 9){
      showWinnerModal("It is a Draw!", "./assets/draw.gif");
      draw++;
      endTime = new Date();

      updateScores(0, 0,endTime);
      myflag = 1
      console.log("Draw ka update")
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
  myflag = 0
  draw = 0;
  startTime = new Date();
  resetBoxes();
  document.getElementById("total1").innerHTML = "";
  document.getElementById("total2").innerHTML = "";
  document.getElementById("draw").innerHTML = "";
  var playername1 = document.getElementsByClassName("playername1");
  var playername2 = document.getElementsByClassName("playername2");
  for (let i = 0, len = playername1.length; i < len; i++) {
    playername1[i].innerHTML = player1;
  }
  for (let i = 0, len = playername2.length; i < len; i++) {
    playername2[i].innerHTML = player2;
  }
  document.getElementById("mytbody").innerHTML = ""
  document.getElementById("norecords").style.display = "none";
  document.getElementById("mytbody").classList.remove("d-none");
}

let boxes = document.getElementsByClassName("boxes");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      playerTurn.play();
      numberOfTimesClicked++;
      if(mode != "computer"){
        checkwin();
      }
      console.log("player call kiya")
      turn = changeTurn();
      if (mode == "computer") {
        checkwin()
        if(myflag!=1){
          ComputersTurn();
        }
      }
    }
  });
});
