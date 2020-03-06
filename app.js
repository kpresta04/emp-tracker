const mysql = require("mysql"),
  { intValidator } = require("./src/components/validators"),
  inquirer = require("inquirer"),
  {
    addNewEmployee,
    deleteEmployee,
    viewEmployees
  } = require("./src/components/employeeFunctions"),
  {
    viewDepartments,
    addNewDepartment
  } = require("./src/components/departmentFunctions"),
  {
    viewRoles,
    addNewRole,
    updateEmployeeRole
  } = require("./src/components/roleFunctions");

const mainMenu = async () => {
  const updateRoleSubMenu = async connection => {
    inquirer
      .prompt([
        {
          name: "empID",
          type: "input",
          message: "Enter the ID of the employee you wish to update: ",
          validate: intValidator
        },
        {
          name: "roleID",
          type: "input",
          message: "Enter the ID of the employees new role: ",
          validate: intValidator
        }
      ])
      .then(async answers => {
        await updateEmployeeRole(connection, answers.empID, answers.roleID);
        mainMenu();
      });
  };
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
          case "Role":
            await addNewRole(connection);
            mainMenu();
            return;
          default:
            mainMenu();
            return;
        }
      });
  };
  const viewSubMenu = async connection => {
    inquirer
      .prompt([
        {
          name: "result",
          type: "list",
          message: "What do you want to view?",
          choices: ["Roles", "Departments", "Employees", "Cancel"]
        }
      ])
      .then(async answers => {
        switch (answers.result) {
          case "Employees":
            await viewEmployees(connection);
            mainMenu();
            return;
          case "Departments":
            await viewDepartments(connection);
            mainMenu();
            return;
          case "Roles":
            await viewRoles(connection);
            mainMenu();
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
        "View department, role, or employees",
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
        case "View department, role, or employees":
          await viewSubMenu(connection);

          return;
        case "Add department, role, or employee":
          await addSubMenu(connection);

          return;
        case "Update employee roles":
          await updateRoleSubMenu(connection);
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
