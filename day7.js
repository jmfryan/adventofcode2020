import fs from "fs";
import readline from "readline";

function readFile(filename) {
  const fileStream = fs.createReadStream(filename);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

let bags = { }

for await (let line of readFile("./day7_input.txt")) {
  let [bagName, contents] = line.split(" bags contain ");

  let bag = { name: bagName, contains: {  } };
  
  contents.split(', ').forEach(s => {
    if(s === 'no other bags.') {
      return;
    }

    let [count, bagName1, bagName2] = s.split(' ');
    bag.contains[`${bagName1} ${bagName2}`] = Number(count);
  })

  bags[bagName] = bag;
}

function containsGold(name) {
  if(name === "shiny gold") {
    return true;
  }

  return Object.keys(bags[name].contains).filter(x => containsGold(x)).length > 0;
}

function countContents(name) {
  let bag = bags[name];

  let total = 1;

  for(const [name, count] of Object.entries(bag.contains)) {
    total += count * countContents(name);
  }

  return total;
}

console.log(bags);
console.log(Object.keys(bags).filter(x => x !== "shiny gold").filter(containsGold).length);
console.log(countContents('shiny gold') - 1);

