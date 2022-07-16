const Task = require("./task");

class Tasks {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listArr() {
    //Transform the Object into a Array to show it in the console
    const list = [];

    Object.keys(this._listado).forEach((key) => list.push(this._listado[key]));

    return list;
  }

  deleteTask(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  printArrayList(arrayList) {
    arrayList.forEach((task, i) =>
      console.log(
        `${i + 1}`.green,
        `${task.desc} :: ${
          task.completed ? "Completed".green : "Pending".red
        } ${task.completed ? `- Done: ${task.completed}` : ""}`
      )
    );
  }

  createTask(desc = "") {
    //Crete a task calling the Task intance
    const task = new Task(desc);

    this._listado[task.id] = task;
  }

  loadTaksFromArr(Arr = []) {
    // Loads and array of objects form the .JSON and create the instance of Task again
    Arr.forEach((task) => (this._listado[task.id] = task));
  }

  completedList() {
    // List all tasks
    this.printArrayList(this.listArr);
  }

  listPendingOrCompletedTask(completed = true) {
    const Arr = completed
      ? this.listArr.filter((task) => task.completed)
      : this.listArr.filter((task) => !task.completed);

    this.printArrayList(Arr);
  }

  toggleCompletedTask(ids = []) {
    ids.forEach((id) => {
      const task = this._listado[id];

      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listado[task.id].completed = null;
      }
    });
  }
}

module.exports = Tasks;
