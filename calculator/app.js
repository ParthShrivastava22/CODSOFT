let display = document.getElementById("display");
let currentInput = "0";
let operator = null;
let previousInput = null;
let waitingForOperand = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendToDisplay(value) {
  if (waitingForOperand) {
    currentInput = value;
    waitingForOperand = false;
  } else {
    if (currentInput === "0") {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  operator = null;
  previousInput = null;
  waitingForOperand = false;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Error: Division by zero");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = null;
  waitingForOperand = true;
  updateDisplay();
}

// Event delegation for all button clicks
document.querySelector(".buttons").addEventListener("click", function (e) {
  const button = e.target;

  if (button.dataset.number) {
    appendToDisplay(button.dataset.number);
  } else if (button.dataset.operator) {
    const selectedOperator = button.dataset.operator;

    if (operator && !waitingForOperand) {
      calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;
    waitingForOperand = true;
  } else if (button.dataset.action) {
    switch (button.dataset.action) {
      case "clear":
        clearDisplay();
        break;
      case "delete":
        deleteLast();
        break;
      case "calculate":
        calculate();
        break;
      case "decimal":
        if (currentInput.indexOf(".") === -1) {
          appendToDisplay(".");
        }
        break;
    }
  }
});

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if ((key >= "0" && key <= "9") || key === ".") {
    appendToDisplay(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    if (operator && !waitingForOperand) {
      calculate();
    }
    previousInput = currentInput;
    operator = key;
    waitingForOperand = true;
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
  } else if (key === "Escape" || key === "c" || key === "C") {
    clearDisplay();
  } else if (key === "Backspace") {
    deleteLast();
  }
});

// Initialize display
updateDisplay();
