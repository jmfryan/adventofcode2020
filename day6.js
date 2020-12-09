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

let answers = []
let group = {}

let everyEnswers = [];
let groupCount = 0;

for await (const line of readFile("./day6_input.txt")) { 
  if(line == "") {
    answers.push(group);
    everyEnswers.push(Object.values(group).filter(x => x == groupCount).length);

    group = {};
    groupCount = 0;
    continue;
  }

  for(let i = 0; i < line.length; i++) {

    if(!group[line[i]]) {
      group[line[i]] = 0;
    }

    group[line[i]] = group[line[i]] + 1;
  }
  groupCount++;
}


console.log(answers.map(x => Object.keys(x).length).reduce((a,b) => a + b));
console.log(everyEnswers.reduce((a,b) => a+b));

