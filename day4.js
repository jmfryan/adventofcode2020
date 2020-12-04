import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let fields = "";

const required = [
  /\sbyr:(19[2-9]\d|200[1-2])\s/,
  /\siyr:(201\d|2020)\s/,
  /\seyr:(202\d|2030)\s/,
  /\shgt:(1[5-8]\dcm|19[0-3]cm|59in|6\din|7[0-6]in)\s/,
  /\shcl:\#[0-9a-f]{6}\s/,
  /\secl:(amb|blu|brn|gry|grn|hzl|oth)\s/,
  /\spid:\d{9}\s/,
];

let valid = 0;

for await (const line of readFile("./day4_input.txt")) {
  if (line.length === 0) {
    if (required.every((x) => fields.match(x))) {
      valid++;
    }

    fields = "";
    continue;
  } else {
    fields += " " + line + " ";
  }
}

console.log(valid);
