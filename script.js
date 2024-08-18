var player1 = "";
var player2 = "";
var player1_symbol = "";
var player2_symbol = "";
var score1 = 0;
var score2 = 0;
var multiPlayer = false;
var numberOfTimesClicked = 0;
var mode = "";
var gamePlayedCount = 0;
var allowedSymbols = ["!", "@", "X", "O", "&", "%", "#", "$"];
var turn = "";
var draw = 0;
var startTime = 0;
var endTime = 0;
var isgameOver = false;
var myboxes = document.getElementsByClassName("boxes");
// Storing all the grid boxes for further evaluation
const playerTurn = new Audio("./assets/playerTurn.mp3");
const gameOver = new Audio("./assets/gameover.mp3");
document.getElementById("todayDate").innerHTML = new Date().toDateString();
// setting today's date on the top

// funtion for computer's turn
function ComputersTurn(min = 0, max = 8) {
  min = Math.ceil(min);
  max = Math.floor(max);
  val = Math.floor(Math.random() * (max - min + 1)) + min;
  // one grid box is selected on random basis, index starting from 0 to 8
  if (myboxes[val].querySelector(".boxtext").innerText === "") {
    // checking if the random selected box is empty
    myboxes[val].querySelector(".boxtext").innerText = turn;
    numberOfTimesClicked++;
    if (isgameOver != true) {
      // if the game is already won by Player1 then it will not check win
      checkwin();
    }
  } else {
    // if the random selected box already has a value then we call the computer function again it turns to be a  recursive function
    ComputersTurn();
  }
}

// this function is called after a winner is found to display the celebration gif
function showWinnerModal(msg, imagepath) {
  gameOver.play();
  numberOfTimesClicked = 0;
  gamePlayedCount++;
  setTimeout(() => {
    document.getElementById("celebrationImage").src = imagepath;
    document.getElementById("tic-tac-toe-conatiner").style.display = "none";
    document.getElementById("declaringResults").style.display = "block";
    document.getElementById("declareWinnerName").innerText = msg;
    if (score1 >= 6 || score2 >= 6) {
      if (score1 > score2) {
        alert(player1 + "is the Winner");
      } else {
        alert(player2 + "is the Winner");
      }
      location.reload();
    } else if (gamePlayedCount >= 10) {
      if (score1 > score2) {
        alert(player1 + "is the Winner");
      } else if (score1 < score2) {
        alert(player2 + "is the Winner");
      } else {
        alert("Its a tie between " + player1 + " and " + player2);
      }
      location.reload();
    }
    resetBoxes();
  }, 200);
}

// this function updates all the scores of the tables available on the page it will be called inside checkwin() after a winner is found
function updateScores(player1Points, player2Points, timeTaken1) {
  // it taked 3 parameters points for both players (1/0) and the time at which the game ended

  let timeTaken = timeTaken1 - startTime;
  timeTaken /= 1000;
  seconds = Math.round(timeTaken);
  // total time is calculated in terms of seconds and is rounded of
  score1 = 0;
  score2 = 0;
  let mytbody = document.getElementById("mytbody");
  var row = mytbody.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  // inserting a new row in the scoreboard table with 3 columns

  cell1.innerHTML = player1Points;
  cell2.innerHTML = player2Points;
  // setting the columns with player points
  if (seconds <= 60) {
    cell3.innerHTML = seconds + " seconds";
  } else {
    minutes = seconds / 60;
    minutes = Math.round(minutes);
    cell3.innerHTML = minutes + " minutes";
  }
  // this will check and display if the time taken to be displayed in seconds or minutes

  let tableofpoints = document.getElementById("mytbody");
  for (let i = 0, row; (row = tableofpoints.rows[i]); i++) {
    for (let j = 0, col; (col = row.cells[j]); j++) {
      if (j === 0) {
        score1 = parseInt(col.innerText) + score1;
      } else if (j === 1) {
        score2 = parseInt(col.innerText) + score2;
      }
    }
  }
  // taking the sum of each row in the scorecard so that it could be displayed in the points table
  document.getElementById("total1").innerHTML = score1;
  document.getElementById("total1").style.height = (score1 / 10) * 100 + "%";
  document.getElementById("total2").innerHTML = score2;
  document.getElementById("total2").style.height = (score2 / 10) * 100 + "%";
  document.getElementById("draw").innerHTML = draw;
  document.getElementById("draw").style.height = (draw / 10) * 100 + "%";
  document.getElementById("toalgames").innerHTML = draw + score1 + score2;
}

// this will be called when user clicks on Play Again button
function readyToPlay() {
  isgameOver = false;
  startTime = new Date();
  turn = player1_symbol;
  numberOfTimesClicked = 0;
  document.getElementById("x-turn").classList.add("turn-border");
  document.getElementById("o-turn").classList.remove("turn-border");
  document.getElementById("tic-tac-toe-conatiner").style.display = "flex";
  document.getElementById("declaringResults").style.display = "none";
  // all the default settings of the page will be done
}

