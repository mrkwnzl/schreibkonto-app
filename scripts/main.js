let day = 1;
let boxes = [];
let numberBoxesUnchecked = 0;
let numberBoxesChecked = 0;

const ballotBox = "<i class='far fa-square'></i>";
const ballotBoxChecked = "<i class='far fa-check-square'></i>";

const storageIdentifier = "app.schreibkonto.code";

initializePage();

document.getElementById("seed").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("loadButton").click();
  }
});

function initializePage() {
  if (!localStorage.getItem(storageIdentifier)) {
    loadState("1-0-0");
  } else {
    loadState(localStorage.getItem(storageIdentifier));
  }
  updatePage();
}

function updatePage() {
  document.getElementById("day").innerHTML = day;
  document.getElementById("boxes").innerHTML = boxes.join(" ");
  let code = generateCode();
  document.getElementById("seed").value = code;
  localStorage.setItem(storageIdentifier, code);
  if (numberBoxesUnchecked <= 0) {
    document.getElementById("removeBoxWidget").setAttribute("disabled", "true");
  } else {
    document.getElementById("removeBoxWidget").removeAttribute("disabled");
  }
}

function addEmptyBox() {
  numberBoxesUnchecked++;
  generateBoxes();
  updatePage();
}

function endDay() {
  if (numberBoxesUnchecked <= 0) {
    return alert('Keine freie Box. Du musst erst noch 100 Wörter schreiben!');
  }
  day++;
  numberBoxesChecked++;
  numberBoxesUnchecked--;
  generateBoxes();
  updatePage();
}

function reset() {
  day = 1;
  boxes = [];
  numberBoxesUnchecked = 0;
  numberBoxesChecked = 0;
  updatePage();
}

function removeBox() {
  if (numberBoxesUnchecked <= 0) return;
  numberBoxesUnchecked--;
  generateBoxes();
  updatePage();
}

function loadState(code) {
  code = code.split('-');
  day = parseInt(code[0]);
  numberBoxesChecked = parseInt(code[1]);
  numberBoxesUnchecked = parseInt(code[2]);

  generateBoxes();
  updatePage();
}

function generateBoxes() {
  boxes = [];

  let i = 0;
  while (i < numberBoxesUnchecked) {
    boxes.push(ballotBox);
    i++;
  }

  let j = 0;
  while (j < numberBoxesChecked) {
    boxes.push(ballotBoxChecked);
    j++;
  }
}

function generateCode() {
  return day + "-" + numberBoxesChecked + "-" + numberBoxesUnchecked;
}