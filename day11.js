import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let grid = []

for await (const line of readFile("./day11_input.txt")) {
  grid.push(line);
}

function countNeighbours(grid, x, y) {
  let neighbourCount = 0;
  [-1, 0, 1].forEach(i => {
    [-1, 0, 1].forEach(j =>{
      if(!(i === 0 && j === 0) && grid[y+i] && grid[y+i][x + j] === '#') {
        neighbourCount++;
      }
    })
  });
  return neighbourCount;
}

function visibleNeighbours(grid, x, y) {
  let neighbourCount = 0;
  [-1, 0, 1].forEach(i => {
    [-1, 0, 1].forEach(j =>{
      if(i == 0 && j == 0) {
        return;
      }
      let distance = 1

      while(true) {
        let val = null;

        if(grid[y+(i*distance)]) {
          val = grid[y+(i*distance)][x + (j*distance)]
        } 

        if(val === '.') {
          distance++;
          continue;
        }
        if(val === '#') {
          neighbourCount++;
        }
        break;
      }
    });
  });
  return neighbourCount;
}


function step(grid, func, limit) {
  let newGrid = [];

  for(let y = 0; y < grid.length; y++) {
    let newRow = ""
    for(let x = 0; x < grid[y].length; x++) {
      switch(grid[y][x]) {
        case ".":
          newRow += ".";
          break;
        case "L":
          if(func(grid, x, y) > 0) {
            newRow += "L";
          } else {
            newRow += "#";
          }
          break;
        case "#":
          if(func(grid, x, y) >= limit) {
            newRow += "L";
          } else {
            newRow += "#";
          }
          break;
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}


function one() {
  while(true) {
    console.log(grid.reduce((a,b) => a+"\r\n"+b));
    console.log();
    let newGrid = step(grid, countNeighbours, 4);
    if(newGrid.reduce((a,b) => a+b) == grid.reduce((a,b) => a+b)) {
      break;
    }
    grid = newGrid;
  }
  console.log(grid.reduce((a,b) => a+b).split("#").length - 1)
}

function two() {
  while(true) {
    console.log(grid.reduce((a,b) => a+"\r\n"+b));
    console.log();
    let newGrid = step(grid, visibleNeighbours, 5);
    if(newGrid.reduce((a,b) => a+b) == grid.reduce((a,b) => a+b)) {
      break;
    }
    grid = newGrid;
  }
  console.log(grid.reduce((a,b) => a+b).split("#").length - 1)
}

two();

