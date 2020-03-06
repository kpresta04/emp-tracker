const inquirer = require("inquirer"),
  { addNewEmployee } = require("./employeeFunctions");

// exports.

const addSubMenu = async connection => {
  inquirer
    .prompt([
      {
        name: "result",
        type: "list",
        message: "What do you want to add?",
        choices: ["Role", "Department", "Employee"]
      }
    ])
    .then(async answers => {
      switch (answers.result) {
        case "Employee":
          await addNewEmployee(connection);
          mainMenu();

          return;
        default:
          return;
      }
    });
};
