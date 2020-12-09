import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let instructions = [];

let count = 25;
let preamble = [];
let target = null;

for await (let line of readFile("./day9_input.txt")) {
  let current = Number(line);

  if (preamble.length == count) {
    let found = false;
    for (var i = 0; i < preamble.length; i++) {
      for (var j = i + 1; j < preamble.length; j++) {
        if (preamble[i] + preamble[j] === current) {
          found = true;
        }
      }
    }

    if (!found) {
      target = current;
      break;
    }
  }

  preamble.push(current);

  while (preamble.length > count) {
    preamble.shift();
  }
}

let numbers = [];

for await (let line of readFile("./day9_input.txt")) {
  let current = Number(line);

  numbers.push(current);

  while (numbers.reduce((a, b) => a + b, 0) > target) {
    numbers.shift();
  }

  if (numbers.reduce((a, b) => a + b, 0) == target) {
    break;
  }
}

console.log(target);
numbers = numbers.sort((a, b) => a - b);
console.log(numbers[0] + numbers[numbers.length - 1]);
