const inquirer = require("inquirer"),
  mysql = require("mysql"),
  cTable = require("console.table"),
  express = require("express"),
  Controller = require("./src/Controller"),
  { addNewEmployee } = require("./src/components/employeeFunctions");

async function main() {
  running = true;
  const controller = await new Controller();

  const dispatchUserChoice = userchoice => {
    switch (userchoice) {
      case "View employees":
        controller.viewEmployees();

      case "Add new employee":
        addNewEmployee(controller.connection);
      case "Exit":
        controller.connection.end();
        process.exitCode = 0;

      default:
        return;
    }
  };
  async function mainMenu() {
    let uq = await inquirer.prompt({
      message: "What do you want to do?",
      name: "result",
      type: "list",
      choices: [
        "Add new employee",
        "View employees",
        "Update employee roles",
        "Exit"
      ]
    });

    return uq.result;
  }
  while (running) {
    let userChoice = await mainMenu();
    dispatchUserChoice(userChoice);
  }
  // controller.viewRoles();

  //
}

main();

module.exports = main.connection;
