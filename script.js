const display = document.getElementById("display");
const preview = document.getElementById("preview");
const buttons = document.querySelectorAll("button[data-value]");
const clearBtn = document.getElementById("clear");
const backspaceBtn = document.getElementById("backspace");
const equalsBtn = document.getElementById("equals");

let expression = "";

const opsMap = {
  "÷": "/",
  "×": "*",
  "−": "-",
};

function updateDisplay() {
  display.textContent = expression || "0";
  if (!expression) {
    preview.textContent = "";
    return;
  }
  try {
    const evalExp = expression.replace(/[÷×−]/g, (match) => opsMap[match] || match);
    const result = Function("return " + evalExp)();
    if (result !== undefined && !isNaN(result)) {
      preview.textContent = "= " + result;
    }
  } catch (_) {
    preview.textContent = "";
  }
}

function appendValue(val) {
  expression += val;
  updateDisplay();
}

function clearAll() {
  expression = "";
  updateDisplay();
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const evalExp = expression.replace(/[÷×−]/g, (match) => opsMap[match] || match);
    const result = Function("return " + evalExp)();
    if (result !== undefined) {
      expression = String(result);
      preview.textContent = "";
      updateDisplay();
    }
  } catch (error) {
    alert("Invalid Expression");
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => appendValue(btn.dataset.value));
});

clearBtn.addEventListener("click", clearAll);
backspaceBtn.addEventListener("click", backspace);
equalsBtn.addEventListener("click", calculate);

// Keyboard Support
window.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", ".", "(", ")"].includes(e.key)
  ) {
    appendValue(e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key === "-" ? "−" : e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Escape") {
    clearAll();
  }
});

updateDisplay();
