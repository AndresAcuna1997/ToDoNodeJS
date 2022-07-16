const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  desc = "";
  completed = null;

  constructor(desc) {
    this.desc = desc;
    this.id = uuidv4();
    this.completed = null;
  }
}

module.exports = Task;
