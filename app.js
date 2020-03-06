const mysql = require("mysql"),
  inquirer = require("inquirer"),
  {
    addNewEmployee,
    deleteEmployee,
    viewEmployees
  } = require("./src/components/employeeFunctions"),
  {
    viewDepartments,
    addNewDepartment
  } = require("./src/components/departmentFunctions");

const mainMenu = async () => {
  const addSubMenu = async connection => {
    inquirer
      .prompt([
        {
          name: "result",
          type: "list",
          message: "What do you want to add?",
          choices: ["Role", "Department", "Employee", "Cancel"]
        }
      ])
      .then(async answers => {
        switch (answers.result) {
          case "Employee":
            await addNewEmployee(connection);
            mainMenu();
          case "Department":
            await addNewDepartment(connection);
            mainMenu();

            return;
          default:
            mainMenu();

            return;
        }
      });
  };
  inquirer
    .prompt({
      name: "result",
      type: "list",
      message: "What do you want to do?",
      choices: [
        "Add department, role, or employee",
        // "Add new employee",
        "View employees",
        "Update employee roles",
        "Delete employee",
        "Exit"
      ]
    })
    .then(async answers => {
      console.log(answers.result);
      const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "emptracker_db"
      });

      connection.connect(function(err) {
        if (err) throw err;
        // console.log("Connected!");
      });

      switch (answers.result) {
        case "View employees":
          await viewEmployees(connection);
          //   console.log("Press arrow key to bring up menu");

          mainMenu();
          return;
        case "Add new employee":
          await addNewEmployee(connection);
          mainMenu();
          return;
        case "Add department, role, or employee":
          await addSubMenu(connection);

          return;

        case "Delete employee":
          await deleteEmployee(connection);
          mainMenu();
          return;
        case "Exit":
          process.exit();
          return;
      }
    });
};

mainMenu();
