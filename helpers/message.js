require("colors");

console.clear();

const showMenu = () => {
  return new Promise((res, rej) => {
    console.log("=======================".green);
    console.log("To Do Menu".green);
    console.log("=======================".green);

    console.log(`${"1.".green} Create Task`);
    console.log(`${"2.".green} List Task`);
    console.log(`${"3.".green} List done tasks`);
    console.log(`${"4.".green} List pending tasks`);
    console.log(`${"5.".green} Complete Tasks`);
    console.log(`${"6.".green} Delete Task`);
    console.log(`${"0.".green} Exit ==> \n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`Choose an option`, (opt) => {
      readLine.close();
      res(opt);
    });
  });
};

const pause = () => {
  return new Promise((res, rej) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\n Press ${"ENTER".green} to continue \n`, (opt) => {
      readLine.close();
      res();
    });
  });
};

module.exports = { showMenu, pause };
