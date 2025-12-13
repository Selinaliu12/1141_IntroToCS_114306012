function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "error";
  }
  return a / b;
}

function calculate() {
  const num1 = Number(document.getElementById("num1").value);
  const num2 = Number(document.getElementById("num2").value);
  const operator = document.getElementById("operator").value;

  let result;

  if (operator === "+") {
    result = add(num1, num2);
  } else if (operator === "-") {
    result = subtract(num1, num2);
  } else if (operator === "*") {
    result = multiply(num1, num2);
  } else if (operator === "/") {
    result = divide(num1, num2);
  }

  if (result === "error") {
    document.getElementById("result").innerText = "Cannot divide by zero!";
  } else {
    document.getElementById("result").innerText =
      "Result = " + result.toFixed(2);
  }
}
