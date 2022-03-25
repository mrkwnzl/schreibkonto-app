// Define default variables
let day = 1;
let boxes = [];
let numberBoxesChecked = 0;
let numberBoxesUnchecked = 0;
let themeSetting = 0;

const version = "v0.3.0";

const ballotBoxArray = ["&#xf0c8", "🍪", "💰", "🏃‍♀️", "🏃", "🏃‍♂️", "🥚", "🧠", "🏋️‍♀️", "🏋️", "🏋️‍♂️", "🍔", "🙀"]
const ballotBoxCheckedArray = ["&#xf14a", "🦍", "💍", "👾", "👾", "👾", "🐣", "🧟‍♂️", "🏆", "🏆", "🏆", "🤤", "😸"]

let ballotBox;
let ballotBoxChecked;

const storageCode = "app.schreibkonto.code";

// Initiale page
initializePage();

// Functions
function initializePage() {
  if (!localStorage.getItem(storageCode)) {
    loadState("1.0.0.0");
  } else {
    loadState(localStorage.getItem(storageCode));
  }

  updatePage();
}

function updatePage() {
  let code = generateCode();

  localStorage.setItem(storageCode, code);

  // index.html
  if (document.title == "Schreibkonto.app") {
    document.getElementById("day").innerHTML = day;
    document.getElementById("code").innerHTML = code;
    document.getElementById("add-box").innerHTML = "<i class='fas fa-plus'></i> <span class='emoji-button'>" + ballotBox + "</span>";
    document.getElementById("check-box").innerHTML = "<span class='emoji-button'>" + ballotBoxChecked + "</span>";
    document.getElementById("remove-box").innerHTML = "<i class='fas fa-minus'></i> <span class='emoji-button'>" + ballotBox + "</span>";
    if (localStorage.getItem(storageCode) == "1.0.0.0") {
      document.getElementById("welcome-text").innerHTML = firstVisitText();
    } else {
      document.getElementById("welcome-text").innerHTML = "";
    }
    document.getElementById("boxes").innerHTML = boxes.join(" ");
    if (numberBoxesUnchecked <= 0) {
      document.getElementById("remove-box").setAttribute("disabled", "true");
    } else {
      document.getElementById("remove-box").removeAttribute("disabled");
    }
  }

  // settings.html
  if (document.title == "Einstellungen | Schreibkonto.app") {
    document.getElementById("code-input").value = code;
    document.getElementById("theme-select").innerHTML = generateThemeOptions();
  }

  // contact.html
  if (document.title == "Kontakt & Info | Schreibkonto.app") {
    document.getElementById("version").innerHTML = version;
  }

  // first-visit.html
  if (document.title == "Erster Besuch | Schreibkonto.app") {

  }
}

function addBox() {
  numberBoxesUnchecked++;

  generateBoxes();
  updatePage();
}

function checkBox() {
  if (numberBoxesUnchecked <= 0) return alert('Kein Guthaben mehr. Du musst erst noch 100 Wörter schreiben!');

  day++;
  numberBoxesChecked++;
  numberBoxesUnchecked--;

  generateBoxes();
  updatePage();
}

function resetAll() {
  if (!window.confirm("Bist du sicher, dass du dein Schreibkonto und Einstellungen zurücksetzen möchtest?")) return;
  day = 1;
  boxes = [];
  numberBoxesChecked = 0;
  numberBoxesUnchecked = 0;
  themeSetting = 0;
  // darkModeSetting = 0;

  updatePage();
  window.location.href = "index.html";
}

function resetBank() {
  if (!window.confirm("Bist du sicher, dass du dein Schreibkonto zurücksetzen möchtest?")) return;
  day = 1;
  boxes = [];
  numberBoxesChecked = 0;
  numberBoxesUnchecked = 0;

  updatePage();
  window.location.href = "index.html";
}

function removeBox() {
  if (numberBoxesUnchecked <= 0) return;

  numberBoxesUnchecked--;

  generateBoxes();
  updatePage();
}

function loadState(code) {
  code = code.split('.');
  day = parseInt(code[0]);
  numberBoxesUnchecked = parseInt(code[1]);
  numberBoxesChecked = parseInt(code[2]);
  themeSetting = parseInt(code[3]);
  // darkModeSetting = parseInt(code[4]);
  ballotBox = "<span class='ballot-box'>" + ballotBoxArray[themeSetting] + "</span>";
  ballotBoxChecked = "<span class='ballot-box'>" + ballotBoxCheckedArray[themeSetting] + "</span>";

  generateBoxes();
  updatePage();
}

function loadStateButton(code) {
  let regCode = new RegExp("\\d+.\\d+.\\d+.\\d+");
  if (!regCode.test(code) || code.split(".")[3] > ballotBoxArray.length) return alert('Code ungültig');
  loadState(code);
  window.location.href = "index.html";
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
  // return day + "." + numberBoxesUnchecked + "." + numberBoxesChecked + "." + themeSetting + "." + darkModeSetting;
  return day + "." + numberBoxesUnchecked + "." + numberBoxesChecked + "." + themeSetting;
}

function generateThemeOptions() {
  let options = "<option value='0'>Checkboxen</option>";
  let index = 1;

  while (index < ballotBoxArray.length) {
    let selected = (index == themeSetting) ? "selected" : "";
    options = options + `<option value='${index}'` + selected + ">" + ballotBoxArray[index] + " | " + ballotBoxCheckedArray[index] + "</option>";
    index++;
  }

  return options;
}

function goToButton(target) {
  window.location.href = target;
}

function firstVisitText() {
  const firstVisitText = `
  <h3>Herzlich Willkommen bei Schreibkonto.app</h3>
  <p>Wenn du das erste Mal hier bist, würde ich dir empfehlen, in die Anleitung zu schauen. Dort wird die 100-Wörter-Methode und die App erklärt.</p>
  <p>Wenn du die App schon in einem anderen Browser benutzt hast, geh zu den Einstellungen, um deinen persönlichen Code einzugeben und deinen Stand zu übertragen.</p>
  <p>Wenn du schon weißt, wie die 100-Wörter-Methode funktioniert und du neu beginnen willst, kannst du auch direkt einfach loslegen.</p>
  <button id="go-to-manual" type="button" title="Zur Anleitung" onclick="goToButton('help.html');">Zur Anleitung</button>
  <button id="go-to-settings" type="button" title="Zu den Einstellungen" onclick="goToButton('settings.html');">Zu den Einstellungen</button>
  `;

  return firstVisitText;
}

// Event listener
// settings.html
if (document.title == "Einstellungen | Schreibkonto.app") {
  document.getElementById("code-input").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("loadButton").click();
    }
  });

  document.getElementById("theme-select").addEventListener("change", function (event) {
    themeSetting = document.getElementById("theme-select").value;
    updatePage();
  });
}