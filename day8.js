import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let instructions = []

for await (let line of readFile("./day8_input.txt")) {
  let [ins, arg] = line.split(" ");
  instructions.push({ins, arg})
}

let exit = false;

for(let i = 0; i < instructions.length; i++) {
  if(instructions[i].ins === 'acc') {
    continue;
  } else if(instructions[i].ins === 'jmp') {
    instructions[i].ins = 'nop';
  } else {
    instructions[i].ins = 'jmp';
  }

  let visited = {}
  let acc = 0;
  let ptr = 0;

  while(!exit) {
    if(ptr === instructions.length) {
      console.log("safe exit " + acc)
      exit =  true;
      continue;
    }

    if(visited[ptr]) {
      console.log("loop detected " + acc)
      break;
    }

    visited[ptr] = true;

    let ins = instructions[ptr];

    switch(ins.ins) {
      case "nop":
        ptr++;
        break;
      case 'acc':
        acc += Number(ins.arg);
        ptr++;
        break;
      case 'jmp':
        ptr += Number(ins.arg);
        break;
    }
  }

  if(instructions[i].ins === 'jmp') {
    instructions[i].ins = 'nop';
  } else {
    instructions[i].ins = 'jmp';
  }
}



