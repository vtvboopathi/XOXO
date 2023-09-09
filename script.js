"use strict";
const boxEl = document.querySelectorAll(".box");
const winEl = document.getElementById("game");
const btn = document.getElementById("reset");

//global variable
let x = `<h3 class="x">X</h3>`;
let o = `<h3 class="o">O</h3>`;
// let x = "x";
// let o = "o";
let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let Player = "x";
let running = false;

//function
const init = () => {
  boxEl.forEach((box) => box.addEventListener("click", boxClick));
  btn.addEventListener("click", resetGame);
  running = true;
};

const boxClick = (box) => {
  // const item = box;
  const id = box.target.id;
  if (options[id] != "" || !running) {
    return;
  }
  updateBox(box, id);
  checkWinner();
};

const updateBox = (box, id) => {
  options[id] = Player;
  box.target.innerHTML = currentPlayer;
};

const changePlayer = () => {
  Player = Player == "x" ? "o" : "x";
  currentPlayer = currentPlayer == x ? o : x;
  winEl.innerHTML = `${currentPlayer} Turn`;
};

const checkWinner = () => {
  let isWon = false;
  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];
    if (box1 == "" || box2 == "" || box3 == "") {
      continue;
    }
    if (box1 == box2 && box2 == box3) {
      isWon = true;
      boxEl[condition[0]].classList.add("win");
      boxEl[condition[1]].classList.add("win");
      boxEl[condition[2]].classList.add("win");
    }
  }
  if (isWon) {
    winEl.innerHTML = `${currentPlayer} has won`;
    running = false;
  } else if (!options.includes("")) {
    winEl.innerHTML = `Game Draw`;
    running = false;
  } else {
    changePlayer();
  }
};

const resetGame = () => {
  options = ["", "", "", "", "", "", "", "", ""];
  boxEl.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("win");
  });
  running = true;
  currentPlayer = x;
  Player = "x";
  winEl.innerHTML = `<span class="x">X </span> Turn`;
};

//event listener

//init
init();
