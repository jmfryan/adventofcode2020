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
let facing = "E";

instructions.forEach((ins) => {

  let dir = ins.direction;

  if (dir === "F") {
    dir = facing;
  }

  switch (dir) {
    case "N":
      y += ins.value;
      break;
    case "S":
      y -= ins.value;
      break;
    case "W":
      x -= ins.value;
      break;
    case "E":
      x += ins.value;
      break;
    case "L":
      turnLeft(ins.value);
      break;
    case "R":
      turnRight(ins.value);
      break;
  }
  console.log(ins);
  console.log(x, y, facing)
});

console.log(Math.abs(x) + Math.abs(y));

function turnLeft(degrees) {
  let steps = degrees / 90;

  for (var i = 0; i < steps; i++) {
    switch (facing) {
      case "N":
        facing = "W";
        break;
      case "S":
        facing = "E";
        break;
      case "W":
        facing = "S";
        break;
      case "E":
        facing = "N";
        break;
    }
  }
}

function turnRight(degrees) {
  let steps = degrees / 90;

  for (var i = 0; i < steps; i++) {
    switch (facing) {
      case "N":
        facing = "E";
        break;
      case "S":
        facing = "W";
        break;
      case "W":
        facing = "N";
        break;
      case "E":
        facing = "S";
        break;
    }
  }
}