// this will be called after a winner is found and we will empty all boxes
function resetBoxes() {
  startTime = new Date();
  let gameboxes = document.getElementsByClassName("boxtext");
  Array.from(gameboxes).forEach((element) => {
    element.innerHTML = "";
  });
}

// this will be called after each and every click on box to check if a winner is found or not
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
  // all the possible indexes of the boxes where we can fine a winner
  wins.forEach((e) => {
    // checking if any of the element in the above array has same value in all the 3 indexes
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      let winner = boxtext[e[0]].innerText;
      if (winner == player1_symbol) {
        winner = player1;
        endTime = new Date();
        // the time of the game stops here
        updateScores(1, 0, endTime);
        // if player1 wins we send (1,0) in update scores
      } else {
        winner = player2;
        endTime = new Date();

        updateScores(0, 1, endTime);
        // if player2 wins we send (0,1) in update scores
      }
      showWinnerModal(winner + " wins !", "./assets/winner.gif");
      // this function will hide the grid and show the winning celebration
      isgameOver = true;
    }
  });
  if (numberOfTimesClicked == 9 && isgameOver != true) {
    // if no winner is found and numberOfTimesClicked == 9 means each box is filled and we dont have a winner so it is a draw
    showWinnerModal("It is a Draw!", "./assets/draw.gif");
    draw++;
    endTime = new Date();
    updateScores(0, 0, endTime);
    // if it is a draw we send (0,0) in update scores
    isgameOver = true;
  }
}
// this will be called after every click and change the turn from X to O and O to X
function changeTurn() {
  tempTurn = turn === player1_symbol ? player2_symbol : player1_symbol;
  if (tempTurn === player1_symbol) {
    document.getElementById("x-turn").classList.add("turn-border");
    document.getElementById("o-turn").classList.remove("turn-border");
  } else {
    document.getElementById("o-turn").classList.add("turn-border");
    document.getElementById("x-turn").classList.remove("turn-border");
  }
  return tempTurn;
}
// it will be tale player1 name and player2 name
function askGameType(gameType) {
  $("#player1-info").css("display", "block");
  $(".gameModes").css("display", "none");
  multiPlayer = gameType;
}

// take player1 details
function player1Details(e) {
  e.preventDefault();
  player1 = $("#player1-name").val();
  player1_symbol = $("#player1-icon").val();
  $("#player1-info").css("display", "none");
  allowedSymbols = allowedSymbols.filter((item) => {
    return player1_symbol != item;
  });
  if (multiPlayer) {
    $("#player2-info").css("display", "block");
    allowedSymbols.forEach((item) => {
      $("#player2-icon").append(`<option value="${item}">${item}</option>`);
    });
  } else {
    startTheGame();
  }
}
// take player2 details
function player2Details(e) {
  e.preventDefault();
  player2 = $("#player2-name").val();
  player2_symbol = $("#player2-icon").val();
  $("#player2-info").css("display", "none");
  startTheGame();
}

// it will be called when user clicks on any game mode button
function startTheGame() {
  $("#game-box").css("display", "flex");
  if (!multiPlayer) {
    player2 = "Computer";
    player2_symbol =
      allowedSymbols[Math.floor(Math.random() * allowedSymbols.length)];
    mode = "computer";
  }
  document.getElementById("player1Icon").innerHTML = player1_symbol;
  document.getElementById("player2Icon").innerHTML = player2_symbol;
  turn = player1_symbol;
  isgameOver = false;
  draw = 0;
  startTime = new Date();
  // game start time stored
  resetBoxes();
  document.getElementById("total1").innerHTML = "";
  document.getElementById("total2").innerHTML = "";
  document.getElementById("draw").innerHTML = "";
  document.getElementById("toalgames").innerHTML = "";
  var playername1 = document.getElementsByClassName("playername1");
  var playername2 = document.getElementsByClassName("playername2");
  // all the rows of points table and scorecard table is removed
  for (let i = 0, len = playername1.length; i < len; i++) {
    playername1[i].innerHTML = player1;
  }
  for (let i = 0, len = playername2.length; i < len; i++) {
    playername2[i].innerHTML = player2;
  }
  document.getElementById("mytbody").innerHTML = "";
  document.getElementById("norecords").style.display = "none";
  document.getElementById("mytbody").classList.remove("d-none");
}

let boxes = document.getElementsByClassName("boxes");
const compTurn = throttleFunction(300);
// stroing the grid boxes and adding click event on each of them
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      // setting the inner text of the box with turn's value either X or O
      playerTurn.play();
      // playing the click sound
      numberOfTimesClicked++;
      if (isgameOver != true) {
        checkwin();
        turn = changeTurn();
        if (
          mode == "computer" &&
          numberOfTimesClicked < 8 &&
          isgameOver != true
        ) {
          compTurn();
        }
      }
    }
  });
});

function throttleFunction(time) {
  timeout = null;
  return () => {
    if (!timeout) {
      timeout = setTimeout(() => {
        ComputersTurn();
        turn = changeTurn();
        timeout = null;
      }, time);
    }
  }
}
