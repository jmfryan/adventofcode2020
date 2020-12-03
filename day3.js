import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let inputs = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let treeCounts = inputs.map(async (input) => {
  let row = 0;
  let column = 0;
  let trees = 0;

  for await (const line of readFile("./day3_input.txt")) {
    // Make sure we start on a blank space.
    if (row == 0) {
      while (line[column] === "#") {
        column++;
      }
    }

    // skip rows if we are moving more than 1 row at a time.
    if (row % input[1] !== 0) {
      row++;
      continue;
    }

    row++;

    if (line[column] === "#") {
      trees++;
    }

    column += input[0];

    if (column >= line.length) {
      column -= line.length;
    }
  }

  return trees;
});

Promise.all(treeCounts).then((xs) => console.log(xs.reduce((a, b) => a * b)));
