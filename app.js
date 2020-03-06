const inquirer = require("inquirer"),
  { mainMenu } = require("./testView");

async function main() {
  await mainMenu();
}

main();

module.exports = main;
