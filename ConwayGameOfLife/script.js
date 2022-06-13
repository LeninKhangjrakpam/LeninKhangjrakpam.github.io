document.addEventListener("DOMContentLoaded", () => {

  const svg = d3.select("#GOL")
    .attr("height", "1500")
    .attr("width", "1500");
  const boxHeight = 15, boxWidth = 15;

  let state = [];
  const totalRow = 1000, totalColumn = 1000;
  // Adding boxes
  for (let i = 0; i < totalRow * totalColumn; i++) {
    state = [...state, 0];
  }

  svg.append("g")
    .classed("rect", true)
    .selectAll("rect")
    .data(state, (d, i) =>  i)
    .join("rect")
      .attr("height", boxHeight)
      .attr("width", boxWidth)
      .attr("x", (d, i) => (i % totalColumn) * boxWidth)
      .attr("y", (d, i) => Math.floor(i / totalColumn) * boxHeight)
      .attr("data-key", (d, i) =>  i)
      .attr("fill", "rgb(42, 42, 42)")
      .on("click", function(e, d) {
        const indx = d3.select(this)._groups[0][0].getAttribute("data-key");
        if (!simulationRunning) {
          if (state[indx] === 0)  {
            d3.select(this)
              .attr("fill", "#0f0");
            state = update(state, indx, 1);   // Activate cell
          } else  {
            d3.select(this)
              .attr("fill", "rgb(42, 42, 42)");
            state = update(state, indx, 0);   // Deactivate cell
          }
        }
      });

  let intervalId, simulationRunning = false;         // Var to control simulation start/stop
  d3.select("button#start")
    .on("click", () =>  {
      if (!simulationRunning) {
        simulationRunning = true;
        intervalId = window.setInterval(() => {
          state = startSimulate(state, totalColumn, totalRow);
        }, 500);   // interval: 500ms
      }
    });

  d3.select("button#stop")
    .on("click", () =>  {
      if (simulationRunning)  {
        simulationRunning = false;
        window.clearInterval(intervalId);   // TODO: Stop/Pause the simulation
      }
    });
});

const update = (state, indx, mode) => {
  state[indx] = mode;    // seeding cell state according to user preference
  return state;
}

const startSimulate = (prevState, totalColumn, totalRow) =>  {
  // TODO: Generating new state configuration from the previous pattern configuration
  let state = [];
  for (let i = 0; i < totalRow * totalColumn; i++) {
    // Get 2D index of the current cell
    const row = Math.floor(i / totalColumn) + 1, column = i % totalColumn;

    // Get state of 8 neighbouring cells
    const upCell = (row === 1) ? 0 : prevState[(row - 2) * totalColumn + column],
    downCell = (row === totalRow) ? 0 : prevState[row * totalColumn + column],
    leftCell = (column === 0) ? 0 : prevState[(row - 1) * totalColumn + column - 1],    //row - 1 < 0 ? 0 : "something"
    rightCell = (column === totalColumn - 1) ? 0 : prevState[(row - 1) * totalColumn + column + 1],
    upLeft = (row === 1 || column === 0) ? 0 : prevState[(row - 2) * totalColumn + column - 1],
    upRight = (row === 1 || column === totalColumn - 1) ? 0 : prevState[(row - 2) * totalColumn + column + 1],
    downLeft = (row === totalRow || column === 0) ? 0 : prevState[row * totalColumn + column - 1],
    downRight = (row === totalRow || column === totalColumn - 1) ? 0 : prevState[row * totalColumn + column + 1];

    let liveNeighbourCellCount = 0;
    [upLeft, upCell, upRight, leftCell, rightCell, downLeft, downCell, downRight].forEach(cellState =>  {
      (cellState === 1) ? liveNeighbourCellCount++ : liveNeighbourCellCount;
    });
    // Rules for Game of Life
    if (prevState[(row - 1) * totalColumn + column] === 1 && (liveNeighbourCellCount === 2 || liveNeighbourCellCount === 3))  {
      state = [...state, 1]   // live cell Survive
    } else if (prevState[(row - 1) + totalColumn + column] === 0 && liveNeighbourCellCount === 3) {
      state = [...state, 1]   // Dead cell become alive
    } else  {
      state = [...state, 0]   // Condition for cells to die
    }
  }
  renderSimulation(state);
  return state;
}

const renderSimulation = state => {
  // TODO: Render the input state to browser
  const svg = d3.select("#GOL");
  svg.select("g.rect")
    .selectAll("rect")
    .data(state, (d, i) =>  i)
    .join("rect")
      .attr("fill", d =>  {
        return d === 1 ? "#0f0" : "rgb(42, 42, 42)";
      });
}
