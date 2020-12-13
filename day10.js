import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let numbers = [];

for await (const line of readFile("./day10_input.txt")) {
  numbers.push(Number(line));
}

numbers = numbers.sort((a,b) => a -b);

let diffs = {
  1: 0,
  2: 0,
  3: 1
}

for(let i = 1; i < numbers.length; i++) {
  let diff = numbers[i] - numbers[i-1];
  diffs[diff]++;
}

console.log(diffs[1] * diffs[3]);

let inbound = {
  0: 1
}
  
numbers.unshift(0);
numbers.push(numbers[numbers.length-1] + 3)

for(let i = 1; i < numbers.length; i++) {
  let n = numbers[i];
  let count = 0;
  console.log(n);
  console.log(n);
  count += inbound[n-1] || 0
  count += inbound[n-2] || 0
  count += inbound[n-3] || 0
  inbound[n] = count;
}

console.log(inbound);
