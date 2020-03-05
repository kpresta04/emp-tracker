const inquirer = require("inquirer"),
  mysql = require("mysql"),
  cTable = require("console.table"),
  express = require("express"),
  server = require("./server"),
  Controller = require("./controllerFunctions");

async function main() {
  const controller = await new Controller();

  const dispatchUserChoice = userchoice => {
    switch (userchoice) {
      case "View employees":
        controller.viewEmployees();

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
  let userChoice = await mainMenu();
  dispatchUserChoice(userChoice);
  controller.viewRoles();

  //
}

main();

module.exports = main.connection;
