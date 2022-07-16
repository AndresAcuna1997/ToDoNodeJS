const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What do you wanna do",
    choices: [
      { value: "1", name: `${"1".green}. Create Task` },
      { value: "2", name: `${"2".green}. List Task` },
      { value: "3", name: `${"3".green}. List done tasks` },
      { value: "4", name: `${"4".green}. List pending tasks` },
      { value: "5", name: `${"5".green}. Complete Tasks` },
      { value: "6", name: `${"6".green}. Delete Task` },
      { value: "0", name: `${"0".green}. Exit ==>` },
    ],
  },
];

//Initial menu
const inquirerMenu = async () => {
  console.clear();

  console.log("=======================".green);
  console.log("To Do Menu".green);
  console.log("=======================".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const inquirerPause = async () => {
  const question = [
    {
      type: "input",
      name: "Enter",
      message: `Press ${`enter`.green} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);

  return inquirerPause;
};

const deleteListTask = async (arrTask = []) => {
  // { value: "1", name: `${"1".green}. Create Task` },

  const choices = arrTask.map((task, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: task.id,
      name: ` ${idx}  ${task.desc}`,
    };
  });

  choices.unshift({ value: "0", name: "0. ".green + "Cancel" });

  const questions = [{ type: "list", name: "id", message: "Delete", choices }];

  const { id } = await inquirer.prompt(questions);

  return id;
};

const showListCheckList = async (arrTask = []) => {
  const choices = arrTask.map((task, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: task.id,
      name: ` ${idx}  ${task.desc}`,
      checked: task.completed ? true : false,
    };
  });

  choices.unshift({ value: "0", name: "0. ".green + "Cancel" });

  const questions = [
    { type: "checkbox", name: "ids", message: "Select", choices },
  ];

  const { ids } = await inquirer.prompt(questions);

  return ids;
};

const confirm = async (message) => {
  const question = [{ type: "confirm", name: "ok", message }];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

//Re usable function to create an input
const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};
module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  deleteListTask,
  confirm,
  showListCheckList,
};
