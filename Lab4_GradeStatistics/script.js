
document.addEventListener("DOMContentLoaded", function () {
  const mathInput = document.getElementById("mathInput");
  const engInput = document.getElementById("engInput");
  const submitBtn = document.getElementById("submitBtn");
  const gradesTable = document.getElementById("gradesTable");
  const tbody = gradesTable.querySelector("tbody");
  const mathColAvgCell = document.getElementById("mathColAvg");
  const engColAvgCell = document.getElementById("engColAvg");
  const overallAvgCell = document.getElementById("overallAvg");

  // Helper: format number to two decimals, but drop trailing zeros when unnecessary
  function fmt(n) {
    return Number.isFinite(n) ? parseFloat(n.toFixed(2)) : "-";
  }

  function updateColumnAverages() {
    const rows = tbody.querySelectorAll("tr");
    if (rows.length === 0) {
      mathColAvgCell.textContent = "-";
      engColAvgCell.textContent = "-";
      overallAvgCell.textContent = "-";
      return;
    }

    let mathSum = 0, engSum = 0, rowAvgSum = 0;
    rows.forEach(row => {
      const math = parseFloat(row.dataset.math);
      const eng = parseFloat(row.dataset.eng);
      const avg = parseFloat(row.dataset.avg);
      mathSum += math;
      engSum += eng;
      rowAvgSum += avg;
    });

    const mathAvg = mathSum / rows.length;
    const engAvg = engSum / rows.length;
    const overallAvg = rowAvgSum / rows.length;

    mathColAvgCell.textContent = fmt(mathAvg);
    engColAvgCell.textContent = fmt(engAvg);
    overallAvgCell.textContent = fmt(overallAvg);
  }

  function addRow(mathVal, engVal) {
    const rowCount = tbody.querySelectorAll("tr").length + 1;
    const tr = document.createElement("tr");
    const math = Number(mathVal);
    const eng = Number(engVal);
    const avg = (math + eng) / 2;

    // store numeric values for later calculations
    tr.dataset.math = math;
    tr.dataset.eng = eng;
    tr.dataset.avg = avg;

    tr.innerHTML = `
      <td>${rowCount}</td>
      <td>${fmt(math)}</td>
      <td>${fmt(eng)}</td>
      <td>${fmt(avg)}</td>
    `;

    tbody.appendChild(tr);
    updateColumnAverages();
  }

  submitBtn.addEventListener("click", function () {
    const mathVal = mathInput.value;
    const engVal = engInput.value;

    // Validate - must be numbers (not empty, not NaN)
    if (mathVal === "" || engVal === "") {
      alert("Please enter both Math and English scores.");
      return;
    }
    const mathNum = Number(mathVal);
    const engNum = Number(engVal);

    if (!isFinite(mathNum) || !isFinite(engNum)) {
      alert("Please enter valid numeric scores.");
      return;
    }

    // Optionally enforce 0-100 range; remove if not desired
    if (mathNum < 0 || engNum < 0) {
      alert("Scores cannot be negative.");
      return;
    }

    // Add the new row and clear inputs
    addRow(mathNum, engNum);
    mathInput.value = "";
    engInput.value = "";
    mathInput.focus();
  });

  // optional: allow Enter in inputs to submit
  [mathInput, engInput].forEach(inp => {
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        submitBtn.click();
      }
    });
  });
});
