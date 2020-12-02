import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let valid1 = 0;
let valid2 = 0;

for await (const line of readFile("./day2_input.txt")) {

  let match = line.match(/(\d+)-(\d+) (\w): (.+)/);
  let min = match[1];
  let max = match[2];
  let letter = match[3];
  let password = match[4];

  let count = password.split(letter).length - 1;
  if(count >= min && count <= max) {
    valid1++
  }

  let pos1 = password[min - 1]
  let pos2 = password[max - 1]

  if((pos1 === letter || pos2 === letter) && !(pos1 === letter && pos2 === letter)) {
    valid2++;
  }
}

console.log(valid1);
console.log(valid2);
