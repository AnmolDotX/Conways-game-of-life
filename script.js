document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const rows = 30;
  const cols = 30;
  const cells = [];
  let interval;
  let isRunning = false;
  let step = 0;

  for (let row = 0; row < rows; row++) {
    cells[row] = [];
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => {
        cell.classList.toggle("alive");
      });
      grid.appendChild(cell);
      cells[row][col] = cell;
    }
  }

  const getNeighborCount = (row, col) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (cells[newRow][newCol].classList.contains("alive")) {
            count++;
          }
        }
      }
    }
    return count;
  };

  const nextGeneration = () => {
    const newStates = [];
    for (let row = 0; row < rows; row++) {
      newStates[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = cells[row][col];
        const neighbors = getNeighborCount(row, col);
        if (cell.classList.contains("alive")) {
          if (neighbors < 2 || neighbors > 3) {
            newStates[row][col] = false;
          } else {
            newStates[row][col] = true;
          }
        } else {
          if (neighbors === 3) {
            newStates[row][col] = true;
          } else {
            newStates[row][col] = false;
          }
        }
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (newStates[row][col]) {
          cells[row][col].classList.add("alive");
        } else {
          cells[row][col].classList.remove("alive");
        }
      }
    }
  };

  const updateStepCounter = () => {
    document.getElementById("stepCounter").textContent = `Step: ${step}`;
  };

  document.getElementById("startStop").addEventListener("click", () => {
    if (isRunning) {
      clearInterval(interval);
      document.getElementById("startStop").textContent = "Start";
    } else {
      interval = setInterval(() => {
        nextGeneration();
        step++;
        updateStepCounter();
      }, 100);
      document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
  });

  document.getElementById("next").addEventListener("click", () => {
    if (!isRunning) {
      nextGeneration();
      step++;
      updateStepCounter();
    }
  });

  document.getElementById("random").addEventListener("click", () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (Math.random() > 0.7) {
          cells[row][col].classList.add("alive");
        } else {
          cells[row][col].classList.remove("alive");
        }
      }
    }
    step = 0;
    updateStepCounter();
  });

  document.getElementById("clear").addEventListener("click", () => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells[row][col].classList.remove("alive");
      }
    }
    step = 0;
    updateStepCounter();
  });
});
