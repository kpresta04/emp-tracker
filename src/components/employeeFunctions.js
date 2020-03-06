const inquirer = require("inquirer"),
  { intValidator, alphaValidator } = require("./validators");

const runEmployeePrompts = async () => {
  let answers = await inquirer.prompt([
    {
      name: "first_name",
      message: "Enter employee's first name: ",
      type: "input",
      validate: alphaValidator
    },
    {
      name: "last_name",
      message: "Enter employee's last name: ",
      type: "input",
      validate: alphaValidator
    },
    {
      name: "role_id",
      message: "Enter employee's role ID: ",
      type: "list",
      choices: ["1: Manager", "2: Engineer", "3: Intern"]
    },
    {
      name: "manager_id",
      message: "Enter the ID of the employee's manager: ",
      type: "input",
      validate: intValidator
    }
  ]);
  // Transform answers

  answers.role_id = Number(answers.role_id.slice(0, 1)); // We only want the integer
  answers.manager_id = Number(answers.manager_id);
  return answers;
};
exports.deleteEmployee = async connection => {
  let answers = await inquirer.prompt({
    name: "delete_id",
    message: "Enter the ID of the employee you wish to delete: ",
    type: "input",
    validate: intValidator
  });
  connection.query(
    `delete from employee where id=${answers.delete_id}`,
    function(err, result) {
      if (err) throw err;
      // console.log(result);
      connection.end();
    }
  );
};
exports.viewEmployees = connection => {
  connection.query("SELECT * FROM employee", function(err, result) {
    if (err) throw err;
    //   console.log(result);
    result.forEach(el => {
      console.table({
        id: el.id,
        First_Name: el.first_name,
        Last_Name: el.last_name,
        role_id: el.role_id,
        manager_id: el.manager_id
      });
    });
  });
  connection.end();
};
exports.addNewEmployee = async connection => {
  const promptAnswers = await runEmployeePrompts();
  //   promptAnswers = await promptAnswers;
  // console.log("Answers:", promptAnswers);

  // Employee columns: first_name, last_name, role_id, manager_id
  connection.query(
    `INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${promptAnswers.first_name}","${promptAnswers.last_name}","${promptAnswers.role_id}","${promptAnswers.manager_id}")`,
    function(err, result) {
      if (err) throw err;
      // console.log("Press arrow key to bring up the menu");
      connection.end();
    }
  );
};
