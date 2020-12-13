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

for await (const line of readFile("./day12_input.txt")) {
  let ins = {
    direction: line.substring(0, 1),
    value: Number(line.substring(1)),
  };
  instructions.push(ins);
}

let x = 0;
let y = 0;
let wx = 10;
let wy = 1;

instructions.forEach((ins) => {
  let dir = ins.direction;

  switch (dir) {
    case "F":
      x += wx * ins.value;
      y += wy * ins.value;
      break;
    case "N":
      wy += ins.value;
      break;
    case "S":
      wy -= ins.value;
      break;
    case "W":
      wx -= ins.value;
      break;
    case "E":
      wx += ins.value;
      break;
    case "L":
      turnLeft(ins.value);
      break;
    case "R":
      turnRight(ins.value);
      break;
  }
  console.log(ins);
  console.log(x, y, wx, wy);
});

console.log(Math.abs(x) + Math.abs(y));

function turnLeft(degrees) {
  let steps = degrees / 90;

  for (var i = 0; i < steps; i++) {
    let newX = -wy;
    let newY = wx;

    wx = newX;
    wy = newY;
  }
}

function turnRight(degrees) {
  let steps = degrees / 90;

  for (var i = 0; i < steps; i++) {
    let newX = wy;
    let newY = -wx;

    wx = newX;
    wy = newY;
  }
}
