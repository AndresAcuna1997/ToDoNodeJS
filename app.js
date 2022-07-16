require("colors");

const {
  inquirerMenu,
  inquirerPause,
  readInput,
  deleteListTask,
  confirm,
  showListCheckList,
} = require("./helpers/inquirer");
const { saveFile, readDB } = require("./helpers/saveFile");

const Task = require("./models/task");
const Tasks = require("./models/Tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTaksFromArr(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Task Desc");
        tasks.createTask(desc);
        break;

      case "2":
        tasks.completedList();
        break;

      case "3":
        tasks.listPendingOrCompletedTask(true);
        break;

      case "4":
        tasks.listPendingOrCompletedTask(false);
        break;

      case "5":
        const ids = await showListCheckList(tasks.listArr);
        tasks.toggleCompletedTask(ids);
        break;

      case "6":
        const id = await deleteListTask(tasks.listArr);

        if (id !== 0) {
          const ok = await confirm("Are you sure?");

          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted");
          }
        }

        break;

      default:
        break;
    }

    saveFile(JSON.stringify(tasks.listArr));

    await inquirerPause();
  } while (opt !== "0");
};

main();
