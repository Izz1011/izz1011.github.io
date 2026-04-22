let result = document.getElementById("result");
let history = document.getElementById("history");

let currentInput = "";
let lastResult = "";
let justCalculated = false;

// angka
function inputNumber(num) {
  if (justCalculated) {
    currentInput = "";
    history.innerText = "";
    justCalculated = false;
  }

  if (currentInput === "0") currentInput = "";

  currentInput += num;
  result.innerText = currentInput;
}

// operator
function inputOperator(op) {
  if (currentInput === "" && lastResult === "") return;

  if (justCalculated) {
    currentInput = lastResult;
    justCalculated = false;
  }

  if (/[+\-*/] $/.test(currentInput)) {
    currentInput = currentInput.slice(0, -3);
  }

  currentInput += " " + op + " ";
  history.innerText = currentInput;
  result.innerText = "0";
}

// hitung
function calculate() {
  if (currentInput === "") return;

  try {
    let expression = currentInput;

    // 🔥 DETEKSI BAGI 0
    if (/\/\s*0(\D|$)/.test(expression)) {
      result.innerText = "hello world";
      history.innerText = expression;
      currentInput = "";
      lastResult = "";
      justCalculated = true;
      return;
    }

    let hasil = eval(expression);

    history.innerText = expression;
    result.innerText = hasil;

    lastResult = hasil.toString();
    currentInput = "";
    justCalculated = true;
  } catch (error) {
    result.innerText = "Error";
    currentInput = "";
  }
}

// clear
function clearAll() {
  currentInput = "";
  lastResult = "";
  justCalculated = false;
  result.innerText = "0";
  history.innerText = "";
}

// delete
function deleteLast() {
  if (justCalculated) return;

  currentInput = currentInput.trim().slice(0, -1);
  result.innerText = currentInput || "0";
}

// binding angka
document.getElementById("n0").onclick = () => inputNumber("0");
document.getElementById("n1").onclick = () => inputNumber("1");
document.getElementById("n2").onclick = () => inputNumber("2");
document.getElementById("n3").onclick = () => inputNumber("3");
document.getElementById("n4").onclick = () => inputNumber("4");
document.getElementById("n5").onclick = () => inputNumber("5");
document.getElementById("n6").onclick = () => inputNumber("6");
document.getElementById("n7").onclick = () => inputNumber("7");
document.getElementById("n8").onclick = () => inputNumber("8");
document.getElementById("n9").onclick = () => inputNumber("9");
document.getElementById("koma").onclick = () => inputNumber(".");

// operator
document.getElementById("tambah").onclick = () => inputOperator("+");
document.getElementById("kurang").onclick = () => inputOperator("-");
document.getElementById("kali").onclick = () => inputOperator("*");
document.getElementById("bagi").onclick = () => inputOperator("/");

// aksi
document.getElementById("hasil").onclick = calculate;
document.getElementById("clear").onclick = clearAll;
document.getElementById("delete").onclick = deleteLast;