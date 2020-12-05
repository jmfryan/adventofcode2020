import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}
let ids = [];

for await (const line of readFile("./day5_input.txt")) {
  var lower = 0;
  var upper = 128;

  for (let i = 0; i < 7; i++) {
    let range = (upper - lower) / 2;

    if (line[i] == "F") {
      upper = upper - Math.floor(range);
    } else {
      lower = lower + Math.ceil(range);
    }
  }

  var row = lower;
  lower = 0;
  upper = 8;

  for (let i = 0; i < 3; i++) {
    let range = (upper - lower) / 2;

    if (line[i + 7] == "L") {
      upper = upper - Math.floor(range);
    } else {
      lower = lower + Math.ceil(range);
    }
  }
  let seat = lower;
  let id = row * 8 + seat;
  ids.push(id);
}

ids.sort((a, b) => a - b);

console.log(ids[ids.length - 1]);

for (let i = 1; i < ids.length; i++) {
  if (ids[i] - 2 === ids[i - 1]) {
    console.log(ids[i] - 1);
    break;
  }
}
